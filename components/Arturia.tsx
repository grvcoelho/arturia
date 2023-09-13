import React, { useState, useEffect } from "react";
import { DrumMachine, Soundfont, Reverb, getDrumMachineNames } from "smplr";
import {
  BiArrowFromBottom,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";

import { cn } from "@/lib/styling";
import { Pad } from "./Pad";
import { Knob } from "./KnobProps";
import { Fader } from "./Fader";
import { Keyboard } from "./Keyboard";
import { ControlButton } from "./ControlButton";

export type DrumNote =
  | "kick"
  | "snare"
  | "clap"
  | "tom-hi"
  | "mid-tom"
  | "cymbal"
  | "hihat-close"
  | "hihat-open";

interface ArturiaProps {
  className?: string;
  style?: React.CSSProperties;
}

const Arturia: React.FC<ArturiaProps> = ({ className, style }) => {
  const initialVolume = 90;
  const initialOctave = 4;

  const [volume, setVolume] = useState(initialVolume);
  const [reverb, setReverb] = useState(0.2);
  const [sustain, setSustain] = useState(false);
  const [fader3, setFader3] = useState(30);
  const [fader4, setFader4] = useState(70);
  const [octave, setOctave] = useState(initialOctave);
  const [instrument, setInstrument] = useState<Soundfont | null>(null);
  const [drumKit, setDrumKit] = useState<DrumMachine | null>(null);

  instrument?.output.setVolume(volume);
  drumKit?.output.setVolume(volume);
  instrument?.output.sendEffect("reverb", reverb);

  const handleOctaveIncrease = () =>
    setOctave((prev) => (prev < 8 ? prev + 1 : prev));

  const handleOctaveDecrease = () =>
    setOctave((prev) => (prev > 0 ? prev - 1 : prev));

  const handleSustainChange = () => setSustain((prev) => !prev);

  const handlePadTap = (drumNote: DrumNote) => {
    console.log(drumNote);
    console.log(drumKit?.getVariations(drumNote));
    drumKit?.start({
      note: drumNote,
    });
  };

  useEffect(() => {
    const ac = new AudioContext();
    const reverb = new Reverb(ac);

    const instrument = new Soundfont(ac, {
      instrument: "lead_2_sawtooth",
      decayTime: 0.5,
      volume: initialVolume,
    });

    instrument.output.addEffect("reverb", reverb, 0);

    const drumKit = new DrumMachine(ac, {
      instrument: "TR-808",
    });

    setInstrument(instrument);
    setDrumKit(drumKit);
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
              <ControlButton variant="shift">Shift</ControlButton>
            </div>

            <div className="flex h-[20px] w-[32px] items-center justify-center rounded-[2px] ">
              <ControlButton onClick={handleSustainChange} active={sustain}>
                Hold
              </ControlButton>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px]">
              <ControlButton
                onClick={handleOctaveDecrease}
                active={octave < initialOctave}
              >
                Oct-
              </ControlButton>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px] ">
              <ControlButton
                onClick={handleOctaveIncrease}
                active={octave > initialOctave}
              >
                Oct+
              </ControlButton>
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
            <Pad variant="red" drumNote="kick" onTap={handlePadTap}>
              Arp
            </Pad>
            <Pad variant="orange" drumNote="snare" onTap={handlePadTap}>
              Pad
            </Pad>
            <Pad variant="amber" drumNote="clap" onTap={handlePadTap}>
              Prog
            </Pad>
            <Pad variant="yellow" drumNote="tom-hi" onTap={handlePadTap}>
              Loop
            </Pad>
            <Pad variant="lime" drumNote="mid-tom" onTap={handlePadTap}>
              Stop
            </Pad>
            <Pad variant="green" drumNote="cymbal" onTap={handlePadTap}>
              Play
            </Pad>
            <Pad variant="emerald" drumNote="hihat-close" onTap={handlePadTap}>
              Rec
            </Pad>
            <Pad variant="teal" drumNote="hihat-open" onTap={handlePadTap}>
              Tap
            </Pad>
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
        <Keyboard sustain={sustain} instrument={instrument} octave={octave} />
      </div>
    </div>
  );
};

export default Arturia;
