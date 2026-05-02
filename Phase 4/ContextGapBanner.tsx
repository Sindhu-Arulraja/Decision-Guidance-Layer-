import React from 'react';

interface ContextGapBannerProps {
  missing: string[];
  assumptions: string[];
  onProvideDetails: () => void;
  onDismiss: () => void;
}

export const ContextGapBanner: React.FC<ContextGapBannerProps> = ({
  missing,
  assumptions,
  onProvideDetails,
  onDismiss
}) => {
  if (missing.length === 0 && assumptions.length === 0) return null;

  return (
    <div className="bg-[#2D2D2D] border border-[#FFB84D] rounded-lg p-4 my-4 shadow-lg text-[#FFFFFF]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#FFB84D]">⚠️</span>
        <h4 className="font-semibold text-[14px] text-[#FFFFFF] m-0">Missing Information</h4>
      </div>
      
      {missing.length > 0 && (
        <ul className="ml-5 mb-3 text-[14px] text-[#A0A0A0] list-disc">
          {missing.map((item, i) => (
            <li key={`missing-${i}`} className="mb-1">{item}</li>
          ))}
        </ul>
      )}

      {assumptions.length > 0 && (
        <>
          <h4 className="font-semibold text-[14px] text-[#FFFFFF] mb-2">Assumptions:</h4>
          <ul className="ml-5 mb-4 text-[14px] text-[#A0A0A0] list-disc">
            {assumptions.map((item, i) => (
              <li key={`assumption-${i}`} className="mb-1">{item}</li>
            ))}
          </ul>
        </>
      )}

      <div className="flex gap-3 mt-4">
        <button 
          onClick={onProvideDetails}
          className="bg-[#FF6B35] hover:bg-[#FF7D4D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold transition-colors"
        >
          Provide Details
        </button>
        <button 
          onClick={onDismiss}
          className="bg-transparent border border-[#3A3A3A] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-lg text-[14px] font-semibold transition-colors"
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};
