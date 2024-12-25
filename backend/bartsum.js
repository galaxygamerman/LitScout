const fs = require('fs');
const pdf = require('pdf-parse');
require('dotenv').config()

// Function to download PDF from a URL
const downloadPdf = async (url) => {
    const response = await fetch(url);
    if (response.ok) {
        const buffer = await response.arrayBuffer();
        const fpath='temp/temp.pdf'
        fs.writeFileSync(fpath, Buffer.from(buffer));
        console.log('PDF downloaded');
        return fpath;
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
const findabs=(text)=>{
    var ap=text.search('Abstract')
    if(ap==-1){text.search('abstract');console.log("FOUND")} 
    if(ap==-1){text.search('Introduction');console.log("FOUND")}
    if(ap==-1){text.search('introduction');console.log("FOUND")}
    return (ap==-1)? 300:ap;
}
const summarizeText = async (text) => {
    const pos=findabs(text)
    const res = await fetch(process.env.bartAPI, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.bartKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: text.substring(pos,pos+200).replace("\n"," ") }),
    })
    const rs=await res.json()
    console.log(rs)
    return rs[0].summary_text
}

const bartSum = async (url) => {
    try {
        const pdfPath = await downloadPdf(url);
        const text = await extractTextFromPdf(pdfPath);
        fs.writeFileSync('temp/dump.txt', text)  // Only for testing
        const summary = await summarizeText(text);
        return summary;
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

module.exports={
    bartSum,summarizeText
}