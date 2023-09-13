import React, { useState } from "react";

interface FaderProps {
  children?: React.ReactNode;
  onValueChange?: (value: any) => void;
  value: number;
  name: string;
  min: number;
  max: number;
  step: number;
}

export const Fader: React.FC<FaderProps> = (props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return props.onValueChange?.(e.target.value);
  };

  return (
    <div className="fader flex h-[89px] w-[24px] flex-col items-center justify-between">
      <input
        id={`${props.name}-fader`}
        name={`${props.name}-fader`}
        type="range"
        value={props.value}
        onChange={handleChange}
        min={props.min}
        step={props.step}
        max={props.max}
        className="mt-[31px] h-[4px] w-[62px] rotate-[270deg] cursor-pointer appearance-none rounded-[1px] bg-black"
      ></input>

      <span className="mb-[4px] font-mono text-[6px] text-neutral-800">
        {props.children}
      </span>
    </div>
  );
};
