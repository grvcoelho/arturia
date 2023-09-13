import Image from 'next/image'

const Keyboard = () => {
  const keys = [
    { note: 'C', color: 'white' },
    { note: 'C#', color: 'black' },
    { note: 'D', color: 'white' },
    { note: 'D#', color: 'black' },
    { note: 'E', color: 'white' },
    { note: 'F', color: 'white' },
    { note: 'F#', color: 'black' },
    { note: 'G', color: 'white' },
    { note: 'G#', color: 'black' },
    { note: 'A', color: 'white' },
    { note: 'A#', color: 'black' },
    { note: 'B', color: 'white' },
  ]

  return <div className="bg-black">piano</div>
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1 className="font-extrabold text-black text-8xl font-black">
          🎵 Synth
        </h1>
      </div>

      <div>
        <Keyboard />
      </div>
    </main>
  )
}
