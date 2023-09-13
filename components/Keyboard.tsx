"use client";

import { Soundfont } from "smplr";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/styling";
import { Key } from "./Key";

interface KeyboardProps {
  children?: React.ReactNode;
}

export const Keyboard: React.FC<KeyboardProps> = ({ children }) => {
  const [instrument, setInstrument] = useState<Soundfont | null>(null);

  useEffect(() => {
    const ac = new AudioContext();

    const instrument = new Soundfont(ac, {
      instrument: "lead_2_sawtooth",
    });

    setInstrument(instrument);
  }, []);

  const playNote = (note) => {
    instrument?.start({
      note,
      duration: 200,
    });

    if (!instrument) return;
    note.time = (note.time ?? 0) + instrument.context.currentTime;
    instrument.start(note);
  };

  const stopNote = (midi) => {
    instrument?.stop({ stopId: midi });
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
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="C"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="C#"
        octave={4}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="D"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="D#"
        octave={4}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="E"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="F"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="F#"
        octave={4}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="G"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="G#"
        octave={4}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="A"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="A#"
        octave={4}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="B"
        octave={4}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="C"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="C#"
        octave={5}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="D"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="D#"
        octave={5}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="E"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="F"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="F#"
        octave={5}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="G"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="G#"
        octave={5}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="A"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="A#"
        octave={5}
        type="accidental"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="B"
        octave={5}
        type="natural"
      />
      <Key
        onPress={playNote}
        onRelease={stopNote}
        note="C"
        octave={6}
        type="natural"
      />
    </div>
  );
};
