"use client";

import Arturia from "@/components/Arturia";

export default function Index() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center space-y-20">
      <div className="flex w-full items-center justify-center">
        <Arturia className="scale-[0.6] sm:scale-100" />
      </div>
    </main>
  );
}
