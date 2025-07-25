import React from 'react'


interface SegmentedButtonsProps {
  segmented: string | null;
  onSegmentedChange: (value: string) => void;
}

const segments = [
  { label: "User", value: "user" },
  { label: "Barber", value: "barber" },
  { label: "Barbershop", value: "barbershop" }
];

export const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({ segmented, onSegmentedChange }) => {
  return (
    <div className="pb-3">
      <div className="flex border-b border-[#dbe0e6] px-4 gap-8">
        {segments.map(segment => (
          <button
            key={segment.value}
            type="button"
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 focus:outline-none
              ${segmented === segment.value
                ? "border-b-[#111418] text-[#111418]"
                : "border-b-transparent text-[#60758a]"}
            `}
            onClick={() => onSegmentedChange(segment.value)}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              {segment.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
