import { cn } from "@/lib/styling";
import Keyboard from "@/components/Keyboard";

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
