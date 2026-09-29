'use client';

import React, { useState, useEffect } from 'react';
import { Session } from '@/types/trainingPlan/plan';
import { athleteStorage, SetLogItem, ExerciseWorkoutLog, CompletedWorkoutRecord } from '@/services/storage/athleteStorageService';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Zap, 
  Trophy, 
  AlertTriangle, 
  X, 
  ChevronRight, 
  Sliders, 
  Activity, 
  Check, 
  Sparkles,
  Info,
  Timer
} from 'lucide-react';

interface LiveWorkoutTrackerModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
  onWorkoutCompleted: (record: CompletedWorkoutRecord) => void;
}

export default function LiveWorkoutTrackerModal({
  session,
  isOpen,
  onClose,
  onWorkoutCompleted
}: LiveWorkoutTrackerModalProps) {
  // Session Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Active Rest Timer
  const [restRemaining, setRestRemaining] = useState<number | null>(null);
  const [isRestTimerActive, setIsRestTimerActive] = useState<boolean>(false);

  // Set-by-Set Logging State
  const [exerciseLogs, setExerciseLogs] = useState<Record<string, SetLogItem[]>>(() => {
    const initial: Record<string, SetLogItem[]> = {};
    session.mainExercises.forEach((pres) => {
      const setsCount = pres.sets || 3;
      const loadStr = pres.loadDescription || pres.intensityZone || 'Prescribed Load';
      initial[pres.exerciseId] = Array.from({ length: setsCount }, (_, i) => ({
        setNumber: i + 1,
        prescribedReps: String(pres.repsOrDistanceOrDuration),
        prescribedLoad: loadStr,
        actualWeightLbs: loadStr.includes('lb') ? parseInt(loadStr) || 50 : 45,
        actualReps: typeof pres.repsOrDistanceOrDuration === 'number' ? pres.repsOrDistanceOrDuration : 10,
        rpe: pres.targetRpe || 7,
        rir: 2,
        isCompleted: false
      }));
    });
    return initial;
  });

  // PR Celebrations
  const [celebratedPrs, setCelebratedPrs] = useState<string[]>([]);
  const [activePrBanner, setActivePrBanner] = useState<string | null>(null);

  // Post-Workout Summary View State
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [overallRpe, setOverallRpe] = useState<number>(7);
  const [perceivedDifficulty, setPerceivedDifficulty] = useState<'too_easy' | 'just_right' | 'hard_manageable' | 'excessive_burnout'>('hard_manageable');
  const [sorenessLevel, setSorenessLevel] = useState<number>(2);
  const [painFlag, setPainFlag] = useState<boolean>(false);
  const [painNotes, setPainNotes] = useState<string>('');
  const [comments, setComments] = useState<string>('');

  // Elapsed Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && isOpen) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isOpen]);

  // Rest Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRestTimerActive && restRemaining !== null && restRemaining > 0) {
      interval = setInterval(() => {
        setRestRemaining(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (restRemaining === 0) {
      setIsRestTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isRestTimerActive, restRemaining]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleSetComplete = (exerciseId: string, setIndex: number, defaultRestSecs: number) => {
    setExerciseLogs(prev => {
      const sets = [...(prev[exerciseId] || [])];
      const wasCompleted = sets[setIndex]?.isCompleted;
      const updatedSet = {
        ...sets[setIndex],
        isCompleted: !wasCompleted
      };
      sets[setIndex] = updatedSet;

      // If set just became completed, launch rest countdown & check PR
      if (!wasCompleted) {
        setRestRemaining(defaultRestSecs || 60);
        setIsRestTimerActive(true);

        // Check if weight / reps qualifies as high effort PR
        if (updatedSet.actualWeightLbs >= 65 || updatedSet.actualReps >= 15) {
          const prMsg = `High Volume Set: ${updatedSet.actualReps} reps @ ${updatedSet.actualWeightLbs} lbs!`;
          if (!celebratedPrs.includes(prMsg)) {
            setCelebratedPrs(p => [...p, prMsg]);
            setActivePrBanner(prMsg);
            setTimeout(() => setActivePrBanner(null), 4000);
          }
        }
      }

      return { ...prev, [exerciseId]: sets };
    });
  };

  const handleUpdateSetField = (exerciseId: string, setIndex: number, field: keyof SetLogItem, value: any) => {
    setExerciseLogs(prev => {
      const sets = [...(prev[exerciseId] || [])];
      sets[setIndex] = {
        ...sets[setIndex],
        [field]: value
      };
      return { ...prev, [exerciseId]: sets };
    });
  };

  const totalSetsCompleted = Object.values(exerciseLogs).reduce((acc, sets) => {
    return acc + sets.filter(s => s.isCompleted).length;
  }, 0);

  const totalVolumeTonnage = Object.values(exerciseLogs).reduce((acc, sets) => {
    return acc + sets.reduce((sAcc, s) => s.isCompleted ? sAcc + (s.actualWeightLbs * s.actualReps) : sAcc, 0);
  }, 0);

  const handleFinishWorkout = () => {
    const exercisesRecord: ExerciseWorkoutLog[] = session.mainExercises.map(pres => ({
      exerciseId: pres.exerciseId,
      exerciseName: pres.exerciseName,
      sets: exerciseLogs[pres.exerciseId] || []
    }));

    const record = athleteStorage.saveWorkoutLog({
      sessionId: session.id,
      sessionName: session.name,
      dayOfWeek: session.dayOfWeek,
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      overallRpe,
      perceivedDifficulty,
      sorenessLevel,
      painFlag,
      painLocationAndNotes: painFlag ? painNotes : undefined,
      athleteComments: comments,
      exercises: exercisesRecord,
      totalVolumeLbs: totalVolumeTonnage,
      totalSetsCompleted,
      prsAchieved: celebratedPrs
    });

    onWorkoutCompleted(record);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0d0f15] border-2 border-[#ff5500] rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* HEADER BAR */}
        <div className="p-4 sm:p-5 bg-[#121520] border-b border-[#242838] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-[#ff5500] text-black clip-angled">
                LIVE WORKOUT MODE
              </span>
              <span className="text-xs font-mono text-[#ccff00] font-bold">
                {session.dayOfWeek.toUpperCase()} • {session.name}
              </span>
            </div>
            <div className="text-xs text-[#9ca3af] mt-0.5">
              Live Session Logging • {totalSetsCompleted} Sets Completed • {totalVolumeTonnage.toLocaleString()} lbs Volume
            </div>
          </div>

          {/* Live Timer Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#08090d] border border-[#23283a] rounded-sm font-mono text-sm font-black text-white">
              <Clock className="w-3.5 h-3.5 text-[#ff5500] animate-pulse" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 bg-[#1b2030] hover:bg-[#252b40] text-white rounded-sm text-xs"
              title={isTimerRunning ? 'Pause Workout' : 'Resume Workout'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#9ca3af] hover:text-white rounded-sm"
              title="Close Workout Tracker"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PR CELEBRATION FLOATING BANNER */}
        {activePrBanner && (
          <div className="bg-gradient-to-r from-[#ff5500] via-[#ccff00] to-[#ff5500] text-black font-black font-mono text-xs py-2 px-4 text-center flex items-center justify-center gap-2 animate-bounce shrink-0">
            <Trophy className="w-4 h-4" />
            <span>PERSONAL RECORD DETECTED! {activePrBanner}</span>
            <Sparkles className="w-4 h-4" />
          </div>
        )}

        {/* REST TIMER POPUP BANNER */}
        {isRestTimerActive && restRemaining !== null && restRemaining > 0 && (
          <div className="bg-[#182030] border-y border-[#00e5ff] p-3 px-6 flex items-center justify-between text-xs font-mono shrink-0">
            <div className="flex items-center gap-3">
              <Timer className="w-4 h-4 text-[#00e5ff] animate-spin" />
              <div>
                <span className="text-white font-bold block">REST INTERVAL COUNTDOWN</span>
                <span className="text-[10px] text-[#9ca3af]">Breathe deeply, hydrate, prep for next set</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-[#ccff00]">
                {formatTime(restRemaining)}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setRestRemaining(prev => (prev || 0) + 30)}
                  className="px-2 py-1 bg-[#232a3f] text-[#d1d5db] hover:text-white rounded-sm text-[10px]"
                >
                  +30s
                </button>
                <button
                  onClick={() => setIsRestTimerActive(false)}
                  className="px-2 py-1 bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 rounded-sm text-[10px] font-bold"
                >
                  Skip Rest
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WORKOUT BODY: SCROLLABLE LIST */}
        {!isFinishing ? (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Phase 1: Warmup Checklist */}
            <div className="p-4 bg-[#11131a] border border-[#1f2434] rounded-sm space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] block flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Dynamic Warm-Up & Activation (Check as completed)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {session.warmup.map((w, idx) => (
                  <label key={idx} className="flex items-start gap-2 p-2 bg-[#0a0c10] border border-[#1b2030] rounded-sm cursor-pointer text-xs">
                    <input type="checkbox" defaultChecked className="mt-0.5 accent-[#ccff00]" />
                    <div>
                      <div className="font-bold text-white leading-tight">{w.name}</div>
                      <div className="text-[10px] font-mono text-[#ff7733]">{w.durationOrReps}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Phase 2: Main Exercise Prescriptions with Set-by-Set Logging */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] block tracking-wider">
                Phase 2: Main Working Prescriptions (Log Sets & Progressive Overload)
              </span>

              {session.mainExercises.map((pres, pIdx) => {
                const sets = exerciseLogs[pres.exerciseId] || [];
                return (
                  <div key={pres.exerciseId} className="p-4 sm:p-5 bg-[#11141e] border border-[#222736] rounded-sm space-y-3">
                    
                    {/* Exercise Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1c2232]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500]">
                            0{pIdx + 1}
                          </span>
                          <h4 className="text-base font-black text-white">{pres.exerciseName}</h4>
                        </div>
                        <p className="text-[11px] text-[#9ca3af] mt-0.5">
                          {pres.exercise.ocrApplicationNote}
                        </p>
                      </div>

                      <div className="text-xs font-mono text-right shrink-0">
                        <span className="text-[#ccff00] font-bold block">{pres.sets} Sets • Rest: {pres.restSeconds}s</span>
                        <span className="text-[#9ca3af] text-[10px]">Target RPE: {pres.targetRpe}/10</span>
                      </div>
                    </div>

                    {/* Set-by-Set Logging Matrix */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="text-[#6b7280] border-b border-[#1a1f2c] text-[10px] uppercase">
                            <th className="pb-1.5 w-12">Set</th>
                            <th className="pb-1.5">Previous Target</th>
                            <th className="pb-1.5 w-24">Weight (lbs)</th>
                            <th className="pb-1.5 w-20">Reps</th>
                            <th className="pb-1.5 w-20">RPE (1-10)</th>
                            <th className="pb-1.5 w-16 text-center">Done</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#171b26]">
                          {sets.map((set, sIdx) => {
                            return (
                              <tr 
                                key={set.setNumber}
                                className={`transition-colors ${set.isCompleted ? 'bg-[#15201c]' : 'hover:bg-[#151824]'}`}
                              >
                                <td className="py-2 text-white font-bold">
                                  #{set.setNumber}
                                </td>
                                <td className="py-2 text-[#9ca3af] text-[11px]">
                                  {pres.loadDescription || pres.intensityZone || 'Target'} x {pres.repsOrDistanceOrDuration}
                                </td>
                                <td className="py-2">
                                  <input
                                    type="number"
                                    value={set.actualWeightLbs}
                                    onChange={(e) => handleUpdateSetField(pres.exerciseId, sIdx, 'actualWeightLbs', parseFloat(e.target.value) || 0)}
                                    className="w-20 px-2 py-1 bg-[#0a0c10] border border-[#242b3d] text-white rounded-sm font-bold text-xs focus:border-[#ff5500] outline-none"
                                  />
                                </td>
                                <td className="py-2">
                                  <input
                                    type="number"
                                    value={set.actualReps}
                                    onChange={(e) => handleUpdateSetField(pres.exerciseId, sIdx, 'actualReps', parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 bg-[#0a0c10] border border-[#242b3d] text-white rounded-sm font-bold text-xs focus:border-[#ff5500] outline-none"
                                  />
                                </td>
                                <td className="py-2">
                                  <select
                                    value={set.rpe}
                                    onChange={(e) => handleUpdateSetField(pres.exerciseId, sIdx, 'rpe', parseInt(e.target.value))}
                                    className="px-1.5 py-1 bg-[#0a0c10] border border-[#242b3d] text-white rounded-sm text-xs focus:border-[#ff5500] outline-none"
                                  >
                                    {[5, 6, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(n => (
                                      <option key={n} value={n}>RPE {n}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-2 text-center">
                                  <button
                                    onClick={() => handleToggleSetComplete(pres.exerciseId, sIdx, pres.restSeconds)}
                                    className={`w-7 h-7 rounded-sm flex items-center justify-center mx-auto transition-all ${
                                      set.isCompleted 
                                        ? 'bg-[#ccff00] text-black font-black shadow-md' 
                                        : 'bg-[#181c28] text-[#9ca3af] hover:text-white border border-[#2b334a]'
                                    }`}
                                  >
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Coaching cues snippet */}
                    <div className="pt-2 border-t border-[#181d2a] flex flex-wrap items-center justify-between text-[11px] text-[#9ca3af]">
                      <span className="text-[#ccff00] font-mono">
                        Key Cue: {pres.coachingCues[0] || 'Brace core, maintain neutral spine.'}
                      </span>
                      <span className="font-mono text-[#ff7733]">
                        Regression: {pres.activeRegressionAlternative || 'Bodyweight Variant'}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Cooldown preview */}
            <div className="p-3 bg-[#0d0f15] border border-[#1b2030] rounded-sm text-xs flex items-center justify-between text-[#9ca3af]">
              <span>Phase 3: Diaphragmatic Box Breathing & Cooldown</span>
              <span className="font-mono text-[#ccff00]">{session.cooldown[0]?.durationOrReps || '5-8 Mins'}</span>
            </div>

          </div>
        ) : (
          /* WORKOUT SUMMARY & FINAL LOGGING */
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            <div className="text-center space-y-2 pb-4 border-b border-[#242838]">
              <span className="w-12 h-12 rounded-full bg-[#ccff00]/20 text-[#ccff00] flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-6 h-6" />
              </span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-sans">
                Workout Completed!
              </h3>
              <p className="text-[#9ca3af]">
                Excellent execution on today's {session.name}. Complete your session feedback to auto-regulate upcoming training.
              </p>
            </div>

            {/* Metrics Ticker */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#11141e] border border-[#222736] rounded-sm">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Duration</span>
                <span className="text-xl font-black text-white font-mono">{formatTime(elapsedSeconds)}</span>
              </div>
              <div className="p-3 bg-[#11141e] border border-[#222736] rounded-sm">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Sets Logged</span>
                <span className="text-xl font-black text-[#ccff00] font-mono">{totalSetsCompleted} Sets</span>
              </div>
              <div className="p-3 bg-[#11141e] border border-[#222736] rounded-sm">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Volume Tonnage</span>
                <span className="text-xl font-black text-[#ff5500] font-mono">{totalVolumeTonnage.toLocaleString()} lbs</span>
              </div>
            </div>

            {/* Post-Session Feedback Inputs */}
            <div className="space-y-4 pt-2">
              <div>
                <label className="block font-mono text-[#d1d5db] uppercase mb-1">
                  1. Overall Session RPE (Rate of Perceived Exertion: 1 to 10)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={overallRpe}
                    onChange={(e) => setOverallRpe(parseInt(e.target.value))}
                    className="w-full accent-[#ff5500]"
                  />
                  <span className="font-mono text-base font-bold text-[#ff5500] w-8 text-right">
                    {overallRpe}/10
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#d1d5db] uppercase mb-1">
                  2. Perceived Training Difficulty
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'too_easy', label: 'Too Easy' },
                    { id: 'just_right', label: 'Just Right' },
                    { id: 'hard_manageable', label: 'Hard / Manageable' },
                    { id: 'excessive_burnout', label: 'Excessive / Burnout' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPerceivedDifficulty(opt.id as any)}
                      className={`p-2.5 rounded-sm border font-mono text-center transition-all ${
                        perceivedDifficulty === opt.id 
                          ? 'bg-[#ff5500] text-black font-black border-[#ff5500]'
                          : 'bg-[#11141e] text-[#9ca3af] border-[#222736] hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[#d1d5db] uppercase mb-1">
                  3. Systemic Soreness Rating (1 = Fresh, 5 = Severe DOMS)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSorenessLevel(lvl)}
                      className={`flex-1 py-2 font-mono font-bold rounded-sm border ${
                        sorenessLevel === lvl 
                          ? 'bg-[#ccff00] text-black border-[#ccff00]' 
                          : 'bg-[#11141e] text-[#9ca3af] border-[#222736]'
                      }`}
                    >
                      {lvl} {lvl === 1 ? '(None)' : lvl === 5 ? '(Severe)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Injury / Pain Safety Flag */}
              <div className="p-3.5 bg-[#171217] border border-[#ff3333]/40 rounded-sm space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={painFlag}
                    onChange={(e) => setPainFlag(e.target.checked)}
                    className="accent-[#ff3333] w-4 h-4"
                  />
                  <span className="font-mono font-bold text-[#ff6666] uppercase">
                    Flag Joint Pain, Tendon Irritation, or Strain
                  </span>
                </label>
                {painFlag && (
                  <input
                    type="text"
                    placeholder="Specify pain location (e.g. Right patellar tendon during descent)..."
                    value={painNotes}
                    onChange={(e) => setPainNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0c0a0f] border border-[#ff3333]/60 text-white font-mono text-xs rounded-sm outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block font-mono text-[#d1d5db] uppercase mb-1">
                  4. Athlete Notes & Qualitative Feedback
                </label>
                <textarea
                  rows={2}
                  placeholder="How did the transitions feel? Any obstacle grip fatigue or equipment substitutions?..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full px-3 py-2 bg-[#11141e] border border-[#222736] text-white font-mono text-xs rounded-sm outline-none focus:border-[#ff5500]"
                />
              </div>
            </div>

          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div className="p-4 sm:p-5 bg-[#121520] border-t border-[#242838] flex items-center justify-between gap-3 shrink-0">
          {!isFinishing ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#181c28] hover:bg-[#222738] text-[#9ca3af] hover:text-white font-mono text-xs uppercase font-bold rounded-sm"
              >
                Save & Exit Later
              </button>
              <button
                onClick={() => setIsFinishing(true)}
                className="px-6 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-black uppercase rounded-sm flex items-center gap-2 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" /> Finish & Log Workout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsFinishing(false)}
                className="px-4 py-2 bg-[#181c28] text-[#9ca3af] hover:text-white font-mono text-xs uppercase font-bold rounded-sm"
              >
                Back to Workout
              </button>
              <button
                onClick={handleFinishWorkout}
                className="px-6 py-2 bg-[#ff5500] hover:bg-[#e04b00] text-black font-mono text-xs font-black uppercase rounded-sm flex items-center gap-2 shadow-md"
              >
                Confirm & Sync to Profile
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
