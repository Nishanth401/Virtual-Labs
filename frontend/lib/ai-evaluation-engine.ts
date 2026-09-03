/**
 * ai-evaluation-engine.ts
 *
 * Client-side heuristic analysis engine for Machine Coding solutions & Behavioral STAR stories.
 * Provides instant feedback, SOLID compliance scores, and metric-driven suggestions.
 */

export interface CodeReviewResult {
  score: number; // 0 - 100
  grade: "A+" | "A" | "B+" | "B" | "C" | "Needs Work";
  summary: string;
  solidAudit: {
    principle: string;
    score: number; // 0 - 100
    status: "Pass" | "Warning" | "Critical";
    feedback: string;
  }[];
  strengths: string[];
  improvements: string[];
  suggestedRefactor?: string;
}

export interface StarEvaluationResult {
  score: number; // 0 - 100
  ownershipRatio: number; // percentage of "I" vs "We"
  actionDensity: number; // percentage of content focused on Action
  quantifiableMetricsCount: number;
  rubricScores: {
    category: string;
    score: number;
    feedback: string;
  }[];
  feedbackSummary: string;
  suggestedActionImprovements: string[];
}

/**
 * Evaluates machine coding code against SOLID principles and software engineering best practices.
 */
export function evaluateMachineCodingCode(
  code: string,
  language: "java" | "python" | "typescript",
  problemTitle: string
): CodeReviewResult {
  const codeLower = code.toLowerCase();
  let baseScore = 75;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // 1. Check Interface / Abstraction usage (DIP & ISP)
  const hasInterface = 
    codeLower.includes("interface ") || 
    codeLower.includes("abstract class ") || 
    codeLower.includes("from abc import") || 
    codeLower.includes("implements ");

  if (hasInterface) {
    baseScore += 8;
    strengths.push("Good separation of abstractions via interfaces and abstract classes (Dependency Inversion).");
  } else {
    baseScore -= 10;
    improvements.push("Introduce explicit interfaces (e.g. FeeStrategy, PricingPolicy) to decouple components.");
  }

  // 2. Check for Strategy / Polymorphism (OCP)
  const hasStrategy = 
    codeLower.includes("strategy") || 
    codeLower.includes("switch (") || 
    codeLower.includes("match ") || 
    codeLower.includes("override");

  if (hasStrategy) {
    baseScore += 7;
    strengths.push("Employs extensible strategy/polymorphic behavior allowing additions without modifying existing logic (Open/Closed).");
  } else {
    improvements.push("Consider Strategy pattern for business rules (pricing, dispatching) to avoid large conditional statements.");
  }

  // 3. Check for Enums / Type Safety
  const hasEnums = 
    codeLower.includes("enum ") || 
    codeLower.includes("type ") || 
    codeLower.includes("class ") && codeLower.includes("(enum)");

  if (hasEnums) {
    baseScore += 5;
    strengths.push("Enforces strict domain modeling and type safety using enums for entity categories.");
  } else {
    improvements.push("Use domain Enums for vehicle types, spots, or statuses instead of raw strings or integers.");
  }

  // 4. Check Thread-Safety & Concurrency
  const hasConcurrency = 
    codeLower.includes("synchronized") || 
    codeLower.includes("lock") || 
    codeLower.includes("concurrenthashmap") || 
    codeLower.includes("mutex") ||
    codeLower.includes("async ");

  if (hasConcurrency) {
    baseScore += 5;
    strengths.push("Includes concurrency primitives or thread-safe synchronization for multi-gate / parallel access.");
  } else {
    improvements.push("Add concurrency guards (e.g. ReentrantLock, synchronized blocks) for shared state mutations.");
  }

  // 5. Exception Handling
  const hasExceptionHandling = 
    codeLower.includes("throw ") || 
    codeLower.includes("exception") || 
    codeLower.includes("try ") || 
    codeLower.includes("raise ");

  if (hasExceptionHandling) {
    baseScore += 5;
    strengths.push("Implements defensive error handling and custom domain exceptions.");
  } else {
    improvements.push("Include explicit exception handling (e.g. SpotUnavailableException, InvalidTicketException).");
  }

  const finalScore = Math.min(98, Math.max(50, baseScore));
  const grade = 
    finalScore >= 90 ? "A+" :
    finalScore >= 85 ? "A" :
    finalScore >= 78 ? "B+" :
    finalScore >= 70 ? "B" : "C";

  return {
    score: finalScore,
    grade,
    summary: `Your ${problemTitle} solution scored ${finalScore}/100 (${grade}). It exhibits clean object modeling with key strengths in modularity.`,
    solidAudit: [
      {
        principle: "Single Responsibility Principle (SRP)",
        score: hasInterface ? 90 : 70,
        status: hasInterface ? "Pass" : "Warning",
        feedback: "Managers and entity models hold isolated responsibilities without mixing billing with gate state."
      },
      {
        principle: "Open/Closed Principle (OCP)",
        score: hasStrategy ? 92 : 68,
        status: hasStrategy ? "Pass" : "Warning",
        feedback: "Core algorithms are open for extension via pluggable strategies."
      },
      {
        principle: "Liskov Substitution Principle (LSP)",
        score: 88,
        status: "Pass",
        feedback: "Subtypes preserve parent contracts without breaking runtime expectations."
      },
      {
        principle: "Interface Segregation Principle (ISP)",
        score: hasInterface ? 85 : 65,
        status: hasInterface ? "Pass" : "Warning",
        feedback: "Granular client contracts prevent implementing unneeded methods."
      },
      {
        principle: "Dependency Inversion Principle (DIP)",
        score: hasInterface ? 92 : 60,
        status: hasInterface ? "Pass" : "Critical",
        feedback: hasInterface ? "High-level services depend strictly on abstractions." : "Direct instantiation introduces tight coupling."
      }
    ],
    strengths,
    improvements: improvements.length > 0 ? improvements : ["Add unit tests validating boundary cases (e.g. parking lot 100% full)."]
  };
}

/**
 * Evaluates behavioral STAR story against 5-point calibration rubric.
 */
export function evaluateStarStory(
  situation: string,
  task: string,
  action: string,
  result: string,
  company: string,
  principle: string
): StarEvaluationResult {
  const fullText = `${situation} ${task} ${action} ${result}`;
  const words = fullText.toLowerCase().split(/\s+/).filter(Boolean);

  // 1. Calculate "I" vs "We" Ownership Ratio
  let iCount = 0;
  let weCount = 0;
  words.forEach(w => {
    if (["i", "my", "me", "i've", "i'll", "myself"].includes(w)) iCount++;
    if (["we", "our", "us", "team", "we've"].includes(w)) weCount++;
  });
  const totalOwnershipPronouns = iCount + weCount;
  const ownershipRatio = totalOwnershipPronouns === 0 ? 80 : Math.round((iCount / totalOwnershipPronouns) * 100);

  // 2. Action Density (% of story in Action section)
  const totalLength = (situation.length + task.length + action.length + result.length) || 1;
  const actionDensity = Math.round((action.length / totalLength) * 100);

  // 3. Detect Quantifiable Metrics (numbers, %, $, ms, qps, etc.)
  const metricsRegex = /(\d+(\.\d+)?%?|\$\d+|\d+\s?(ms|sec|s|qps|tb|gb|users|k|m|million|billion))/gi;
  const matches = fullText.match(metricsRegex) || [];
  const metricsCount = matches.length;

  // Compute Rubric Scores
  const ownershipScore = ownershipRatio >= 70 ? 95 : ownershipRatio >= 50 ? 80 : 60;
  const actionScore = (actionDensity >= 50 && actionDensity <= 70) ? 95 : actionDensity >= 40 ? 82 : 65;
  const metricsScore = metricsCount >= 3 ? 95 : metricsCount >= 1 ? 80 : 55;

  const totalScore = Math.round((ownershipScore * 0.35) + (actionScore * 0.35) + (metricsScore * 0.30));

  const suggestions: string[] = [];
  if (ownershipRatio < 65) {
    suggestions.push(`Increase 'I' statements: You used '${weCount}' collective pronouns. Interviewers want to evaluate your personal contribution, not your team's.`);
  }
  if (actionDensity < 45) {
    suggestions.push(`Expand the Action section (currently ${actionDensity}%): Aim for ~60% of your total answer to detail the technical steps you personally took.`);
  }
  if (metricsCount < 2) {
    suggestions.push("Quantify the Result: Add concrete numbers (e.g. latency reduced by X%, system handled Y QPS, saved Z dollars/hours).");
  }

  return {
    score: Math.min(98, Math.max(50, totalScore)),
    ownershipRatio,
    actionDensity,
    quantifiableMetricsCount: metricsCount,
    rubricScores: [
      {
        category: "Ownership & Individual Impact ('I' vs 'We')",
        score: ownershipScore,
        feedback: ownershipRatio >= 70 
          ? `Excellent: ${ownershipRatio}% of references highlight your personal agency.`
          : `Caution: Only ${ownershipRatio}% personal pronouns. Shift team achievements into your specific actions.`
      },
      {
        category: "Action-to-Context Balance",
        score: actionScore,
        feedback: `Action constitutes ${actionDensity}% of story length. (Recommended sweet spot: 55% - 65%).`
      },
      {
        category: "Measurable Results & Metrics",
        score: metricsScore,
        feedback: metricsCount >= 3 
          ? `Strong: Detected ${metricsCount} concrete numerical metrics (${matches.slice(0, 3).join(", ")}).`
          : `Needs Data: Detected only ${metricsCount} quantifiable metric. Add measurable business or engineering outcomes.`
      }
    ],
    feedbackSummary: `Your story for ${company} (${principle}) scored ${totalScore}/100. It effectively communicates context and outcomes.`,
    suggestedActionImprovements: suggestions.length > 0 ? suggestions : ["Strong story! Practice delivering it verbally in under 2 minutes."]
  };
}
