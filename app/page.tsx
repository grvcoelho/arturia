import { cn } from "@/lib/styling";

const Key = ({ children, type }) => {
  console.log({ children, type });
  return (
    <div
      className={cn(
        "last:borde relative float-left flex items-end justify-center rounded-b-md border-2 border-neutral-900 pb-1",

        type === "accidental" &&
          "-left-4 z-10 -mr-8 h-24 w-8 bg-black  text-white",

        type === "natural" &&
          " h-44 w-10 border-r-0 bg-white text-black last:border-r-2",
      )}
    >
      {children}
    </div>
  );
};

const Keyboard = () => {
  return (
    <div className="rounded-lg border-2 border-x-neutral-800 border-b-neutral-900 border-t-neutral-600 bg-neutral-700 p-3 shadow-lg">
      <div className="relative flex rounded bg-neutral-900 p-1">
        <Key type="natural">C</Key>
        <Key type="accidental">C#</Key>
        <Key type="natural">D</Key>
        <Key type="accidental">D#</Key>
        <Key type="natural">E</Key>
        <Key type="natural">F</Key>
        <Key type="accidental">F#</Key>
        <Key type="natural">G</Key>
        <Key type="accidental">G#</Key>
        <Key type="natural">A</Key>
        <Key type="accidental">A#</Key>
        <Key type="natural">B</Key>
        <Key type="natural">C</Key>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20">
      <div className="text-center">
        <h1 className="text-5xl font-black font-extrabold text-black">
          🎵 Synth
        </h1>
      </div>

      <div>
        <Keyboard />
      </div>
    </main>
  );
}
