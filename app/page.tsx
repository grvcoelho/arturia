"use client";

import Link from "next/link";
import Arturia from "@/components/Arturia";
import { ControlButton } from "@/components/ControlButton";
import { useArturiaContext } from "@/contexts/ArturiaContext";
import { MainKnob, StandardKnob } from "@/components/Knobs";
import { Fader } from "@/components/Fader";
import { useEffect, useState } from "react";

export default function Index() {
  const [state, actions] = useArturiaContext();

  const { sustain, octave } = state;
  const { increaseOctave, decreaseOctave, toggleSustain, highlightScale } =
    actions;
  const [exampleFader, setExampleFader] = useState(75);
  const [scale, setScale] = useState("");

  useEffect(() => {
    highlightScale(scale);
  }, [scale, octave]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center overflow-x-hidden py-24">
      <div className="mb-14 max-w-lg space-y-8 px-4 text-center">
        <h1 className="scale-x-[1.3] text-5xl font-semibold tracking-[10px]">
          ARTURIA
        </h1>

        <p>
          This is a virtual recreation of{" "}
          <Link
            href="https://www.arturia.com/products/hybrid-synths/minilab-3/overview"
            className="text-blue-600 underline"
          >
            Arturia&apos;s MiniLab 3
          </Link>{" "}
          MIDI controller made with CSS and JavaScript, brought to you by{" "}
          <Link
            href="https://github.com/grvcoelho"
            className="text-blue-600 underline"
          >
            Gui
          </Link>
          .
        </p>

        <div className="flex h-7 justify-center">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=grvcoelho&type=follow&count=true&size=large"
            width="230"
            height="30"
            title="GitHub"
          ></iframe>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=grvcoelho&repo=arturia&type=star&count=true&size=large"
            width="170"
            height="30"
            title="GitHub"
          ></iframe>
        </div>
      </div>

      <div className="-mb-14 origin-top scale-[0.7] sm:mb-14 sm:scale-100 md:mb-24 md:scale-110 lg:mb-36 lg:scale-125">
        <Arturia />{" "}
      </div>

      <div className="mb-6 w-full max-w-[500px] px-4 text-left">
        <h1 className="mb-2 text-xl font-bold">Learn</h1>

        <div className="mb-3 text-sm">
          <div className="display mb-3 flex items-center gap-x-3 text-sm">
            <label htmlFor="scale">1. Highlight a scale: </label>

            <input
              type="text"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              className="w-60 border-b border-neutral-200 px-2 py-1 text-center text-sm focus:border-neutral-300 focus:outline-none"
              placeholder="e.g F major, D# minor, Bb blues"
            />
          </div>
        </div>
      </div>

      <div className="mb-14 max-w-[500px] px-4 text-left">
        <h1 className="mb-2 text-xl font-bold">Tips</h1>

        <div className="mb-3 text-sm">
          1. Use <kbd className="keyboard-shortcut">A</kbd>
          {", "}
          <kbd className="keyboard-shortcut">W</kbd>
          {", "}
          <kbd className="keyboard-shortcut">S</kbd>
          {", "}
          <kbd className="keyboard-shortcut">E</kbd>
          {", "}
          <kbd className="keyboard-shortcut">D</kbd>
          {", "}
          <kbd className="keyboard-shortcut">F</kbd>
          {", "}
          <kbd className="keyboard-shortcut">T</kbd>
          {", "}
          <kbd className="keyboard-shortcut">G</kbd>
          {", "}
          <kbd className="keyboard-shortcut">Y</kbd>
          {", "}
          <kbd className="keyboard-shortcut">H</kbd>
          {", "}
          <kbd className="keyboard-shortcut">U</kbd>
          {", "}
          <kbd className="keyboard-shortcut">J</kbd>
          {", "}
          <kbd className="keyboard-shortcut">K</kbd>
          {", "}
          <kbd className="keyboard-shortcut">O</kbd>
          {", "}
          <kbd className="keyboard-shortcut">L</kbd>
          {", "}
          <kbd className="keyboard-shortcut">P</kbd>
          {" and "}
          <kbd className="keyboard-shortcut">;</kbd> to play notes on the
          keyboard.
        </div>

        <div className="mb-3 text-sm">
          2. Use the hold button{" "}
          <ControlButton
            onClick={toggleSustain}
            active={sustain}
            className="relative top-[-4px] mx-1 inline-flex scale-125"
          >
            Hold
          </ControlButton>{" "}
          or the <kbd className="keyboard-shortcut">Tab</kbd> key to toggle
          sustain.
        </div>

        <div className="mb-3 text-sm">
          3. Use the octave buttons{" "}
          <ControlButton
            active={octave < 4}
            onClick={decreaseOctave}
            className="relative top-[-4px] mx-1 inline-flex scale-125"
          >
            Oct-
          </ControlButton>{" "}
          and{" "}
          <ControlButton
            active={octave > 4}
            onClick={increaseOctave}
            className="relative top-[-4px] mx-1 inline-flex scale-125"
          >
            Oct+
          </ControlButton>{" "}
          or the <kbd className="keyboard-shortcut">-</kbd> and{" "}
          <kbd className="keyboard-shortcut">+</kbd> keys to change the octave.
        </div>

        <div className="mb-3 text-sm">
          4. Use the main knob{" "}
          <MainKnob className="relative top-1 mx-[2px] inline-flex drop-shadow-lg" />{" "}
          or the <kbd className="keyboard-shortcut">Enter</kbd> key to change
          the instrument.
        </div>

        <div className="mb-3 text-sm">
          5. The standard knobs{" "}
          <StandardKnob className="relative top-1 mr-[2px] inline-flex" />
          are not functional, they&apos;re just for show.
        </div>

        <div className="mb-3 text-sm">
          6. The faders{" "}
          <Fader
            value={exampleFader}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setExampleFader(parseInt(value))}
            name="example"
            className="relative top-[4px] mx-1 inline-flex h-0 w-[62px] [&>input]:-top-[6px] [&>input]:rotate-0"
          />{" "}
          control the volume (1), reverb (2) and velocity (3). Fader 4 currently
          does nothing.
        </div>
      </div>

      <small className="px-4 text-center text-xs text-neutral-400">
        This is a project made for fun and not at all affiliated with the
        Arturia Company.
      </small>
    </main>
  );
}
