import { LLMClient } from './api';

export type IntentType = "decision" | "execution" | "informational";
export type DecisionType = "selection" | "prioritization" | "planning" | "troubleshooting";

export interface ClassificationOutput {
  intent_type: IntentType;
  decision_type?: DecisionType;
  intent_confidence: number;
}

export class ClassificationLayer {
  constructor(private llm: LLMClient) {}

  async classifyPrompt(prompt: string): Promise<ClassificationOutput> {
    // In production, this invokes a fast, lightweight model (e.g., Claude Haiku or local ONNX)
    // with a strict JSON schema request.
    const result = await this.llm.invokeJson<ClassificationOutput>(
      `Classify the following prompt into intent and decision type: "${prompt}"`,
      "ClassificationSchema"
    );

    return {
      intent_type: result.intent_type,
      decision_type: result.decision_type,
      intent_confidence: result.intent_confidence
    };
  }
}
