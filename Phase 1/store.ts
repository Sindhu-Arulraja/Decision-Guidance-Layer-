import * as crypto from 'crypto';
import { NudgeType } from './types';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SessionState {
  messages: ChatMessage[];
  dismissedNudges: Set<NudgeType>;
  lastNudgeTurn: number; // Turn index when the last nudge was shown
}

export class SessionStore {
  public state: SessionState = {
    messages: [],
    dismissedNudges: new Set(),
    lastNudgeTurn: -1,
  };

  addMessage(role: 'user' | 'assistant', content: string) {
    this.state.messages.push({ role, content, timestamp: Date.now() });
  }

  get turnCount() {
    // Count user messages as turns
    return this.state.messages.filter(m => m.role === 'user').length;
  }

  dismissNudge(type: NudgeType) {
    this.state.dismissedNudges.add(type);
  }

  isNudgeDismissed(type: NudgeType): boolean {
    return this.state.dismissedNudges.has(type);
  }

  recordNudgeShown() {
    this.state.lastNudgeTurn = this.turnCount;
  }
}

export const sessionStore = new SessionStore();

// Decision Cache (Simulating session-based storage)
export class DecisionCache {
  private storage: Map<string, { data: any; expiry: number }> = new Map();

  private generateHash(intent: string, goal: string, constraints: string): string {
    const data = `${intent}|${goal}|${constraints}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  set(intent: string, goal: string, constraints: string, data: any, ttlMinutes = 30) {
    const key = this.generateHash(intent, goal, constraints);
    const expiry = Date.now() + ttlMinutes * 60 * 1000;
    this.storage.set(key, { data, expiry });
    console.log(`[Cache] Saved to cache key: ${key.substring(0, 8)}...`);
  }

  get(intent: string, goal: string, constraints: string): any | null {
    const key = this.generateHash(intent, goal, constraints);
    const item = this.storage.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.storage.delete(key);
      return null;
    }
    console.log(`[Cache] Cache hit for key: ${key.substring(0, 8)}...`);
    return item.data;
  }
}

export const decisionCache = new DecisionCache();
