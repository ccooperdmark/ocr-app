'use client';

import React from 'react';
import { 
  INTERMEDIATE_RACE_PREP_DATA, 
  IntermediateRacePrep 
} from '@/data/intermediateTierData';
import { 
  Compass, 
  Calendar, 
  Target, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Activity, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function IntermediateRacePrepSection() {
  const prep = INTERMEDIATE_RACE_PREP_DATA;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. RACE COUNTDOWN & BANNER */}
      <div className="bg-[#0e111a] border-2 border-[#ffaa00] p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#22293d]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider bg-[#ffaa00] text-black clip-angled">
                {prep.countdownDays} DAYS TO START LINE
              </span>
              <span className="text-xs font-mono text-[#00ff88] font-bold uppercase">
                {prep.raceOrg}
              </span>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              {prep.raceName}
            </h3>
            <p className="text-xs text-[#9ca3af] max-w-xl leading-relaxed">
              Target Course: <strong>{prep.distanceKm} Kilometers</strong> • <strong>{prep.obstacleCount} Obstacles</strong> • <strong>{prep.elevationGainM}m Vertical Gain</strong>
            </p>
          </div>

          {/* Quick Readiness Score */}
          <div className="bg-[#121622] border border-[#22293d] p-4 rounded-sm flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Race Day Readiness</span>
              <span className="text-3xl font-mono font-black text-[#00ff88]">
                {prep.readinessScorePercent}%
              </span>
              <span className="text-[10px] font-mono text-[#ffaa00] block">On Track for Goal</span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-[#ffaa00] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#ffaa00]" />
            </div>
          </div>
        </div>

        {/* Current Training Phase Detail */}
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#121520] border border-[#202738] rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#ffaa00] font-bold uppercase">Current Training Phase</span>
              <span className="text-xs font-mono text-[#00ff88]">Week {prep.phaseWeek} of {prep.totalPhaseWeeks}</span>
            </div>
            <h5 className="text-base font-bold text-white">{prep.currentPhase}</h5>
            <div className="space-y-1 pt-1 text-xs">
              <span className="text-[10px] font-mono uppercase text-[#9ca3af] block">Current Focus Priorities:</span>
              <ul className="space-y-1 text-[#cbd5e1]">
                {prep.phaseFocusAreas.map((focus, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mt-0.5" />
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#121520] border border-[#202738] rounded-sm flex flex-col justify-between space-y-3">
            <div>
              <span className="text-[10px] font-mono text-[#9ca3af] uppercase block mb-1">Upcoming Next Phase:</span>
              <h5 className="text-sm font-bold text-white">{prep.upcomingPhase}</h5>
              <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                As race day approaches, training transitions from general capacity into high-speed obstacle simulations and taper protocols.
              </p>
            </div>
            <div className="p-2.5 bg-[#0a0c12] border border-[#1b2234] rounded-sm text-[11px] font-mono text-[#00e5ff] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00e5ff]" />
              <span>Taper Phase commences at Week 11 (-40% volume hold)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RACE JOURNEY TIMELINE */}
      <div className="p-6 bg-[#0e1017] border border-[#222736] rounded-sm space-y-4">
        <h4 className="text-sm font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#00ff88]" /> Race Journey Roadmap
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 pt-2">
          {prep.raceJourneyMilestones.map((milestone, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-sm border flex flex-col justify-between text-xs font-mono space-y-2 ${
                milestone.status === 'completed'
                  ? 'bg-[#10151f] border-[#00ff88]/40'
                  : milestone.status === 'current'
                  ? 'bg-[#1a1710] border-[#ffaa00] shadow-md ring-1 ring-[#ffaa00]/40'
                  : 'bg-[#0a0c12] border-[#1c2234] opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-bold ${
                  milestone.status === 'completed'
                    ? 'bg-[#00ff88]/20 text-[#00ff88]'
                    : milestone.status === 'current'
                    ? 'bg-[#ffaa00]/20 text-[#ffaa00]'
                    : 'bg-[#181c28] text-[#9ca3af]'
                }`}>
                  {milestone.status}
                </span>
                <span className="text-[10px] text-[#6b7280]">{milestone.date}</span>
              </div>
              <div className="text-white font-bold text-[11px] leading-tight pt-1">
                {milestone.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. KEY RACE WORKOUTS & BASIC RACE FUELING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recommended Race-Specific Workouts */}
        <div className="p-5 bg-[#0e1017] border border-[#222736] rounded-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ffaa00]" /> Race-Specific Simulation Workouts
            </h4>
            <span className="text-[10px] font-mono text-[#9ca3af]">2 Prescribed This Microcycle</span>
          </div>

          <div className="space-y-3 pt-1">
            {prep.recommendedRaceWorkouts.map((rw, i) => (
              <div key={i} className="p-3.5 bg-[#121520] border border-[#1e2332] rounded-sm space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{rw.title}</span>
                  <span className="text-[10px] font-mono text-[#ffaa00] uppercase font-bold">{rw.targetDay}</span>
                </div>
                <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                  {rw.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Race Day Fueling Guide */}
        <div className="p-5 bg-[#0e1017] border border-[#222736] rounded-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
              <Utensils className="w-4 h-4 text-[#00e5ff]" /> Basic Race Day Fueling Guide
            </h4>
            <span className="text-[10px] font-mono text-[#00ff88]">Simple Protocol</span>
          </div>

          <div className="space-y-3 pt-1">
            {prep.simpleFuelingPlan.map((fuel, i) => (
              <div key={i} className="p-3.5 bg-[#121520] border border-[#1e2332] rounded-sm space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase text-[#00e5ff] font-bold block">
                  {fuel.timing}
                </span>
                <p className="text-[11px] text-[#d1d5db]">
                  {fuel.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
