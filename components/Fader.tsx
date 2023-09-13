import React from "react";
import { KnobProps } from "./KnobProps";

interface FaderProps {
  children?: React.ReactNode;
}

export const Fader: React.FC<KnobProps> = ({ children }) => (
  <div className="fader flex h-[89px] w-[24px] flex-col items-center justify-between">
    <input
      id="default-range"
      type="range"
      min="0"
      step="10"
      max="100"
      list="opacity"
      className="mt-[31px] h-[4px] w-[62px] rotate-90 cursor-pointer appearance-none rounded-[1px] bg-black"
    ></input>

    <span className="mb-[4px] font-mono text-[6px] text-neutral-800">
      {children}
    </span>
  </div>
);
