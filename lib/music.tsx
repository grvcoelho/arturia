"use client";

import TonalNote from "@tonaljs/note";
import { CacheStorage, Reverb, Soundfont } from "smplr";

export type Note = {
  midi: number;
  oct: number;
};

export type DrumNote =
  | "kick"
  | "snare"
  | "clap"
  | "tom-hi"
  | "mid-tom"
  | "cymbal"
  | "hihat-close"
  | "hihat-open";

export const isMidiAccidental = (midi: number) =>
  [1, 3, 6, 8, 10].includes(midi % 12);

export const getChromaFromNote = (note: Note) =>
  TonalNote.get(TonalNote.fromMidi(note.midi)).chroma || -1;

export const notesFromOctave = (oct: number): Array<Note> => {
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

const instrumentNames = [
  "lead_2_sawtooth",
  "electric_piano_1",
  "marimba",
  "trumpet",
  "tuba",
] as const;

export const availableInstruments = [
  "lead_2_sawtooth",
  "electric_piano_1",
  "marimba",
  "trumpet",
  "tuba",
] as const;

export type InstrumentName = (typeof availableInstruments)[number];

let storage: CacheStorage;

const getStorage = (): CacheStorage | undefined => {
  try {
    storage = new CacheStorage();
    return storage;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const loadInstrument = (
  instrumentName: InstrumentName,
  ac: AudioContext,
  reverbEffect: Reverb,
  volume: number,
  reverb: number,
) => {
  const instrument = new Soundfont(ac, {
    instrument: instrumentName,
    decayTime: 0.5,
    volume,
    storage: getStorage(),
  });

  instrument.output.addEffect("reverb", reverbEffect, reverb);

  return instrument.loaded();
};
