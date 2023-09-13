import React, { useState } from "react";
import { cn } from "@/lib/styling";
import { type Note, isMidiAccidental, getChromaFromNote } from "@/lib/music";

interface KeyProps {
  className?: string;
  note: Note;
  active?: boolean;
  onPress?: (note: Note) => void;
  onRelease?: (note: Note) => void;
}

export const Key: React.FC<KeyProps> = ({
  className,
  note,
  active = false,
  onPress,
  onRelease,
}) => {
  const chroma = getChromaFromNote(note);
  const isAccidental = isMidiAccidental(note.midi);

  const handlePress = () => onPress?.(note);
  const handleRelease = () => onRelease?.(note);

  return (
    <div
      className={cn(
        "key",

        "relative float-left ml-[2px] flex cursor-pointer items-end justify-center rounded-b-[1px] border-neutral-900 pb-1 first:ml-0",

        "origin-top transition-transform duration-75 ease-in",

        active && "active scale-[.99]",

        isAccidental &&
          "-left-[11px] z-30 -mr-[22px] h-[94px] w-[20px] bg-black text-white",

        !isAccidental &&
          "natural" &&
          "z-20 h-[150px] w-[33px] bg-[#F4F1F4] text-black",

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
