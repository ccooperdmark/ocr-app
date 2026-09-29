import React from 'react';
import RaceSelector from '@/components/tools/RaceSelector';
import { Compass, Trophy, Users, Flame, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'OCR Race Styles Explained | Spartan vs Tough Mudder vs Rugged Maniac',
  description: 'Complete breakdown of all major OCR race formats (Spartan, Tough Mudder, Rugged Maniac, Savage Race). Compare fun vs sport vs competitive, best options by level, and tailored training strategies.',
};

export default function RacesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] rounded-sm">
          <Compass className="w-3.5 h-3.5 text-[#ff5500]" /> Complete Race Format Guide
        </div>
        <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase font-sans">
          OCR RACE STYLES <span className="text-[#ff5500]">EXPLAINED</span>
        </h1>
        <p className="text-base text-[#9ca3af] leading-relaxed">
          From backyard mud festivals to Olympic-level mountain competitions: Understand the differences between <strong>Spartan Race</strong>, <strong>Tough Mudder</strong>, <strong>Rugged Maniac</strong>, and <strong>Savage Race</strong>—and discover the exact training needed for your fitness level.
        </p>
      </div>

      {/* Interactive Tool & Comparison Matrix */}
      <RaceSelector />

      {/* Summary Advice Box */}
      <div className="p-8 bg-[#10131d] border border-[#222736] rounded-sm max-w-4xl mx-auto space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase text-[#ccff00] tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#ccff00]" /> Summary Rule of Thumb:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#d1d5db]">
          <div className="p-3 bg-[#0a0c10] border border-[#1f2334] rounded-sm">
            <strong className="text-white block mb-1">Looking for pure fun & zero pressure?</strong>
            Choose <strong>Rugged Maniac</strong>. 5K distance, slides, bounce pads, and a beer festival.
          </div>
          <div className="p-3 bg-[#0a0c10] border border-[#1f2334] rounded-sm">
            <strong className="text-white block mb-1">Want to conquer mental fears with friends?</strong>
            Choose <strong>Tough Mudder</strong>. Zero timing anxiety, teamwork on 15ft Everest walls, and cold plunges.
          </div>
          <div className="p-3 bg-[#0a0c10] border border-[#1f2334] rounded-sm">
            <strong className="text-white block mb-1">Want official timing, rankings & burpees?</strong>
            Choose <strong>Spartan Race</strong>. Strict penalties, heavy carries, and the globally recognized Trifecta medal.
          </div>
          <div className="p-3 bg-[#0a0c10] border border-[#1f2334] rounded-sm">
            <strong className="text-white block mb-1">Love ninja rigs & upper-body grip?</strong>
            Choose <strong>Savage Race</strong>. Innovative rotating ninja grips and the iconic Colossus ramp.
          </div>
        </div>
      </div>

    </div>
  );
}
