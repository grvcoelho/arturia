import React from "react";
import { cn } from "@/lib/styling";

const Key = ({ type, note }) => {
  return (
    <div
      className={cn(
        "relative float-left ml-[2px] flex items-end justify-center rounded-b-sm border-neutral-900 pb-1 text-opacity-0 first:ml-0",

        type === "accidental" &&
          "-left-[11px] z-10 -mr-[22px] h-[94px] w-[20px] bg-black text-white",

        type === "natural" && "h-[150px] w-[33px] bg-[#F4F1F4] text-black",
      )}
    >
      {note}
    </div>
  );
};

const Keyboard = () => {
  return (
    <div className="relative flex h-full justify-center rounded bg-neutral-900">
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
        "flex h-[369px] w-[595px] flex-col rounded-xl bg-[#EDE9E8] px-[32px] pt-[10px] shadow-md",
      )}
      style={style}
    >
      <div className="bg-neutral-30 bg-neutral-300text-3xl mb-[29px] flex h-[164px] items-center justify-center space-x-[10px] font-bold">
        <div className="ml-[10px] h-full w-[70px] bg-purple-300"></div>
        <div className="flex h-full flex-1 flex-col justify-between space-y-[9px]">
          <div className="flex h-[113px] items-end bg-blue-100">
            <div className="flex h-full w-[63px] flex-col items-center justify-between rounded-sm bg-neutral-800">
              <div className="mt-[23px] rounded-sm bg-black px-[8px] py-[4px] font-mono text-[4px] text-white">
                Arturia
              </div>
              <div className="mb-[17px] h-[22px] w-[22px] rounded-full bg-neutral-700"></div>
            </div>
            <div className="ml-[10px] h-[96px] w-[190px] bg-amber-100">
              knobs
            </div>
            <div className="ml-[30px] h-[89px] w-[134px] bg-fuchsia-100">
              faders
            </div>
          </div>
          <div className="flex-1 bg-green-100">pads</div>
        </div>
      </div>

      <div>
        <Keyboard></Keyboard>
      </div>
    </div>
  );
}

export default Arturia;
