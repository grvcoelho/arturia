import React from "react";
import { cn } from "@/lib/styling";

const Key = ({ type, note }) => {
  return (
    <div
      className={cn(
        "relative float-left flex items-end justify-center rounded-b-md border-2 border-neutral-900 pb-1",

        type === "accidental" &&
          "-left-4 z-10 -mr-8 h-24 w-8 bg-[#F4F1F4]  text-white",

        type === "natural" &&
          " h-44 w-10 border-r-0 bg-white text-black last:border-r-2",
      )}
    >
      {note}
    </div>
  );
};

const Keyboard = () => {
  return (
    <div className="rounded-lg border-2 border-x-neutral-800 border-b-neutral-900 border-t-neutral-600 bg-neutral-700 p-3 shadow-lg">
      <div className="relative flex rounded bg-neutral-900 p-1">
        <Key note="C" type="natural" />
        <Key note="C#" type="accidental" />
        <Key note="D" type="natural" />
        <Key note="D#" type="accidental" />
        <Key note="E" type="natural" />
        <Key note="F" type="natural" />
        <Key note="F#" type="accidental" />
        <Key note="G" type="natural" />
        <Key note="G#" type="accidental" />
        <Key note="A" type="natural" />
        <Key note="A#" type="accidental" />
        <Key note="B" type="natural" />
        <Key note="C" type="natural" />
      </div>
    </div>
  );
};

export default Keyboard;
