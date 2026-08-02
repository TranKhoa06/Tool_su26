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

// Multer cho upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp_uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ dest: 'temp_uploads/' });

if (!fs.existsSync('temp_uploads')) fs.mkdirSync('temp_uploads');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

function updateRegistry(id, name) {
    const regPath = path.join(dataDir, 'subjects.js');
    let content = fs.readFileSync(regPath, 'utf8');
    // Parse registry manually
    let arrStr = content.match(/window\.subjectRegistry\s*=\s*(\[[\s\S]*?\]);/);
    if(arrStr) {
        let arr = eval(arrStr[1]);
        if(!arr.find(a => a.id === id)) {
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

function pushToGit() {
    return new Promise((resolve, reject) => {
        exec('git add . && git commit -m "Auto add new subject via Local Tool" && git push origin main', { cwd: path.join(__dirname, '../') }, (err, stdout, stderr) => {
            if(err) resolve(stderr);
            else resolve(stdout);
        });
    });
}

app.post('/api/upload-text', upload.single('txtFile'), async (req, res) => {
    let { subjectId, subjectName } = req.body;
    subjectId = subjectId.replace(/[^a-zA-Z0-9_-]/g, ''); // Fix Path Traversal
    if(!req.file) return res.status(400).json({error: 'Missing file'});
    
    const content = fs.readFileSync(req.file.path, 'utf8');
    
    // Thuật toán parse TXT siêu cấp
    // Giả sử mỗi câu hỏi có dạng: "Câu X: [Nội dung]\nA. [..]\nB. [..]\nC. [..]\nD. [..]\nĐáp án: A"
    let questions = [];
    try {
        const prompt = `Đọc đoạn đề thi trắc nghiệm lộn xộn dưới đây và trả về một mảng JSON nguyên chất. Không giải thích gì thêm, KHÔNG dùng markdown ```json. Format mỗi object trong mảng: { "type": "text", "term": "Nội dung câu hỏi", "definition": "Nội dung đáp án đúng", "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"], "correctIndex": số nguyên (0 đến 3) }. Nội dung đề:\n${content}`;
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
        console.error(err);
        return res.status(500).json({error: 'AI Error: ' + err.message});
    }
    
    // Lưu file js
    const jsContent = `window.studyData = window.studyData || {};\nwindow.studyData['${subjectId}'] = ${JSON.stringify(questions, null, 4)};\n`;
    fs.writeFileSync(path.join(dataDir, `${subjectId}.js`), jsContent, 'utf8');
    
    updateRegistry(subjectId, subjectName);
    await pushToGit();
    
    res.json({success: true, message: 'Đã tạo đề và push lên Github!'});
});

app.post('/api/upload-images', upload.fields([{name:'deFiles'}, {name:'dapanFiles'}]), async (req, res) => {
    let { subjectId, subjectName } = req.body;
    subjectId = subjectId.replace(/[^a-zA-Z0-9_-]/g, ''); // Fix Path Traversal
    
    const deFiles = req.files['deFiles'] || [];
    const dapanFiles = req.files['dapanFiles'] || [];
    
    const questions = [];
    
    for (let deFile of deFiles) {
        let originalName = deFile.originalname.split('/').pop(); // Handle webkitRelativePath format
        let dapanFile = dapanFiles.find(f => f.originalname.split('/').pop() === originalName);
        
        // Copy deFile to images folder
        let newImgPath = path.join(imagesDir, `${subjectId}_${originalName}`);
        fs.copyFileSync(deFile.path, newImgPath);
        
        let correctIndex = 0;
        if(dapanFile) {
            // OCR
            const result = await Tesseract.recognize(dapanFile.path, 'eng');
            let text = result.data.text.trim().toUpperCase();
            if(text.includes('B')) correctIndex = 1;
            else if(text.includes('C')) correctIndex = 2;
            else if(text.includes('D')) correctIndex = 3;
        }
        
        questions.push({
            type: 'image',
            question_img: `images/${subjectId}_${originalName}`,
            definition: ['A', 'B', 'C', 'D'][correctIndex],
            options: ['A', 'B', 'C', 'D'],
            correctIndex: correctIndex
        });
    }
    
    // Lưu file js
    const jsContent = `window.studyData = window.studyData || {};\nwindow.studyData['${subjectId}'] = ${JSON.stringify(questions, null, 4)};\n`;
    fs.writeFileSync(path.join(dataDir, `${subjectId}.js`), jsContent, 'utf8');
    
    updateRegistry(subjectId, subjectName);
    await pushToGit();
    
    res.json({success: true, message: 'Đã tạo đề và push lên Github!'});
});

app.listen(3000, () => {
    console.log('Builder Tool running at http://localhost:3000');
    exec('start http://localhost:3000');
});