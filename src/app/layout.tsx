import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExperienceTierProvider } from "@/context/ExperienceTierContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRIT OCR | Athletic Performance & Personal Training",
  description: "Specialized coaching, periodization programs, and obstacle technique mastery for Spartan Race, Tough Mudder, and Championship hybrid athletes.",
  keywords: "OCR personal training, Spartan Race training, obstacle course racing coaching, grip strength, burpee penalty elimination, trail running",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full bg-[#07080a] text-[#f3f4f6]">
      <body className="min-h-full flex flex-col carbon-mesh selection:bg-[#ff5500] selection:text-black">
        <ExperienceTierProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ExperienceTierProvider>
      </body>
    </html>
  );
}
