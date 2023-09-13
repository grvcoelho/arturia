import React, { useEffect, useState } from "react";
import { cn } from "@/lib/styling";
import { useArturiaContext } from "@/contexts/arturia";
import { notesFromOctave, type Note } from "@/lib/music";
import { Key } from "./Key";
import { is } from "ramda";

export const Keyboard: React.FC = ({}) => {
  const [state] = useArturiaContext();
  const { instrument, octave, sustain, velocity } = state;
  const [activeNotes, setActiveNotes] = useState<Note[]>([]);

  const isActiveNote = (note: Note) =>
    !!activeNotes.find((n) => n.midi === note.midi);

  const notes = [
    ...notesFromOctave(octave),
    ...notesFromOctave(octave + 1),
    notesFromOctave(octave + 2)[0],
  ];

  const handlePress = (note: Note) => {
    console.log("hey-ho", instrument);
    if (!instrument) return;

    setActiveNotes((prev) => [...prev, note]);

    instrument.start({
      note: note.midi,
      time: instrument.context.currentTime,
      velocity,
    });
  };

  const handleRelease = (note: Note) => {
    if (sustain) return;

    setActiveNotes((prev) => prev.filter((n) => n.midi !== note.midi));
    instrument?.stop(note.midi);
  };

  useEffect(() => {
    const keymap = [
      "a",
      "w",
      "s",
      "e",
      "d",
      "f",
      "t",
      "g",
      "y",
      "h",
      "u",
      "j",
      "k",
      "o",
      "l",
      "p",
      ";",
    ];

    const getNoteFromKey = (key: string) => {
      const index = keymap.indexOf(key);

      return notes[index];
    };

    window.addEventListener("keydown", (e) => {
      const key = e.key;
      const note = getNoteFromKey(key);

      if (keymap.includes(key) && !e.repeat) {
        return handlePress(note);
      }
    });

    window.addEventListener("keyup", (e) => {
      const key = e.key;
      const note = getNoteFromKey(key);

      if (keymap.includes(key)) {
        return handleRelease(note);
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
      window.removeEventListener("keyup", () => {});
    };
  }, [instrument]);

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
          active={isActiveNote(note)}
          onPress={handlePress}
          onRelease={handleRelease}
        />
      ))}
    </div>
  );
};
