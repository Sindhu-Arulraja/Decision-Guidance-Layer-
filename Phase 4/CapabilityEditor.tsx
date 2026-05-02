import React, { useState } from 'react';

interface CapabilityEditorProps {
  type: "skill" | "workflow" | "agent";
  initialData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const CapabilityEditor: React.FC<CapabilityEditorProps> = ({ type, initialData, onSave, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [promptInput, setPromptInput] = useState("");

  const renderDynamicFields = () => {
    switch (type) {
      case 'skill':
        return (
          <div className="mb-4">
            <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Prompt Template</label>
            <textarea 
              className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-3 text-[14px] text-white focus:border-[#FF6B35] outline-none min-h-[100px]"
              defaultValue={initialData?.prompt_template}
            />
          </div>
        );
      case 'workflow':
        return (
          <div className="mb-4">
            <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Editable Steps List</label>
            <div className="space-y-2">
              {initialData?.steps?.map((s: any, i: number) => (
                <input 
                  key={i} 
                  type="text" 
                  defaultValue={s.step}
                  className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-2 text-[14px] text-white outline-none"
                />
              ))}
            </div>
          </div>
        );
      case 'agent':
        return (
          <>
            <div className="mb-4">
              <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Trigger Conditions</label>
              <input 
                type="text" 
                defaultValue={initialData?.trigger_hint}
                className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-2 text-[14px] text-white outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Linked Workflow</label>
              <select className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-2 text-[14px] text-white outline-none">
                <option value={initialData?.workflow_id}>{initialData?.workflow_name || 'Select Workflow'}</option>
              </select>
            </div>
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-[#242424] border-l border-[#2D2D2D] p-6 shadow-[-8px_0_16px_rgba(0,0,0,0.3)] z-[1300] overflow-y-auto text-[#FFFFFF]">
      <div className="flex justify-between items-center mb-6 border-b border-[#2D2D2D] pb-4">
        <h2 className="text-[20px] font-semibold m-0">Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
        <button onClick={onCancel} className="text-[#A0A0A0] hover:text-[#FFFFFF]">✕</button>
      </div>

      <div className="mb-4">
        <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
          className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-2 text-[14px] text-white focus:border-[#FF6B35] outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Description</label>
        <textarea 
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full bg-[#1A1A1A] border border-[#3A3A3A] rounded-lg p-2 text-[14px] text-white focus:border-[#FF6B35] outline-none min-h-[60px]"
        />
      </div>

      <div className="mb-8 border-t border-[#2D2D2D] pt-6">
        {renderDynamicFields()}
      </div>

      <div className="mb-8 bg-[#1A1A1A] p-4 rounded-lg border border-[#2D2D2D]">
        <label className="block text-[12px] text-[#A0A0A0] uppercase mb-2">Chat-style edit input (AI Assist)</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={`"Modify this ${type}..."`}
            value={promptInput}
            onChange={e => setPromptInput(e.target.value)}
            className="flex-1 bg-transparent border border-[#3A3A3A] rounded-lg p-2 text-[14px] text-white outline-none"
          />
          <button className="bg-[#2D2D2D] px-3 rounded-lg text-[#FFFFFF]">Apply</button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-[#2D2D2D]">
        <button onClick={onCancel} className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-5 py-2 rounded-lg font-semibold">Cancel</button>
        <button onClick={() => onSave({ name, description })} className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-5 py-2 rounded-lg font-semibold">Save</button>
      </div>
    </div>
  );
};
