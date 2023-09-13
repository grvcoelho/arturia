import React from "react";

export interface KnobProps {
  children?: React.ReactNode;
}

export const Knob: React.FC<KnobProps> = ({ children }) => (
  <div className="space-between flex w-[22px] cursor-pointer flex-col items-center">
    <div className="h-[22px] w-[22px] rounded-full bg-white shadow-md"></div>
    <span className="mt-[5px] font-mono text-[6px] text-neutral-800">
      {children}
    </span>
  </div>
);
