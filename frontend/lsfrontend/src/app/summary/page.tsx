import PaperCard from "@/components/PaperCard";

const dummyResearchData = [
  {
    id: 1,
    title: "Quantum Computing: A New Era of Computational Power",
    summary: "This groundbreaking research explores the potential of quantum computing in solving complex mathematical problems. The study demonstrates a 100x improvement in processing speed for specific algorithms compared to classical computers.",
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Neural Networks in Climate Prediction",
    summary: "A comprehensive analysis of deep learning applications in climate modeling, showing how neural networks can improve weather prediction accuracy by up to 45% compared to traditional methods.",
    pdfUrl: "#"
  },
  {
    id: 3,
    title: "Sustainable Energy Storage Solutions",
    summary: "This paper presents a novel approach to energy storage using organic compounds, potentially reducing battery production costs by 60% while increasing capacity by 40%.",
    pdfUrl: "#"
  },
  {
    id: 4,
    title: "Artificial Intelligence in Medical Diagnosis",
    summary: "An innovative study showing how AI-powered diagnostic tools achieved a 95% accuracy rate in early cancer detection, potentially revolutionizing preventive healthcare.",
    pdfUrl: "#"
  },
  {
    id: 5,
    title: "Blockchain Technology in Supply Chain Management",
    summary: "Research demonstrating how blockchain implementation reduced supply chain inefficiencies by 75% and improved traceability in pharmaceutical distribution.",
    pdfUrl: "#"
  },
  {
    id: 6,
    title: "Advanced Materials for Space Exploration",
    summary: "A detailed analysis of new composite materials that can withstand extreme space conditions while reducing spacecraft weight by 30%.",
    pdfUrl: "#"
  },
  {
    id: 7,
    title: "Machine Learning in Financial Markets",
    summary: "This study reveals how machine learning algorithms predicted market trends with 85% accuracy, offering new insights into automated trading strategies.",
    pdfUrl: "#"
  },
  {
    id: 8,
    title: "Renewable Energy Integration",
    summary: "A comprehensive study on integrating renewable energy sources into existing power grids, showing a 50% reduction in integration costs through smart grid technologies.",
    pdfUrl: "#"
  },
  {
    id: 9,
    title: "Cybersecurity in IoT Devices",
    summary: "Research highlighting new encryption methods that reduced security vulnerabilities in IoT devices by 80% while maintaining performance.",
    pdfUrl: "#"
  },
  {
    id: 10,
    title: "Biotechnology in Agriculture",
    summary: "An analysis of CRISPR gene editing applications in agriculture, demonstrating a 200% increase in crop yield while reducing pesticide use.",
    pdfUrl: "#"
  }
];

export default function SummaryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FF] flex flex-col items-center justify-center px-4 py-4">
      <div className="text-center w-full max-w-3xl mx-auto">
        <h1 className="text-[#2563EB] text-4xl font-bold mb-3">Research Paper Summaries</h1>
        <div className="space-y-6">
          {dummyResearchData.map((paper) => (
            <PaperCard
              key={paper.id}
              title={paper.title}
              summary={paper.summary}
              pdfUrl={paper.pdfUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
