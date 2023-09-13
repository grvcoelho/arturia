import React from "react";
import { cn } from "@/lib/styling";

/**
 * text-red-500 ring-red-500
 * text-orange-500 ring-orange-500
 * text-amber-500 ring-amber-500
 * text-yellow-500 ring-yellow-500
 * text-lime-500 ring-lime-500
 * text-green-500 ring-green-500
 * text-emerald-500 ring-emerald-500
 * text-teal-500 ring-teal-500
 * text-cyan-500 ring-cyan-500
 */
type PadColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal";

interface PadProps {
  color: PadColor;
  children?: React.ReactNode;
}

export const Pad: React.FC<PadProps> = ({ color, children }) => (
  <div className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[6px] bg-black">
    <div
      className={cn(
        "flex h-[38.5px] w-[38.5px] flex-col justify-end rounded-[4px] bg-black ring-[1.5px] ring-inset",
        `ring-${color}-500`,
      )}
    >
      <span
        className={cn(
          "mb-[3px] text-center font-mono text-[4px]",
          `text-${color}-500`,
        )}
      >
        {children}
      </span>
    </div>
  </div>
);
