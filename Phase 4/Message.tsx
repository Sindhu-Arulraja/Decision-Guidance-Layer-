import React from 'react';
import { ContextGapBanner } from './ContextGapBanner';
import { NudgeCard, NudgeType } from './NudgeCard';

export interface BaseMessageProps {
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  contextGap?: {
    show: boolean;
    missing: string[];
    assumptions: string[];
  };
  nudge?: {
    type: NudgeType;
    payload: any;
  };
  onNudgeAction: (actionType: string, payload: any) => void;
  onNudgeDismiss: () => void;
  onGapProvideDetails: () => void;
  onGapDismiss: () => void;
}

export const Message: React.FC<BaseMessageProps> = ({
  type,
  content,
  timestamp,
  contextGap,
  nudge,
  onNudgeAction,
  onNudgeDismiss,
  onGapProvideDetails,
  onGapDismiss
}) => {
  const isAssistant = type === 'assistant';

  return (
    <div className={`w-full max-w-[740px] mx-auto p-5 my-4 rounded-xl ${isAssistant ? 'bg-[#242424]' : 'bg-transparent'}`}>
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${isAssistant ? 'bg-[#FF6B35]' : 'bg-[#4A9EFF]'}`}>
          {isAssistant ? 'AI' : 'U'}
        </div>
        <div>
          <span className="font-bold text-[14px] text-[#FFFFFF]">{isAssistant ? 'Claude' : 'You'}</span>
          <span className="text-[12px] text-[#707070] ml-2">{timestamp}</span>
        </div>
      </div>

      <div className="text-[16px] text-[#FFFFFF] leading-[1.6] pl-11 mb-2">
        {content}
      </div>

      {/* Guidance Injection */}
      <div className="pl-11 mt-4">
        {contextGap?.show && (
          <ContextGapBanner
            missing={contextGap.missing}
            assumptions={contextGap.assumptions}
            onProvideDetails={onGapProvideDetails}
            onDismiss={onGapDismiss}
          />
        )}

        {nudge && nudge.type && (
          <NudgeCard
            payload={nudge.payload || nudge}
            onAction={onNudgeAction}
            onDismiss={onNudgeDismiss}
          />
        )}
      </div>
    </div>
  );
};
