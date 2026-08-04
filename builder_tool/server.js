require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const { exec } = require('child_process');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();
app.use(express.json());
app.use(express.static('public'));

const dataDir = path.join(__dirname, '../data');
const imagesDir = path.join(__dirname, '../images');

// Đảm bảo các thư mục cần thiết tồn tại
if (!fs.existsSync('temp_uploads')) fs.mkdirSync('temp_uploads');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true }); // FIX: kiểm tra dataDir

const upload = multer({ dest: 'temp_uploads/' });

function updateRegistry(id, name) {
    const regPath = path.join(dataDir, 'subjects.js');
    if (!fs.existsSync(regPath)) {
        console.warn('subjects.js không tồn tại, bỏ qua updateRegistry.');
        return;
    }
    let content = fs.readFileSync(regPath, 'utf8');
    let arrStr = content.match(/window\.subjectRegistry\s*=\s*(\[[\s\S]*?\]);/);
    if (arrStr) {
        let arr = eval(arrStr[1]);
        if (!arr.find(a => a.id === id)) {
            arr.push({
                id: id,
                name: name,
                iconClass: "dic-icon",
                icon: "bx-folder",
                isDefault: false
            });
            fs.writeFileSync(regPath, `window.subjectRegistry = ${JSON.stringify(arr, null, 4)};\n`, 'utf8');
        }
    }
}

// FIX: pushToGit giờ reject khi có lỗi, không im lặng nuốt lỗi nữa
function pushToGit() {
    return new Promise((resolve, reject) => {
        exec('git add . && git commit -m "Auto add new subject via Local Tool" && git push origin main', { cwd: path.join(__dirname, '../') }, (err, stdout, stderr) => {
            if (err) reject(new Error(stderr || err.message));
            else resolve(stdout);
        });
    });
}

app.post('/api/upload-text', upload.single('txtFile'), async (req, res) => {
    // FIX: Kiểm tra đầu vào trước khi dùng
    if (!req.body.subjectId || !req.body.subjectName) {
        return res.status(400).json({ error: 'Thiếu mã môn học hoặc tên môn học!' });
    }
    if (!req.file) {
        return res.status(400).json({ error: 'Thiếu file .txt!' });
    }

    let subjectId = req.body.subjectId.replace(/[^a-zA-Z0-9_-]/g, '');
    let subjectName = req.body.subjectName;

    let content;
    try {
        content = fs.readFileSync(req.file.path, 'utf8');
    } catch (err) {
        return res.status(500).json({ error: 'Không đọc được file: ' + err.message });
    }

    let questions = [];
    try {
        const prompt = `Đọc đoạn đề thi trắc nghiệm lộn xộn dưới đây và trả về một mảng JSON nguyên chất. Không giải thích gì thêm, KHÔNG dùng markdown \`\`\`json. Format mỗi object trong mảng: { "type": "text", "term": "Nội dung câu hỏi", "definition": "Nội dung đáp án đúng", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], "answerIndex": số nguyên (0 đến 3) }. Nội dung đề:\n${content}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        let jsonText = response.text.trim();
        if (jsonText.startsWith('```json')) jsonText = jsonText.replace(/^```json/, '');
        if (jsonText.startsWith('```')) jsonText = jsonText.replace(/^```/, '');
        jsonText = jsonText.replace(/```$/, '').trim();
        questions = JSON.parse(jsonText);
    } catch (err) {
        console.error('AI Error:', err);
        return res.status(500).json({ error: 'Lỗi AI phân tích đề: ' + err.message });
    }

    try {
        const jsContent = `window.studyData = window.studyData || {};\nwindow.studyData['${subjectId}'] = ${JSON.stringify(questions, null, 4)};\n`;
        fs.writeFileSync(path.join(dataDir, `${subjectId}.js`), jsContent, 'utf8');
        updateRegistry(subjectId, subjectName);
        await pushToGit();
    } catch (err) {
        console.error('Git/File Error:', err);
        return res.status(500).json({ error: 'Lỗi lưu file hoặc push Git: ' + err.message });
    }

    res.json({ success: true, message: `✅ Đã tạo đề "${subjectName}" và push lên Github thành công!` });
});

app.post('/api/upload-images', upload.fields([{ name: 'deFiles' }, { name: 'dapanFiles' }]), async (req, res) => {
    // FIX: Kiểm tra đầu vào trước khi dùng
    if (!req.body.subjectId || !req.body.subjectName) {
        return res.status(400).json({ error: 'Thiếu mã môn học hoặc tên môn học!' });
    }

    let subjectId = req.body.subjectId.replace(/[^a-zA-Z0-9_-]/g, '');
    let subjectName = req.body.subjectName;

    const deFiles = (req.files && req.files['deFiles']) || [];
    const dapanFiles = (req.files && req.files['dapanFiles']) || [];

    if (deFiles.length === 0) {
        return res.status(400).json({ error: 'Chưa chọn thư mục ảnh đề!' });
    }

    // FIX: Bọc toàn bộ trong try-catch để bắt mọi lỗi OCR và file
    try {
        const questions = [];
        for (let deFile of deFiles) {
            let originalName = path.basename(deFile.originalname.replace(/\\/g, '/'));
            let qBase = originalName.replace(/\.[^/.]+$/, "");
            let dapanFile = dapanFiles.find(f => {
                let fName = path.basename(f.originalname.replace(/\\/g, '/'));
                let ansBase = fName.replace(/\.[^/.]+$/, "");
                return fName === originalName || ansBase === qBase || ansBase === ('dapan' + qBase) || ansBase === ('dapan_' + qBase);
            });

            let newImgPath = path.join(imagesDir, `${subjectId}_${originalName}`);
            fs.copyFileSync(deFile.path, newImgPath);

            let correctIndex = 0;
            if (dapanFile) {
                const result = await Tesseract.recognize(dapanFile.path, 'eng');
                let text = result.data.text.trim().toUpperCase();
                if (text.includes('D')) correctIndex = 3;
                else if (text.includes('C')) correctIndex = 2;
                else if (text.includes('B')) correctIndex = 1;
                else correctIndex = 0;
            }

            questions.push({
                type: 'image',
                question_img: `images/${subjectId}_${originalName}`,
                definition: ['A', 'B', 'C', 'D'][correctIndex],
                options: ['A', 'B', 'C', 'D'],
                answerIndex: correctIndex
            });
        }

        const jsContent = `window.studyData = window.studyData || {};\nwindow.studyData['${subjectId}'] = ${JSON.stringify(questions, null, 4)};\n`;
        fs.writeFileSync(path.join(dataDir, `${subjectId}.js`), jsContent, 'utf8');
        updateRegistry(subjectId, subjectName);
        await pushToGit();
    } catch (err) {
        console.error('Image/OCR/Git Error:', err);
        return res.status(500).json({ error: 'Lỗi xử lý ảnh hoặc push Git: ' + err.message });
    }

    res.json({ success: true, message: `✅ Đã quét OCR "${subjectName}" (${deFiles.length} ảnh) và push lên Github thành công!` });
});

app.listen(3000, () => {
    console.log('Builder Tool running at http://localhost:3000');
    exec('start http://localhost:3000');
});