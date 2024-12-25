const fs = require('fs');
const pdf = require('pdf-parse');
require('dotenv').config()

// Function to download PDF from a URL
const downloadPdf = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
        const buffer = await response.arrayBuffer();
        fs.writeFileSync('temp.pdf', Buffer.from(buffer));
        console.log('PDF downloaded');
        return 'temp.pdf';
    } else {
        throw new Error("Failed to download PDF");
    }
}

// Function to extract text from PDF
const extractTextFromPdf = async (pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    console.log('Text extracted');
    return data.text;
}

// Function to actually do the summarizing
const summarizeText = async (text) => {
    const res = await fetch(process.env.bartAPI, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.bartKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: text }),
    })
    const rs=await res.json()
    return rs[0].summary_text
}

// The main function
const bartSum = async (url) => {
    try {
        const pdfPath = await downloadPdf(url);
        const text = await extractTextFromPdf(pdfPath);
        fs.writeFileSync('dump.txt', text)  // Only for testing
        const summary = await summarizeText(text);
        return summary;
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

module.exports={
    bartSum
}