import React from 'react';
import WorkoutTimer from '@/components/tools/WorkoutTimer';
import { Timer, Flame, Bell, Zap } from 'lucide-react';

export const metadata = {
  title: 'OCR Interval & Circuit Timer | GRIT OCR',
  description: 'Athletic WOD timer with EMOM, Tabata, AMRAP, and custom interval presets for obstacle training simulations.',
};

export default function TimerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] rounded-sm">
          <Timer className="w-3.5 h-3.5" /> High-Intensity WOD Tool
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tight text-white uppercase font-sans">
          OCR INTERVAL <span className="text-[#ff5500]">&</span> WOD TIMER
        </h1>
        <p className="text-sm text-[#9ca3af]">
          Train compromised running, dead hang intervals, and high-lactate burpee endurance with synthesizer sound cues.
        </p>
      </div>

      {/* Timer Container */}
      <WorkoutTimer />

      {/* Pro training tips for the timer */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#1c202d]">
        <div className="p-6 bg-[#0e1017] border border-[#222736] rounded-sm">
          <h4 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-wider mb-2 flex items-center gap-1.5">
            <Flame className="w-4 h-4" /> How to Use the Grip Gauntlet EMOM
          </h4>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            Set to EMOM (40s Work / 20s Rest). In round 1, do active bar hang. Round 2, towel pull-ups. Round 3, heavy dumbbell hold. The 20s rest simulates dropping off a rig and catching your breath before the next obstacle.
          </p>
        </div>

        <div className="p-6 bg-[#0e1017] border border-[#222736] rounded-sm">
          <h4 className="text-xs font-mono font-bold uppercase text-[#ccff00] tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Why Tabata Burpees Work
          </h4>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            20s sprint burpees with 10s rest drives your heart rate straight into Zone 5. By practicing 8 rounds, you train your brain to stay calm when blood pressure spikes at an obstacle station.
          </p>
        </div>
      </div>

    </div>
  );
}
