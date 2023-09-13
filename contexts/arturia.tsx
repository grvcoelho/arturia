"use client";

import { Note, notesFromOctave } from "@/lib/music";
import { bindActionCreators } from "@/lib/state";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { clamp, not } from "ramda";
import React, { useReducer, createContext, useContext } from "react";
import { DrumMachine, Soundfont } from "smplr";

export type KeyboardKey = {
  note: Note;
  active: boolean;
};

export type ArturiaState = {
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

  const keys = notes.map((note) => ({ note, active: false }));

  return keys;
};

function getInitialState(): ArturiaState {
  const initialOctave = 4;
  const keyboardKeys = keysFromOctave(initialOctave);

  return {
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
    setkeys(state, action: PayloadAction<Array<KeyboardKey>>) {
      state.keyboardKeys = action.payload;
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
