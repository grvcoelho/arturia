import React, { useState } from "react";
import { cn } from "@/lib/styling";
import { type Note, isMidiAccidental, getChromaFromNote } from "@/lib/music";
import { KeyboardKey } from "@/contexts/ArturiaContext";

interface KeyProps {
  className?: string;
  keyboardKey: KeyboardKey;
  active?: boolean;
  highlight?: boolean;
  onPress?: (key: KeyboardKey) => void;
  onRelease?: (key: KeyboardKey) => void;
}

export const Key: React.FC<KeyProps> = ({
  className,
  keyboardKey: k,
  active = false,
  highlight = false,
  onPress,
  onRelease,
}) => {
  const chroma = getChromaFromNote(k.note);
  const accidental = isMidiAccidental(k.note.midi);
  const natural = !accidental;

  const handlePress = () => onPress?.(k);
  const handleRelease = () => onRelease?.(k);

  return (
    <div
      className={cn(
        "key",

        "relative float-left ml-[2px] flex cursor-pointer items-end justify-center rounded-b-[1px] border-neutral-900 pb-1 first:ml-0",

        "origin-top transition-transform duration-75 ease-in",

        active && "active scale-[.99]",

        accidental &&
          "accidental -left-[11px] z-30 -mr-[22px] h-[94px] w-[20px] bg-neutral-950",

        accidental &&
          "border-x-[3px] border-b-8 border-b-neutral-900 border-l-neutral-800 border-r-neutral-700",

        natural && "natural z-20 h-[150px] w-[33px] bg-[#F4F1F4]",

        highlight && natural && "bg-violet-300",

        highlight &&
          accidental &&
          "border-b-violet-700 border-l-violet-600 border-r-violet-500 bg-violet-600",

        [1, 6].includes(chroma) && "left-[-16px]",

        [3, 10].includes(chroma) && "left-[-6px]",

        className,
      )}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
    ></div>
  );
};
