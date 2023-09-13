import React from "react";
import { cn } from "@/lib/styling";

const Key = ({ type, note }) => {
  return (
    <div
      className={cn(
        "relative float-left flex items-end justify-center rounded-b-sm border-2 border-neutral-900 pb-1 text-opacity-0",

        type === "accidental" &&
          "-left-[11px] z-10 -mr-[22px] h-[94px] w-[22px] bg-black text-white",

        type === "natural" &&
          "h-[146px] w-[36px] border-r-0 bg-[#F4F1F4] text-black last:border-r-2",
      )}
    >
      {note}
    </div>
  );
};

const Keyboard = () => {
  return (
    <div className="relative flex rounded bg-neutral-900 px-[2px]">
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
  );
};

function Arturia() {
  return (
    <div className="flex h-[369px] w-[595px] flex-col rounded-xl bg-[#EDE9E8] px-[32px] pt-[12px] shadow-md">
      <div className="bg-neutral-30 flex h-[200px] items-center justify-center bg-neutral-300 p-4 text-3xl font-bold">
        Controls
      </div>
      <Keyboard></Keyboard>
    </div>
  );
}

export default Arturia;
