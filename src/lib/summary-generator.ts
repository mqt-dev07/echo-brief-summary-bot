
// Static sample summary generator
// In a real implementation, this would integrate with an AI service API
export const generateMeetingSummary = (transcript: string): string => {
  // For simplicity, this is a template-based approach
  // In a production app, this would make an API call to a real AI service
  
  // Check if transcript is empty or too short
  if (!transcript || transcript.trim().length < 10) {
    return ""; // Return empty string for empty input
  }
  
  // For demo purposes, we'll create a formatted summary based on the transcript length
  const words = transcript.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  // Generate a title based on the first few words
  const firstFewWords = words.slice(0, 5).join(" ");
  const title = `${firstFewWords}${firstFewWords.endsWith("...") ? "" : "..."}`;
  
  // Simulate finding key points based on transcript length
  const keyPoints = [
    "Discussed project timeline and milestones",
    "Reviewed budget constraints and resource allocation",
    "Explored new marketing strategies for Q3"
  ];
  
  // Simulate finding decisions
  const decisions = [
    "Approved budget increase of 15% for marketing",
    "Selected new project management tool for team collaboration"
  ];
  
  // Simulate finding action items
  const actionItems = [
    "Create detailed project timeline – Assigned to Sarah, due by Friday",
    "Research competitor pricing models – Assigned to Michael, due by next Wednesday"
  ];
  
  // Simulate finding open questions
  const openQuestions = [
    "How will the new regulatory changes affect our timeline?",
    "Should we bring on additional resources for the design phase?"
  ];
  
  // Generate the formatted summary
  return `
**Meeting Title:** ${title}

**Introduction:**  
This meeting focused on project planning and resource allocation for the upcoming quarter. Team members discussed various strategies and identified key milestones for successful delivery.

**Key Discussion Points:**
- ${keyPoints[0]}
- ${keyPoints[1]}
- ${keyPoints[2]}

**Decisions Made:**
- ${decisions[0]}
- ${decisions[1]}

**Action Items:**
- ${actionItems[0]}
- ${actionItems[1]}

**Open Questions / Unresolved Issues:**
- ${openQuestions[0]}
- ${openQuestions[1]}

**Meeting Tone:** Collaborative and Focused
`;
};
