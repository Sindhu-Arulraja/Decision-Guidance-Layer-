import { SessionStore } from './store';
import { GlobalRulesEngine } from './rules';
import { ParallelExecutionLayer } from './parallelLayer';
import { NudgeType, NudgePayload, EventPayload } from './types';

export class InteractionObserver {
  private parallelLayer = new ParallelExecutionLayer();

  constructor(private store: SessionStore, private rulesEngine: GlobalRulesEngine) {}

  async processMessage(prompt: string): Promise<EventPayload> {
    this.store.addMessage('user', prompt);
    const turnCount = this.store.turnCount;

    // Run parallel execution layer
    const { classification, contextGap, patterns } = await this.parallelLayer.runPipeline(prompt, turnCount);

    let suggestedNudges: NudgeType[] = [];

    // Trigger logic
    if (classification.intent_type === 'decision' && classification.intent_confidence > 0.75) {
      suggestedNudges.push('decision');
    }

    if (patterns.complexity_detected && patterns.repetition_detected) {
      suggestedNudges.push('agent');
    } else if (patterns.complexity_detected) {
      suggestedNudges.push('workflow');
    } else if (patterns.repetition_detected) {
      suggestedNudges.push('skill');
    }

    let finalNudgePayload: NudgePayload | undefined = undefined;

    // Apply global rules
    const prioritizedNudge = this.rulesEngine.getHighestPriorityNudge(suggestedNudges);

    if (prioritizedNudge && this.rulesEngine.canShowNudge(prioritizedNudge)) {
      this.store.recordNudgeShown(); // record cooldown
      // Mock payloads for Phase 1
      switch (prioritizedNudge) {
        case 'decision':
          finalNudgePayload = {
            type: 'decision',
            options: [],
            recommendation: "Mock Decision",
            reasoning: "Mock reasoning based on phase 1 test"
          };
          break;
        case 'agent':
          finalNudgePayload = { type: 'agent', workflow_id: "wf-1", trigger_hint: "Mock trigger" };
          break;
        case 'workflow':
          finalNudgePayload = { type: 'workflow', reason: "Mock reason", steps: [], expected_outcome: "Mock outcome", confidence: "medium" };
          break;
        case 'skill':
          finalNudgePayload = { type: 'skill', repeat_count: 3, prompt_template: "Mock template" };
          break;
      }
    }

    const materialGap = classification.intent_confidence > 0.8 && contextGap.show;

    const eventPayload: EventPayload = {
      context_gap: {
        show: materialGap,
        missing: materialGap ? contextGap.missing : [],
        assumptions: materialGap ? contextGap.assumptions : []
      },
      nudge: finalNudgePayload
    };

    return eventPayload;
  }
}
