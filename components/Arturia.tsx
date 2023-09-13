import React from "react";
import { cn } from "@/lib/styling";
import {
  BiArrowFromBottom,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";

/**
 * text-red-500 ring-red-500
 * text-orange-500 ring-orange-500
 * text-amber-500 ring-amber-500
 * text-yellow-500 ring-yellow-500
 * text-lime-500 ring-lime-500
 * text-green-500 ring-green-500
 * text-emerald-500 ring-emerald-500
 * text-teal-500 ring-teal-500
 * text-cyan-500 ring-cyan-500
 */
type PadColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal";

interface PadProps {
  color: PadColor;
  children?: React.ReactNode;
}

const Pad: React.FC<PadProps> = ({ color, children }) => (
  <div className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-[6px] bg-black">
    <div
      className={cn(
        "flex h-[38.5px] w-[38.5px] flex-col justify-end rounded-[4px] bg-black ring-[1.5px] ring-inset",
        `ring-${color}-500`,
      )}
    >
      <span
        className={cn(
          "mb-[3px] text-center font-mono text-[4px]",
          `text-${color}-500`,
        )}
      >
        {children}
      </span>
    </div>
  </div>
);

interface KeyProps {
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

const Key: React.FC<KeyProps> = ({ type, note }) => {
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

interface KeyboardProps {
  children?: React.ReactNode;
}

const Keyboard: React.FC<KeyboardProps> = ({ children }) => {
  return (
    <div
      className={cn(
        "relative z-20 flex h-full justify-center rounded bg-neutral-900",
        "before:content-[' '] before:absolute before:left-0 before:right-0 before:z-20 before:h-[150px] before:w-full before:rounded-[4px] before:shadow-inner",
        "after:content-[' '] after:absolute after:left-0 after:right-0 after:z-20 after:h-[150px] after:w-full after:rounded-[4px] after:shadow-xl",
      )}
    >
      {children}
    </div>
  );
};

interface KnobProps {
  children?: React.ReactNode;
}

const Knob: React.FC<KnobProps> = ({ children }) => (
  <div className="space-between flex w-[22px] cursor-pointer flex-col items-center">
    <div className="h-[22px] w-[22px] rounded-full bg-white shadow-md"></div>
    <span className="mt-[5px] font-mono text-[6px] text-neutral-800">
      {children}
    </span>
  </div>
);

interface FaderProps {
  children?: React.ReactNode;
}

const Fader: React.FC<KnobProps> = ({ children }) => (
  <div className="fader flex h-[89px] w-[24px] flex-col items-center justify-between">
    <input
      id="default-range"
      type="range"
      min="0"
      step="10"
      max="100"
      list="opacity"
      className="mt-[31px] h-[4px] w-[62px] rotate-90 cursor-pointer appearance-none rounded-[1px] bg-black"
    ></input>

    <span className="mb-[4px] font-mono text-[6px] text-neutral-800">
      {children}
    </span>
  </div>
);

interface ArturiaProps {
  className?: string;
  style?: React.CSSProperties;
}

const Arturia: React.FC<ArturiaProps> = (props) => {
  const { className, style } = props;
  return (
    <div
      className={cn(
        className,
        "flex h-[369px] w-[595px] flex-col rounded-xl bg-[#EDE9E8] px-[32px] pt-[10px] shadow-md",
      )}
      style={style}
    >
      <div className="justify-centerfont-bold flex h-[164px] items-center">
        <div className="ml-[8px] h-full w-[70px] pt-[15px]">
          <div className="flex flex-wrap justify-between">
            <div className="flex h-[20px] w-[32px] items-center justify-center rounded-[2px] bg-neutral-400 shadow-inner">
              <div
                className={cn(
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-neutral-800 ring-[1.5px] ring-inset ring-white",
                )}
              >
                <span
                  className={cn(" text-center font-mono text-[4px] text-white")}
                >
                  Shift
                </span>
              </div>
            </div>
            <div className="flex h-[20px] w-[32px] items-center justify-center rounded-[2px] ">
              <div
                className={cn(
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-slate-100 shadow-sm",
                )}
              >
                <span
                  className={cn(
                    " text-center font-mono text-[4px] text-neutral-800",
                  )}
                >
                  Hold
                </span>
              </div>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px]">
              <div
                className={cn(
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-slate-100 shadow-sm",
                )}
              >
                <span
                  className={cn(
                    " text-center font-mono text-[4px] text-neutral-800",
                  )}
                >
                  Oct-
                </span>
              </div>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px] ">
              <div
                className={cn(
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-slate-100 shadow-sm",
                )}
              >
                <span
                  className={cn(
                    " text-center font-mono text-[4px] text-neutral-800",
                  )}
                >
                  Oct+
                </span>
              </div>
            </div>
          </div>

          <div className="mr-[2px] mt-[10px] flex justify-between">
            <div className="mod flex-col-items-center flex h-[90px] w-[26px] cursor-pointer justify-between rounded-[2px] bg-[#EDE9E8] py-[2px]">
              <BiUpArrowAlt className="w-[12px] text-neutral-800" />
              <div className="h-[1px] w-[10px] bg-neutral-800"></div>
              <BiDownArrowAlt className="w-[12px] text-neutral-800" />
            </div>
            <div className="mod flex h-[90px] w-[26px] cursor-pointer flex-col items-center justify-end rounded-[2px] bg-[#EDE9E8] py-[2px]">
              <BiArrowFromBottom className="w-[12px] text-neutral-800" />
            </div>
          </div>
        </div>
        <div className="ml-[12px] flex h-full flex-1 flex-col justify-between space-y-[9px]">
          <div className="flex h-[113px] items-end">
            <div className="flex h-full w-[63px] flex-col items-center justify-between rounded-sm bg-neutral-800">
              <div className="mt-[23px] rounded-sm bg-black px-[8px] py-[4px] font-mono text-[4px] text-white">
                Arturia
              </div>
              <div className="mb-[17px] h-[20px] w-[20px] cursor-pointer rounded-full bg-neutral-600 shadow-lg"></div>
            </div>
            <div className="mb-[6px] ml-[11px] flex h-[89px] w-[189px] flex-wrap gap-x-[33px] gap-y-[18px]">
              <Knob>1</Knob>
              <Knob>2</Knob>
              <Knob>3</Knob>
              <Knob>4</Knob>
              <Knob>5</Knob>
              <Knob>6</Knob>
              <Knob>7</Knob>
              <Knob>8</Knob>
            </div>
            <div className="ml-[29px] flex h-[89px] w-[134px] justify-between ">
              <Fader>1</Fader>
              <Fader>2</Fader>
              <Fader>3</Fader>
              <Fader>4</Fader>
            </div>
          </div>
          <div className="ml-[10px] flex gap-[12.5px]">
            <Pad color="red">Arp</Pad>
            <Pad color="orange">Pad</Pad>
            <Pad color="amber">Prog</Pad>
            <Pad color="yellow">Loop</Pad>
            <Pad color="lime">Stop</Pad>
            <Pad color="green">Play</Pad>
            <Pad color="emerald">Rec</Pad>
            <Pad color="teal">Tap</Pad>
          </div>
        </div>
      </div>
      <div className="flex h-[29px] w-full items-end justify-between">
        <div className="mb-[4px] ml-[12px] text-[12px] tracking-widest">
          <span className="font-semibold">MINI</span>
          <span>LAB</span>
          <span className="font-bold">3</span>
        </div>

        <div className="mb-[3px] mr-[13px] inline-block scale-x-125 text-[11px] tracking-[1px]">
          <span className="font-semibold">ARTURIA</span>
        </div>
      </div>
      <div>
        <Keyboard>
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
        </Keyboard>
      </div>
    </div>
  );
};

export default Arturia;
