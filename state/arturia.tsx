import { bindActionCreators } from "@/lib/state";
import {
  type Dispatch,
  type PayloadAction,
  type ActionCreatorsMapObject,
  createSlice,
} from "@reduxjs/toolkit";
import { clamp, not } from "ramda";
import React, { useReducer, createContext, PropsWithChildren } from "react";
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

export const initialState: ArturiaState = {
  volume: 90,
  reverb: 0.2,
  fader3: 30,
  fader4: 70,
  sustain: false,
  octave: 4,
  instrument: null,
  drumkit: null,
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

type ArturiaActions = typeof actions;

type ArturiaContext = [ArturiaState, ArturiaActions];

export const ArturiaContext = createContext<ArturiaContext>([
  initialState as ArturiaState,
  {} as ArturiaActions,
]);

export const ArturiaProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const boundActions = bindActionCreators(actions, dispatch);

  return (
    <ArturiaContext.Provider value={[state, boundActions]}>
      {children}
    </ArturiaContext.Provider>
  );
};
