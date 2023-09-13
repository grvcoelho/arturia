import React from "react";
import { cn } from "@/lib/styling";

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
  <div className=" flex h-[42px] w-[42px] items-center justify-center rounded-[6px] bg-black">
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
        "before:content-[' '] before:bgx-blue-500 before:absolute before:left-0 before:right-0 before:z-20 before:h-[150px] before:w-full before:rounded-[4px] before:shadow-inner",
      )}
    >
      {children}
    </div>
  );
};

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
