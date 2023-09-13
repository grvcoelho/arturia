import React, { useState } from "react";
import { cn } from "@/lib/styling";

interface FaderProps {
  className?: string;
  children?: React.ReactNode;
  onValueChange?: (value: any) => void;
  value: number;
  name: string;
  min: number;
  max: number;
  step: number;
}

export const Fader: React.FC<FaderProps> = ({
  className = "",
  children,
  onValueChange,
  value,
  name,
  min,
  max,
  step,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return onValueChange?.(e.target.value);
  };

  return (
    <div
      className={cn(
        "fader flex h-[89px] w-[24px] flex-col items-center justify-between",
        className,
      )}
    >
      <input
        id={`${name}-fader`}
        name={`${name}-fader`}
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        step={step}
        max={max}
        className="mt-[31px] h-[4px] w-[62px] rotate-[270deg] cursor-pointer appearance-none rounded-[1px] bg-black"
      ></input>

      <span className="mb-[4px] font-mono text-[6px] text-neutral-800">
        {children}
      </span>
    </div>
  );
};
