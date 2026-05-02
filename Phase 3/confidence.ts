// Grounded Confidence Calculator

export type ConfidenceLevel = "low" | "medium" | "high";

export function calculateGroundedConfidence(
  intentConfidence: number,
  contextCompleteness: number,
  triggerStrength: number
): { score: number; level: ConfidenceLevel } {
  // confidence_score = (intent_confidence * 0.4) + (context_completeness * 0.3) + (trigger_strength * 0.3)
  
  const score = 
    (intentConfidence * 0.4) + 
    (contextCompleteness * 0.3) + 
    (triggerStrength * 0.3);

  let level: ConfidenceLevel = "low";
  if (score >= 0.75) {
    level = "high";
  } else if (score >= 0.5) {
    level = "medium";
  }

  return { score, level };
}
