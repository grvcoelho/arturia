"use client";

import { useState } from "react";
import Image from "next/image";
import Arturia from "@/components/Arturia";
import { cn } from "@/lib/styling";

export default function Home() {
  const [opacity, setOpacity] = useState(1);
  const [overlap, setOverlap] = useState(false);
  const [invert, setInvert] = useState(false);

  return (
    <>
      <main className="mt-20 flex min-h-screen flex-col items-center space-y-20">
        <div className="text-center">
          <h1 className="text-5xl font-black text-black">🎵 Synth</h1>
        </div>

        <div className="flex w-[500px] flex-col space-y-3">
          <h3 className="text-3xl font-semibold text-black">Dev Controls</h3>

          <div className="w-48">
            <label
              htmlFor="default-range"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Opacity: {opacity}
            </label>

            <input
              id="default-range"
              type="range"
              min="0"
              step="0.01"
              max="1"
              list="opacity"
              onChange={(event) => setOpacity(Number(event.target.value))}
              value={opacity}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            ></input>
          </div>

          <div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={overlap}
                className="peer sr-only"
                onChange={(event) => setOverlap(event.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-0"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Overlap
              </span>
            </label>
          </div>

          <div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={invert}
                className="peer sr-only"
                onChange={(event) => setInvert(event.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-0"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Invert
              </span>
            </label>
          </div>
        </div>

        <div
          className={cn(
            "relative mb-10 flex flex-col",
            !overlap && "space-y-20",
          )}
        >
          <div>
            <Image alt="Arturia" src="/arturia.png" width={595} height={369} />
          </div>

          <Arturia
            className={cn(overlap && "absolute", invert && "invert")}
            style={{ opacity }}
          />
        </div>
      </main>
    </>
  );
}
