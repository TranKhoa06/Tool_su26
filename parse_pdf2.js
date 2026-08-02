const fs = require('fs');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    let text = pdfParser.getRawTextContent();
    const questions = [];

    // Tách theo mẫu "Số. Chữ cái hoa"
    const blocks = text.split(/\n(?=\d+\.\s+[A-Z])/);
    
    for (let block of blocks) {
        block = block.trim();
        if (!block) continue;
        
        // Tìm câu hỏi (từ đầu cho tới "(a)" hoặc tương tự)
        const questionMatch = block.match(/^(?:\d+\.\s+)?(.*?)(?=\n\s*\([a-z]\))/is);
        if (!questionMatch) continue;
        const questionText = questionMatch[1].replace(/\n/g, ' ').replace(/\r/g, '').trim();

        const options = [];
        // Lấy tất cả các (a), (b), (c)...
        let optRegex = /\n\s*\(([a-z])\)\s+(.*?)(?=\n\s*\([a-z]\)|\n\s*Đáp án|Đáp án|$)/gis;
        let match;
        while ((match = optRegex.exec(block)) !== null) {
            options.push(`(${match[1]}) ${match[2].replace(/\n/g, ' ').replace(/\r/g, '').trim()}`);
        }

        if (options.length === 0) continue;

        // Tìm đáp án
        const answerMatch = block.match(/Đáp án đúng là\s+([A-Za-z])(?::|)\s*(.*?)(?=\n\d+\.|\n\n|$)/is);
        let answerIndex = -1;
        let definition = "";
        
        if (answerMatch) {
            const letter = answerMatch[1].toLowerCase();
            answerIndex = letter.charCodeAt(0) - 97;
            definition = answerMatch[0].replace(/\n/g, ' ').replace(/\r/g, '').trim();
        } else {
             const answerMatch2 = block.match(/Đáp án đúng là\s*\(([a-z])\)\s*(.*?)(?=\n\d+\.|\n\n|$)/is);
             if (answerMatch2) {
                 const letter = answerMatch2[1].toLowerCase();
                 answerIndex = letter.charCodeAt(0) - 97;
                 definition = answerMatch2[0].replace(/\n/g, ' ').replace(/\r/g, '').trim();
             } else {
                 definition = "Không tìm thấy đáp án.";
             }
        }
        
        if(answerIndex >= options.length || answerIndex < 0) {
            answerIndex = 0;
        }

        questions.push({
            term: questionText,
            options: options,
            answerIndex: answerIndex,
            definition: definition
        });
    }

    const output = `const quizData = ${JSON.stringify(questions, null, 4)};`;
    fs.writeFileSync('data.js', output, 'utf8');
    console.log(`Parsed ${questions.length} questions successfully!`);
});

pdfParser.loadPDF("../tai_lieu_dic201.pdf");
