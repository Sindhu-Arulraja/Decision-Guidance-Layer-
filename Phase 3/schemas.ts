// Strict Framework Schemas for the Decision Engine

export interface RankingOption {
  name: string;
  criteria_scores: {
    impact: number;
    effort: number;
    risk: number;
  };
  pros: string[];
  cons: string[];
  score: number;
}

export interface RankingSchema {
  framework: "ranking";
  options: RankingOption[];
  recommendation: string;
  reasoning: string;
}

export interface PlanningStep {
  step: string;
  why: string;
  expected_output: string;
}

export interface PlanningSchema {
  framework: "planning";
  goal: string;
  steps: PlanningStep[];
  risks: string[];
  estimated_complexity: "low" | "medium" | "high";
}

export interface TroubleshootingSchema {
  framework: "troubleshooting";
  problem: string;
  possible_causes: string[];
  diagnostic_steps: string[];
  recommended_fix: string;
}

export type DecisionFrameworkOutput = RankingSchema | PlanningSchema | TroubleshootingSchema;

// Fallback Mode Schema
export interface FallbackSchema {
  fallback_mode: "light_guidance";
  behavior: string;
  clarifying_questions: string[];
}
