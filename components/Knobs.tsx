import { cn } from "@/lib/styling";
import React from "react";

export interface StandardKnobProps {
  className?: string;
  children?: React.ReactNode;
}

export const StandardKnob: React.FC<StandardKnobProps> = ({
  className,
  children,
}) => (
  <div
    className={cn(
      "space-between flex w-[22px] cursor-pointer flex-col items-center",
      className,
    )}
  >
    <div
      className={cn(
        "knob flex h-[22px] w-[22px] items-center justify-center rounded-full",
        "bg-gradient-to-b from-stone-100 to-stone-300",
        "after:h-[17px] after:w-[17px] after:rounded-full",
        "after:bg-gradient-to-b after:from-stone-300 after:to-stone-100",
        "transition-transform duration-150 active:rotate-[24deg]",
      )}
    ></div>
    {children && (
      <span className="mt-[5px] font-mono text-[6px] text-neutral-800">
        {children}
      </span>
    )}
  </div>
);

type MainKnobProps = {
  className?: string;
  onClick?: () => void;
};

export const MainKnob: React.FC<MainKnobProps> = ({ className, onClick }) => (
  <div
    className={cn(
      "knob flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded-full bg-neutral-700 shadow-inner",
      "bg-gradient-to-b from-neutral-700 to-neutral-800",
      "after:h-[18px] after:w-[18px] after:rounded-full",
      "after:bg-gradient-to-b after:from-neutral-800 after:to-neutral-700",
      "active:rotate-[24deg]",
      className,
    )}
    onClick={onClick}
  ></div>
);
