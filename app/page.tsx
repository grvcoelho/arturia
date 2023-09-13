"use client";

import Link from "next/link";
import Arturia from "@/components/Arturia";
import GitHubButton from "react-github-btn";

export default function Index() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-20 py-10">
      <div className="max-w-lg text-center">
        <h1 className="mb-10 scale-x-[1.3] text-5xl font-semibold tracking-[10px]">
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
        <p className="mb-10">
          <Link
            href="https://github.com/grvcoelho/arturia"
            className="text-blue-600 underline"
          >
            View the code
          </Link>{" "}
          on Github.
        </p>

        <div className="h-7">
          <GitHubButton
            href="https://github.com/grvcoelho/arturia"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star grvcoelho/arturia on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>

      <div className="mt-4 flex w-full items-center justify-center">
        <Arturia className="scale-[0.70] sm:scale-100 md:scale-110 lg:scale-125" />
      </div>

      <small className="py-8 text-xs text-neutral-400">
        This is a project made for fun and not at all affiliated with the
        Arturia Company.
      </small>
    </main>
  );
}
