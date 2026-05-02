export type IntentType = "decision" | "execution" | "informational";
export type DecisionType = "selection" | "prioritization" | "planning" | "troubleshooting";

export interface ClassificationResult {
  intent_type: IntentType;
  decision_type?: DecisionType;
  intent_confidence: number;
}

export interface ContextGapResult {
  show: boolean;
  missing: string[];
  assumptions: string[];
}

export interface PatternTriggers {
  repetition_detected: boolean;
  frustration_detected: boolean;
  complexity_detected: boolean;
}

export type NudgeType = "decision" | "workflow" | "agent" | "skill";

export interface BaseNudgePayload {
  type: NudgeType;
}

export interface WorkflowNudgePayload extends BaseNudgePayload {
  type: "workflow";
  reason: string;
  steps: Array<{ step: string; why: string; expected_output: string }>;
  expected_outcome: string;
  confidence: "low" | "medium" | "high";
}

export interface SkillNudgePayload extends BaseNudgePayload {
  type: "skill";
  repeat_count: number;
  prompt_template: string;
}

export interface AgentNudgePayload extends BaseNudgePayload {
  type: "agent";
  workflow_id: string;
  trigger_hint: string;
}

export interface DecisionNudgePayload extends BaseNudgePayload {
  type: "decision";
  options: Array<{
    name: string;
    impact: number;
    effort: number;
    risk: number;
    score: number;
  }>;
  recommendation: string;
  reasoning: string;
}

export type NudgePayload = 
  | WorkflowNudgePayload 
  | SkillNudgePayload 
  | AgentNudgePayload 
  | DecisionNudgePayload;

export interface EventPayload {
  context_gap: ContextGapResult;
  nudge?: NudgePayload;
}
