const fs = require('fs');
const mammoth = require('mammoth');

mammoth.extractRawText({path: "../DIC201.docx"})
    .then(function(result){
        const rawText = result.value;
        const questions = [];

        let text = rawText.replace(/\d+\s*\/\s*\d+DIC201-FE/g, '');
        text = text.replace(/Hoc trực tuyến tại https:\/\/quizlet\.com\/_ib7vu0/g, '');
        
        // Split by newlines followed by number and dot, e.g., "\n1. " or "\n1.\n"
        const blocks = text.split(/\n+(?=\d+\.\s+)/);
        
        // Block 0 is usually preamble
        for (let i = 1; i < blocks.length; i++) {
            let block = blocks[i].trim();
            if (!block) continue;
            
            // questionMatch: matches "12. A CPLD is a"
            const questionMatch = block.match(/^(?:\d+\.\s+)?(.*?)(?=\n+\s*\([a-z]\))/is);
            if (!questionMatch) continue;
            const questionText = questionMatch[1].replace(/\n+/g, ' ').trim();

            const options = [];
            let optRegex = /\n+\s*\(([a-z])\)\s+(.*?)(?=\n+\s*\([a-z]\)|\n+\s*Đáp án|Đáp án|$)/gis;
            let match;
            let lastMatchIndex = 0;
            while ((match = optRegex.exec(block)) !== null) {
                options.push(`(${match[1]}) ${match[2].replace(/\n+/g, ' ').trim()}`);
                lastMatchIndex = optRegex.lastIndex;
            }

            if (options.length === 0) continue;

            let remainingText = block.substring(lastMatchIndex).trim();
            
            let definition = remainingText.replace(/\n+/g, ' ').trim();
            let answerIndex = 0;
            
            const ansMatch = definition.match(/(?:Đáp án đúng là\s+)?([A-Za-z])(?::|\s)(.*)/is);
            const ansMatch2 = definition.match(/(?:Đáp án đúng là\s*)?\(([a-z])\)\s*(.*)/is);
            
            if (ansMatch2) {
                const letter = ansMatch2[1].toLowerCase();
                answerIndex = letter.charCodeAt(0) - 97;
            } else if (ansMatch) {
                if (ansMatch[1].length === 1 && ansMatch[1].match(/[A-Fa-f]/)) {
                    const letter = ansMatch[1].toLowerCase();
                    answerIndex = letter.charCodeAt(0) - 97;
                }
            } else {
                const embeddedMatch = definition.match(/\(([a-d])\)/i);
                if (embeddedMatch) {
                    answerIndex = embeddedMatch[1].toLowerCase().charCodeAt(0) - 97;
                }
            }

            if (answerIndex >= options.length || answerIndex < 0) {
                answerIndex = 0;
            }

            questions.push({
                term: questionText,
                options: options,
                answerIndex: answerIndex,
                definition: definition || options[answerIndex] || "No explanation provided."
            });
        }

        const output = `const quizData = ${JSON.stringify(questions, null, 4)};`;
        fs.writeFileSync('data.js', output, 'utf8');
        console.log(`Parsed ${questions.length} questions successfully!`);
    })
    .catch(function(err){
        console.error("Error parsing docx:", err);
    });
