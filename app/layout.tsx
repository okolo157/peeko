import type { Metadata } from "next";
import {
  Orbitron,
  Rajdhani,
  Waiting_for_the_Sunrise,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const waitingForTheSunrise = Waiting_for_the_Sunrise({
  variable: "--font-waiting-for-the-sunrise",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PEEKO.HD - Photography Portfolio",
  description: "Capturing moments, creating memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${waitingForTheSunrise.variable} ${spaceGrotesk.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
