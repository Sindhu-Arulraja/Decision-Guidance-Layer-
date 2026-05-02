import { EmbeddingsClient, cosineSimilarity, LLMClient } from './api';

export interface PatternTriggers {
  repetition_detected: boolean;
  frustration_detected: boolean;
  complexity_detected: boolean;
}

export interface ComplexityMetrics {
  step_count: number;
  unknown_count: number;
  constraint_count: number;
}

export interface FrustrationMetrics {
  sentiment: number;
  correction_phrases_detected: boolean;
}

export class PatternDetector {
  constructor(
    private embeddings: EmbeddingsClient,
    private llm: LLMClient
  ) {}

  // 1. Repetition Engine
  async evaluateRepetition(currentPrompt: string, prevPrompt: string | null): Promise<boolean> {
    if (!prevPrompt) return false;

    const [currentVec, prevVec] = await Promise.all([
      this.embeddings.getEmbedding(currentPrompt),
      this.embeddings.getEmbedding(prevPrompt)
    ]);

    const rawSimilarity = cosineSimilarity(currentVec, prevVec);
    
    // Normalize: Include prompt length weighting
    const lenRatio = Math.min(currentPrompt.length, prevPrompt.length) / Math.max(currentPrompt.length, prevPrompt.length);
    const lengthWeightedSimilarity = rawSimilarity * (0.8 + (0.2 * lenRatio));

    // Semantic drift detection (simplified vector magnitude diff for illustration)
    // In production, drift might be cosine of delta vectors across multiple turns.
    const semantic_drift = 1 - rawSimilarity; // simplistic representation

    // Rule: similarity > 0.85 AND semantic_drift < 0.2
    return lengthWeightedSimilarity > 0.85 && semantic_drift < 0.2;
  }

  // 2. Behavioral Frustration Engine
  async evaluateFrustration(prompt: string, turnTimeMs: number): Promise<boolean> {
    const isRapidTurnaround = turnTimeMs < 2000; // less than 2 seconds

    // Lightweight LLM for sentiment & corrections
    const metrics = await this.llm.invokeJson<FrustrationMetrics>(
      `Analyze sentiment (-1.0 to 1.0) and detect explicit corrections ("no", "not what I meant") for: "${prompt}"`,
      "FrustrationSchema"
    );

    // Rule: sentiment < -0.4 OR correction_phrases_detected OR rapid_turnaround_time < threshold
    return metrics.sentiment < -0.4 || metrics.correction_phrases_detected || isRapidTurnaround;
  }

  // 3. Complexity Engine
  async evaluateComplexity(prompt: string): Promise<boolean> {
    const metrics = await this.llm.invokeJson<ComplexityMetrics>(
      `Estimate task steps, unknowns, and constraints for: "${prompt}"`,
      "ComplexitySchema"
    );

    const step_estimate_weight = 1.0;
    const uncertainty_weight = 1.5;
    const constraint_weight = 1.2;

    const complexity_score = 
      (step_estimate_weight * metrics.step_count) +
      (uncertainty_weight * metrics.unknown_count) +
      (constraint_weight * metrics.constraint_count);

    const COMPLEXITY_THRESHOLD = 5.0; // arbitrary threshold for test
    return complexity_score > COMPLEXITY_THRESHOLD;
  }

  async detectPatterns(
    currentPrompt: string, 
    prevPrompt: string | null, 
    turnTimeMs: number
  ): Promise<PatternTriggers> {
    
    // Run all detectors in parallel
    const [rep, frus, comp] = await Promise.all([
      this.evaluateRepetition(currentPrompt, prevPrompt),
      this.evaluateFrustration(currentPrompt, turnTimeMs),
      this.evaluateComplexity(currentPrompt)
    ]);

    return {
      repetition_detected: rep,
      frustration_detected: frus,
      complexity_detected: comp
    };
  }
}
