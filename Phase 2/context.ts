import { LLMClient } from './api';

export interface RawContextOutput {
  missing_information: Array<{
    item: string;
    impacts: "goal" | "constraints" | "success_metric" | "irrelevant";
  }>;
  assumptions_made: string[];
  confidence: number;
}

export interface ValidatedContextGap {
  show: boolean;
  missing: string[];
  assumptions: string[];
}

export class DecisionContextLayer {
  constructor(private llm: LLMClient) {}

  async extractContext(prompt: string): Promise<ValidatedContextGap> {
    const result = await this.llm.invokeJson<RawContextOutput>(
      `Extract missing info and assumptions for decision guidance: "${prompt}"`,
      "DecisionContextSchema"
    );

    // Guardrail: ContextGapBanner is dangerous if misused.
    // Condition: confidence > 0.8 AND gap is material
    // Material explicitly defined: gap_impacts in ["goal", "constraints", "success_metric"]

    const materialGaps = result.missing_information.filter(
      gap => gap.impacts === "goal" || gap.impacts === "constraints" || gap.impacts === "success_metric"
    );

    const isMaterial = materialGaps.length > 0;
    const isHighConfidence = result.confidence > 0.8;

    if (isHighConfidence && isMaterial) {
      return {
        show: true,
        missing: materialGaps.map(g => g.item),
        assumptions: result.assumptions_made
      };
    }

    return {
      show: false,
      missing: [],
      assumptions: []
    };
  }
}
