const fs = require('fs');
const pdfParse = require('pdf-parse');

const dataBuffer = fs.readFileSync('../tai_lieu_dic201.pdf');
const pdf = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;

pdf(dataBuffer).then(function(data) {
    const text = data.text;
    const questions = [];

    const blocks = text.split(/\n(?=\d+\.\s+[A-Z])/);
    
    for (let block of blocks) {
        block = block.trim();
        if (!block) continue;
        
        const questionMatch = block.match(/^(?:\d+\.\s+)?(.*?)(?=\n\s*\([a-z]\))/s);
        if (!questionMatch) continue;
        const questionText = questionMatch[1].replace(/\n/g, ' ').trim();

        const options = [];
        let optRegex = /\n\s*\(([a-z])\)\s+(.*?)(?=\n\s*\([a-z]\)|\n\s*Đáp án|Đáp án|$)/gs;
        let match;
        while ((match = optRegex.exec(block)) !== null) {
            options.push(`(${match[1]}) ${match[2].replace(/\n/g, ' ').trim()}`);
        }

        if (options.length === 0) continue;

        const answerMatch = block.match(/Đáp án đúng là\s+([A-Za-z])(?::|)\s*(.*?)(?=\n\d+\.|\n\n|$)/is);
        let answerIndex = -1;
        let definition = "";
        
        if (answerMatch) {
            const letter = answerMatch[1].toLowerCase();
            answerIndex = letter.charCodeAt(0) - 97;
            definition = answerMatch[0].replace(/\n/g, ' ').trim();
        } else {
             const answerMatch2 = block.match(/Đáp án đúng là\s*\(([a-z])\)\s*(.*?)(?=\n\d+\.|\n\n|$)/is);
             if (answerMatch2) {
                 const letter = answerMatch2[1].toLowerCase();
                 answerIndex = letter.charCodeAt(0) - 97;
                 definition = answerMatch2[0].replace(/\n/g, ' ').trim();
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
}).catch(err => {
    console.error("Error parsing PDF:", err);
});
