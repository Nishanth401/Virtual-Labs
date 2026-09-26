export interface MaterialContent {
  id: string;
  title: string;
  subject: string;
  provider: string; // e.g. "GeeksforGeeks Reference" | "W3Schools Reference" | "Academic Curriculum"
  source?: string;
  subtitle?: string;
  category: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  simulatorUrl?: string;
  simulatorName?: string;
  overview: string;
  learningObjectives: string[];
  tags?: string[];
  keyConcepts: {
    title: string;
    description: string;
    points?: string[];
  }[];
  algorithmSteps?: {
    step: number;
    title: string;
    description: string;
  }[];
  codeSnippets: {
    java?: string;
    python?: string;
    cpp?: string;
    c?: string;
    sql?: string;
    bash?: string;
    javascript?: string;
  };
  complexityAnalysis: {
    timeComplexity: string;
    spaceComplexity: string;
    bestCase?: string;
    averageCase?: string;
    worstCase?: string;
    notes?: string;
  };
  vivaQuestions: {
    question: string;
    answer: string;
    category?: string;
  }[];
  realWorldApplications: string[];
  practiceProblems: {
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    description: string;
  }[];
}
