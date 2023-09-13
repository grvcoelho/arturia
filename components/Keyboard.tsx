import React from "react";
import { cn } from "@/lib/styling";

interface KeyProps {
  className?: string;
  type: "accidental" | "natural";
  note:
    | "C"
    | "C#"
    | "D"
    | "D#"
    | "E"
    | "F"
    | "F#"
    | "G"
    | "G#"
    | "A"
    | "A#"
    | "B";
}

export const Key: React.FC<KeyProps> = ({ className, type, note }) => {
  const [active, setActive] = React.useState(false);

  return (
    <div
      className={cn(
        "relative float-left ml-[2px] flex cursor-pointer items-end justify-center rounded-b-sm border-neutral-900 pb-1 text-opacity-0 first:ml-0",

        "origin-top transition-transform duration-75 ease-in",

        active && "scale-[.98]",

        type === "accidental" &&
          "-left-[11px] z-30 -mr-[22px] h-[94px] w-[20px] bg-black text-white",

        type === "natural" && "z-20 h-[150px] w-[33px] bg-[#F4F1F4] text-black",

        className,
      )}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    ></div>
  );
};

interface KeyboardProps {
  children?: React.ReactNode;
}
export const Keyboard: React.FC<KeyboardProps> = ({ children }) => {
  return (
    <div
      className={cn(
        "relative z-20 flex h-full justify-center rounded bg-neutral-900",
        "before:content-[' '] before:absolute before:left-0 before:right-0 before:z-20 before:h-[150px] before:w-full before:rounded-[4px] before:shadow-inner",
        "after:content-[' '] after:absolute after:left-0 after:right-0 after:-z-20 after:h-[150px] after:w-full after:rounded-[4px] after:shadow-xl",
      )}
    >
      {children}
    </div>
  );
};
