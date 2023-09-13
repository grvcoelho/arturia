import React from "react";
import { cn } from "@/lib/styling";

interface KeyProps {
  className?: string;
  type: "accidental" | "natural";
  note: string;
  octave: number;
  onPress?: (note: string) => void;
  onRelease?: (note: string) => void;
}

export const Key: React.FC<KeyProps> = ({
  className,
  type,
  note,
  octave,
  onPress,
  onRelease,
}) => {
  const [active, setActive] = React.useState(false);
  const fullNote = `${note}${octave}`;

  const handlePressed = () => {
    setActive(true);
    onPress && onPress(fullNote);
  };

  const handleReleased = () => {
    setActive(false);
    onRelease && onRelease(fullNote);
  };

  return (
    <div
      className={cn(
        "key",

        "relative float-left ml-[2px] flex cursor-pointer items-end justify-center rounded-b-[1px] border-neutral-900 pb-1 text-opacity-0 first:ml-0",

        "origin-top transition-transform duration-75 ease-in",

        active && "active scale-[.99]",

        type === "accidental" &&
          "-left-[11px] z-30 -mr-[22px] h-[94px] w-[20px] bg-black text-white",

        type === "natural" && "z-20 h-[150px] w-[33px] bg-[#F4F1F4] text-black",

        ["C#", "F#"].includes(note) && "left-[-16px]",

        ["D#", "A#"].includes(note) && "left-[-6px]",

        className,
      )}
      onMouseDown={handlePressed}
      onMouseLeave={handleReleased}
      onMouseUp={handleReleased}
    ></div>
  );
};
