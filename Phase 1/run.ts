import { sessionStore } from './store';
import { GlobalRulesEngine } from './rules';
import { InteractionObserver } from './observer';

async function runTests() {
  const rulesEngine = new GlobalRulesEngine(sessionStore);
  const observer = new InteractionObserver(sessionStore, rulesEngine);

  console.log("--- Test 1: Normal execution (No triggers) ---");
  let res = await observer.processMessage("hello world");
  console.log(JSON.stringify(res, null, 2));

  console.log("\n--- Test 2: Decision Intent (Direct Mode) ---");
  res = await observer.processMessage("help me decide between option A and option B with this budget");
  console.log(JSON.stringify(res, null, 2));

  console.log("\n--- Test 3: Cooldown Check (Should not show nudge) ---");
  // Test 2 showed a nudge. Next turn shouldn't show one.
  res = await observer.processMessage("help me decide again");
  console.log(JSON.stringify(res, null, 2));

  console.log("\n--- Test 4: Passing Cooldown & Repetition Trigger ---");
  // Turn 4
  res = await observer.processMessage("regular task");
  // Turn 5 (cooldown over)
  res = await observer.processMessage("do this again"); // triggers repetition
  console.log(JSON.stringify(res, null, 2));

  console.log("\n--- Test 5: Dismissal Memory ---");
  // Dismiss skill nudge
  sessionStore.dismissNudge('skill');
  // Turn 6 
  res = await observer.processMessage("another regular task");
  // Turn 7 (cooldown over, triggers repetition again)
  res = await observer.processMessage("do this again");
  console.log("Expected no nudge because skill was dismissed:");
  console.log(JSON.stringify(res, null, 2));
}

runTests().catch(console.error);
