import { ArturiaProvider } from "@/contexts/arturia";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arturia",
  description: "MIDI keyboard simulation of Arturia Minilab 3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ArturiaProvider>
        <body className={inter.className}>{children}</body>
      </ArturiaProvider>
    </html>
  );
}
