import React from 'react';
import WorkoutPlanGenerator from '@/components/tools/WorkoutPlanGenerator';
import { Layers, ShieldCheck, Zap, Mountain } from 'lucide-react';

export const metadata = {
  title: 'Custom OCR Training Plan Generator | GRIT OCR',
  description: 'Generate a customized 7-day periodized workout schedule for your exact fitness level, race distance, equipment, and training phase.',
};

export default function GeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] rounded-sm">
          <Layers className="w-3.5 h-3.5 text-[#ff5500]" /> Dynamic Periodization Engine
        </div>
        <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase font-sans">
          CUSTOM OCR <span className="text-[#ff5500]">WORKOUT GENERATOR</span>
        </h1>
        <p className="text-base text-[#9ca3af] leading-relaxed">
          Select your fitness tier, target race distance, available equipment, and periodization phase to generate an authentic 7-day training microcycle with coaching cues and interactive completion tracking.
        </p>
      </div>

      {/* Generator Tool */}
      <WorkoutPlanGenerator />

      {/* Trust & Methodology Footer */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#1c202d] text-center">
        <div className="p-4 bg-[#0c0e14] border border-[#1d212f] rounded-sm">
          <Zap className="w-5 h-5 text-[#ff5500] mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold uppercase text-white">6 Fitness Components</h4>
          <p className="text-[11px] text-[#6b7280] mt-1">Grip, Engine, Carries, Obstacles, Burpees & Durability</p>
        </div>
        <div className="p-4 bg-[#0c0e14] border border-[#1d212f] rounded-sm">
          <Mountain className="w-5 h-5 text-[#ccff00] mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold uppercase text-white">Course-Calibrated Vert</h4>
          <p className="text-[11px] text-[#6b7280] mt-1">Weekly elevation tailored to Sprint, Super, or Beast</p>
        </div>
        <div className="p-4 bg-[#0c0e14] border border-[#1d212f] rounded-sm">
          <ShieldCheck className="w-5 h-5 text-[#00e5ff] mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold uppercase text-white">Interactive Tracking</h4>
          <p className="text-[11px] text-[#6b7280] mt-1">Check off days and launch directly into WOD timers</p>
        </div>
      </div>

    </div>
  );
}
