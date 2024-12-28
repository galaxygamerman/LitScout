'use client'
import PaperCard from "@/components/PaperCard";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading"
import { useRouter } from "next/navigation";

interface Paper {
  id: number;
  title: string;
  summary: string;
  pdfUrl: string;
  date: string;
  source: string;
}

interface ApiResponse {
  success: boolean;
  res: Paper[];
}

interface RegistrationResponse {
  success: boolean;
}

export default function SummaryPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkReg = async (): Promise<void> => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BHOST}/check_reg`, {
          credentials: "include"
        });
        const rd = await res.json() as RegistrationResponse;
        
        if (rd.success) {
          setLoad(false);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Registration check failed:', error);
        router.push('/login');
      }
    };

    const getPapers = async (): Promise<void> => {
      try {
        const key = new URLSearchParams(window.location.search).get('key');
        console.log("You are viewing:", key);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BHOST}/scout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: key,
            max_res: 5
          })
        });
        
        const rj = await res.json() as ApiResponse;
        
        if (rj.success) {
          setLoading(false);
          setPapers(rj.res);
        }
      } catch (error) {
        console.error('Failed to fetch papers:', error);
        setLoading(false);
      }
    };

    void checkReg();
    void getPapers();
  }, [router]);

  const handleSort = (): void => {
    setPapers(prevPapers => {
      const sortedPapers = [...prevPapers].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return sortedPapers;
    });
  };

  if (load) return null;
  if (loading) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-7xl px-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Summarized Research Papers
        </h1>
        <div>
          <button 
            id="sortbtn" 
            onClick={handleSort}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-8 mb-8"
          >
            Sort Now
          </button>
        </div>
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