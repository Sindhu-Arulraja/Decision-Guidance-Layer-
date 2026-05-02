import { DecisionEngine, HeavyLLMClient, ClassificationData, ContextData, TriggerData } from './decision_engine';
import { PlanningSchema } from './schemas';

// Mock Heavy LLM
class MockHeavyLLM implements HeavyLLMClient {
  public failNextCall = false;

  async invokeFramework<T>(prompt: string, framework: string): Promise<T> {
    if (this.failNextCall) {
      this.failNextCall = false;
      throw new Error("Simulated LLM schema parsing failure");
    }

    return {
      framework: "planning",
      goal: "Simulated Goal",
      steps: [
        { step: "Step 1", why: "Reason 1", expected_output: "Output 1" }
      ],
      risks: ["Risk 1"],
      estimated_complexity: "medium"
    } as unknown as T;
  }
}

async function runPhase3Tests() {
  const llm = new MockHeavyLLM();
  const engine = new DecisionEngine(llm);

  console.log("--- 1. Testing Dual Activation Logic ---");
  const clsDirect: ClassificationData = { intent_type: "decision", decision_type: "planning", intent_confidence: 0.8 };
  const triggersNone: TriggerData = { anyFired: false, strength: 0 };
  console.log("Direct Mode Activation:", engine.shouldActivate(clsDirect, triggersNone)); // True

  const clsLow: ClassificationData = { intent_type: "decision", decision_type: "planning", intent_confidence: 0.4 };
  const triggersFired: TriggerData = { anyFired: true, strength: 0.8 };
  console.log("Triggered Mode Activation:", engine.shouldActivate(clsLow, triggersFired)); // True

  const clsExec: ClassificationData = { intent_type: "execution", intent_confidence: 0.9 };
  console.log("Execution Intent Activation:", engine.shouldActivate(clsExec, triggersFired)); // False

  console.log("\n--- 2. Testing Execution & Grounded Confidence ---");
  const ctx: ContextData = { goal: "Build App", constraints: "No budget", completeness: 0.9 };
  const result1 = await engine.execute("Help me build an app", clsDirect, ctx, triggersNone);
  console.log("Output Framework:", (result1.output as any).framework);
  console.log("Grounded Confidence Level:", result1.confidence);

  console.log("\n--- 3. Testing Caching ---");
  // Exact same intent + goal + constraints should hit cache and NOT invoke LLM
  llm.failNextCall = true; // If cache fails, this will throw!
  const result2 = await engine.execute("Help me build an app", clsDirect, ctx, triggersNone);
  console.log("Output from Cache:", (result2.output as any).framework); // Should succeed and log Cache hit

  console.log("\n--- 4. Testing Fallback Mode (LLM Failure) ---");
  const newCtx: ContextData = { goal: "New Goal", constraints: "None", completeness: 0.9 };
  llm.failNextCall = true; // LLM will fail for a fresh request
  const result3 = await engine.execute("Help me do something new", clsDirect, newCtx, triggersNone);
  console.log("Fallback Output:", result3.output);

  console.log("\n--- 5. Testing Fallback Mode (Critically Low Confidence) ---");
  const clsCrit: ClassificationData = { intent_type: "decision", intent_confidence: 0.1 };
  const ctxCrit: ContextData = { goal: "Unknown", constraints: "Unknown", completeness: 0.1 };
  const trigCrit: TriggerData = { anyFired: true, strength: 0.2 };
  // Expected score: (0.1*0.4) + (0.1*0.3) + (0.2*0.3) = 0.04 + 0.03 + 0.06 = 0.13 (< 0.3)
  const result4 = await engine.execute("What?", clsCrit, ctxCrit, trigCrit);
  console.log("Fallback due to low confidence:", result4.output);
}

runPhase3Tests().catch(console.error);
