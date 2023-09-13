import { createAction, createReducer } from "@reduxjs/toolkit";
import { clamp, not } from "ramda";
import { useReducer, createContext } from "react";
import { DrumMachine, Soundfont } from "smplr";

export type ArturiaState = {
  volume: number;
  reverb: number;
  fader3: number;
  fader4: number;
  sustain: boolean;
  octave: number;
  instrument: Soundfont | null;
  drumkit: DrumMachine | null;
};

export const changeVolume = createAction<number>("changeVolume");
export const changeReverb = createAction<number>("changeReverb");
export const changeFader3 = createAction<number>("changeFader3");
export const changeFader4 = createAction<number>("changeFader4");
export const toggleSustain = createAction("toggleSustain");
export const increaseOctave = createAction("increaseOctave");
export const decreaseOctave = createAction("decreaseOctave");
export const changeInstrument = createAction<Soundfont>("changeInstrument");
export const changeDrumkit = createAction<DrumMachine>("changeDrumkit");

export const arturiaReducer = createReducer<ArturiaState>(
  {} as ArturiaState,
  (reducer) =>
    reducer
      .addCase(changeVolume, (state, action) => {
        state.volume = action.payload;
      })
      .addCase(changeReverb, (state, action) => {
        state.reverb = action.payload;
      })
      .addCase(changeFader3, (state, action) => {
        state.fader3 = action.payload;
      })
      .addCase(changeFader4, (state, action) => {
        state.fader4 = action.payload;
      })
      .addCase(toggleSustain, (state) => {
        state.sustain = not(state.sustain);
      })
      .addCase(increaseOctave, (state) => {
        state.octave = clamp(0, 8, state.octave + 1);
      })
      .addCase(decreaseOctave, (state) => {
        state.octave = clamp(0, 8, state.octave - 1);
      })
      .addCase(changeInstrument, (state, action) => {
        state.instrument = action.payload;
      })
      .addCase(changeDrumkit, (state, action) => {
        state.drumkit = action.payload;
      }),
);
