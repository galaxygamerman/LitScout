import PaperCard from "@/components/PaperCard";

const dummyResearchData = [
  {
    id: 1,
    title: "Quantum Computing: A New Era of Computational Power",
    summary:
      "This groundbreaking research explores the potential of quantum computing in solving complex mathematical problems. The study demonstrates a 100x improvement in processing speed for specific algorithms compared to classical computers. It also highlights the challenges of building stable qubits and discusses possible solutions.",
    pdfUrl: "#",
  },
  {
    id: 2,
    title: "Neural Networks in Climate Prediction",
    summary:
      "A comprehensive analysis of deep learning applications in climate modeling. This study illustrates how neural networks can improve weather prediction accuracy by up to 45% compared to traditional methods. It also examines the integration of big data to model long-term climate trends with unprecedented precision.",
    pdfUrl: "#",
  },
  {
    id: 3,
    title: "Sustainable Energy Storage Solutions",
    summary:
      "This paper presents a novel approach to energy storage using organic compounds. The study finds that this method could potentially reduce battery production costs by 60% while increasing energy capacity by 40%. Insights into its scalability and environmental impact are also discussed.",
    pdfUrl: "#",
  },
  {
    id: 4,
    title: "Artificial Intelligence in Medical Diagnosis",
    summary:
      "Exploring the application of AI in healthcare, this paper demonstrates how machine learning models can detect diseases such as cancer with an accuracy of over 90%. The study also investigates ethical considerations and the need for explainable AI in clinical decision-making.",
    pdfUrl: "#",
  },
  {
    id: 5,
    title: "Advancements in Autonomous Vehicles",
    summary:
      "This research focuses on recent developments in self-driving technology. The study highlights improvements in LiDAR systems and real-time data processing, which have reduced accident rates by 35%. It also addresses regulatory challenges and public acceptance of autonomous vehicles.",
    pdfUrl: "#",
  },
  {
    id: 6,
    title: "CRISPR: Revolutionizing Genetic Engineering",
    summary:
      "An in-depth examination of CRISPR technology and its potential to treat genetic disorders. The paper delves into case studies where CRISPR has been used successfully in gene therapy and discusses ethical concerns and possible off-target effects.",
    pdfUrl: "#",
  },
  {
    id: 7,
    title: "The Role of Blockchain in Supply Chain Management",
    summary:
      "This study explores how blockchain technology enhances transparency and efficiency in supply chain systems. The findings reveal a 25% reduction in fraud and a significant improvement in tracking product origins, benefiting both businesses and consumers.",
    pdfUrl: "#",
  },
  {
    id: 8,
    title: "The Future of Renewable Energy Technologies",
    summary:
      "This paper investigates cutting-edge advancements in renewable energy, such as perovskite solar cells and offshore wind farms. The study highlights how these technologies can meet increasing energy demands while significantly reducing carbon footprints.",
    pdfUrl: "#",
  },
];

export default function SummaryPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-7xl px-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Summarized Research Papers
        </h1>
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
