import { ArturiaProvider } from "@/contexts/ArturiaContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arturia",
  description:
    "A fully functional recreation of Arturia's MiniLab 3 MIDI controller made with CSS and JavaScript",
  openGraph: {
    type: "website",
    url: "https://grvcoelho.github.io/arturia",
    title: "Arturia",
    description:
      "A fully functional recreation of Arturia's MiniLab 3 MIDI controller made with CSS and JavaScript",
    siteName: "Arturia",
    images: [
      {
        url: "https://github.com/grvcoelho/arturia/blob/main/arturia.png?raw=true",
      },
    ],
  },
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
