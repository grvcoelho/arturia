"use client";

import { Note, notesFromOctave } from "@/lib/music";
import { bindActionCreators } from "@/lib/state";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clamp, not } from "ramda";
import React, { useReducer, createContext, useContext } from "react";
import { DrumMachine, Soundfont } from "smplr";
import Scale from "@tonaljs/scale";
import TonalNote from "@tonaljs/note";
import Range from "@tonaljs/range";
import * as R from "ramda";

export type KeyboardKey = {
  note: Note;
  active: boolean;
  highlight?: boolean;
};

export type ArturiaState = {
  scale: string;
  displayText: string;
  volume: number;
  reverb: number;
  velocity: number;
  fader4: number;
  sustain: boolean;
  octave: number;
  instrument: Soundfont | null;
  drumkit: DrumMachine | null;
  keyboardKeys: Array<KeyboardKey>;
};

const keysFromOctave = (octave: number): Array<KeyboardKey> => {
  const notes = [
    ...notesFromOctave(octave),
    ...notesFromOctave(octave + 1),
    notesFromOctave(octave + 2)[0],
  ];

  const keys = notes.map((note) => ({ note, active: false, highlight: false }));

  return keys;
};

function getInitialState(): ArturiaState {
  const initialOctave = 4;
  const keyboardKeys = keysFromOctave(initialOctave);

  return {
    scale: "",
    displayText: "Arturia",
    volume: 90,
    reverb: 0.2,
    velocity: 100,
    fader4: 70,
    sustain: false,
    octave: 4,
    instrument: null,
    drumkit: null,
    keyboardKeys,
  };
}

const { actions, reducer } = createSlice({
  name: "arturia",
  initialState: {} as ArturiaState,
  reducers: {
    activateKey(state, action: PayloadAction<KeyboardKey>) {
      const index = state.keyboardKeys.findIndex(
        (k) => k.note.midi === action.payload.note.midi,
      );
      state.keyboardKeys[index].active = true;
    },
    deactivateKey(state, action: PayloadAction<KeyboardKey>) {
      const index = state.keyboardKeys.findIndex(
        (k) => k.note.midi === action.payload.note.midi,
      );
      state.keyboardKeys[index].active = false;
    },
    highlightScale(state, action: PayloadAction<string>) {
      const adjustRoot = R.pipe(
        R.defaultTo(""),
        R.toLower,
        R.replace(/^./, R.toUpper),
      );

      const adjustMode = R.pipe(R.defaultTo(""), R.toLower);

      const [root, mode] = R.pipe(
        R.split(" "),
        R.adjust(0, adjustRoot),
        R.adjust(1, adjustMode),
        R.take(2),
      )(action.payload);

      const scaleName = `${root}${state.octave} ${mode}`;

      const degrees = Scale.degrees(scaleName);
      const midiNotes = Range.numeric([1, 8]).map(degrees).map(TonalNote.midi);

      state.scale = scaleName;

      state.keyboardKeys = state.keyboardKeys.map((k) => {
        const highlight = midiNotes.includes(k.note.midi);

        return { ...k, highlight };
      });
    },
    setkeys(state, action: PayloadAction<Array<KeyboardKey>>) {
      state.keyboardKeys = action.payload;
    },
    changeDisplayText(state, action: PayloadAction<string>) {
      state.displayText = action.payload;
    },
    changeVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    changeReverb(state, action: PayloadAction<number>) {
      state.reverb = action.payload;
    },
    changeVelocity(state, action: PayloadAction<number>) {
      state.velocity = action.payload;
    },
    changeFader4(state, action: PayloadAction<number>) {
      state.fader4 = action.payload;
    },
    toggleSustain(state) {
      state.sustain = not(state.sustain);
    },
    increaseOctave(state) {
      const newOctave = clamp(0, 8, state.octave + 1);
      const keys = keysFromOctave(newOctave);
      state.octave = newOctave;
      state.keyboardKeys = keys;
    },
    decreaseOctave(state) {
      const newOctave = clamp(0, 8, state.octave - 1);
      const keys = keysFromOctave(newOctave);
      state.octave = newOctave;
      state.keyboardKeys = keys;
    },
    changeInstrument(state, action: PayloadAction<Soundfont>) {
      state.instrument = action.payload;
    },
    changeDrumkit(state, action: PayloadAction<DrumMachine>) {
      state.drumkit = action.payload;
    },
  },
});

type ArturiaActions = typeof actions;

type ArturiaContext = [ArturiaState, ArturiaActions];

export const ArturiaContext = createContext<ArturiaContext>([
  getInitialState() as ArturiaState,
  {} as ArturiaActions,
]);

export const useArturiaContext = () => useContext(ArturiaContext);

export const ArturiaProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const boundActions = bindActionCreators(actions, dispatch);

  return (
    <ArturiaContext.Provider value={[state, boundActions]}>
      {children}
    </ArturiaContext.Provider>
  );
};
