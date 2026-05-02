import React from 'react';

export type NudgeType = "workflow" | "skill" | "agent" | "decision" | "frustration";

export interface NudgeCardProps {
  payload: any;
  onAction: (actionType: string, payload: any) => void;
  onDismiss: () => void;
}

export const NudgeCard: React.FC<NudgeCardProps> = ({ payload, onAction, onDismiss }) => {
  const type = payload.type as NudgeType;

  const renderContent = () => {
    switch (type) {
      case 'decision':
        return (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span>🧠</span><h4 className="font-semibold text-[16px] m-0">Decision Support</h4>
            </div>
            <div className="text-[14px] text-[#A0A0A0] mb-4">
              <strong>Options:</strong><br/>
              {payload.options.map((o: any) => o.name).join(" vs ")}
              <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
                {payload.options.map((o: any, i: number) => (
                  <div key={i} className="bg-[#1A1A1A] p-2 rounded border border-[#2D2D2D]">
                    <strong>{o.name}</strong><br/>
                    Impact: {o.impact} | Effort: {o.effort} | Risk: {o.risk}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <span className="text-[14px] text-[#FFFFFF]">→ Recommended: <strong>{payload.recommendation}</strong></span>
              <p className="text-[14px] text-[#A0A0A0] mt-2"><strong>Why:</strong> {payload.reasoning}</p>
            </div>
            {payload.confidence && <div className="text-[12px] text-[#707070] mb-4">Recommendation confidence: {payload.confidence}</div>}
            <div className="flex gap-3">
              <button onClick={() => onAction('apply_decision', payload)} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Apply Recommendation</button>
              <button onClick={onDismiss} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Explore Options</button>
            </div>
          </>
        );

      case 'workflow':
        return (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span>🧠</span><h4 className="font-semibold text-[16px] m-0">Multi-step task detected</h4>
            </div>
            <div className="mb-4">
              <p className="text-[14px] text-[#A0A0A0] mb-2"><strong>Why:</strong> {payload.reason}</p>
              <div className="text-[14px] text-[#A0A0A0] mb-2">
                <strong>Steps Preview:</strong>
                <ol className="list-decimal ml-5 mt-1">
                  {payload.steps.map((s: any, i: number) => <li key={i}>{s.step}</li>)}
                </ol>
              </div>
              <p className="text-[14px] text-[#A0A0A0]"><strong>Outcome:</strong> {payload.expected_outcome}</p>
            </div>
            <div className="text-[12px] text-[#707070] mb-4">Confidence: {payload.confidence}</div>
            <div className="flex gap-3">
              <button onClick={() => onAction('convert_workflow', payload)} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Convert to Workflow</button>
              <button onClick={() => onAction('view_details', payload)} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">View Details</button>
            </div>
          </>
        );

      case 'skill':
        return (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span>🔁</span><h4 className="font-semibold text-[16px] m-0">You're repeating a task</h4>
            </div>
            <p className="text-[14px] text-[#A0A0A0] mb-4"><strong>Why:</strong> Similar intent detected across recent prompts.</p>
            <div className="flex gap-3">
              <button onClick={() => onAction('save_skill', payload)} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Save as Skill</button>
              <button onClick={onDismiss} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Ignore</button>
            </div>
          </>
        );

      case 'agent':
        return (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span>⚡</span><h4 className="font-semibold text-[16px] m-0">Automate this task</h4>
            </div>
            <div className="text-[14px] text-[#A0A0A0] mb-4">
              <p className="mb-2"><strong>Why:</strong> Recurring + structured process detected.</p>
              <p className="mb-1">This agent will:</p>
              <ul className="list-disc ml-5">
                <li>Trigger on similar inputs</li>
                <li>Execute {payload.workflow_name || 'workflow'}</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button onClick={() => onAction('create_agent', payload)} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Create Agent</button>
              <button onClick={onDismiss} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Not Now</button>
            </div>
          </>
        );

      case 'frustration':
        return (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB84D]">⚠️</span><h4 className="font-semibold text-[16px] m-0">Something's not working</h4>
            </div>
            <div className="text-[14px] text-[#A0A0A0] mb-4">
              <p className="mb-2"><strong>Why:</strong> Your last responses didn't match expected output.</p>
              <p className="mb-1">Try this instead:</p>
              <ul className="list-disc ml-5 text-[#FFFFFF]">
                <li>Break into steps</li>
                <li>Clarify goal</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button onClick={() => onAction('convert_workflow', payload)} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Convert to Workflow</button>
              <button onClick={() => onAction('refine_prompt', payload)} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold">Refine Prompt</button>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#242424] border border-[#2D2D2D] rounded-xl p-5 my-4 text-[#FFFFFF] shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-all hover:border-[#3A3A3A]">
      {renderContent()}
    </div>
  );
};
