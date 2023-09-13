import { useEffect, useRef } from "react";

type KeyboardEventHandler = (event: KeyboardEvent) => any;

const useKeypress =
  (type: "keydown" | "keyup") =>
  (keys: string[], callback: KeyboardEventHandler) => {
    const callbackRef = useRef<KeyboardEventHandler>(callback);

    useEffect(() => {
      callbackRef.current = (e: KeyboardEvent) => {
        if (keys.includes(e.key)) {
          callback(e);
        }
      };
    }, [callback, keys]);

    useEffect(() => {
      const handleKeypress = (event: KeyboardEvent) => {
        callbackRef.current(event);
      };

      window.addEventListener(type, handleKeypress);

      return () => {
        window.removeEventListener(type, handleKeypress);
      };
    }, []);
  };

export const useKeydown = useKeypress("keydown");
export const useKeyup = useKeypress("keyup");
