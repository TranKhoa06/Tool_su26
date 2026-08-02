const fs = require('fs');
const mammoth = require('mammoth');

mammoth.extractRawText({path: "../mcp201-study-app/MCQ_Quiz_Chapters_06_to_10_100_Questions_With_Vietnamese_Explanations (1).docx"})
    .then(function(result){
        const rawText = result.value;
        const questions = [];

        // Split by newlines followed by number and dot, e.g., "\n1. " or "\n1.\n"
        const blocks = rawText.split(/\n+(?=\d+\.\s+)/);
        
        for (let i = 1; i < blocks.length; i++) {
            let block = blocks[i].trim();
            if (!block) continue;
            
            // questionMatch
            const questionMatch = block.match(/^(?:\d+\.\s+)?(.*?)(?=\n+\s*[A-D]\.)/is);
            if (!questionMatch) continue;
            const questionText = questionMatch[1].replace(/\n+/g, ' ').trim();

            const options = [];
            // Regex to find A. text, B. text, etc.
            let optRegex = /\n+\s*([A-D])\.\s+(.*?)(?=\n+\s*[A-D]\.|\n+\s*Answer:|\n+\s*Đáp án:|$)/gis;
            let match;
            let lastMatchIndex = 0;
            while ((match = optRegex.exec(block)) !== null) {
                options.push(`(${match[1].toLowerCase()}) ${match[2].replace(/\n+/g, ' ').trim()}`);
                lastMatchIndex = optRegex.lastIndex;
            }

            if (options.length === 0) continue;

            let remainingText = block.substring(lastMatchIndex).trim();
            
            let definition = remainingText.replace(/\n+/g, ' ').trim();
            let answerIndex = 0;
            
            const ansMatch = definition.match(/(?:Answer:|Đáp án:)\s*([A-D])/is);
            if (ansMatch) {
                answerIndex = ansMatch[1].toLowerCase().charCodeAt(0) - 97;
            }

            if (answerIndex >= options.length || answerIndex < 0) {
                answerIndex = 0;
            }

            questions.push({
                term: questionText,
                options: options,
                answerIndex: answerIndex,
                definition: definition || options[answerIndex]
            });
        }

        const output = `window.studyData = window.studyData || {};\nwindow.studyData.mcp201 = ${JSON.stringify(questions, null, 4)};`;
        fs.writeFileSync('data/mcp201.js', output, 'utf8');
        console.log(`Parsed ${questions.length} questions successfully for mcp201!`);
    })
    .catch(function(err){
        console.error("Error parsing docx:", err);
    });
