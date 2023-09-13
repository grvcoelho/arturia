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

function Arturia(props) {
  const { className, style } = props;
  return (
    <div
      className={cn(
        className,
        "flex h-[369px] w-[595px] flex-col rounded-xl bg-[#EDE9E8] px-[32px] pt-[12px] shadow-md",
      )}
      style={style}
    >
      <div className="bg-neutral-30 bg-neutral-300text-3xl flex h-[200px] items-center justify-center space-x-[10px] pb-[24px] font-bold">
        <div className="ml-[10px] h-full w-[70px] bg-purple-300"></div>
        <div className="flex h-full flex-1 flex-col justify-between space-y-[10px]">
          <div className="flex h-[115px] items-end justify-between bg-blue-100">
            <div className="h-full w-[63px] bg-black"></div>
            <div className="h-[96px] w-[195px] bg-amber-100">knobs</div>
            <div className="h-[89px] w-[138px] bg-fuchsia-100">faders</div>
          </div>
          <div className="flex-1 bg-green-100">pads</div>
        </div>
      </div>
      <Keyboard></Keyboard>
    </div>
  );
}

export default Arturia;
