'use client';

import React from 'react';
import { 
  X, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Calendar, 
  Flame, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Target
} from 'lucide-react';
import { athleteStorage } from '@/services/storage/athleteStorageService';
import { AutonomousWeeklyReview } from '@/services/trainingEngine/aiCoachEngineService';

interface AiWeeklyReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiWeeklyReviewModal({ isOpen, onClose }: AiWeeklyReviewModalProps) {
  if (!isOpen) return null;

  const reviews = athleteStorage.getWeeklyReviews();
  const activeReview: AutonomousWeeklyReview = reviews[0];

  if (!activeReview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0d1017] border border-[#222838] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#1f2638] bg-[#121622] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#ccff00] text-black font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight font-sans">
                  Autonomous Weekly AI Coaching Report
                </h3>
                <span className="px-2 py-0.5 bg-[#1a2334] text-[#ccff00] text-[9px] font-mono font-bold uppercase rounded-sm border border-[#2d3a52]">
                  Week 0{activeReview.weekNumber}
                </span>
              </div>
              <p className="text-xs text-[#9ca3af] font-mono">
                Automated performance audit, volume analysis & next-week programming rationale
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm hover:bg-[#1a2030] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          
          {/* TOP METRICS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Adherence Rate</span>
              <div className="text-xl font-black text-[#ccff00] mt-1">
                {activeReview.adherencePercentage}%
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">Target Met</span>
            </div>

            <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Total Volume Load</span>
              <div className="text-xl font-black text-white mt-1">
                {(activeReview.totalVolumeLoadLbs / 1000).toFixed(1)}k
              </div>
              <span className="text-[9px] font-mono text-emerald-400">+{activeReview.volumeChangePercentVsLastWeek}% vs Wk Prior</span>
            </div>

            <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Trail Mileage</span>
              <div className="text-xl font-black text-[#00e5ff] mt-1">
                {activeReview.totalRunningDistanceKm} km
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">Zone 2 & Hills</span>
            </div>

            <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">PRs Established</span>
              <div className="text-xl font-black text-[#ffaa00] mt-1">
                {activeReview.prsEarnedCount} New PRs
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">Grip & Pace</span>
            </div>
          </div>

          {/* EXECUTIVE COACHING SUMMARY */}
          <div className="p-4 bg-[#121622] border-l-4 border-l-[#00e5ff] border-y border-r border-[#202638] rounded-sm space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> AI Coach Executive Synthesis:
            </span>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              {activeReview.executiveSummary}
            </p>
          </div>

          {/* PR TROPHY PILLS */}
          {activeReview.prsEarnedLabels.length > 0 && (
            <div className="p-3.5 bg-[#0e111a] border border-[#1e2536] rounded-sm space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#ffaa00] flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> Milestone Trophies Earned This Microcycle:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeReview.prsEarnedLabels.map((pr, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-[#ffaa00]/15 text-[#ffaa00] border border-[#ffaa00]/30 rounded-sm font-mono text-xs font-bold flex items-center gap-1"
                  >
                    🏆 {pr}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DETAILED 3-PILLAR BREAKDOWN */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-white block">
              Tri-Pillar Adaptation Analysis
            </span>

            <div className="space-y-2">
              <div className="p-3 bg-[#11141e] border border-[#1e2536] rounded-sm space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] block">
                  1. Strength, Loaded Carries & Grip
                </span>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {activeReview.detailedAnalysis.strengthAndGrip}
                </p>
              </div>

              <div className="p-3 bg-[#11141e] border border-[#1e2536] rounded-sm space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] block">
                  2. Aerobic Trail Engine & Vert Economy
                </span>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {activeReview.detailedAnalysis.aerobicEngineAndTrail}
                </p>
              </div>

              <div className="p-3 bg-[#11141e] border border-[#1e2536] rounded-sm space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block">
                  3. Recovery, Sleep & Autonomic Balance
                </span>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  {activeReview.detailedAnalysis.recoveryAndFatigue}
                </p>
              </div>
            </div>
          </div>

          {/* NEXT WEEK COACHING DIRECTIVES */}
          <div className="p-4 bg-[#141926] border border-emerald-500/40 rounded-sm space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Autonomous Directives for Upcoming Microcycle:
            </span>
            <ul className="space-y-1 text-xs text-[#cbd5e1] font-mono">
              {activeReview.nextWeekCoachingDirectives.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-[#1f2638] bg-[#0a0c12] flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#9ca3af]">
            Next autonomous audit: Sunday 18:00 UTC
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-bold text-xs uppercase rounded-sm cursor-pointer"
          >
            Acknowledge & Continue Plan
          </button>
        </div>

      </div>
    </div>
  );
}
