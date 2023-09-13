import React from "react";
import { cn } from "@/lib/styling";
import { DrumNote } from "@/lib/music";

const styleVariants = {
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
  variant:
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal";

  drumNote: DrumNote;
  children?: React.ReactNode;
  onTap?: (drumNote: DrumNote) => void;
}

export const Pad: React.FC<PadProps> = ({
  variant,
  children,
  onTap,
  drumNote,
}) => {
  const { text, ring } = styleVariants[variant];

  const handleClick = () => {
    if (onTap) onTap(drumNote);
  };
  return (
    <div
      onClick={handleClick}
      className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[6px] bg-black"
    >
      <div
        className={cn(
          "flex h-[38.5px] w-[38.5px] flex-col justify-end rounded-[4px] ring-[1.5px] ring-inset",
          "bg-gradient-to-b from-neutral-800 to-neutral-950",
          ring,
          "transition-transform duration-100 ease-in-out active:scale-[.99]",
        )}
      >
        <span className={cn("mb-[3px] text-center font-mono text-[4px]", text)}>
          {children}
        </span>
      </div>
    </div>
  );
};
