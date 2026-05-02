import React from 'react';

interface WorkflowPreviewProps {
  goal: string;
  steps: Array<{ step: string; why: string; expected_output: string }>;
  risks: string[];
  onEdit: () => void;
  onSave: () => void;
  onClose: () => void;
}

export const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ goal, steps, risks, onEdit, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 bg-[#000000] bg-opacity-70 flex justify-center items-center z-[1300]">
      <div className="bg-[#242424] border border-[#3A3A3A] rounded-xl w-full max-w-[600px] p-6 text-[#FFFFFF] shadow-[0_16px_32px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-semibold m-0">Workflow Preview</h2>
          <button onClick={onClose} className="text-[#A0A0A0] hover:text-[#FFFFFF]">✕</button>
        </div>

        <div className="mb-6">
          <h3 className="text-[14px] text-[#A0A0A0] font-semibold uppercase tracking-wider mb-2">Goal</h3>
          <p className="text-[16px]">{goal}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-[14px] text-[#A0A0A0] font-semibold uppercase tracking-wider mb-3">Steps</h3>
          <div className="space-y-4">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#2D2D2D]">
                <div className="font-semibold mb-2">{idx + 1}. {s.step}</div>
                <div className="text-[14px] text-[#A0A0A0] space-y-1">
                  <div><strong>Why:</strong> {s.why}</div>
                  <div><strong>Output:</strong> {s.expected_output}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {risks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-[14px] text-[#A0A0A0] font-semibold uppercase tracking-wider mb-2">Risks</h3>
            <ul className="list-disc ml-5 text-[14px] text-[#FFB84D]">
              {risks.map((r, idx) => <li key={idx}>{r}</li>)}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-[#2D2D2D]">
          <button onClick={onEdit} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-5 py-2 rounded-lg font-semibold">Edit Steps</button>
          <button onClick={onSave} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-5 py-2 rounded-lg font-semibold">Save Workflow</button>
        </div>
      </div>
    </div>
  );
};
