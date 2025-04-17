
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SummaryGenerator from "@/components/SummaryGenerator";
import { InfoCircle } from "@/components/InfoCircle";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Echo Brief</h1>
              <p className="text-sm text-gray-500 mt-1">
                Transform meeting transcripts into professional summaries
              </p>
            </div>
            <InfoCircle />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Tabs defaultValue="summarize" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-1 mb-8">
            <TabsTrigger value="summarize" className="text-lg py-2">
              Meeting Summarizer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="summarize">
            <SummaryGenerator />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Echo Brief - Meeting Summary Generator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
