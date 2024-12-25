"use client";
import { Download } from "lucide-react";
import { Button } from "@/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/Card";

interface PaperCardProps {
  title: string;
  summary: string;
  pdfUrl: string;
}

export default function PaperCard({ title, summary, pdfUrl }: PaperCardProps) {
  return (
    <Card className="w-full bg-gray-50 border border-gray-200 hover:border-[#3366FF] hover:shadow-md transition-all duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
        <div className="flex-1">
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-semibold text-gray-900 hover:text-[#3366FF] transition-colors">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-2">
            <p className="text-gray-600 leading-relaxed">{summary}</p>
          </CardContent>
        </div>
        <div className="flex-shrink-0">
          <Button 
            variant="outline"
            className="w-full md:w-auto flex items-center gap-2 border-[#3366FF] text-[#3366FF] hover:bg-[#3366FF] hover:text-white transition-colors duration-200 font-medium"
            onClick={() => window.open(pdfUrl, '_blank')}
          >
            <Download size={16} className="transform group-hover:scale-110 transition-transform duration-200" />
            Download PDF
          </Button>
        </div>
      </div>
    </Card>
  );
}
