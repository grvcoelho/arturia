import React, { useState, useEffect } from "react";
import TonalNote from "@tonaljs/note";
import { Soundfont } from "smplr";
import { cn } from "@/lib/styling";

type Note = {
  midi: number;
  oct: number;
};

const isMidiAccidental = (midi: number) => [1, 3, 6, 8, 10].includes(midi % 12);

const notesFromOctave = (oct: number): Array<Note> => {
  // C1 starts at midi note 24
  // C4 starts at midi note 60
  const midiBase = oct * 12 + 12;

  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .map((n) => n + midiBase)
    .map((midi) => ({
      midi,
      oct,
    }));
};

interface KeyProps {
  className?: string;
  note: Note;
  onPress?: (note: Note) => void;
  onRelease?: (note: Note) => void;
}

export const Key: React.FC<KeyProps> = ({
  className,
  note,
  onPress,
  onRelease,
}) => {
  const [active, setActive] = useState(false);
  const chroma = TonalNote.get(TonalNote.fromMidi(note.midi)).chroma || -1;
  const isAccidental = isMidiAccidental(note.midi);

  const handlePress = () => {
    setActive(true);
    onPress && onPress(note);
  };

  const handleRelease = () => {
    setActive(false);
    onRelease && onRelease(note);
  };

  return (
    <div
      className={cn(
        "key",

        "relative float-left ml-[2px] flex cursor-pointer items-end justify-center rounded-b-[1px] border-neutral-900 pb-1 first:ml-0",

        "origin-top transition-transform duration-75 ease-in",

        active && "active scale-[.99]",

        isAccidental &&
          "-left-[11px] z-30 -mr-[22px] h-[94px] w-[20px] bg-black text-white",

        !isAccidental &&
          "natural" &&
          "z-20 h-[150px] w-[33px] bg-[#F4F1F4] text-black",

        [1, 6].includes(chroma) && "left-[-16px]",

        [3, 10].includes(chroma) && "left-[-6px]",

        className,
      )}
      onMouseDown={handlePress}
      onMouseLeave={handleRelease}
      onMouseUp={handleRelease}
    ></div>
  );
};

interface KeyboardProps {
  instrument: Soundfont | null;
  octave: number;
  sustain: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  instrument,
  octave,
  sustain,
}) => {
  const notes = [
    ...notesFromOctave(octave),
    ...notesFromOctave(octave + 1),
    notesFromOctave(octave + 2)[0],
  ];

  const pressKey = (note: Note) => {
    if (!instrument) return;

    instrument.start({
      note: note.midi,
      time: instrument.context.currentTime,
      velocity: 100,
    });
  };

  const releaseKey = (note: Note) => {
    if (sustain) return;
    instrument?.stop(note.midi);
  };

  return (
    <div
      className={cn(
        "keyboard",
        "relative z-20 flex h-full justify-center rounded bg-neutral-900",
        "before:content-[' '] before:absolute before:left-0 before:right-0 before:z-20 before:h-[150px] before:w-full before:rounded-[4px] before:shadow-inner",
        "after:content-[' '] after:absolute after:left-0 after:right-0 after:-z-20 after:h-[166px] after:w-full after:rounded-[0px]",
      )}
    >
      {notes.map((note) => (
        <Key
          key={note.midi}
          note={note}
          onPress={pressKey}
          onRelease={releaseKey}
        />
      ))}
    </div>
  );
};
