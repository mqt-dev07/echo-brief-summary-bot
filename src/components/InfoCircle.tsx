
import React from "react";
import {
  HelpCircleIcon,
  GithubIcon,
  FileTextIcon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const InfoCircle = () => {
  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://github.com/yourusername/meeting-summarizer"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <GithubIcon className="h-5 w-5 text-gray-500" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>View source on GitHub</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FileTextIcon className="h-5 w-5 text-gray-500" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Documentation</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HelpCircleIcon className="h-5 w-5 text-gray-500" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Help &amp; Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
