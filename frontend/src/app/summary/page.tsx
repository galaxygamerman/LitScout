'use client'
import PaperCard from "@/components/PaperCard";
import { useEffect,useState } from "react";
import LoadingScreen from "./loading"
var papers = [
    {
      id: 1,
      title: "Quantum Computing: A New Era of Computational Power",
      summary:
        "This groundbreaking research explores the potential of quantum computing in solving complex mathematical problems. The study demonstrates a 100x improvement in processing speed for specific algorithms compared to classical computers. It also highlights the challenges of building stable qubits and discusses possible solutions.",
      pdfUrl: "#",
      date: "2024-12-15",
      source: "Nature Physics",
    },
    {
      id: 2,
      title: "Neural Networks in Climate Prediction",
      summary:
        "A comprehensive analysis of deep learning applications in climate modeling. This study illustrates how neural networks can improve weather prediction accuracy by up to 45% compared to traditional methods. It also examines the integration of big data to model long-term climate trends with unprecedented precision.",
      pdfUrl: "#",
      date: "2024-11-22",
      source: "Science Advances",
    },
    {
      id: 3,
      title: "Sustainable Energy Storage Solutions",
      summary:
        "This paper presents a novel approach to energy storage using organic compounds. The study finds that this method could potentially reduce battery production costs by 60% while increasing energy capacity by 40%. Insights into its scalability and environmental impact are also discussed.",
      pdfUrl: "#",
      date: "2024-10-05",
      source: "Energy & Environmental Science",
    },
    {
      id: 4,
      title: "Artificial Intelligence in Medical Diagnosis",
      summary:
        "Exploring the application of AI in healthcare, this paper demonstrates how machine learning models can detect diseases such as cancer with an accuracy of over 90%. The study also investigates ethical considerations and the need for explainable AI in clinical decision-making.",
      pdfUrl: "#",
      date: "2024-09-30",
      source: "The Lancet",
    },
    {
      id: 5,
      title: "Advancements in Autonomous Vehicles",
      summary:
        "This research focuses on recent developments in self-driving technology. The study highlights improvements in LiDAR systems and real-time data processing, which have reduced accident rates by 35%. It also addresses regulatory challenges and public acceptance of autonomous vehicles.",
      pdfUrl: "#",
      date: "2024-08-12",
      source: "IEEE Transactions on Intelligent Vehicles",
    },
    {
      id: 6,
      title: "CRISPR: Revolutionizing Genetic Engineering",
      summary:
        "An in-depth examination of CRISPR technology and its potential to treat genetic disorders. The paper delves into case studies where CRISPR has been used successfully in gene therapy and discusses ethical concerns and possible off-target effects.",
      pdfUrl: "#",
      date: "2024-07-18",
      source: "Cell Stem Cell",
    },
    {
      id: 7,
      title: "The Role of Blockchain in Supply Chain Management",
      summary:
        "This study explores how blockchain technology enhances transparency and efficiency in supply chain systems. The findings reveal a 25% reduction in fraud and a significant improvement in tracking product origins, benefiting both businesses and consumers.",
      pdfUrl: "#",
      date: "2024-06-25",
      source: "Journal of Supply Chain Management",
    },
  ];
export default function SummaryPage() {
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const getPapers = async () => {
        try {
          const key = new URLSearchParams(window.location.search).get('key');
           console.log("You are viewing: "+key)
           const res= await fetch(`${process.env.NEXT_PUBLIC_BHOST}/scout/`,{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              key: key,
              max_res: 5
            })
           })
           const rj = await res.json()
           if(rj.success){
            setLoading(false)
            papers=rj.res

           }
           console.log(rj)
        } catch (error) {
            
    }
  }
    getPapers(); 
  
  }, []);
  if(loading) return <LoadingScreen/>
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-7xl px-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Summarized Research Papers
        </h1>
        <div className="space-y-6">
          {papers.map((paper) => (
             <PaperCard
             key={paper.id}
             title={paper.title}
             summary={paper.summary}
             pdfUrl={paper.pdfUrl}
             date={paper.date}
             source={paper.source}
           />
          ))}
        </div>
      </div>
    </main>
  );
}
