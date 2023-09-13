import React from "react";
import { cn } from "@/lib/styling";
import { useArturiaContext } from "@/contexts/arturia";
import { notesFromOctave, type Note } from "@/lib/music";
import { Key } from "./Key";

export const Keyboard: React.FC = ({}) => {
  const [state] = useArturiaContext();

  const { instrument, octave, sustain, velocity } = state;

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
      velocity,
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
