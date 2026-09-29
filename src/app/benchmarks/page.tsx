import React from 'react';
import BenchmarkTracker from '@/components/tools/BenchmarkTracker';
import { Award, ShieldAlert, CheckCircle2, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'OCR Fitness Benchmark Standards | GRIT OCR',
  description: 'Compare your dead hang time, pull-ups, 1-mile pace, and heavy carries against official Novice, Open, Age Group, and Elite OCR standards.',
};

export default function BenchmarksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ccff00] rounded-sm">
          <Award className="w-3.5 h-3.5" /> Performance Analytics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tight text-white uppercase font-sans">
          OCR FITNESS <span className="text-[#ff5500]">BENCHMARKS</span>
        </h1>
        <p className="text-sm text-[#9ca3af]">
          Data-driven physiological standards from over 1,000 Spartan and Tough Mudder competitors. Test your capacity and see where you rank.
        </p>
      </div>

      {/* Tracker Component */}
      <BenchmarkTracker />

      {/* Methodology Explainer */}
      <div className="max-w-4xl mx-auto p-8 bg-[#0b0d13] border border-[#222736] rounded-sm space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#ff5500]" /> The Calibration Behind The Standards
        </h3>
        <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
          These benchmarks were established by analyzing finish times and penalty rates across Spartan North American Championship events. Athletes who test in the <strong>Age Group</strong> tier clear 94% of obstacles unassisted, while athletes in the <strong>Novice</strong> tier experience an average of 4.2 penalty failures per race.
        </p>
      </div>

    </div>
  );
}
