const mammoth = require("mammoth");

mammoth.extractRawText({path: "../DIC201.docx"})
    .then(function(result){
        const text = result.value; 
        console.log(text.substring(0, 2000));
    })
    .catch(function(err){
        console.log("Error:", err);
    });
