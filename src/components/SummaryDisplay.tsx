
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CopyButton from "./CopyButton";
import ReactMarkdown from "react-markdown";

interface SummaryDisplayProps {
  summary: string;
  isLoading: boolean;
}

const SummaryDisplay = ({ summary, isLoading }: SummaryDisplayProps) => {
  const [displayedSummary, setDisplayedSummary] = useState("");

  useEffect(() => {
    if (isLoading) {
      setDisplayedSummary("");
    } else if (summary) {
      setDisplayedSummary(summary);
    }
  }, [summary, isLoading]);

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-medium">Meeting Summary</CardTitle>
        {displayedSummary && <CopyButton text={displayedSummary} />}
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="w-3/4 h-6 mb-2" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
            <Skeleton className="w-2/3 h-6 mt-4" />
            <Skeleton className="w-11/12 h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        ) : displayedSummary ? (
          <div className="prose max-w-none summary-content">
            <ReactMarkdown>{displayedSummary}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-center px-4">
            <p>Your meeting summary will appear here after you submit a transcript.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryDisplay;
