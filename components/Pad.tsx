import React from "react";
import { cn } from "@/lib/styling";

type PadColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal";

const variants = {
  red: { text: "text-red-500", ring: "ring-red-500" },
  orange: { text: "text-orange-500", ring: "ring-orange-500" },
  amber: { text: "text-amber-500", ring: "ring-amber-500" },
  yellow: { text: "text-yellow-500", ring: "ring-yellow-500" },
  lime: { text: "text-lime-500", ring: "ring-lime-500" },
  green: { text: "text-green-500", ring: "ring-green-500" },
  emerald: { text: "text-emerald-500", ring: "ring-emerald-500" },
  teal: { text: "text-teal-500", ring: "ring-teal-500" },
};

interface PadProps {
  color: PadColor;
  children?: React.ReactNode;
}

export const Pad: React.FC<PadProps> = ({ color, children }) => {
  const { text, ring } = variants[color];
  return (
    <div className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[6px] bg-black">
      <div
        className={cn(
          "flex h-[38.5px] w-[38.5px] flex-col justify-end rounded-[4px] bg-black ring-[1.5px] ring-inset",
          ring,
        )}
      >
        <span className={cn("mb-[3px] text-center font-mono text-[4px]", text)}>
          {children}
        </span>
      </div>
    </div>
  );
};
