import React, { useEffect } from "react";
import { DrumMachine, Soundfont, Reverb, CacheStorage } from "smplr";
import {
  BiArrowFromBottom,
  BiUpArrowAlt,
  BiDownArrowAlt,
} from "react-icons/bi";
import { useDebounce } from "usehooks-ts";
import { cn } from "@/lib/styling";
import { Pad } from "./Pad";
import { MainKnob, StandardKnob } from "./Knobs";
import { Fader } from "./Fader";
import { Keyboard } from "./Keyboard";
import { ControlButton } from "./ControlButton";
import { useArturiaContext } from "@/contexts/ArturiaContext";
import {
  DrumNote,
  InstrumentName,
  availableInstruments,
  loadInstrument,
} from "@/lib/music";
import { useKeydown } from "@/lib/keyboardEvents";
import { Display } from "./Display";

interface ArturiaProps {
  className?: string;
  style?: React.CSSProperties;
}

const Arturia: React.FC<ArturiaProps> = ({ className, style }) => {
  const middleOctave = 4;
  const [state, actions] = useArturiaContext();
  const [currentInstrumentName, setCurrentInstrumentName] =
    React.useState<InstrumentName>(availableInstruments[0]);

  const debouncedInstrumentName = useDebounce(currentInstrumentName, 500);

  const {
    instrument,
    reverb,
    sustain,
    volume,
    drumkit,
    octave,
    velocity,
    fader4,
    displayText,
  } = state;

  const {
    changeDrumkit,
    changeVelocity,
    changeFader4,
    changeInstrument,
    changeDisplayText,
    changeReverb,
    changeVolume,
    decreaseOctave,
    increaseOctave,
    toggleSustain,
  } = actions;

  instrument?.output.sendEffect("reverb", reverb);
  instrument?.output.setVolume(volume);
  drumkit?.output.setVolume(volume);

  const handlePadTap = (drumNote: DrumNote) => {
    drumkit?.start({
      note: drumNote,
    });
  };

  const nextInstrument = () => {
    const instrumentIndex = availableInstruments.indexOf(
      debouncedInstrumentName,
    );
    const nextInstrumentIndex =
      (instrumentIndex + 1) % availableInstruments.length;
    const nextInstrumentName = availableInstruments[nextInstrumentIndex];

    setCurrentInstrumentName(nextInstrumentName);
  };

  useKeydown(["Enter"], (e) => {
    e.preventDefault();
    nextInstrument();
  });

  useEffect(() => {
    const ac = new AudioContext();
    const reverbEffect = new Reverb(ac);

    changeDisplayText("Loading...");

    loadInstrument(
      debouncedInstrumentName,
      ac,
      reverbEffect,
      volume,
      reverb,
    ).then((instrument) => {
      changeDisplayText(debouncedInstrumentName);
      changeInstrument(instrument);
    });

    return () => {
      ac.close();
    };
  }, [debouncedInstrumentName]);

  useEffect(() => {
    const ac = new AudioContext();

    const drumkit = new DrumMachine(ac, {
      instrument: "TR-808",
    });

    changeDrumkit(drumkit);

    return () => {
      ac.close();
    };
  }, []);

  return (
    <div
      className={cn(
        className,
        "flex h-[369px] w-[595px] flex-col rounded-xl bg-[#EDE9E8] px-[32px] pt-[10px] shadow-xl",
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
              <ControlButton onClick={toggleSustain} active={sustain}>
                Hold
              </ControlButton>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px]">
              <ControlButton
                onClick={decreaseOctave}
                active={octave < middleOctave}
              >
                Oct-
              </ControlButton>
            </div>
            <div className="mt-[8px] flex h-[20px] w-[32px] items-center justify-center rounded-[2px] ">
              <ControlButton
                onClick={increaseOctave}
                active={octave > middleOctave}
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
            <div className="flex h-full w-[63px] flex-col items-center justify-between rounded-sm bg-neutral-950">
              <Display text={displayText} />

              <MainKnob className="mb-[10px]" onClick={nextInstrument} />
            </div>
            <div className="mb-[6px] ml-[11px] flex h-[89px] w-[189px] flex-wrap gap-x-[33px] gap-y-[18px]">
              <StandardKnob>1</StandardKnob>
              <StandardKnob>2</StandardKnob>
              <StandardKnob>3</StandardKnob>
              <StandardKnob>4</StandardKnob>
              <StandardKnob>5</StandardKnob>
              <StandardKnob>6</StandardKnob>
              <StandardKnob>7</StandardKnob>
              <StandardKnob>8</StandardKnob>
            </div>
            <div className="ml-[29px] flex h-[89px] w-[134px] justify-between ">
              <Fader
                name="volume"
                min={0}
                value={volume}
                max={100}
                step={1}
                onValueChange={changeVolume}
              >
                1
              </Fader>
              <Fader
                name="reverb"
                min={0}
                value={reverb}
                max={1}
                step={0.001}
                onValueChange={changeReverb}
              >
                2
              </Fader>
              <Fader
                name="velocity"
                min={0}
                value={velocity}
                max={127}
                step={1}
                onValueChange={changeVelocity}
              >
                3
              </Fader>
              <Fader
                name="fader4"
                min={0}
                value={fader4}
                max={100}
                step={1}
                onValueChange={changeFader4}
              >
                4
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
      <div className="flex h-[29px] w-full items-end">
        <div className="mb-[4px] ml-[12px] text-[12px] tracking-widest">
          <span className="font-semibold">MINI</span>
          <span>LAB</span>
          <span className="font-bold">3</span>
        </div>

        <div className="mb-[6px] ml-[35px]">
          <div className="relative flex w-[312px] scale-y-[1.3] justify-between text-[5px] font-medium text-stone-400">
            <span className="absolute -left-[24px]">MIDI CH</span>
            <span className="w-[10px] text-center">1</span>
            <span className="w-[10px] text-center">2</span>
            <span className="w-[10px] text-center">3</span>
            <span className="w-[10px] text-center">4</span>
            <span className="w-[10px] text-center">5</span>
            <span className="w-[10px] text-center">6</span>
            <span className="w-[10px] text-center">7</span>
            <span className="w-[10px] text-center">8</span>
            <span className="w-[10px] text-center">9</span>
            <span className="w-[10px] text-center">10</span>
            <span className="w-[10px] text-center">11</span>
            <span className="w-[10px] text-center">12</span>
            <span className="w-[10px] text-center">13</span>
            <span className="w-[10px] text-center">14</span>
            <span className="w-[10px] text-center">15</span>
            <span className="w-[10px] text-center">16</span>
          </div>
        </div>

        <div className="mb-[3px] ml-auto mr-[13px] inline-block scale-x-125 text-[11px] tracking-[1px]">
          <span className="font-semibold">ARTURIA</span>
        </div>
      </div>
      <div>
        <Keyboard />
      </div>
    </div>
  );
};

export default Arturia;
