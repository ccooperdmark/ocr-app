'use client';

import React from 'react';
import { 
  X, 
  Sparkles, 
  Play, 
  Dumbbell, 
  Layers, 
  Bot, 
  Utensils, 
  Trophy, 
  ShieldCheck, 
  Watch, 
  MessageSquare, 
  Timer, 
  Activity, 
  ChevronRight,
  Zap,
  CheckCircle2,
  Bell
} from 'lucide-react';

interface PlatformCapabilitiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveWorkout: () => void;
  onOpenAiCoach: () => void;
  onOpenNutrition: () => void;
  onOpenProgress: () => void;
  onOpenIntake: () => void;
  onOpenWearables: () => void;
  onOpenCheckIn?: () => void;
  onOpenWeeklyReview?: () => void;
  onOpenNotifications?: () => void;
  onSelectTab: (tabId: any) => void;
}

export default function PlatformCapabilitiesDrawer({
  isOpen,
  onClose,
  onOpenLiveWorkout,
  onOpenAiCoach,
  onOpenNutrition,
  onOpenProgress,
  onOpenIntake,
  onOpenWearables,
  onOpenCheckIn,
  onOpenWeeklyReview,
  onOpenNotifications,
  onSelectTab
}: PlatformCapabilitiesDrawerProps) {
  if (!isOpen) return null;

  const capabilities = [
    {
      id: 'live_workout',
      title: 'Live Interactive Workout Tracker',
      tag: 'Real-Time Logging',
      icon: Play,
      color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
      description: 'Session stopwatch, auto-rest countdown timer, set-by-set weight/rep/RPE logging, and PR celebrations.',
      actionLabel: 'Launch Tracker',
      action: () => { onClose(); onOpenLiveWorkout(); }
    },
    {
      id: 'exercise_library',
      title: 'Master OCR Exercise Database',
      tag: 'All 12 Domains',
      icon: Dumbbell,
      color: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      description: 'Comprehensive exercise taxonomy with coaching cues, progressions/regressions, and equipment filters.',
      actionLabel: 'Browse Exercises',
      action: () => { onClose(); onSelectTab('library'); }
    },
    {
      id: 'obstacles_db',
      title: '92 Authentic Race Obstacles',
      tag: '4 Major Leagues',
      icon: Layers,
      color: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      description: 'Spartan (34), Tough Mudder (21), Savage (19), Rugged Maniac (18) with step progressions and penalty rules.',
      actionLabel: 'Inspect Obstacles',
      action: () => { onClose(); onSelectTab('obstacles'); }
    },
    {
      id: 'ai_coach',
      title: 'AI Coaching Assistant',
      tag: 'SGX L2 & NSCA CSCS',
      icon: Bot,
      color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      description: 'Conversational assistant explaining session rationale, obstacle technique, and medical referral safety guardrails.',
      actionLabel: 'Open AI Coach',
      action: () => { onClose(); onOpenAiCoach(); }
    },
    {
      id: 'ai_checkin',
      title: 'Autonomous 60-Sec Daily Check-In',
      tag: 'Readiness & Biomarkers',
      icon: Activity,
      color: 'text-lime-400 bg-lime-500/20 border-lime-500/30',
      description: 'Evaluates sleep, soreness, mental stress, HRV, and RHR to instantly recalibrate today’s training session volume.',
      actionLabel: 'Daily Check-In',
      action: () => { onClose(); onOpenCheckIn?.(); }
    },
    {
      id: 'ai_weekly_review',
      title: 'Autonomous Weekly Coaching Review',
      tag: 'Virtual Head Coach',
      icon: CheckCircle2,
      color: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
      description: 'Evaluates microcycle adherence, total tonnage volume delta, PR trophies, and issues upcoming training directives.',
      actionLabel: 'View AI Review',
      action: () => { onClose(); onOpenWeeklyReview?.(); }
    },
    {
      id: 'ai_notifications',
      title: 'Autonomous Adaptation Alerts',
      tag: 'Live Telemetry',
      icon: Bell,
      color: 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      description: 'Instant notification stream detailing autonomous volume adjustments, progressive overloads, and deload alerts.',
      actionLabel: 'View Notifications',
      action: () => { onClose(); onOpenNotifications?.(); }
    },
    {
      id: 'nutrition_lab',
      title: 'Nutrition & OCR Fueling Lab',
      tag: 'ISSN Endurance Model',
      icon: Utensils,
      color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30',
      description: 'Mifflin-St Jeor daily macro calculator, water intake ounce logger, and in-race carb/fluid/sodium formulas.',
      actionLabel: 'Open Fueling Lab',
      action: () => { onClose(); onOpenNutrition(); }
    },
    {
      id: 'prs_progress',
      title: 'PR Trophy Room & Volume Tonnage',
      tag: 'Overload Analytics',
      icon: Trophy,
      color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      description: 'Category PR badges, interactive SVG bodyweight trend graph, and cumulative volume load counter.',
      actionLabel: 'View PR Room',
      action: () => { onClose(); onOpenProgress(); }
    },
    {
      id: 'intake_tests',
      title: 'Baseline Intake & 5 Field Tests',
      tag: 'Standardized Tests',
      icon: ShieldCheck,
      color: 'text-teal-400 bg-teal-500/20 border-teal-500/30',
      description: 'PAR-Q clearance, training age, dead hang, trail mile pace, pull-ups, and plank hold recalibrating scores.',
      actionLabel: 'Open Intake Modal',
      action: () => { onClose(); onOpenIntake(); }
    },
    {
      id: 'wearables_sync',
      title: 'Live Wearables & Biometrics Sync',
      tag: 'HealthKit & Garmin',
      icon: Watch,
      color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
      description: 'Resting heart rate, HRV rMSSD, sleep recovery score, and auto-regulated training readiness.',
      actionLabel: 'Sync Wearables',
      action: () => { onClose(); onOpenWearables(); }
    },
    {
      id: 'coach_hq',
      title: 'Coach Command HQ & 2-Way Chat',
      tag: 'Live Messaging',
      icon: MessageSquare,
      color: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
      description: 'Encrypted coach-athlete direct messaging thread and athlete weekly Sunday check-in review form.',
      actionLabel: 'Open Coach HQ',
      action: () => { onClose(); onSelectTab('coach'); }
    },
    {
      id: 'grip_center',
      title: 'Grip Fatigue & Rig Armor Lab',
      tag: 'Grip Diagnostics',
      icon: Activity,
      color: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
      description: 'Fresh vs fatigued hang drop-off calculator, grip failure diagnostics, and grip endurance WODs.',
      actionLabel: 'Open Grip Lab',
      action: () => { onClose(); onSelectTab('grip'); }
    },
    {
      id: 'compromised_running',
      title: 'Compromised Running Lab',
      tag: 'Pace Decay Engine',
      icon: Timer,
      color: 'text-red-400 bg-red-500/20 border-red-500/30',
      description: 'Pace decay percentage calculator, lactate clearance rates, and compromised run workouts.',
      actionLabel: 'Open Running Lab',
      action: () => { onClose(); onSelectTab('compromised'); }
    },
    {
      id: 'qualities_synopsis',
      title: '12 Major Domains & 107 Qualities',
      tag: 'Complete Taxonomy',
      icon: Zap,
      color: 'text-lime-400 bg-lime-500/20 border-lime-500/30',
      description: 'Every physiological attribute with athlete-friendly practical explanations and bottleneck sliders.',
      actionLabel: 'Explore Qualities',
      action: () => { onClose(); onSelectTab('qualities'); }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 text-zinc-100 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#ff5500]/20 to-[#ccff00]/20 text-[#ff5500] border border-[#ff5500]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                <span>Platform Capabilities & Upgrades Hub</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">12 Live Systems</span>
              </h2>
              <p className="text-xs text-zinc-400">Quick launcher for all commercial-grade coaching, tracking, and telemetry tools</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {capabilities.map((cap) => {
            const IconComp = cap.icon;
            return (
              <div 
                key={cap.id}
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-xl border shrink-0 mt-0.5 ${cap.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#ff5500] transition">
                        {cap.title}
                      </h4>
                      <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {cap.tag}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={cap.action}
                  className="px-3 py-2 bg-zinc-800 hover:bg-[#ff5500] hover:text-black text-white text-xs font-mono font-bold uppercase rounded-sm transition flex items-center gap-1 shrink-0 mt-1 cursor-pointer"
                >
                  <span>{cap.actionLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
          <span>All capabilities fully integrated with zero layout disruptions</span>
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
