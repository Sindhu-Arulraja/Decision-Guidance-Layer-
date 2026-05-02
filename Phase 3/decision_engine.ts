import * as crypto from 'crypto';
import { DecisionFrameworkOutput, FallbackSchema } from './schemas';
import { calculateGroundedConfidence, ConfidenceLevel } from './confidence';

// Mocks representing data passing from Phase 2
export interface ClassificationData {
  intent_type: string;
  decision_type?: string;
  intent_confidence: number;
}

export interface ContextData {
  goal: string;
  constraints: string;
  completeness: number; // 0.0 - 1.0 representing how much material gap exists
}

export interface TriggerData {
  anyFired: boolean;
  strength: number; // 0.0 - 1.0
}

export interface HeavyLLMClient {
  invokeFramework<T>(prompt: string, framework: string): Promise<T>;
}

export class DecisionEngine {
  private cache: Map<string, { data: any; expiry: number }> = new Map();

  constructor(private llm: HeavyLLMClient) {}

  private generateHash(intent: string, goal: string, constraints: string): string {
    const data = `${intent}|${goal}|${constraints}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // 1. Dual Activation Logic
  shouldActivate(cls: ClassificationData, triggers: TriggerData): boolean {
    if (cls.intent_type !== "decision") return false;

    // Direct Mode: Explicit decision request with high confidence
    const directActivation = cls.intent_confidence > 0.75;

    // Triggered Mode: Implicit decision friction
    const triggeredActivation = triggers.anyFired;

    return directActivation || triggeredActivation;
  }

  // 2. Main Execution
  async execute(
    prompt: string,
    cls: ClassificationData,
    ctx: ContextData,
    triggers: TriggerData
  ): Promise<{ output: DecisionFrameworkOutput | FallbackSchema, confidence: ConfidenceLevel }> {
    
    // Check Activation
    if (!this.shouldActivate(cls, triggers)) {
      throw new Error("Decision Engine should not have been activated.");
    }

    // Calculate Grounded Confidence
    const confidence = calculateGroundedConfidence(
      cls.intent_confidence,
      ctx.completeness,
      triggers.strength
    );

    // Fallback early if confidence is critically low
    if (confidence.score < 0.3) {
      return {
        output: {
          fallback_mode: "light_guidance",
          behavior: "ask clarifying questions instead of structured output",
          clarifying_questions: ["Could you clarify what you're trying to decide?"]
        },
        confidence: "low"
      };
    }

    // Session Caching
    const cacheKey = this.generateHash(cls.decision_type || "unknown", ctx.goal, ctx.constraints);
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && Date.now() < cachedItem.expiry) {
      console.log(`[Decision Engine] Cache hit for key: ${cacheKey.substring(0,8)}...`);
      return { output: cachedItem.data, confidence: confidence.level };
    }

    // Heavy LLM Invocation
    try {
      const frameworkType = cls.decision_type || "planning"; // default
      const result = await this.llm.invokeFramework<DecisionFrameworkOutput>(prompt, frameworkType);
      
      // Save to Cache (session-based TTL)
      this.cache.set(cacheKey, { data: result, expiry: Date.now() + (30 * 60 * 1000) });

      return { output: result, confidence: confidence.level };

    } catch (e) {
      // Fallback on Schema or LLM failure
      return {
        output: {
          fallback_mode: "light_guidance",
          behavior: "ask clarifying questions instead of structured output",
          clarifying_questions: ["I hit an error structuring that decision. Can we break it down?"]
        },
        confidence: "low"
      };
    }
  }
}
