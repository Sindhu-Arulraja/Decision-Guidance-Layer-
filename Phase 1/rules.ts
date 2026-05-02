import { SessionStore } from './store';
import { NudgeType } from './types';

export class GlobalRulesEngine {
  constructor(private store: SessionStore) {}

  // Rule 1: Priority -> decision > workflow > agent > skill
  getHighestPriorityNudge(suggestedNudges: NudgeType[]): NudgeType | null {
    if (suggestedNudges.length === 0) return null;
    if (suggestedNudges.includes('decision')) return 'decision';
    if (suggestedNudges.includes('workflow')) return 'workflow';
    if (suggestedNudges.includes('agent')) return 'agent';
    if (suggestedNudges.includes('skill')) return 'skill';
    return null;
  }

  // Rule 2: Cooldown -> no_same_nudge_within_last_2_turns
  // Simplified for MVP: No nudges at all if a nudge was shown within the last 2 turns
  isCooldownActive(): boolean {
    const currentTurn = this.store.turnCount;
    const lastTurn = this.store.state.lastNudgeTurn;
    if (lastTurn === -1) return false;
    return (currentTurn - lastTurn) < 2;
  }

  // Rule 3: Dismissal memory -> If user ignores, suppress similar nudges for session
  isDismissed(type: NudgeType): boolean {
    return this.store.isNudgeDismissed(type);
  }

  // Master rule evaluator
  canShowNudge(type: NudgeType): boolean {
    if (this.isCooldownActive()) {
      return false;
    }
    if (this.isDismissed(type)) {
      return false;
    }
    return true;
  }
}
