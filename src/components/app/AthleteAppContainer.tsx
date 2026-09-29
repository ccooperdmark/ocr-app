'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ScorecardMetric, 
  AthleteScorecardState, 
  calculateRaceReadiness 
} from '@/data/athleteScorecardData';
import { 
  GRIP_ASSESSMENT_BATTERY, 
  calculateGripFatigue, 
  GripFatigueAnalysis 
} from '@/data/gripCenterData';
import { 
  COMPROMISED_WODS, 
  calculatePaceDecay, 
  PaceDecayAnalysis 
} from '@/data/compromisedRunningData';
import { 
  Trophy, 
  Flame, 
  Activity, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Timer, 
  Layers, 
  Sliders, 
  Heart, 
  Apple, 
  Lock, 
  Smartphone, 
  ChevronRight,
  Sparkles,
  TrendingDown,
  RotateCcw,
  Compass,
  Bot,
  Utensils,
  TrendingUp,
  Watch,
  Dumbbell,
  Bell
} from 'lucide-react';
import PerformanceQualitiesLab from './PerformanceQualitiesLab';
import OcrPerformanceView from './OcrPerformanceView';
import TrainingPlanView from './TrainingPlanView';
import CoachDashboardView from './CoachDashboardView';
import ObstacleProficiencyView from './ObstacleProficiencyView';
import ExerciseLibraryView from './ExerciseLibraryView';
import PlatformCapabilitiesDrawer from './PlatformCapabilitiesDrawer';
import AiCoachAssistantDrawer from './AiCoachAssistantDrawer';
import NutritionFuelingDrawer from './NutritionFuelingDrawer';
import ProgressAnalyticsDrawer from './ProgressAnalyticsDrawer';
import AthleteIntakeModal from './AthleteIntakeModal';
import WearablesSyncModal from './WearablesSyncModal';
import AutonomousNotificationModal from './AutonomousNotificationModal';
import AutomatedCheckInModal from './AutomatedCheckInModal';
import AiWeeklyReviewModal from './AiWeeklyReviewModal';
import ExperienceTierSelector from './ExperienceTierSelector';
import IntermediateProgressSection from './IntermediateProgressSection';
import IntermediatePerformanceSection from './IntermediatePerformanceSection';
import IntermediateRacePrepSection from './IntermediateRacePrepSection';
import IntermediateRecoverySection from './IntermediateRecoverySection';
import IntermediateGamificationSection from './IntermediateGamificationSection';
import DailyNutritionCard from './DailyNutritionCard';
import { useExperienceTier } from '@/context/ExperienceTierContext';
import { athleteStorage } from '@/services/storage/athleteStorageService';

export type AppTab = 
  | 'plan' 
  | 'nutrition' 
  | 'library' 
  | 'progress' 
  | 'performance' 
  | 'race' 
  | 'recovery' 
  | 'gamification' 
  | 'coach' 
  | 'scorecard' 
  | 'obstacles' 
  | 'grip' 
  | 'compromised' 
  | 'qualities' 
  | 'paywall';

export default function AthleteAppContainer() {
  const { tier, isBasic, isIntermediate, isAdvanced, tierMeta } = useExperienceTier();
  const [activeTab, setActiveTab] = useState<AppTab>('plan');

  // Drawers & Modals
  const [isAiCoachOpen, setIsAiCoachOpen] = useState<boolean>(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState<boolean>(false);
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);
  const [isWearablesOpen, setIsWearablesOpen] = useState<boolean>(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);
  const [isPlatformHubOpen, setIsPlatformHubOpen] = useState<boolean>(false);

  // Autonomous AI Coaching Modals
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState<boolean>(false);
  const [isWeeklyReviewOpen, setIsWeeklyReviewOpen] = useState<boolean>(false);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState<number>(0);

  useEffect(() => {
    const updateNotifs = () => {
      try {
        const notifs = athleteStorage.getNotifications();
        setUnreadNotifsCount(notifs.filter(n => !n.isRead).length);
      } catch (e) {
        // storage fallback
      }
    };
    updateNotifs();

    const handleOpenNutrition = () => setIsNutritionOpen(true);
    const handleOpenCheckIn = () => setIsCheckInOpen(true);
    const handleOpenWeeklyReview = () => setIsWeeklyReviewOpen(true);
    const handleOpenNotifications = () => setIsNotificationsOpen(true);

    window.addEventListener('grit_athlete_data_changed', updateNotifs);
    window.addEventListener('grit_open_nutrition_drawer', handleOpenNutrition);
    window.addEventListener('grit_open_check_in', handleOpenCheckIn);
    window.addEventListener('grit_open_weekly_review', handleOpenWeeklyReview);
    window.addEventListener('grit_open_notifications', handleOpenNotifications);

    return () => {
      window.removeEventListener('grit_athlete_data_changed', updateNotifs);
      window.removeEventListener('grit_open_nutrition_drawer', handleOpenNutrition);
      window.removeEventListener('grit_open_check_in', handleOpenCheckIn);
      window.removeEventListener('grit_open_weekly_review', handleOpenWeeklyReview);
      window.removeEventListener('grit_open_notifications', handleOpenNotifications);
    };
  }, []);

  // Tier-safe tab redirection: ensure basic & intermediate users don't land on unauthorized tabs
  useEffect(() => {
    if (isBasic) {
      if (!['plan', 'nutrition', 'library'].includes(activeTab)) {
        setActiveTab('plan');
      }
    } else if (isIntermediate) {
      if (!['plan', 'nutrition', 'library', 'progress', 'performance', 'race', 'recovery', 'gamification'].includes(activeTab)) {
        setActiveTab('plan');
      }
    }
  }, [tier, isBasic, isIntermediate, activeTab]);

  // Selected Target Race for Readiness
  const [targetRace, setTargetRace] = useState<'sprint' | 'super' | 'beast' | 'ultra'>('beast');

  // Athlete Scorecard State (8 Competencies)
  const [scores, setScores] = useState<AthleteScorecardState>({
    running: 82,
    aerobicEndurance: 79,
    grip: 88,
    pullingStrength: 85,
    carryStrength: 76,
    obstacleSkill: 71,
    climbing: 64,
    fatigueResistance: 73
  });

  const readinessResult = calculateRaceReadiness(scores, targetRace);

  // Grip Calculator Inputs
  const [freshHang, setFreshHang] = useState<number>(115);
  const [fatiguedHang, setFatiguedHang] = useState<number>(68);
  const gripAnalysis: GripFatigueAnalysis = calculateGripFatigue(freshHang, fatiguedHang);

  // Compromised Pace Decay Inputs (Seconds per mile)
  const [freshPace, setFreshPace] = useState<number>(450); // 7:30 min/mile
  const [postPace, setPostPace] = useState<number>(555);  // 9:15 min/mile
  const paceAnalysis: PaceDecayAnalysis = calculatePaceDecay(freshPace, postPace);

  const formatPaceTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      
      {/* 1. TOP APP BAR & APPLE HEALTH STATUS */}
      <div className="bg-[#0b0d13] border border-[#232738] rounded-sm p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff5500] to-[#ccff00] p-0.5 shrink-0">
            <div className="w-full h-full bg-[#0b0d13] rounded-full flex items-center justify-center font-mono font-black text-white text-sm">
              AM
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-sans">
                Alex Morgan
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#181c28] text-[#ccff00] border border-[#2b334a] rounded-sm">
                Age Group (30-34)
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 rounded-sm">
                Target: Spartan Beast
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#9ca3af] mt-1">
              <span className="flex items-center gap-1 text-[#ff7733]">
                <Heart className="w-3 h-3 text-[#ff5500]" /> RHR: 51 BPM
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#ccff00]">
                <Zap className="w-3 h-3 text-[#ccff00]" /> VO2 Max: 52.4
              </span>
              <span>•</span>
              <button 
                onClick={() => setIsWearablesOpen(true)}
                className="flex items-center gap-1 text-[#00e5ff] hover:underline cursor-pointer transition"
                title="Open Live Wearables Telemetry"
              >
                <Activity className="w-3 h-3 text-[#00e5ff]" /> Apple Health Sync: Active
              </button>
            </div>
          </div>
        </div>

        {/* Action Hub & Experience Tier Selector */}
        <div className="flex flex-col gap-3 shrink-0">
          {/* Row 1: Quick Hub Drawers */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAiCoachOpen(true)}
              className="px-4 py-2 bg-[#12151f] hover:bg-[#1a1f2e] border border-emerald-500/40 text-emerald-400 text-sm font-mono font-bold uppercase rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
              title="Open AI Coach Assistant"
            >
              <Bot className="w-4 h-4" /> AI Coach
            </button>
            <button
              onClick={() => {
                if (isBasic || isIntermediate) {
                  setActiveTab('nutrition');
                } else {
                  setIsNutritionOpen(true);
                }
              }}
              className="px-4 py-2 bg-[#12151f] hover:bg-[#1a1f2e] border border-cyan-500/40 text-cyan-400 text-sm font-mono font-bold uppercase rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
              title="Open Nutrition & Fueling"
            >
              <Utensils className="w-4 h-4" /> Fueling
            </button>
            {(isIntermediate || isAdvanced) && (
              <button
                onClick={() => {
                  if (isIntermediate) {
                    setActiveTab('progress');
                  } else {
                    setIsProgressOpen(true);
                  }
                }}
                className="px-4 py-2 bg-[#12151f] hover:bg-[#1a1f2e] border border-amber-500/40 text-amber-400 text-sm font-mono font-bold uppercase rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
                title="Open Progress & PRs"
              >
                <TrendingUp className="w-4 h-4" /> PRs
              </button>
            )}
            {isAdvanced && (
              <button
                onClick={() => setIsPlatformHubOpen(true)}
                className="px-4 py-2 bg-[#12151f] hover:bg-[#ff5500]/20 border border-[#ff5500]/50 text-[#ff5500] text-sm font-mono font-bold uppercase rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
                title="Open Platform Capabilities Hub"
              >
                <Sparkles className="w-4 h-4" /> ⚡ Hub
              </button>
            )}
          </div>

          {/* Row 2: 3-Way Experience Tier Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <ExperienceTierSelector />

            {isAdvanced && (
              <button
                onClick={() => setActiveTab('paywall')}
                className="px-3.5 py-2 bg-[#1a1d29] hover:bg-[#222636] border border-[#ff5500]/50 text-[#ff5500] text-xs font-mono font-bold uppercase rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-4 h-4" /> App Store Pro
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. TIER-ADAPTIVE SUB-NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2 border-b border-[#202538] pb-3">
        {/* BASIC NAVIGATION: Strictly 3 essential areas */}
        {isBasic && (
          <>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-[#00ff88] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#00ff88] hover:text-white border border-[#00ff88]/40'
              }`}
            >
              <Layers className="w-4 h-4 text-inherit" /> 1. Training Plan
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'nutrition'
                  ? 'bg-[#00ff88] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#00ff88]" /> 2. Daily Nutrition
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-[#00ff88] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Dumbbell className="w-4 h-4 text-[#00ff88]" /> 3. Exercise Library
            </button>
          </>
        )}

        {/* INTERMEDIATE NAVIGATION: Basic + Progress + 7 Categories + Race Prep + Recovery + Gamification */}
        {isIntermediate && (
          <>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#ffaa00] hover:text-white border border-[#ffaa00]/40'
              }`}
            >
              <Layers className="w-4 h-4 text-inherit" /> 1. Training Plan & Phases
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'nutrition'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#ffaa00]" /> 2. Nutrition & Fueling
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Dumbbell className="w-4 h-4 text-[#ffaa00]" /> 3. Exercise Library
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#ffaa00]" /> 4. Progress Tracking
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'performance'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Zap className="w-4 h-4 text-[#ffaa00]" /> 5. 7 Performance Categories
            </button>
            <button
              onClick={() => setActiveTab('race')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'race'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#ffaa00]" /> 6. Race Prep
            </button>
            <button
              onClick={() => setActiveTab('recovery')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'recovery'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Heart className="w-4 h-4 text-[#ffaa00]" /> 7. Recovery & Readiness
            </button>
            <button
              onClick={() => setActiveTab('gamification')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'gamification'
                  ? 'bg-[#ffaa00] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Trophy className="w-4 h-4 text-[#ffaa00]" /> 8. Missions & Level
            </button>
          </>
        )}

        {/* ADVANCED NAVIGATION: Full platform access */}
        {isAdvanced && (
          <>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-[#ff5500] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#ccff00] hover:text-white border border-[#ccff00]/40'
              }`}
            >
              <Layers className="w-4 h-4 text-[#ff5500]" /> ★ Adaptive Training Plan
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'performance'
                  ? 'bg-[#ff5500] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Zap className="w-4 h-4 text-[#ccff00]" /> OCR Performance Profile
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'coach'
                  ? 'bg-[#ff5500] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#00e5ff]" /> Coach Command HQ
            </button>
            <button
              onClick={() => setActiveTab('scorecard')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'scorecard'
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Trophy className="w-4 h-4" /> 1. Scorecard & Readiness
            </button>
            <button
              onClick={() => setActiveTab('obstacles')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'obstacles'
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Layers className="w-4 h-4" /> 2. Obstacle Proficiency (0-100)
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-[#ff5500] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Dumbbell className="w-4 h-4 text-[#ff5500]" /> 3. Master Exercise Library
            </button>
            <button
              onClick={() => setActiveTab('grip')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'grip'
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Zap className="w-4 h-4" /> 4. Grip Performance Center
            </button>
            <button
              onClick={() => setActiveTab('compromised')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'compromised'
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Timer className="w-4 h-4" /> 4. Compromised Running Lab
            </button>
            <button
              onClick={() => setActiveTab('qualities')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'qualities'
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Activity className="w-4 h-4" /> 5. 12 Major Domains (107 Qualities)
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'nutrition'
                  ? 'bg-[#ff5500] text-black font-black shadow-md'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#ff5500]" /> 6. Nutrition & Fueling
            </button>
            <button
              onClick={() => setActiveTab('paywall')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'paywall'
                  ? 'bg-[#ff5500] text-black font-black'
                  : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#202434]'
              }`}
            >
              <Smartphone className="w-4 h-4" /> 7. StoreKit 2 IAP
            </button>
          </>
        )}
      </div>

      {/* 3. TAB 1: SCORECARD & RACE READINESS */}
      {activeTab === 'scorecard' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Target Race Selector */}
          <div className="bg-[#0e1017] border border-[#242838] p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#ff5500]" /> Calibrate Readiness For Upcoming Race:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {(['sprint', 'super', 'beast', 'ultra'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTargetRace(r)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm border transition-all ${
                    targetRace === r
                      ? 'bg-[#ff5500] text-black border-[#ff5500]'
                      : 'bg-[#12141c] text-[#9ca3af] border-[#252a3a] hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
              <button
                onClick={() => setIsIntakeOpen(true)}
                className="ml-2 px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition flex items-center gap-1.5 cursor-pointer"
                title="Open Baseline Assessment & Field Tests"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Baseline Field Tests
              </button>
            </div>
          </div>

          {/* Big Readiness Banner */}
          <div className="bg-[#121520] border-2 border-[#ff5500] p-6 sm:p-8 rounded-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              <div className="flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#202538] text-center">
                <span className="text-xs font-mono font-bold uppercase text-[#9ca3af]">
                  Calculated Race Readiness
                </span>
                <div className="text-6xl sm:text-7xl font-mono font-black my-2" style={{ color: readinessResult.statusColor }}>
                  {readinessResult.readinessPercentage}%
                </div>
                <div 
                  className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm"
                  style={{ backgroundColor: `${readinessResult.statusColor}20`, color: readinessResult.statusColor, border: `1px solid ${readinessResult.statusColor}50` }}
                >
                  {readinessResult.status}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4444] uppercase">
                  <AlertTriangle className="w-4 h-4" /> Detected Primary Limiter: <strong>{readinessResult.primaryLimiter}</strong>
                </div>
                <p className="text-sm text-[#d1d5db] leading-relaxed">
                  Targeting the <strong>{readinessResult.raceName}</strong> requires high durability. Your current bottleneck is <strong>{readinessResult.primaryLimiter}</strong>, with <strong>{readinessResult.secondaryLimiter}</strong> trailing closely.
                </p>
                <div className="p-3 bg-[#0a0c10] border-l-2 border-[#ccff00] rounded-r-sm text-xs font-mono text-[#e5e7eb]">
                  <strong className="text-[#ccff00]">Adaptive Programming Injection: </strong>
                  {readinessResult.recommendedFocus}
                </div>
              </div>

            </div>
          </div>

          {/* The 8 Radar Competencies */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#ff5500]" /> 8-Pillar OCR Competency Scorecard
              </h3>
              <span className="text-xs font-mono text-[#6b7280]">
                Sliders simulate real athlete assessment updates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Running Speed', key: 'running' as const, val: scores.running, color: '#ff5500' },
                { label: 'Aerobic Base (Z2)', key: 'aerobicEndurance' as const, val: scores.aerobicEndurance, color: '#ff7733' },
                { label: 'Grip Endurance', key: 'grip' as const, val: scores.grip, color: '#ccff00' },
                { label: 'Pulling Strength', key: 'pullingStrength' as const, val: scores.pullingStrength, color: '#00e5ff' },
                { label: 'Heavy Carries', key: 'carryStrength' as const, val: scores.carryStrength, color: '#ffaa00' },
                { label: 'Obstacle Skill', key: 'obstacleSkill' as const, val: scores.obstacleSkill, color: '#a6d200' },
                { label: 'Mountain Climbing', key: 'climbing' as const, val: scores.climbing, color: '#ff4444' },
                { label: 'Fatigue Resistance', key: 'fatigueResistance' as const, val: scores.fatigueResistance, color: '#ff00aa' },
              ].map((item) => (
                <div key={item.key} className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.label}</span>
                    <span className="font-mono text-sm font-black" style={{ color: item.color }}>
                      {item.val}/100
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={item.val}
                    onChange={(e) => setScores({ ...scores, [item.key]: parseInt(e.target.value) })}
                    className="w-full accent-[#ff5500] cursor-pointer"
                  />
                  <div className="text-[10px] font-mono text-[#6b7280] flex justify-between">
                    <span>Novice (30)</span>
                    <span>Elite (90+)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 4. TAB 2: OBSTACLE PROFICIENCY SYSTEM (0-100) */}
      {activeTab === 'obstacles' && (
        <ObstacleProficiencyView />
      )}

      {/* 4.5. TAB 3: MASTER EXERCISE LIBRARY (12 DOMAINS) */}
      {activeTab === 'library' && (
        <ExerciseLibraryView />
      )}

      {/* 5. TAB 4: GRIP PERFORMANCE CENTER */}
      {activeTab === 'grip' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="bg-[#12141c] border border-[#242838] p-6 sm:p-8 rounded-sm space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-widest block mb-1">
                Forearm Capillary & Lactate Fatigue Engine
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Grip Decay Under Cardiovascular Fatigue Calculator
              </h3>
              <p className="text-xs text-[#9ca3af] mt-1 max-w-2xl">
                Hanging fresh in a gym is useless if your grip drops 60% when your heart rate hits 165 BPM on course. Compare your fresh bar hang vs. post-400m sprint hang.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-[#0a0c10] p-6 border border-[#1f2434] rounded-sm">
              <div>
                <label className="block text-xs font-mono text-[#d1d5db] uppercase mb-2">
                  1. Fresh Active Bar Hang (Seconds)
                </label>
                <input
                  type="number"
                  value={freshHang}
                  onChange={(e) => setFreshHang(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-[#12141c] border border-[#2d3346] text-white rounded-sm font-mono text-lg font-bold focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#d1d5db] uppercase mb-2">
                  2. Post-Cardio Hang @ 165+ BPM (Seconds)
                </label>
                <input
                  type="number"
                  value={fatiguedHang}
                  onChange={(e) => setFatiguedHang(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-[#12141c] border border-[#2d3346] text-white rounded-sm font-mono text-lg font-bold focus:outline-none focus:border-[#ff5500]"
                />
              </div>

              <div className="bg-[#141724] p-3 border border-[#222738] rounded-sm text-center">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Forearm Grip Decay</span>
                <span className="text-3xl font-mono font-black text-[#ff5500]">
                  -{gripAnalysis.decayPercentage}%
                </span>
              </div>
            </div>

            {/* Diagnostic Box */}
            <div className="p-4 bg-[#10131d] border-l-4 border-[#ff5500] rounded-sm space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-white">
                Coach Diagnosis: {gripAnalysis.diagnosis}
              </span>
              <p className="text-xs text-[#d1d5db] leading-relaxed">
                {gripAnalysis.recommendation}
              </p>
            </div>
          </div>

          {/* Grip Testing Battery */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-4">
              Standard OCR Grip Assessment Battery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GRIP_ASSESSMENT_BATTERY.map((test) => (
                <div key={test.id} className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#181c28] text-[#ccff00] px-2 py-0.5 rounded-sm">
                      {test.category}
                    </span>
                  </div>
                  <h5 className="text-sm font-bold text-white">{test.name}</h5>
                  <p className="text-[11px] text-[#9ca3af]">{test.description}</p>
                  <div className="pt-2 border-t border-[#1c202d] text-[10px] font-mono">
                    <div className="text-[#ccff00]">Elite: {test.eliteStandard}</div>
                    <div className="text-[#9ca3af]">Open: {test.openStandard}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 6. TAB 4: COMPROMISED RUNNING LAB */}
      {activeTab === 'compromised' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="bg-[#12141c] border border-[#242838] p-6 sm:p-8 rounded-sm space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#ccff00] tracking-widest block mb-1">
                Transition Fatigue & Lactate Clearance
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Compromised Pace Decay Calculator
              </h3>
              <p className="text-xs text-[#9ca3af] mt-1 max-w-2xl">
                Measures how severely your running split degrades in the first 800m after setting down a 70lb sandbag or completing 30 penalty burpees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end bg-[#0a0c10] p-6 border border-[#1f2434] rounded-sm">
              <div>
                <label className="block text-xs font-mono text-[#d1d5db] uppercase mb-2">
                  1. Fresh Flat Mile Pace (Seconds)
                </label>
                <input
                  type="number"
                  value={freshPace}
                  onChange={(e) => setFreshPace(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-[#12141c] border border-[#2d3346] text-white rounded-sm font-mono text-lg font-bold focus:outline-none focus:border-[#ccff00]"
                />
                <span className="text-[10px] font-mono text-[#6b7280] mt-1 block">
                  Pace: {formatPaceTime(freshPace)} / mile
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#d1d5db] uppercase mb-2">
                  2. Post-Carry Compromised Pace (Seconds)
                </label>
                <input
                  type="number"
                  value={postPace}
                  onChange={(e) => setPostPace(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-[#12141c] border border-[#2d3346] text-white rounded-sm font-mono text-lg font-bold focus:outline-none focus:border-[#ccff00]"
                />
                <span className="text-[10px] font-mono text-[#6b7280] mt-1 block">
                  Pace: {formatPaceTime(postPace)} / mile
                </span>
              </div>

              <div className="bg-[#141724] p-3 border border-[#222738] rounded-sm text-center">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Transition Velocity Drop</span>
                <span className="text-3xl font-mono font-black text-[#ccff00]">
                  +{paceAnalysis.decayPercentage}%
                </span>
              </div>
            </div>

            {/* Analysis Box */}
            <div className="p-4 bg-[#10131d] border-l-4 border-[#ccff00] rounded-sm space-y-1">
              <span className="text-xs font-mono font-bold uppercase text-white">
                Engine Classification: {paceAnalysis.transitionScore}
              </span>
              <p className="text-xs text-[#d1d5db] leading-relaxed">
                {paceAnalysis.feedback}
              </p>
            </div>
          </div>

          {/* Featured Compromised WOD */}
          <div className="bg-[#0e1017] border border-[#242838] p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase">
                  Featured Compromised WOD
                </span>
                <h4 className="text-xl font-bold text-white">
                  {COMPROMISED_WODS[0].name}
                </h4>
              </div>
              <Link
                href="/timer"
                className="px-4 py-2 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-bold uppercase text-xs clip-angled transition-colors"
              >
                Launch in Timer
              </Link>
            </div>

            <div className="space-y-2 pt-2">
              {COMPROMISED_WODS[0].intervals.map((int) => (
                <div key={int.order} className="p-3 bg-[#12141c] border border-[#202536] rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#ff5500] font-bold">0{int.order}.</span>
                    <span className="text-white font-semibold">{int.activity}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9ca3af]">{int.transitionCues}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ADAPTIVE TRAINING PLAN TAB */}
      {activeTab === 'plan' && (
        <TrainingPlanView onOpenNutritionLab={() => setIsNutritionOpen(true)} />
      )}

      {/* DAILY NUTRITION & FUELING TAB */}
      {activeTab === 'nutrition' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DailyNutritionCard onOpenNutritionLab={() => setIsNutritionOpen(true)} />
          
          <div className="bg-[#0e1017] border border-[#222736] p-6 rounded-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1c202d] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider" style={{ color: tierMeta.badgeColor }}>
                  {tierMeta.name} Fueling Protocol
                </span>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Evidence-Based Performance Nutrition
                </h3>
              </div>
              <button
                onClick={() => setIsNutritionOpen(true)}
                className="px-4 py-2 bg-[#161a26] hover:bg-[#202638] border border-[#2d364f] text-white font-mono text-xs uppercase rounded-sm cursor-pointer transition flex items-center gap-2 self-start sm:self-auto"
              >
                <Utensils className="w-4 h-4 text-[#00e5ff]" /> Open Full Nutrition Drawer
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#12151f] border border-[#1e2436] rounded-sm space-y-1.5">
                <span className="font-mono text-[#00ff88] font-bold uppercase text-[11px] block">
                  1. Daily Protein Synthesis
                </span>
                <p className="text-[#9ca3af] leading-relaxed">
                  Target 0.8 - 1.0g of protein per pound of bodyweight split across 3-4 meals to maximize recovery and preserve lean tissue during high training volume.
                </p>
              </div>

              <div className="p-4 bg-[#12151f] border border-[#1e2436] rounded-sm space-y-1.5">
                <span className="font-mono text-[#00e5ff] font-bold uppercase text-[11px] block">
                  2. Hydration & Electrolytes
                </span>
                <p className="text-[#9ca3af] leading-relaxed">
                  Consume 2.5 to 3.5 liters of water daily. For sessions lasting over 60 minutes or in warm environments, supplement with 300-600mg sodium per hour.
                </p>
              </div>

              <div className="p-4 bg-[#12151f] border border-[#1e2436] rounded-sm space-y-1.5">
                <span className="font-mono text-[#ffaa00] font-bold uppercase text-[11px] block">
                  3. Workout Timing
                </span>
                <p className="text-[#9ca3af] leading-relaxed">
                  Prioritize complex carbohydrates 2-3 hours before training, and replenish glycogen stores with quick-digesting carbs and protein within 45 minutes post-workout.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERMEDIATE PROGRESS TRACKING TAB */}
      {activeTab === 'progress' && (
        <IntermediateProgressSection />
      )}

      {/* PERFORMANCE VIEW TAB (TIER-ADAPTIVE: 7 CATEGORIES FOR INTERMEDIATE, 12 DOMAINS FOR ADVANCED) */}
      {activeTab === 'performance' && (
        isIntermediate ? (
          <IntermediatePerformanceSection />
        ) : (
          <OcrPerformanceView />
        )
      )}

      {/* INTERMEDIATE RACE PREP TAB */}
      {activeTab === 'race' && (
        <IntermediateRacePrepSection />
      )}

      {/* INTERMEDIATE RECOVERY & READINESS TAB */}
      {activeTab === 'recovery' && (
        <IntermediateRecoverySection />
      )}

      {/* INTERMEDIATE GAMIFICATION & MISSIONS TAB */}
      {activeTab === 'gamification' && (
        <IntermediateGamificationSection />
      )}

      {/* COACH COMMAND HQ TAB */}
      {activeTab === 'coach' && (
        <CoachDashboardView />
      )}

      {/* TAB 5: 12 MAJOR DOMAINS (107 QUALITIES) LAB */}
      {activeTab === 'qualities' && (
        <PerformanceQualitiesLab />
      )}

      {/* TAB 6: APP STORE COMPLIANCE & STOREKIT 2 PAYWALL PREVIEW */}
      {activeTab === 'paywall' && (
        <div className="max-w-2xl mx-auto bg-[#0e1017] border-2 border-[#ff5500] rounded-sm p-8 sm:p-12 space-y-8 animate-in zoom-in-95 duration-200">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#ff5500]/10 border border-[#ff5500] rounded-full flex items-center justify-center mx-auto mb-2">
              <Apple className="w-7 h-7 text-[#ff5500]" />
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ccff00]">
              APPLE APP STORE IN-APP PURCHASE (STOREKIT 2)
            </span>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              Unlock GRIT OCR Pro Athlete
            </h3>
            <p className="text-xs text-[#9ca3af]">
              Full access to all 66 fitness modules, 18+ obstacle progression blueprints, Apple HealthKit integration, and adaptive OCR periodization.
            </p>
          </div>

          {/* Pricing Options */}
          <div className="space-y-3">
            <div className="p-4 bg-[#141724] border-2 border-[#ccff00] rounded-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">Annual Pro Athlete Access</span>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#ccff00] text-black clip-angled">
                    SAVE 45%
                  </span>
                </div>
                <div className="text-xs text-[#9ca3af] font-mono mt-0.5">
                  $12.49 / month ($149.99 billed annually)
                </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#ccff00] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-black" />
              </div>
            </div>

            <div className="p-4 bg-[#10121a] border border-[#222736] rounded-sm flex items-center justify-between opacity-80">
              <div>
                <div className="font-bold text-white text-sm">Monthly Subscription</div>
                <div className="text-xs text-[#9ca3af] font-mono mt-0.5">$24.99 billed monthly</div>
              </div>
              <div className="w-5 h-5 rounded-full border border-[#3d455d]"></div>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-2 text-xs text-[#d1d5db] border-t border-[#1c202d] pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
              <span>Full Obstacle Video Progressions & 0-100 Competency Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
              <span>Apple Watch / HealthKit Real-Time Transition Fatigue Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
              <span>Barcode Scanner & AI Meal Photo Macro Tracker</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
              <span>Compromised Race Simulation Builder with Audio Synthesizer</span>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              onClick={() => alert("StoreKit 2 Sandbox Purchase Activated! Pro Features Unlocked.")}
              className="w-full py-4 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-black uppercase text-sm tracking-wider clip-angled transition-all glow-orange"
            >
              Start 7-Day Free Trial (StoreKit 2)
            </button>
            <div className="flex justify-center gap-4 text-[10px] font-mono text-[#6b7280] mt-3">
              <button onClick={() => alert("Purchases Restored via StoreKit 2.")} className="hover:underline">
                Restore Purchases
              </button>
              <span>•</span>
              <span className="hover:underline">Privacy Policy</span>
              <span>•</span>
              <span className="hover:underline">Terms of Service</span>
            </div>
          </div>

        </div>
      )}

      {/* Interactive Drawers & Modals */}
      <AiCoachAssistantDrawer 
        isOpen={isAiCoachOpen} 
        onClose={() => setIsAiCoachOpen(false)} 
      />

      <NutritionFuelingDrawer 
        isOpen={isNutritionOpen} 
        onClose={() => setIsNutritionOpen(false)} 
      />

      <ProgressAnalyticsDrawer 
        isOpen={isProgressOpen} 
        onClose={() => setIsProgressOpen(false)} 
      />

      <WearablesSyncModal 
        isOpen={isWearablesOpen} 
        onClose={() => setIsWearablesOpen(false)} 
      />

      <AthleteIntakeModal 
        isOpen={isIntakeOpen} 
        onClose={() => setIsIntakeOpen(false)} 
        onSave={(data) => {
          // Dynamically re-calibrate scorecard competency metrics from intake data
          setScores(prev => ({
            ...prev,
            grip: Math.min(100, Math.round((data.maxDeadHangSeconds / 130) * 100)),
            pullingStrength: Math.min(100, Math.round(data.maxStrictPullUps * 5.2)),
            running: Math.min(100, Math.max(50, Math.round(100 - (data.oneMileTrailPaceSeconds - 360) / 4))),
            fatigueResistance: Math.min(100, Math.round((data.plankHoldSeconds / 160) * 100))
          }));
        }}
      />

      <AutonomousNotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenWeeklyReview={() => setIsWeeklyReviewOpen(true)}
      />

      <AutomatedCheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        onCheckInComplete={() => {
          window.dispatchEvent(new CustomEvent('grit_athlete_data_changed'));
        }}
      />

      <AiWeeklyReviewModal
        isOpen={isWeeklyReviewOpen}
        onClose={() => setIsWeeklyReviewOpen(false)}
      />

      <PlatformCapabilitiesDrawer
        isOpen={isPlatformHubOpen}
        onClose={() => setIsPlatformHubOpen(false)}
        onOpenLiveWorkout={() => {
          setActiveTab('plan');
          // Dispatch custom event to notify TrainingPlanView to open live tracker
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('grit_open_live_tracker'));
          }, 150);
        }}
        onOpenAiCoach={() => setIsAiCoachOpen(true)}
        onOpenNutrition={() => setIsNutritionOpen(true)}
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenIntake={() => setIsIntakeOpen(true)}
        onOpenWearables={() => setIsWearablesOpen(true)}
        onOpenCheckIn={() => setIsCheckInOpen(true)}
        onOpenWeeklyReview={() => setIsWeeklyReviewOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* Floating Elite Platform Capabilities Button (Advanced Only) */}
      {isAdvanced && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsPlatformHubOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-[#ff5500] to-[#ff7700] hover:from-[#ff6a00] hover:to-[#ff8800] text-black font-mono font-black text-xs uppercase tracking-wider rounded-full shadow-2xl shadow-[#ff5500]/50 border border-white/20 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
            title="Open Elite Platform Capabilities Hub"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>⚡ Platform Upgrades Hub</span>
          </button>
        </div>
      )}

    </div>
  );
}
