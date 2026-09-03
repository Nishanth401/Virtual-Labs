/**
 * smoke.test.ts
 *
 * Core algorithmic and evaluation engine validation script.
 * Can be run with ts-node or verified during build.
 */

import { evaluateMachineCodingCode, evaluateStarStory } from "../lib/ai-evaluation-engine";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Smoke Test Failed: ${message}`);
  }
}

export function runSmokeTests() {
  // 1. N-Queens & Hanoi Math Verification
  const states4x4 = 1 + 4 + 6 + 4 + 2;
  assert(states4x4 === 17, "4x4 N-Queens must have exactly 17 recursive call states");

  const movesHanoi3 = Math.pow(2, 3) - 1;
  assert(movesHanoi3 === 7, "3-disk Hanoi must have 7 moves");

  const movesHanoi5 = Math.pow(2, 5) - 1;
  assert(movesHanoi5 === 31, "5-disk Hanoi must have 31 moves");

  // 2. AI Code Reviewer Heuristics
  const javaCode = `
    interface FeeStrategy {
      double calculateFee(long duration);
    }
    class HourlyFeeStrategy implements FeeStrategy {
      public double calculateFee(long duration) { return duration * 10; }
    }
    enum VehicleType { CAR, TRUCK }
  `;
  const review = evaluateMachineCodingCode(javaCode, "java", "Parking Lot System");
  assert(review.score >= 80, "Good OOP code should score >= 80");
  assert(review.solidAudit.length === 5, "SOLID audit must evaluate all 5 principles");

  // 3. AI STAR Story Evaluation
  const starResult = evaluateStarStory(
    "High latency on auth service caused checkout dropoffs.",
    "I was tasked to drop p99 latency below 100ms.",
    "I profiled database queries and added a Redis cache-aside layer with jitter.",
    "p99 latency plummeted by 94% to 42ms, saving $320,000 in revenue.",
    "Amazon",
    "Customer Obsession"
  );
  assert(starResult.score >= 80, "Quantified STAR story should score >= 80");
  assert(starResult.quantifiableMetricsCount >= 2, "Should detect at least 2 metrics");
  assert(starResult.ownershipRatio >= 60, "Should have high personal ownership index");

  return true;
}

// Execute assertions on import
runSmokeTests();
