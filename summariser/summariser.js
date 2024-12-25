// Import required libraries
const fs = require('fs');
const pdf = require('pdf-parse');

// Function to download PDF from a URL
async function downloadPdf(url) {
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
async function extractTextFromPdf(pdfPath) {
	const dataBuffer = fs.readFileSync(pdfPath);
	const data = await pdf(dataBuffer);
	console.log('Text extracted');
	return data.text;
}

// Function to summarize text (placeholder for actual summarization logic)
async function summarizeText(text) {
	// Placeholder for summarization logic
	// Input the call to your NLP API here Pratheek
	console.log('Summary generated (placeholder)');
	return text.substring(0, 150); // Example: return first 150 characters as a summary
}

// Example usage
(async () => {
	// Get the PDF link from command line arguments
	const pdfLink = process.argv[2];
	// const pdfLink = "http://arxiv.org/pdf/1511.00423v2"	// Only during testing

	if (!pdfLink) {
		console.error("Your command is supposed to be"
			+ "\n\t'node summariser.js https:example.org/path/to/pdf'");
		process.exit(1);
	}

	try {
		const pdfPath = await downloadPdf(pdfLink);
		const text = await extractTextFromPdf(pdfPath);
		fs.writeFileSync('dump.txt', text)	// Only for testing
		const summary = await summarizeText(text);
		console.log("Summarized Text:");
		console.log(summary);
	} catch (error) {
		console.error(`An error occurred: ${error.message}`);
	}
})();