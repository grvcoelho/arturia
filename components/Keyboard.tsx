import React, { useEffect } from "react";
import { cn } from "@/lib/styling";
import { type KeyboardKey, useArturiaContext } from "@/contexts/arturia";
import { type Note } from "@/lib/music";
import { Key } from "./Key";
import { useKeydown, useKeyup } from "@/lib/keyboardEvents";

export const Keyboard: React.FC = ({}) => {
  const [
    state,
    {
      activateKey,
      deactivateKey,
      increaseOctave,
      decreaseOctave,
      toggleSustain,
    },
  ] = useArturiaContext();
  const { instrument, sustain, velocity, keyboardKeys } = state;

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

  const controlKeymap = ["+", "-", "Tab"];

  const handlePress = (key: KeyboardKey) => {
    if (!instrument) return;

    activateKey(key);

    instrument.start({
      note: key.note.midi,
      time: instrument.context.currentTime,
      velocity,
    });
  };

  const handleRelease = (key: KeyboardKey) => {
    if (sustain) return;

    deactivateKey(key);
    instrument?.stop(key.note.midi);
  };

  useKeydown(controlKeymap, (e) => {
    e.preventDefault();
    return (
      !e.repeat &&
      ((e.key === "+" && increaseOctave()) ||
        (e.key === "-" && decreaseOctave()) ||
        (e.key === "Tab" && toggleSustain()))
    );
  });

  useKeydown(keymap, (e) => {
    const index = keymap.indexOf(e.key);
    const key = keyboardKeys[index];

    if (key && !e.repeat) handlePress(key);
  });

  useKeyup(keymap, (e) => {
    const index = keymap.indexOf(e.key);
    const key = keyboardKeys[index];

    if (key) handleRelease(key);
  });

  return (
    <div
      className={cn(
        "keyboard",
        "relative z-20 flex h-full justify-center rounded bg-neutral-900",
        "before:content-[' '] before:absolute before:left-0 before:right-0 before:z-20 before:h-[150px] before:w-full before:rounded-[4px] before:shadow-inner",
        "after:content-[' '] after:absolute after:left-0 after:right-0 after:-z-20 after:h-[166px] after:w-full after:rounded-[0px]",
      )}
    >
      {keyboardKeys.map((k) => (
        <Key
          key={k.note.midi}
          keyboardKey={k}
          active={k.active}
          onPress={handlePress}
          onRelease={handleRelease}
        />
      ))}
    </div>
  );
};
