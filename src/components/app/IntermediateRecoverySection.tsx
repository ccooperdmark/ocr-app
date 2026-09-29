'use client';

import React from 'react';
import { 
  INTERMEDIATE_RECOVERY_DATA, 
  IntermediateRecoveryInsight 
} from '@/data/intermediateTierData';
import { 
  ShieldCheck, 
  Heart, 
  Moon, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Clock,
  Zap,
  Smile
} from 'lucide-react';

export default function IntermediateRecoverySection() {
  const recovery = INTERMEDIATE_RECOVERY_DATA;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. MAIN READINESS DIAL & SUMMARY */}
      <div className="bg-[#0e111a] border-2 border-[#00ff88] p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Big Circular Score */}
          <div className="flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#202638] text-center">
            <span className="text-xs font-mono font-bold uppercase text-[#9ca3af]">
              Daily Readiness Score
            </span>
            <div className="text-6xl sm:text-7xl font-mono font-black text-[#00ff88] my-2">
              {recovery.readinessScore}
            </div>
            <div className="px-3 py-1 bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] text-xs font-mono font-bold uppercase tracking-wider rounded-sm">
              {recovery.readinessStatus}
            </div>
          </div>

          {/* Actionable Directive */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00ff88] uppercase">
              <CheckCircle2 className="w-4 h-4" /> Autoregulation Recommendation
            </div>
            <h4 className="text-xl font-bold text-white leading-snug">
              Proceed with planned intensity and prescribed volumes.
            </h4>
            <p className="text-xs text-[#d1d5db] leading-relaxed">
              {recovery.coachRecommendation}
            </p>
            <div className="p-3 bg-[#0a0c12] border-l-2 border-[#00ff88] rounded-r-sm text-xs font-mono text-[#cbd5e1]">
              <span className="text-[#00ff88] font-bold">Training Load Status: </span>
              {recovery.weeklyTrainingLoad} (Acute stress matches your current adaptive capacity).
            </div>
          </div>

        </div>
      </div>

      {/* 2. 4 INTUITIVE RECOVERY PILLARS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Sleep Pillar */}
        <div className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-[#00e5ff]" /> Sleep Duration
            </span>
            <span className="text-[10px] font-mono text-[#00ff88] font-bold">Optimal</span>
          </div>
          <div className="text-2xl font-mono font-black text-white">
            {recovery.sleepHours} Hours
          </div>
          <p className="text-[11px] text-[#9ca3af] font-mono">
            Quality Rating: {recovery.sleepQualityRating}
          </p>
        </div>

        {/* Soreness Pillar */}
        <div className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#ffaa00]" /> Muscle Soreness
            </span>
            <span className="text-[10px] font-mono text-[#00ff88] font-bold">Managed</span>
          </div>
          <div className="text-2xl font-mono font-black text-white">
            {recovery.sorenessLevel.split(' ')[0]}
          </div>
          <p className="text-[11px] text-[#9ca3af] font-mono">
            {recovery.sorenessLevel}
          </p>
        </div>

        {/* Fatigue Pillar */}
        <div className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#ff7733]" /> Systemic Fatigue
            </span>
            <span className="text-[10px] font-mono text-[#00ff88] font-bold">Low</span>
          </div>
          <div className="text-2xl font-mono font-black text-white">
            {recovery.fatigueLevel.split(' ')[0]}
          </div>
          <p className="text-[11px] text-[#9ca3af] font-mono">
            Productive training stress
          </p>
        </div>

        {/* Training Load Balance */}
        <div className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00ff88]" /> Load Balance
            </span>
            <span className="text-[10px] font-mono text-[#00ff88] font-bold">In Zone</span>
          </div>
          <div className="text-2xl font-mono font-black text-white">
            {recovery.weeklyTrainingLoad}
          </div>
          <p className="text-[11px] text-[#9ca3af] font-mono">
            No reactive deload needed
          </p>
        </div>

      </div>

      {/* 3. PRACTICAL RECOVERY PROTOCOL */}
      <div className="p-5 bg-[#0e1017] border border-[#222736] rounded-sm space-y-3">
        <h4 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
          <Smile className="w-4 h-4 text-[#00ff88]" /> Daily Recovery Habits & Nutrition Checklist
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm space-y-1">
            <span className="text-[10px] font-mono text-[#00e5ff] uppercase font-bold block">Hydration & Sodium</span>
            <p className="text-[#cbd5e1] text-[11px]">Hit 120 oz total water with 500mg sodium in morning flask to support tendon fluid exchange.</p>
          </div>
          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm space-y-1">
            <span className="text-[10px] font-mono text-[#ffaa00] uppercase font-bold block">Grip & Forearm Flush</span>
            <p className="text-[#cbd5e1] text-[11px]">5 minutes of wrist extensor stretching and contrast soak to clear forearm muscular pump.</p>
          </div>
          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm space-y-1">
            <span className="text-[10px] font-mono text-[#00ff88] uppercase font-bold block">Sleep Hygiene</span>
            <p className="text-[#cbd5e1] text-[11px]">Consistent lights-out by 10:30 PM to maintain 7.5+ hours for deep tissue rebuilding.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
