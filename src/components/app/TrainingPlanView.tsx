'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrainingPlan, 
  Session, 
  Microcycle, 
  WorkoutLogEntry 
} from '@/types/trainingPlan/plan';
import { AthleteProfile } from '@/types/trainingPlan/athlete';
import { RaceProfile } from '@/types/trainingPlan/race';
import { SEED_ATHLETES, SEED_RACES } from '@/data/seedProfiles';
import { generateComprehensiveOcrPlan } from '@/services/trainingEngine/planGeneratorService';
import { evaluateWorkoutFeedback, triageMissedWorkout } from '@/services/trainingEngine/adaptationService';
import { calculateDistanceReadiness } from '@/services/trainingEngine/readinessService';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Zap, 
  AlertTriangle, 
  ShieldCheck, 
  Compass, 
  ChevronRight, 
  Layers, 
  Target, 
  Activity, 
  Timer,
  Info,
  Check,
  RotateCcw,
  Play,
  X
} from 'lucide-react';
import LiveWorkoutTrackerModal from './LiveWorkoutTrackerModal';
import DailyNutritionCard from './DailyNutritionCard';
import { athleteStorage } from '@/services/storage/athleteStorageService';
import { evaluateWorkoutForAutoAdaptation } from '@/services/trainingEngine/aiCoachEngineService';
import { useExperienceTier } from '@/context/ExperienceTierContext';

interface TrainingPlanViewProps {
  initialAthlete?: AthleteProfile;
  initialRace?: RaceProfile;
  onOpenNutritionLab?: () => void;
}

export default function TrainingPlanView({
  initialAthlete = SEED_ATHLETES[1],
  initialRace = SEED_RACES.beast,
  onOpenNutritionLab
}: TrainingPlanViewProps) {
  const { tier, isBasic, isIntermediate, isAdvanced } = useExperienceTier();
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(initialAthlete.id);
  const [activePlanTab, setActivePlanTab] = useState<'today' | 'week' | 'month' | 'block'>('today');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [isLiveWorkoutOpen, setIsLiveWorkoutOpen] = useState<boolean>(false);

  const handleOpenNutrition = () => {
    if (onOpenNutritionLab) {
      onOpenNutritionLab();
    } else {
      window.dispatchEvent(new CustomEvent('grit_open_nutrition_drawer'));
    }
  };

  useEffect(() => {
    const handleOpenLive = () => {
      setActivePlanTab('today');
      setIsLiveWorkoutOpen(true);
    };
    window.addEventListener('grit_open_live_tracker', handleOpenLive);
    return () => window.removeEventListener('grit_open_live_tracker', handleOpenLive);
  }, []);
  
  // Feedback log state
  const [isLoggingModalOpen, setIsLoggingModalOpen] = useState<boolean>(false);
  const [logRpe, setLogRpe] = useState<number>(7);
  const [logDifficulty, setLogDifficulty] = useState<'too_easy' | 'just_right' | 'hard_manageable' | 'excessive_burnout'>('hard_manageable');
  const [logSoreness, setLogSoreness] = useState<number>(2);
  const [logPainFlag, setLogPainFlag] = useState<boolean>(false);
  const [logPainNotes, setLogPainNotes] = useState<string>('');
  const [logComments, setLogComments] = useState<string>('');
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLogEntry[]>([]);

  // Active athlete & plan
  const currentAthlete = SEED_ATHLETES.find(a => a.id === selectedAthleteId) || initialAthlete;
  const currentRace = selectedAthleteId === 'athlete_sarah' 
    ? SEED_RACES.sprint 
    : selectedAthleteId === 'athlete_marcus'
    ? SEED_RACES.super
    : initialRace;

  const planOutput = generateComprehensiveOcrPlan(currentAthlete, currentRace);
  const plan = planOutput.trainingPlan;
  const currentWeek = plan.mesocycles[0]?.weeks[selectedWeekIndex] || plan.mesocycles[0]?.weeks[0];
  const todaySession = currentWeek.sessions[0] || null;

  // Race Readiness
  const readiness = calculateDistanceReadiness(planOutput.performanceProfile, currentRace.distanceCategory);

  // Handle logging submission
  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WorkoutLogEntry = {
      loggedAt: new Date().toISOString(),
      completed: true,
      actualDurationMinutes: todaySession.estimatedDurationMinutes,
      overallRpe: logRpe,
      perceivedDifficulty: logDifficulty,
      sorenessLevel: logSoreness,
      painFlagDetected: logPainFlag,
      painLocationAndNotes: logPainNotes,
      athleteComments: logComments,
      completedPrescriptions: []
    };

    setWorkoutLogs(prev => [newEntry, ...prev]);

    // Autonomous background Progressive Overload & Overload Tracking
    try {
      if (todaySession) {
        const autoAdapt = evaluateWorkoutForAutoAdaptation(todaySession, newEntry, workoutLogs);
        athleteStorage.recordAdaptation(autoAdapt);
      }

      athleteStorage.saveWorkoutLog({
        sessionId: todaySession.id,
        sessionName: todaySession.name,
        dayOfWeek: todaySession.dayOfWeek,
        durationMinutes: todaySession.estimatedDurationMinutes,
        overallRpe: logRpe,
        perceivedDifficulty: logDifficulty,
        sorenessLevel: logSoreness,
        painFlag: logPainFlag,
        painLocationAndNotes: logPainNotes,
        athleteComments: logComments,
        exercises: [],
        totalVolumeLbs: 3800,
        totalSetsCompleted: 12,
        prsAchieved: []
      });
    } catch (e) {
      // background failsafe
    }

    setIsLoggingModalOpen(false);
  };

  const adaptation = evaluateWorkoutFeedback(workoutLogs);

  const getSessionTypeColor = (type: string, isHard: boolean) => {
    if (isHard) return 'bg-[#ff4444]/20 border-[#ff4444]/50 text-[#ff4444]';
    if (type === 'aerobic_run_engine') return 'bg-[#ccff00]/20 border-[#ccff00]/50 text-[#ccff00]';
    if (type === 'grip_and_hanging_armor') return 'bg-[#ff7700]/20 border-[#ff7700]/50 text-[#ff7700]';
    return 'bg-[#151926] border-[#222738] text-[#9ca3af]';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. HEADER BASED ON TIER */}
      <div className={`p-6 rounded-sm relative overflow-hidden shadow-2xl ${
        isBasic 
          ? 'bg-[#0a0f16] border-2 border-[#00ff88]' 
          : isIntermediate 
          ? 'bg-[#12131c] border-2 border-[#ffaa00]' 
          : 'bg-[#121520] border-2 border-[#ff5500]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#202538]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider clip-angled text-black ${
                isBasic ? 'bg-[#00ff88]' : isIntermediate ? 'bg-[#ffaa00]' : 'bg-[#ff5500]'
              }`}>
                {isBasic ? 'BASIC: SIMPLE & GUIDED' : isIntermediate ? 'INTERMEDIATE: PERFORMANCE & PROGRESS' : `RACE COUNTDOWN: ${currentRace.weeksUntilRace * 7} DAYS`}
              </span>
              <span className="text-xs font-mono text-[#ccff00] font-bold uppercase">
                {currentRace.organization.toUpperCase()} • {currentRace.name} ({currentRace.weeksUntilRace * 7} Days Away)
              </span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              {isBasic ? "Your Daily Training Plan" : isIntermediate ? "Performance Training Plan" : "Periodized Training Plan"}
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-xl leading-relaxed">
              {isBasic 
                ? "Complete personalized training program. The intelligent AI automatically progresses your exercises, adjusts volume, and manages recovery behind the scenes."
                : isIntermediate
                ? `Targeting ${currentRace.distanceKm}K with progressive overload, training phases, and target RPE recommendations.`
                : `Targeting ${currentRace.distanceKm}K with ${currentRace.numberOfObstacles} obstacles and ${currentRace.elevationGainMeters}m elevation vert.`
              }
            </p>
          </div>

          {/* Quick Readiness Dial (Hidden in Basic, visible in Intermediate & Advanced) */}
          {!isBasic && (
            <div className="bg-[#0a0c12] border border-[#202538] p-4 rounded-sm flex items-center gap-5 shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold uppercase text-[#6b7280] block">
                  {currentRace.distanceCategory.toUpperCase()} Readiness
                </span>
                <span className="text-3xl font-black font-mono text-[#ccff00]">
                  {readiness.readinessPercent}%
                </span>
                <span className="text-[10px] font-mono text-[#9ca3af] block">
                  {readiness.ratingLabel}
                </span>
              </div>
              <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center ${
                isIntermediate ? 'border-[#ffaa00]' : 'border-[#ff5500]'
              }`}>
                <Compass className={`w-6 h-6 ${isIntermediate ? 'text-[#ffaa00]' : 'text-[#ff5500]'}`} />
              </div>
            </div>
          )}
        </div>

        {/* Intermediate Phase Highlight Banner */}
        {isIntermediate && (
          <div className="mt-4 p-3.5 bg-[#141824] border-l-4 border-[#ffaa00] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div>
              <span className="text-[#ffaa00] font-bold uppercase block text-[10px]">Active Training Phase:</span>
              <span className="text-white font-black text-sm">STRENGTH ENDURANCE & HILL DURABILITY (Week 4 of 8)</span>
            </div>
            <div className="text-[#9ca3af] text-[11px] sm:text-right">
              <span className="text-[#00ff88]">Current Focus:</span> Pulling Stamina, Grip, Aerobic Climb
            </div>
          </div>
        )}

        {/* Adaptive Engine Alert Bar */}
        {workoutLogs.length > 0 && (
          <div className={`mt-4 p-3 rounded-sm border text-xs font-mono flex items-start gap-2.5 ${
            isBasic
              ? 'bg-[#00ff88]/10 border-[#00ff88]/40 text-[#00ff88]'
              : adaptation.flaggedSafetyWarning 
              ? 'bg-[#ff3333]/20 border-[#ff3333] text-[#ff6666]' 
              : adaptation.action === 'trigger_reactive_deload'
              ? 'bg-[#ffaa00]/20 border-[#ffaa00] text-[#ffcc00]'
              : 'bg-[#ccff00]/10 border-[#ccff00]/40 text-[#ccff00]'
          }`}>
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold uppercase">
                {isBasic ? "AI Training Update" : (adaptation.flaggedSafetyWarning || `Engine Autoregulation: ${adaptation.action.toUpperCase()}`)}
              </strong>
              <span>
                {isBasic 
                  ? "Your workout was adjusted based on your recent training." 
                  : adaptation.rationale}
              </span>
            </div>
          </div>
        )}

        {/* Persona Switcher Bar */}
        <div className="flex items-center justify-between pt-4 text-xs font-mono">
          <span className="text-[#9ca3af] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#ff5500]" /> Active Athlete: <strong className="text-white">{currentAthlete.name}</strong>
          </span>
          <div className="flex gap-1.5">
            {SEED_ATHLETES.map((ath) => (
              <button
                key={ath.id}
                onClick={() => setSelectedAthleteId(ath.id)}
                className={`px-2.5 py-1 text-[11px] rounded-sm transition-all ${
                  selectedAthleteId === ath.id ? 'bg-[#ff5500] text-black font-black' : 'bg-[#0a0c12] text-[#9ca3af] border border-[#202538]'
                }`}
              >
                {ath.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SUB-VIEW TABS (TIER-ADAPTIVE) */}
      <div className="flex items-center justify-between border-b border-[#202538] pb-3">
        <div className="bg-[#0e1017] p-1 border border-[#222736] rounded-sm flex items-center gap-1">
          {/* In Basic: only today & week */}
          {/* In Intermediate: today, week, month (phases) */}
          {/* In Advanced: today, week, month, block */}
          {(
            isBasic 
              ? (['today', 'week'] as const)
              : isIntermediate
              ? (['today', 'week', 'month'] as const)
              : (['today', 'week', 'month', 'block'] as const)
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActivePlanTab(tab)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-all ${
                activePlanTab === tab
                  ? isBasic 
                    ? 'bg-[#00ff88] text-black font-black shadow-md'
                    : isIntermediate
                    ? 'bg-[#ffaa00] text-black font-black shadow-md'
                    : 'bg-[#ff5500] text-black font-black shadow-md'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              {tab === 'today' 
                ? (isBasic ? "Today's Workout" : "Today's Session")
                : tab === 'week' 
                ? (isBasic ? "Weekly Schedule" : "Weekly Microcycle")
                : tab === 'month' 
                ? (isIntermediate ? "Training Phases" : "4-Week Mesocycle") 
                : "Training Block (Macrocycle)"}
            </button>
          ))}
        </div>

        {activePlanTab === 'today' && (
          <button
            onClick={() => setIsLoggingModalOpen(true)}
            className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-mono font-black uppercase clip-angled transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" /> Log Session Feedback
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. SUB-VIEW: TODAY'S SESSION                                              */}
      {/* ========================================================================= */}
      {activePlanTab === 'today' && todaySession && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main Session Banner */}
          <div className="bg-[#0e1017] border-l-4 border-l-[#ff5500] border-y border-r border-[#242838] p-6 rounded-sm shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#ff5500]">
                {todaySession.dayOfWeek.toUpperCase()} • {todaySession.estimatedDurationMinutes} MINS
              </span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm border ${getSessionTypeColor(todaySession.sessionType, todaySession.isHardSession)}`}>
                {todaySession.isHardSession ? '⚡ High CNS Fatigue (Hard)' : '✓ Aerobic Adaptation (Moderate)'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {todaySession.name}
            </h3>

            {/* Why this session is in your program */}
            <div className="p-4 bg-[#141724] border border-[#22293d] rounded-sm space-y-1 mt-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Why This Session Is In Your Program:
              </span>
              <p className="text-xs text-[#d1d5db] leading-relaxed">
                {todaySession.whyThisSessionIsInYourProgram}
              </p>
            </div>
          </div>

          {/* Daily Fueling Strategy Card (Optional Nutrition Integration) */}
          <DailyNutritionCard 
            session={todaySession} 
            onOpenNutritionLab={handleOpenNutrition} 
          />

          {/* Simple Embedded Progress Feedback (Basic Tier) */}
          {isBasic && (
            <div className="p-4 bg-[#0d141e] border border-[#00ff88]/40 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-[#00ff88] flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Weekly Training Progress
                </span>
                <span className="text-[10px] font-mono text-white bg-[#00ff88]/20 px-2 py-0.5 rounded font-bold">
                  4 of 5 Workouts Completed
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-[#121824] rounded-sm border border-[#1b2536]">
                  <span className="text-[10px] text-[#9ca3af] block">Consistency</span>
                  <span className="text-sm font-black text-white">94% on schedule</span>
                </div>
                <div className="p-2.5 bg-[#121824] rounded-sm border border-[#1b2536]">
                  <span className="text-[10px] text-[#9ca3af] block">Recent Personal Best</span>
                  <span className="text-sm font-black text-[#00ff88]">Dead Hang: +15s</span>
                </div>
                <div className="p-2.5 bg-[#121824] rounded-sm border border-[#1b2536]">
                  <span className="text-[10px] text-[#9ca3af] block">Program Progress</span>
                  <span className="text-sm font-black text-[#ccff00]">Block 1: Week 4</span>
                </div>
              </div>
              <p className="text-[11px] text-[#cbd5e1] italic">
                &ldquo;Your running endurance and pulling strength are progressing smoothly. Stick to your prescribed sets and reps today.&rdquo;
              </p>
            </div>
          )}

          {/* Warm-Up Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#00e5ff] tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Phase 1: Dynamic Warm-Up & Joint Activation (8-10 Mins)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {todaySession.warmup.map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-[#0c0e14] border border-[#1e2332] rounded-sm space-y-1 text-xs">
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-[#ff5500] font-mono text-[11px] font-semibold">{item.durationOrReps}</div>
                  <div className="text-[10px] text-[#9ca3af] font-mono">{item.coachingCue}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Training Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Phase 2: Main Training Prescriptions
            </h4>
            
            <div className="space-y-4">
              {todaySession.mainExercises.map((pres: any, idx: number) => (
                <div key={idx} className="p-5 bg-[#0e1017] border border-[#242838] rounded-sm space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1b2030]">
                    <div>
                      <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase">Exercise 0{idx + 1}</span>
                      <h5 className="text-lg font-black text-white">{pres.exerciseName}</h5>
                    </div>
                    <div className="text-xs font-mono text-right">
                      <span className="text-[#ccff00] font-bold block">{pres.sets} sets x {pres.repsOrDistanceOrDuration}</span>
                      <span className="text-[#9ca3af] text-[10px]">
                        Rest: {pres.restSeconds}s
                        {!isBasic && ` • Target RPE ${pres.targetRpe}/10 (RIR ${10 - pres.targetRpe})`}
                      </span>
                    </div>
                  </div>

                  {/* Intermediate / Advanced Load Recommendation */}
                  {isIntermediate && (
                    <div className="p-2.5 bg-[#141824] border border-[#242b3e] rounded-sm flex items-center justify-between text-xs font-mono">
                      <span className="text-[#9ca3af]">Previous: <strong className="text-white">185 lbs × {pres.repsOrDistanceOrDuration}</strong></span>
                      <span className="text-[#00ff88] font-bold">Recommended: 190 lbs × {pres.repsOrDistanceOrDuration}</span>
                    </div>
                  )}

                  {!isBasic && (
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      {pres.exercise.ocrApplicationNote}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-[#121520] rounded-sm border border-[#1d2232] space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] block">Coaching Cues:</span>
                      <ul className="list-disc list-inside text-[#cbd5e1] space-y-0.5 text-[11px]">
                        {pres.coachingCues.map((cue: string, cIdx: number) => (
                          <li key={cIdx}>{cue}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-[#121520] rounded-sm border border-[#1d2232] space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#ffbb00] block">
                        {isBasic ? 'Safe Substitutions:' : 'Regression & Progression Options:'}
                      </span>
                      <div className="text-[11px] text-[#9ca3af] space-y-0.5 font-mono">
                        <div>{isBasic ? 'Easier Alternative: ' : 'Regression: '}<strong className="text-white">{pres.activeRegressionAlternative || 'Bodyweight Variant'}</strong></div>
                        {!isBasic && (
                          <div>Progression: <strong className="text-white">{pres.activeProgressionAlternative || 'Compromised Rig Traverse'}</strong></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cooldown Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-[#9ca3af] tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" /> Phase 3: Cooldown, Downregulation & Recovery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {todaySession.cooldown.map((item: any, idx: number) => (
                <div key={idx} className="p-3 bg-[#0c0e14] border border-[#1e2332] rounded-sm space-y-1 text-xs">
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-[#ccff00] font-mono text-[11px]">{item.durationOrReps}</div>
                  <div className="text-[10px] text-[#9ca3af] font-mono">{item.coachingCue}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUB-VIEW: WEEKLY MICROCYCLE (MON-SUN)                                 */}
      {/* ========================================================================= */}
      {activePlanTab === 'week' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-4 bg-[#121520] border border-[#202538] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase block">
                ACTIVE MICROCYCLE: WEEK 01 OF {plan.totalDurationWeeks}
              </span>
              <div className="text-white font-black text-lg">
                Target Mileage: {currentWeek.weeklyTargetRunningKm} km • Vert Gain: {currentWeek.weeklyTargetElevationMeters}m
              </div>
            </div>
            <div className="text-xs font-mono text-[#9ca3af]">
              {currentWeek.isDeloadWeek ? '⚠️ Deload Week (Volume -35%)' : 'Progressive Overload Week'}
            </div>
          </div>

          {/* 7-Day Microcycle Calendar */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const).map((day) => {
              const session = currentWeek.sessions.find((s: any) => s.dayOfWeek === day);

              return (
                <div
                  key={day}
                  className={`p-3 rounded-sm border flex flex-col justify-between min-h-[160px] ${
                    session 
                      ? session.isHardSession 
                        ? 'bg-[#141018] border-[#ff4444]/40' 
                        : 'bg-[#0e1017] border-[#242838]'
                      : 'bg-[#090a0f] border-[#181a24] opacity-60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500]">
                        {day.slice(0, 3)}
                      </span>
                      {session && (
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-sm ${
                          session.isHardSession ? 'bg-[#ff4444] text-black font-black' : 'bg-[#1c2234] text-[#ccff00]'
                        }`}>
                          {session.isHardSession ? 'Hard' : 'Moderate'}
                        </span>
                      )}
                    </div>

                    {session ? (
                      <div>
                        <div className="text-xs font-bold text-white leading-tight line-clamp-2">
                          {session.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#9ca3af] mt-1">
                          {session.estimatedDurationMinutes} mins
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-[#6b7280] font-mono italic pt-2">
                        Complete Rest / Recovery
                      </div>
                    )}
                  </div>

                  {session && (
                    <div className="text-[9px] font-mono text-[#6b7280] truncate pt-2 border-t border-[#1a1f2e]">
                      {session.mainExercises[0]?.exerciseName}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SUB-VIEW: 4-WEEK MESOCYCLE & MACROCYCLE                                */}
      {/* ========================================================================= */}
      {(activePlanTab === 'month' || activePlanTab === 'block') && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-4">
            <h4 className="text-sm font-mono font-bold uppercase text-[#ff5500] tracking-wider">
              {plan.mesocycles.length} Mesocycle Blocks across {plan.phases.length} Phases:
            </h4>

            <div className="space-y-4">
              {plan.mesocycles.map((meso, mIdx) => (
                <div key={mIdx} className="p-5 bg-[#0e1017] border border-[#242838] rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase">
                        BLOCK {meso.blockNumber} • 4 WEEKS
                      </span>
                      <h5 className="text-lg font-black text-white">{meso.name}</h5>
                    </div>
                    <span className="text-xs font-mono text-[#ccff00] font-bold">
                      {meso.primaryAdaptationGoal}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                    {meso.weeks.map((w, wIdx) => (
                      <div key={wIdx} className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold">Week 0{w.weekNumber}</span>
                          <span className={w.isDeloadWeek ? 'text-[#ffbb00]' : 'text-[#ccff00]'}>
                            {w.isDeloadWeek ? 'Deload' : 'Overload'}
                          </span>
                        </div>
                        <div className="text-[#9ca3af] text-[10px]">{w.weeklyTargetRunningKm} km • {w.weeklyTargetElevationMeters}m vert</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. WORKOUT COMPLETION & AUTOREGULATION MODAL */}
      {isLoggingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1017] border-2 border-[#ff5500] w-full max-w-lg rounded-sm p-6 space-y-5 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#202538]">
              <div>
                <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase">Session Feedback Logging</span>
                <h4 className="text-xl font-black text-white uppercase">Post-Workout Autoregulation</h4>
              </div>
              <button onClick={() => setIsLoggingModalOpen(false)} className="text-[#9ca3af] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4 text-xs">
              
              {/* Overall RPE */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-[#d1d5db]">Session RPE (Rate of Perceived Exertion):</span>
                  <strong className="text-[#ff5500]">{logRpe} / 10</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={logRpe}
                  onChange={(e) => setLogRpe(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#1b2030] rounded-lg appearance-none cursor-pointer accent-[#ff5500]"
                />
              </div>

              {/* Perceived Difficulty */}
              <div className="space-y-1.5">
                <span className="text-[#d1d5db] font-mono">Perceived Difficulty:</span>
                <select
                  value={logDifficulty}
                  onChange={(e) => setLogDifficulty(e.target.value as any)}
                  className="w-full bg-[#121520] border border-[#23283a] p-2.5 rounded-sm text-white font-mono"
                >
                  <option value="too_easy">Too Easy (Ready for more volume)</option>
                  <option value="just_right">Just Right (Target adaptation achieved)</option>
                  <option value="hard_manageable">Hard but Manageable (High overload)</option>
                  <option value="excessive_burnout">Excessive / Severe Burnout (Trigger Deload)</option>
                </select>
              </div>

              {/* Soreness Level */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-mono">
                  <span className="text-[#d1d5db]">Muscle Soreness Level:</span>
                  <strong className="text-[#ccff00]">{logSoreness} / 5</strong>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={logSoreness}
                  onChange={(e) => setLogSoreness(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#1b2030] rounded-lg appearance-none cursor-pointer accent-[#ccff00]"
                />
              </div>

              {/* Pain Flag */}
              <div className="p-3 bg-[#15121b] border border-[#ff3333]/40 rounded-sm space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={logPainFlag}
                    onChange={(e) => setLogPainFlag(e.target.checked)}
                    className="w-4 h-4 accent-[#ff3333]"
                  />
                  <span className="font-mono text-white font-bold">⚠️ Flag Localized Joint / Tendon Pain</span>
                </label>
                {logPainFlag && (
                  <input
                    type="text"
                    value={logPainNotes}
                    onChange={(e) => setLogPainNotes(e.target.value)}
                    placeholder="Location and sensation (e.g. Sharp pain in right knee patella)..."
                    className="w-full bg-[#0a0c12] border border-[#ff3333]/60 p-2 rounded-sm text-white font-mono text-xs"
                  />
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLoggingModalOpen(false)}
                  className="px-4 py-2 bg-[#181d2a] text-[#9ca3af] font-mono text-xs uppercase rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#ff5500] text-black font-mono font-black text-xs uppercase clip-angled"
                >
                  Submit Feedback & Adapt Plan
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Interactive Live Workout Tracker Modal */}
      <LiveWorkoutTrackerModal 
        isOpen={isLiveWorkoutOpen}
        onClose={() => setIsLiveWorkoutOpen(false)}
        session={todaySession}
        onWorkoutCompleted={(log: any) => {
          athleteStorage.saveWorkoutLog({
            sessionId: todaySession.id,
            sessionName: todaySession.name,
            dayOfWeek: todaySession.dayOfWeek,
            durationMinutes: log.durationMinutes,
            overallRpe: log.overallRpe,
            perceivedDifficulty: log.perceivedDifficulty,
            sorenessLevel: log.sorenessLevel,
            painFlag: log.painFlag,
            painLocationAndNotes: log.painLocationAndNotes,
            athleteComments: log.athleteComments,
            exercises: log.exercises,
            totalVolumeLbs: log.totalVolumeLbs,
            totalSetsCompleted: log.totalSetsCompleted,
            prsAchieved: log.prsAchieved
          });
        }}
      />

    </div>
  );
}
