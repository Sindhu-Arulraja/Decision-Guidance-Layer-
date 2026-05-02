import { LLMClient, EmbeddingsClient } from './api';
import { ClassificationLayer } from './classification';
import { DecisionContextLayer } from './context';
import { PatternDetector } from './pattern_detector';

// Mock API Injectors
class MockLLM implements LLMClient {
  async invokeJson<T>(prompt: string, schemaName: string): Promise<T> {
    if (schemaName === "ClassificationSchema") {
      return {
        intent_type: "decision",
        decision_type: "planning",
        intent_confidence: 0.95
      } as unknown as T;
    }
    if (schemaName === "DecisionContextSchema") {
      // Simulate material gap
      return {
        missing_information: [{ item: "Budget limit", impacts: "constraints" }],
        assumptions_made: ["Assuming enterprise use-case"],
        confidence: 0.85
      } as unknown as T;
    }
    if (schemaName === "FrustrationSchema") {
      return {
        sentiment: -0.5, // Frustrated
        correction_phrases_detected: true
      } as unknown as T;
    }
    if (schemaName === "ComplexitySchema") {
      return {
        step_count: 4,
        unknown_count: 2,
        constraint_count: 1
      } as unknown as T;
    }
    throw new Error("Unknown schema");
  }
}

class MockEmbeddings implements EmbeddingsClient {
  async getEmbedding(text: string): Promise<number[]> {
    // Return identical vectors to simulate high similarity
    return [0.1, 0.9, 0.5]; 
  }
}

async function runPhase2Tests() {
  const llm = new MockLLM();
  const embeddings = new MockEmbeddings();

  const classifier = new ClassificationLayer(llm);
  const contextLayer = new DecisionContextLayer(llm);
  const detector = new PatternDetector(embeddings, llm);

  console.log("--- 1. Testing Classification Layer ---");
  const cls = await classifier.classifyPrompt("How should I plan my marketing strategy?");
  console.log(cls);

  console.log("\n--- 2. Testing Decision Context (Material Gap) ---");
  const ctx = await contextLayer.extractContext("How should I plan my marketing strategy?");
  console.log("Material Gap Show Banner:", ctx.show);
  console.log("Missing:", ctx.missing);

  console.log("\n--- 3. Testing Pattern Detector (Triggers) ---");
  const prevPrompt = "Plan my marketing strategy";
  const currentPrompt = "Plan my marketing strategy but faster";
  const turnaroundMs = 1500; // rapid

  const patterns = await detector.detectPatterns(currentPrompt, prevPrompt, turnaroundMs);
  console.log("Repetition (Length-weighted Similarity):", patterns.repetition_detected);
  console.log("Frustration (Behavioral & Sentiment):", patterns.frustration_detected);
  console.log("Complexity (Weighted Metrics):", patterns.complexity_detected);
}

runPhase2Tests().catch(console.error);
