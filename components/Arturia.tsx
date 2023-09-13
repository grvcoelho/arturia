import React, { useState, useEffect } from "react";
import { Soundfont, Reverb, CacheStorage } from "smplr";
import {
  BiArrowFromBottom,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";

const storage = new CacheStorage();

import { cn } from "@/lib/styling";
import { Pad } from "./Pad";
import { Knob } from "./KnobProps";
import { Fader } from "./Fader";
import { Keyboard } from "./Keyboard";

interface ArturiaProps {
  className?: string;
  style?: React.CSSProperties;
}

const Arturia: React.FC<ArturiaProps> = ({ className, style }) => {
  const initialVolume = 90;
  const initialOctave = 4;

  const [volume, setVolume] = useState(initialVolume);
  const [reverb, setReverb] = useState(0.2);
  const [fader3, setFader3] = useState(30);
  const [fader4, setFader4] = useState(70);
  const [octave, setOctave] = useState(initialOctave);
  const [instrument, setInstrument] = useState<Soundfont | null>(null);

  instrument?.output.setVolume(volume);
  instrument?.output.sendEffect("reverb", reverb);

  const handleOctaveIncrease = () =>
    setOctave((prev) => (prev < 8 ? prev + 1 : prev));

  const handleOctaveDecrease = () =>
    setOctave((prev) => (prev > 0 ? prev - 1 : prev));

  useEffect(() => {
    const ac = new AudioContext();
    const reverb = new Reverb(ac);

    const instrument = new Soundfont(ac, {
      instrument: "lead_2_sawtooth",
      decayTime: 0.5,
      volume: initialVolume,
    });

    instrument.output.addEffect("reverb", reverb, 0);

    setInstrument(instrument);
  }, []);

  return (
    <div
      className={cn(
        className,
        "flex h-[369px] w-[595px] flex-col rounded-xl bg-[#EDE9E8] px-[32px] pt-[10px] shadow-lg",
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
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-neutral-100 shadow-sm transition-all ease-in-out",
                  "active:translate-y-[1px] active:shadow-none",
                )}
              >
                <span
                  className={cn(
                    "text-center font-mono text-[4px] text-neutral-800",
                  )}
                >
                  Hold
                </span>
              </div>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px]">
              <div
                onClick={handleOctaveDecrease}
                className={cn(
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-neutral-100 shadow-sm transition-all ease-in-out",
                  "active:translate-y-[1px] active:shadow-none",
                  octave < initialOctave && "bg-white ",
                )}
              >
                <span
                  className={cn(
                    "text-center font-mono text-[4px] text-neutral-800",
                  )}
                >
                  Oct-
                </span>
              </div>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px] ">
              <div
                onClick={handleOctaveIncrease}
                className={cn(
                  "flex h-[14px] w-[24px] cursor-pointer flex-col justify-center rounded-[1.5px] bg-neutral-100 shadow-sm transition-all ease-in-out",
                  "active:translate-y-[1px] active:shadow-none",
                  octave > initialOctave && "bg-white ",
                )}
              >
                <span
                  className={cn(
                    "text-center font-mono text-[4px] text-neutral-800",
                  )}
                >
                  Oct+
                </span>
              </div>
            </div>
          </div>

          <div className="mr-[2px] mt-[10px] flex justify-between">
            <div className="mod flex-col-items-center flex h-[90px] w-[26px] cursor-pointer flex-col items-center justify-between rounded-[2px] bg-[#EDE9E8] py-[2px]">
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
            <div className="flex h-full w-[63px] flex-col items-center justify-between rounded-sm bg-neutral-900">
              <div className="mt-[23px] rounded-sm bg-black px-[8px] py-[4px] font-mono text-[4px] text-white">
                Arturia
              </div>
              <div className="mb-[17px] h-[24px] w-[24px] cursor-pointer rounded-full bg-neutral-700 shadow-inner"></div>
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
              <Fader
                name="volume"
                min={0}
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
              >
                1
              </Fader>
              <Fader
                name="reverb"
                min={0}
                value={reverb}
                max={1}
                step={0.001}
                onValueChange={setReverb}
              >
                2
              </Fader>
              <Fader
                name="fader3"
                min={0}
                value={fader3}
                max={100}
                step={1}
                onValueChange={setFader3}
              >
                1
              </Fader>
              <Fader
                name="fader4"
                min={0}
                value={fader4}
                max={100}
                step={1}
                onValueChange={setFader4}
              >
                1
              </Fader>
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
        <Keyboard instrument={instrument} octave={octave} />
      </div>
    </div>
  );
};

export default Arturia;
