const mammoth = require("mammoth");

mammoth.extractRawText({path: "../DIC201.docx"})
    .then(function(result){
        const text = result.value; 
        const matches = text.match(/\n\s*\d+\.\s*\n/g);
        console.log("Found", matches ? matches.length : 0, "matches for questions.");
        // Write the full text to a file so we can analyze it
        require('fs').writeFileSync('full_text.txt', text, 'utf8');
    })
    .catch(function(err){
        console.log("Error:", err);
    });
