
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { generateMeetingSummary } from "@/lib/summary-generator";
import SummaryDisplay from "./SummaryDisplay";
import { PlayIcon, FileTextIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaceholderText from "./PlaceholderText";

const SummaryGenerator: React.FC = () => {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const placeholderText = PlaceholderText();

  const handleGenerateSummary = () => {
    if (!transcript.trim()) {
      toast({
        title: "Empty transcript",
        description: "Please enter a meeting transcript to generate a summary.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const generatedSummary = generateMeetingSummary(transcript);
        setSummary(generatedSummary);
        toast({
          title: "Summary generated",
          description: "Your meeting summary has been created successfully.",
        });
      } catch (error) {
        toast({
          title: "Error generating summary",
          description: "There was a problem generating your summary. Please try again.",
          variant: "destructive",
        });
        console.error("Error generating summary:", error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleLoadExample = () => {
    setTranscript(placeholderText);
  };

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Meeting Transcript</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLoadExample}
                  className="text-xs h-8"
                >
                  <FileTextIcon className="h-4 w-4 mr-1" />
                  Load Example
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your meeting transcript here..."
                className="min-h-[400px] resize-none"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                disabled={isLoading}
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerateSummary}
                className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    </span>
                    Generating...
                  </div>
                ) : (
                  <>
                    <PlayIcon className="h-4 w-4 mr-2" /> Generate Summary
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <SummaryDisplay summary={summary} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SummaryGenerator;
