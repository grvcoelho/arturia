import { cn } from "@/lib/styling";
import React from "react";

export interface KnobProps {
  children?: React.ReactNode;
}

export const Knob: React.FC<KnobProps> = ({ children }) => (
  <div className="space-between flex w-[22px] cursor-pointer flex-col items-center">
    <div
      className={cn(
        "knob flex h-[22px] w-[22px] items-center justify-center rounded-full",
        "bg-gradient-to-b from-stone-100 to-stone-200",
        "after:h-[17px] after:w-[17px] after:rounded-full",
        "after:bg-gradient-to-b after:from-stone-200 after:to-stone-100",
      )}
    ></div>
    <span className="mt-[5px] font-mono text-[6px] text-neutral-800">
      {children}
    </span>
  </div>
);
