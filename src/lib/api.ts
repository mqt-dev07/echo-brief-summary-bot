
import { generateMeetingSummary } from "./summary-generator";

/**
 * Generate a summary from a meeting transcript
 * In a real app, this would be an API call to a backend service
 */
export const generateSummary = async (transcript: string): Promise<string> => {
  // Simulate network delay for a more realistic API call experience
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Generate the summary using the local implementation
  // In a production environment, this would be an API call to a backend service
  try {
    return generateMeetingSummary(transcript);
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  }
};
