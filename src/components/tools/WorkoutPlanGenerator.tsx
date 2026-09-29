'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  FitnessLevel, 
  RaceDistance, 
  EquipmentType, 
  TrainingPhase, 
  generateOCRWorkoutPlan,
  DayWorkout 
} from '@/data/workoutGeneratorData';
import { 
  Flame, 
  Zap, 
  Target, 
  Timer, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Mountain, 
  ShieldCheck, 
  Layers, 
  RotateCcw,
  Printer,
  Sparkles
} from 'lucide-react';

export default function WorkoutPlanGenerator() {
  const [level, setLevel] = useState<FitnessLevel>('open');
  const [distance, setDistance] = useState<RaceDistance>('super');
  const [equipment, setEquipment] = useState<EquipmentType>('full-gym');
  const [phase, setPhase] = useState<TrainingPhase>('strength-endurance');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [completedDays, setCompletedDays] = useState<Record<number, boolean>>({});

  const plan = generateOCRWorkoutPlan(level, distance, equipment, phase);

  const toggleDayCompletion = (dayNum: number) => {
    const updated = { ...completedDays, [dayNum]: !completedDays[dayNum] };
    setCompletedDays(updated);

    // If all 7 days completed, celebrate!
    const totalComplete = Object.values(updated).filter(Boolean).length;
    if (totalComplete === 7) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff5500', '#ccff00', '#ffffff', '#ff7733']
        });
      } catch {
        // Fallback
      }
    }
  };

  const getIntensityBadge = (intensity: string) => {
    switch (intensity) {
      case 'Max Effort': return 'bg-[#ff2200]/20 text-[#ff4422] border-[#ff4422]/50';
      case 'High': return 'bg-[#ff5500]/20 text-[#ff5500] border-[#ff5500]/50';
      case 'Moderate': return 'bg-[#ffbb00]/20 text-[#ffbb00] border-[#ffbb00]/50';
      default: return 'bg-[#ccff00]/20 text-[#ccff00] border-[#ccff00]/50';
    }
  };

  const activeWorkout: DayWorkout = plan.schedule[selectedDayIndex];
  const isDayDone = !!completedDays[activeWorkout.dayNumber];
  const completedCount = Object.values(completedDays).filter(Boolean).length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10">
      
      {/* 1. SELECTION CONTROLS */}
      <div className="bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1c202d]">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#ff5500]" /> Workout Customization Matrix
          </span>
          <span className="text-xs font-mono text-[#9ca3af]">
            Real-time Algorithmic Periodization
          </span>
        </div>

        {/* 4 Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Fitness Level */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#d1d5db] mb-2">
              1. Athlete Fitness Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as FitnessLevel)}
              className="w-full px-3 py-2.5 bg-[#12141c] border border-[#242938] text-white rounded-sm text-xs font-mono focus:outline-none focus:border-[#ff5500]"
            >
              <option value="rookie">Rookie (Beginner / 1st Race)</option>
              <option value="open">Open Heat (Weekend Warrior)</option>
              <option value="age-group">Age Group (Competitive)</option>
              <option value="elite">Elite (Podium Contender)</option>
            </select>
          </div>

          {/* Race Distance */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#d1d5db] mb-2">
              2. Target Race Distance
            </label>
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value as RaceDistance)}
              className="w-full px-3 py-2.5 bg-[#12141c] border border-[#242938] text-white rounded-sm text-xs font-mono focus:outline-none focus:border-[#ff5500]"
            >
              <option value="sprint">Sprint (5K / 20 Obstacles)</option>
              <option value="super">Super (10K / 25 Obstacles)</option>
              <option value="beast">Beast (21K / 30 Obstacles)</option>
              <option value="ultra">Ultra (50K / 60 Obstacles)</option>
            </select>
          </div>

          {/* Training Phase */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#d1d5db] mb-2">
              3. Periodization Phase
            </label>
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value as TrainingPhase)}
              className="w-full px-3 py-2.5 bg-[#12141c] border border-[#242938] text-white rounded-sm text-xs font-mono focus:outline-none focus:border-[#ff5500]"
            >
              <option value="base">Phase 1: Base & Connective Tissue (W1-4)</option>
              <option value="strength-endurance">Phase 2: Strength-Endurance (W5-8)</option>
              <option value="peak">Phase 3: Race Simulation (W9-10)</option>
              <option value="taper">Phase 4: Race Week Taper (W11-12)</option>
            </select>
          </div>

          {/* Equipment Setup */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-[#d1d5db] mb-2">
              4. Available Equipment
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value as EquipmentType)}
              className="w-full px-3 py-2.5 bg-[#12141c] border border-[#242938] text-white rounded-sm text-xs font-mono focus:outline-none focus:border-[#ff5500]"
            >
              <option value="full-gym">Full Gym (Barbell, Rigs, Sandbag)</option>
              <option value="home-gym">Home Setup (Dumbbells + Pull-Up Bar)</option>
              <option value="minimal">Minimalist (Bodyweight & Trail)</option>
            </select>
          </div>

        </div>
      </div>

      {/* 2. PLAN OVERVIEW HEADER */}
      <div className="bg-[#12151f] border-l-4 border-[#ff5500] p-6 sm:p-8 rounded-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/40 rounded-sm">
                {plan.distanceTitle}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/40 rounded-sm">
                {plan.levelTitle}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {plan.phaseTitle}
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-3xl">
              {plan.macrocycleFocus}
            </p>
          </div>

          {/* Key Metrics */}
          <div className="flex items-center gap-4 bg-[#0a0c10] p-3.5 border border-[#222736] rounded-sm shrink-0">
            <div>
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Weekly Volume</div>
              <div className="text-lg font-mono font-black text-white">{plan.weeklyMileage}</div>
            </div>
            <div className="h-8 w-px bg-[#222736]"></div>
            <div>
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Target Elevation</div>
              <div className="text-lg font-mono font-black text-[#ccff00] flex items-center gap-1">
                <Mountain className="w-4 h-4 text-[#ccff00]" /> {plan.weeklyElevationTarget}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="pt-4 border-t border-[#1e2332] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#d1d5db]">
              Weekly Completion: {completedCount} / 7 Days
            </span>
            <div className="w-32 bg-[#1b1e2a] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#ff5500] to-[#ccff00] h-full transition-all duration-300"
                style={{ width: `${(completedCount / 7) * 100}%` }}
              ></div>
            </div>
          </div>
          {completedCount === 7 && (
            <span className="text-xs font-mono font-bold text-[#ccff00] animate-pulse flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> MICROCYCLE COMPLETED!
            </span>
          )}
        </div>
      </div>

      {/* 3. DAY SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {plan.schedule.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const isComplete = !!completedDays[day.dayNumber];
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDayIndex(idx)}
              className={`p-3 rounded-sm border text-left transition-all relative ${
                isSelected
                  ? 'bg-[#181b26] border-[#ff5500] shadow-md shadow-[#ff5500]/15'
                  : 'bg-[#0d0f15] border-[#202534] hover:bg-[#12151e]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#9ca3af]">
                  {day.dayName.slice(0, 3)}
                </span>
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" />
                ) : (
                  <Circle className="w-3 h-3 text-[#3d445b]" />
                )}
              </div>
              <div className="text-xs font-bold text-white truncate">
                Day 0{day.dayNumber}
              </div>
              <div className="text-[10px] font-mono text-[#ff7733] truncate mt-0.5">
                {day.focusComponent.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. ACTIVE DAY WORKOUT DETAILS */}
      <div className="bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-10 space-y-8 relative overflow-hidden">
        
        {/* Workout Day Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1c202d]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider">
                {activeWorkout.dayName} • Day 0{activeWorkout.dayNumber}
              </span>
              <span className="text-[#4b5563]">|</span>
              <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border rounded-sm ${getIntensityBadge(activeWorkout.intensity)}`}>
                Intensity: {activeWorkout.intensity}
              </span>
              <span className="text-xs font-mono text-[#9ca3af]">
                Est. Duration: {activeWorkout.estimatedDuration}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {activeWorkout.title}
            </h3>
          </div>

          <button
            onClick={() => toggleDayCompletion(activeWorkout.dayNumber)}
            className={`px-5 py-2.5 rounded-sm font-mono font-bold text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
              isDayDone
                ? 'bg-[#ccff00]/15 text-[#ccff00] border-[#ccff00]'
                : 'bg-[#181b26] hover:bg-[#202534] text-white border-[#2e3448]'
            }`}
          >
            {isDayDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#ccff00]" /> Completed!
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-[#9ca3af]" /> Mark as Completed
              </>
            )}
          </button>
        </div>

        {/* Dynamic Warmup */}
        {activeWorkout.warmup.length > 0 && (
          <div className="p-4 bg-[#12141c] border border-[#202433] rounded-sm space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-[#ccff00] tracking-wider flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#ccff00]" /> Dynamic Warm-Up Protocol
            </h4>
            <ul className="space-y-1 pl-1">
              {activeWorkout.warmup.map((item, i) => (
                <li key={i} className="text-xs text-[#9ca3af] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Exercises List */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#ff5500]" /> Main Training Prescription
          </h4>
          <div className="space-y-3">
            {activeWorkout.mainExercises.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#11131a] border border-[#202434] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#353c52] transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#ff5500]">0{idx + 1}.</span>
                    <h5 className="text-base font-bold text-white">{ex.name}</h5>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#181c28] text-[#9ca3af] rounded-sm">
                      {ex.component}
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af] pl-6 italic">
                    Coaching Cue: {ex.cues}
                  </p>
                </div>

                <div className="flex items-center gap-6 pl-6 md:pl-0 shrink-0 text-xs font-mono">
                  <div>
                    <span className="text-[#6b7280] block text-[10px] uppercase">Sets</span>
                    <span className="font-bold text-white">{ex.sets}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block text-[10px] uppercase">Target / Reps</span>
                    <span className="font-bold text-[#ccff00]">{ex.repsOrTime}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block text-[10px] uppercase">Rest</span>
                    <span className="font-bold text-[#ff7733]">{ex.rest}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compromised Metcon / Finisher Callout */}
        {activeWorkout.compromisedFinisher && (
          <div className="p-5 bg-gradient-to-r from-[#1b1515] to-[#12141c] border-l-4 border-[#ff5500] rounded-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff5500]">
                  Compromised Race Simulation Finisher
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {activeWorkout.compromisedFinisher.title}
                </h4>
              </div>
              <Link
                href="/timer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-bold text-xs uppercase rounded-sm clip-angled transition-colors shrink-0"
              >
                <Timer className="w-3.5 h-3.5 fill-black" /> Launch in WOD Timer
              </Link>
            </div>
            <p className="text-xs text-[#d1d5db]">
              {activeWorkout.compromisedFinisher.protocol}
            </p>
            <div className="text-[10px] font-mono text-[#9ca3af]">
              Target Metabolic Zone: <strong className="text-white">{activeWorkout.compromisedFinisher.targetHeartRate}</strong>
            </div>
          </div>
        )}

        {/* Cooldown */}
        {activeWorkout.cooldown.length > 0 && (
          <div className="pt-4 border-t border-[#1c202d] text-xs text-[#9ca3af] space-y-1">
            <strong className="text-white uppercase font-mono block">Cooldown & Tissue Flush:</strong>
            {activeWorkout.cooldown.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[#ccff00]">✓</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 5. NEXT STEPS / COACHING CTA */}
      <div className="p-8 bg-[#0c0e14] border border-[#222736] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white uppercase tracking-tight">
            Want a Coach to Audit Your Running Form & Obstacle Technique?
          </h4>
          <p className="text-xs text-[#9ca3af] mt-1 max-w-xl">
            Our 1-on-1 coaching program includes bi-weekly video movement analysis, custom pace calibration, and direct WhatsApp coach messaging.
          </p>
        </div>
        <Link
          href="/booking"
          className="px-6 py-3 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-black uppercase text-xs tracking-wider clip-angled transition-colors shrink-0"
        >
          Schedule Free Strategy Call
        </Link>
      </div>

    </div>
  );
}
