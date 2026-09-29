'use client';

import React, { useState } from 'react';
import { 
  FullPerformanceProfile, 
  DomainEvaluation, 
  DomainId 
} from '@/types/trainingPlan/domains';
import { AthleteProfile } from '@/types/trainingPlan/athlete';
import { RaceProfile } from '@/types/trainingPlan/race';
import { SEED_ATHLETES, SEED_RACES } from '@/data/seedProfiles';
import { generateComprehensiveOcrPlan } from '@/services/trainingEngine/planGeneratorService';
import { OCR_EXERCISE_DATABASE } from '@/services/trainingEngine/exerciseLibraryService';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  Layers, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Info,
  Calendar,
  Compass,
  Zap,
  Dumbbell,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface OcrPerformanceViewProps {
  initialAthlete?: AthleteProfile;
  initialRace?: RaceProfile;
}

export default function OcrPerformanceView({
  initialAthlete = SEED_ATHLETES[1],
  initialRace = SEED_RACES.beast
}: OcrPerformanceViewProps) {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(initialAthlete.id);
  const [selectedDomainId, setSelectedDomainId] = useState<DomainId | null>(null);
  const [drawerTab, setDrawerTab] = useState<'overview' | 'assessments' | 'training' | 'progress' | 'benchmarks' | 'exercises' | 'history'>('overview');

  // Find active athlete & race
  const currentAthlete = SEED_ATHLETES.find(a => a.id === selectedAthleteId) || initialAthlete;
  const currentRace = selectedAthleteId === 'athlete_sarah' 
    ? SEED_RACES.sprint 
    : selectedAthleteId === 'athlete_marcus'
    ? SEED_RACES.super
    : initialRace;

  // Generate live performance profile for selected athlete
  const planOutput = generateComprehensiveOcrPlan(currentAthlete, currentRace);
  const profile: FullPerformanceProfile = planOutput.performanceProfile;

  // Color & Badge helpers
  const getScoreColor = (score: number) => {
    if (score >= 82) return 'text-[#ccff00]';
    if (score >= 75) return 'text-[#ffbb00]';
    if (score >= 68) return 'text-[#ff7733]';
    return 'text-[#ff3333]';
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'primary_priority':
        return 'bg-[#ff4444]/20 text-[#ff4444] border-[#ff4444]/60 font-black';
      case 'secondary_priority':
        return 'bg-[#ff7700]/20 text-[#ff7700] border-[#ff7700]/40 font-bold';
      case 'maintenance':
        return 'bg-[#ccff00]/20 text-[#ccff00] border-[#ccff00]/40 font-semibold';
      case 'recovery_reduced':
      default:
        return 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40 font-semibold';
    }
  };

  const selectedEvaluation: DomainEvaluation | null = selectedDomainId 
    ? profile.domainEvaluations[selectedDomainId] 
    : null;

  const domainExercises = selectedDomainId 
    ? OCR_EXERCISE_DATABASE.filter(e => e.primaryDomain === selectedDomainId || e.secondaryDomains.includes(selectedDomainId))
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. ATHLETE PROFILE & OCR PERFORMANCE INDEX HEADER */}
      <div className="bg-[#121520] border-2 border-[#ff5500] p-6 rounded-sm relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#202538]">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider bg-[#ff5500] text-black clip-angled">
                12-DOMAIN ADAPTIVE ENGINE
              </span>
              <span className="text-xs font-mono text-[#ccff00] font-bold uppercase">
                Target: {currentRace.name} ({currentRace.distanceKm}K)
              </span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              OCR Performance Profile
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-2xl leading-relaxed">
              Domain-specific levels and diagnostic limits derived from active performance assessments. Prioritizes lagging weaknesses against specific race requirements.
            </p>
          </div>

          {/* Persona Switcher for demonstration */}
          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold">
              Simulate Athlete Persona:
            </span>
            <div className="flex flex-wrap gap-1.5 bg-[#0b0d13] p-1 border border-[#23283a] rounded-sm">
              {SEED_ATHLETES.map((ath) => (
                <button
                  key={ath.id}
                  onClick={() => {
                    setSelectedAthleteId(ath.id);
                    setSelectedDomainId(null);
                  }}
                  className={`px-3 py-1 text-xs font-mono font-bold rounded-sm transition-all ${
                    selectedAthleteId === ath.id
                      ? 'bg-[#ff5500] text-black font-black'
                      : 'text-[#9ca3af] hover:text-white'
                  }`}
                >
                  {ath.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Aggregate KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
            <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Overall OCR Index</span>
            <span className={`text-3xl font-black font-mono ${getScoreColor(profile.overallOcrIndex)}`}>
              {profile.overallOcrIndex}
              <span className="text-xs text-[#6b7280]">/100</span>
            </span>
          </div>

          <div className="p-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
            <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Primary Limiters</span>
            <span className="text-sm font-black font-mono text-[#ff4444] line-clamp-1 mt-1">
              {profile.primaryLimiters[0] || 'None Detected'}
            </span>
            <span className="text-[10px] text-[#9ca3af] font-mono block">Requires primary volume</span>
          </div>

          <div className="p-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
            <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Greatest Strength</span>
            <span className="text-sm font-black font-mono text-[#ccff00] line-clamp-1 mt-1">
              {profile.greatestStrengths[0] || 'Balanced Engine'}
            </span>
            <span className="text-[10px] text-[#9ca3af] font-mono block">Placed on maintenance</span>
          </div>

          <div className="p-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
            <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Race Timeline</span>
            <span className="text-3xl font-black font-mono text-[#00e5ff]">
              {currentRace.weeksUntilRace}
              <span className="text-xs text-[#6b7280]"> wks</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. THE 12 DOMAIN CARDS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#202538]">
          <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#ff5500]" /> 12 Major Performance Domains
          </h3>
          <span className="text-xs font-mono text-[#9ca3af]">
            Click any domain card to inspect deep-dive diagnostics & exercise ladders
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(profile.domainEvaluations).map((dom) => {
            const isSelected = selectedDomainId === dom.domainId;

            return (
              <div
                key={dom.domainId}
                onClick={() => {
                  setSelectedDomainId(dom.domainId);
                  setDrawerTab('overview');
                }}
                className={`p-5 bg-[#0e1017] border rounded-sm cursor-pointer transition-all flex flex-col justify-between space-y-4 group hover:shadow-xl hover:shadow-[#ff5500]/5 ${
                  isSelected 
                    ? 'border-[#ff5500] ring-1 ring-[#ff5500]' 
                    : dom.trainingPriority === 'primary_priority'
                    ? 'border-[#ff4444]/40 hover:border-[#ff4444]'
                    : 'border-[#242838] hover:border-[#ff5500]/60'
                }`}
              >
                {/* Header: Domain Number, Title & Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#ff5500] uppercase tracking-wider">
                      DOMAIN 0{dom.domainNumber}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm border ${getPriorityBadge(dom.trainingPriority)}`}>
                      {dom.trainingPriority.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-white group-hover:text-[#ff5500] transition-colors leading-snug">
                    {dom.domainTitle}
                  </h4>

                  <p className="text-xs text-[#9ca3af] line-clamp-2 leading-relaxed">
                    {dom.tagline}
                  </p>

                  {dom.whyItMattersSynopsis && (
                    <div className="bg-[#141824] border-l-2 border-l-[#ff5500] p-2.5 rounded-sm space-y-1">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-[#ff5500]" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#ff5500]">
                          Why It Matters
                        </span>
                      </div>
                      <p className="text-[11px] text-[#cbd5e1] leading-relaxed line-clamp-3">
                        {dom.whyItMattersSynopsis}
                      </p>
                    </div>
                  )}
                </div>

                {/* Performance Metrics Block */}
                <div className="bg-[#121520] p-3 rounded-sm border border-[#1d2232] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-[#9ca3af] uppercase">Score & Level</span>
                    <span className={`text-base font-black ${getScoreColor(dom.score)}`}>
                      {dom.score} <span className="text-xs text-[#6b7280]">/ 100</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#cbd5e1]">
                    <span className="capitalize text-white font-semibold">
                      {dom.skillLevel.replace(/_/g, ' ')}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]">
                      {dom.trend === 'improving' && <TrendingUp className="w-3 h-3 text-[#ccff00]" />}
                      {dom.trend === 'declining' && <TrendingDown className="w-3 h-3 text-[#ff4444]" />}
                      {dom.trend === 'stable' && <Minus className="w-3 h-3 text-[#9ca3af]" />}
                      <span className={dom.trend === 'improving' ? 'text-[#ccff00]' : 'text-[#9ca3af]'}>
                        {dom.rateOfImprovementPercent > 0 ? `+${dom.rateOfImprovementPercent}%` : `${dom.rateOfImprovementPercent}%`}
                      </span>
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-[#0a0c12] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        dom.score >= 82 ? 'bg-[#ccff00]' : dom.score >= 75 ? 'bg-[#ffbb00]' : 'bg-[#ff4444]'
                      }`}
                      style={{ width: `${dom.score}%` }}
                    />
                  </div>
                </div>

                {/* Footer: Primary submetric & Race Importance */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#6b7280] pt-1">
                  <span>
                    Primary: <strong className="text-white">{dom.submetrics[0]?.name || 'Base'}</strong>
                  </span>
                  <span className="text-[#ff7700] font-bold">
                    Race Imp: {dom.raceImportanceScore}/10
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE DOMAIN DRILL-DOWN MODAL / DRAWER */}
      {selectedEvaluation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-[#0e1017] border-2 border-[#ff5500] w-full max-w-4xl max-h-[90vh] rounded-sm flex flex-col overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#121520] border-b border-[#22273a] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#ff5500]">
                    DOMAIN 0{selectedEvaluation.domainNumber} OF 12
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm border ${getPriorityBadge(selectedEvaluation.trainingPriority)}`}>
                    {selectedEvaluation.trainingPriority.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  {selectedEvaluation.domainTitle}
                </h3>
                <p className="text-xs text-[#9ca3af] mt-0.5">
                  {selectedEvaluation.tagline}
                </p>
              </div>

              <button
                onClick={() => setSelectedDomainId(null)}
                className="p-2 bg-[#171b26] hover:bg-[#202538] text-[#9ca3af] hover:text-white rounded-sm border border-[#272d3f] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Navigation */}
            <div className="bg-[#0a0c12] border-b border-[#202538] px-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {(['overview', 'assessments', 'training', 'progress', 'benchmarks', 'exercises', 'history'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={`py-3 px-3 text-xs font-mono font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                    drawerTab === tab
                      ? 'text-[#ff5500] border-[#ff5500] font-black'
                      : 'text-[#6b7280] border-transparent hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#d1d5db] flex-1">
              
              {/* TAB 1: OVERVIEW */}
              {drawerTab === 'overview' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Dedicated Why It Matters Educational Synopsis */}
                  {selectedEvaluation.whyItMattersSynopsis && (
                    <div className="p-5 bg-[#141824] border-l-4 border-l-[#ff5500] border-y border-r border-[#20273a] rounded-sm space-y-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#ff5500]" />
                        <span className="text-xs font-mono font-black uppercase tracking-wider text-[#ff5500]">
                          Why It Matters For OCR Performance
                        </span>
                      </div>
                      <p className="text-sm text-[#f3f4f6] font-normal leading-relaxed">
                        {selectedEvaluation.whyItMattersSynopsis}
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-[#141824] border border-[#20273a] rounded-sm space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" /> Programming Rationale & Priority
                    </span>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      {selectedEvaluation.explainabilityRationale}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#121520] border border-[#202538] rounded-sm space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Greatest Strength Quality
                      </span>
                      <div className="text-white font-bold text-sm">
                        {selectedEvaluation.strongestQuality}
                      </div>
                      <p className="text-[11px] text-[#9ca3af]">
                        Maintained with minimal effective dose to avoid wasting recovery resources.
                      </p>
                    </div>

                    <div className="p-4 bg-[#121520] border border-[#202538] rounded-sm space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#ff4444] flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Primary Identified Limiter
                      </span>
                      <div className="text-white font-bold text-sm">
                        {selectedEvaluation.weakestQuality}
                      </div>
                      <p className="text-[11px] text-[#9ca3af]">
                        Targeted for progressive overload in current mesocycle microcycles.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ASSESSMENTS */}
              {drawerTab === 'assessments' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <span className="text-xs font-mono font-bold uppercase text-[#ff5500] block">
                    Domain Assessment Battery & Baseline Values:
                  </span>
                  <div className="space-y-3">
                    {selectedEvaluation.submetrics.map((sub) => (
                      <div key={sub.id} className="p-4 bg-[#121520] border border-[#202538] rounded-sm flex items-center justify-between">
                        <div>
                          <div className="text-white font-bold text-sm">{sub.name}</div>
                          <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">
                            Target Standard: <strong className="text-[#ccff00]">{sub.benchmarkTarget}</strong>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black font-mono text-white block">
                            {sub.currentValue}
                          </span>
                          <span className={`text-[10px] font-mono uppercase ${sub.isBottleneck ? 'text-[#ff4444]' : 'text-[#ccff00]'}`}>
                            {sub.isBottleneck ? '⚠️ Bottleneck Flag' : '✓ Standard Met'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[#0a0c12] border border-[#202538] rounded-sm space-y-1">
                    <span className="text-[10px] font-mono text-[#00e5ff] font-bold uppercase block">
                      Beginner-Safe Assessment Alternative:
                    </span>
                    <p className="text-[#9ca3af]">
                      If the primary test cannot be safely executed, athletes complete the submaximal progressive ramp protocol with no maximal eccentric loading or joint risk.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CURRENT TRAINING */}
              {drawerTab === 'training' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 bg-[#121520] border border-[#202538] rounded-sm space-y-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#ccff00]">
                      Current Microcycle Allocation
                    </span>
                    <div className="text-white font-bold text-base">
                      {selectedEvaluation.trainingPriority === 'primary_priority'
                        ? '3 Sessions / Week • High Volume & Specific Frequency'
                        : selectedEvaluation.trainingPriority === 'secondary_priority'
                        ? '2 Sessions / Week • Progressive Overload Wave'
                        : '1 Session / Week • Maintenance Dose'}
                    </div>
                    <p className="text-[11px] text-[#9ca3af]">
                      Volume is modulated based on the 48-hour interference rules separating high CNS strength, heavy carries, and threshold running.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: PROGRESS */}
              {drawerTab === 'progress' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 bg-[#121520] border border-[#202538] rounded-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#6b7280] uppercase block">Previous Assessment</span>
                      <span className="text-xl font-bold font-mono text-[#9ca3af]">{selectedEvaluation.previousScore} / 100</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] font-mono text-[#6b7280] uppercase block">Rate of Change</span>
                      <span className="text-xl font-black font-mono text-[#ccff00]">
                        {selectedEvaluation.rateOfImprovementPercent > 0 ? `+${selectedEvaluation.rateOfImprovementPercent}%` : `${selectedEvaluation.rateOfImprovementPercent}%`}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#6b7280] uppercase block">Current Score</span>
                      <span className={`text-xl font-black font-mono ${getScoreColor(selectedEvaluation.score)}`}>
                        {selectedEvaluation.score} / 100
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BENCHMARKS */}
              {drawerTab === 'benchmarks' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <span className="text-xs font-mono font-bold uppercase text-[#ff5500]">
                    Normative OCR Tier Benchmarks:
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono">
                    <div className="p-3 bg-[#121520] border border-[#202538] rounded-sm">
                      <span className="text-[#6b7280] block text-[10px]">NOVICE</span>
                      <span className="text-white font-bold">&lt; 50 pts</span>
                    </div>
                    <div className="p-3 bg-[#121520] border border-[#202538] rounded-sm">
                      <span className="text-[#6b7280] block text-[10px]">OPEN</span>
                      <span className="text-white font-bold">50 - 69 pts</span>
                    </div>
                    <div className="p-3 bg-[#121520] border border-[#202538] rounded-sm">
                      <span className="text-[#ffbb00] block text-[10px]">AGE GROUP</span>
                      <span className="text-white font-bold">70 - 84 pts</span>
                    </div>
                    <div className="p-3 bg-[#121520] border border-[#ccff00] rounded-sm">
                      <span className="text-[#ccff00] block text-[10px]">ELITE PRO</span>
                      <span className="text-white font-bold">&ge; 85 pts</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: EXERCISES */}
              {drawerTab === 'exercises' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <span className="text-xs font-mono font-bold uppercase text-[#ff5500] block">
                    Exercise Progression Ladder ({domainExercises.length} Movements Available):
                  </span>
                  <div className="space-y-3">
                    {domainExercises.map((ex) => (
                      <div key={ex.id} className="p-4 bg-[#121520] border border-[#202538] rounded-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold text-sm">{ex.name}</span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#1a2030] text-[#ccff00] rounded-sm">
                            {ex.difficulty}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#9ca3af]">
                          {ex.ocrApplicationNote}
                        </p>
                        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#6b7280] pt-1">
                          <span>Default: <strong>{ex.defaultSets} sets x {ex.defaultRepsOrDuration}</strong></span>
                          <span>•</span>
                          <span>Target RPE: <strong>{ex.defaultRpe}/10</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: HISTORY */}
              {drawerTab === 'history' && (
                <div className="p-8 text-center bg-[#121520] border border-[#202538] rounded-sm space-y-2 animate-in fade-in duration-150">
                  <Calendar className="w-8 h-8 text-[#ff5500] mx-auto" />
                  <div className="text-white font-bold text-sm">Assessment History Logged</div>
                  <p className="text-[11px] text-[#9ca3af] max-w-sm mx-auto">
                    Historical testing logs are permanently stored. Next reassessment scheduled for end of Mesocycle Block 1.
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0a0c12] border-t border-[#202538] flex justify-end">
              <button
                onClick={() => setSelectedDomainId(null)}
                className="px-5 py-2 bg-[#ff5500] text-black font-mono font-bold uppercase text-xs clip-angled transition-all"
              >
                Close Diagnostic View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
