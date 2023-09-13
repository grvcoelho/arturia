import { cn } from "@/lib/styling";
import Arturia from "@/components/Arturia";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20">
      <div className="text-center">
        <h1 className="text-5xl font-black font-extrabold text-black">
          🎵 Synth
        </h1>
      </div>

      <div>
        <Arturia />
      </div>

      <div>
        <Image src="/arturia.png" width={595} height={369} />
      </div>
    </main>
  );
}
