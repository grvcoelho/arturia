import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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

const { actions, reducer } = createSlice({
  name: "arturia",
  initialState: {} as ArturiaState,
  reducers: {
    changeVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    changeReverb(state, action: PayloadAction<number>) {
      state.reverb = action.payload;
    },
    changeFader3(state, action: PayloadAction<number>) {
      state.fader3 = action.payload;
    },
    changeFader4(state, action: PayloadAction<number>) {
      state.fader4 = action.payload;
    },
    toggleSustain(state) {
      state.sustain = not(state.sustain);
    },
    increaseOctave(state) {
      state.octave = clamp(0, 8, state.octave + 1);
    },
    decreaseOctave(state) {
      state.octave = clamp(0, 8, state.octave - 1);
    },
    changeInstrument(state, action: PayloadAction<Soundfont>) {
      state.instrument = action.payload;
    },
    changeDrumkit(state, action: PayloadAction<DrumMachine>) {
      state.drumkit = action.payload;
    },
  },
});

export const arturiaReducer = reducer;
export const arturiaActions = actions;
