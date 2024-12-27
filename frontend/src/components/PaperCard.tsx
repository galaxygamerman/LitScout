"use client";

import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";

interface PaperCardProps {
  title: string;
  summary: string;
  pdfUrl: string;
  date: string;
  source: string;
}

export default function PaperCard({ title, summary, pdfUrl, date, source }: PaperCardProps) {
  return (
    <Card className="w-full max-w-full mx-auto bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
        <div className="flex-1">
          <CardHeader className="p-0 mb-2">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {title}
              </CardTitle>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span className="text-gray-400">{date}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{source}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-base text-gray-600">{summary}</p>
          </CardContent>
        </div>
        <div>
          <button
            onClick={() => window.open(pdfUrl, "_blank")}
            className="flex items-center gap-2 px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>
    </Card>
  );
}