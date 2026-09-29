'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Heart, 
  Moon, 
  Flame, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { 
  athleteStorage, 
  WeeklyCheckInSubmission 
} from '@/services/storage/athleteStorageService';
import { calculateDailyReadiness } from '@/services/trainingEngine/aiCoachEngineService';

interface AutomatedCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onCheckInComplete?: () => void;
}

export default function AutomatedCheckInModal({ isOpen, onClose, onSuccess, onCheckInComplete }: AutomatedCheckInModalProps) {
  const [energyRating, setEnergyRating] = useState<number>(8);
  const [sorenessLevel, setSorenessLevel] = useState<number>(2);
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [stressRating, setStressRating] = useState<number>(3);
  const [currentWeight, setCurrentWeight] = useState<number>(169);
  const [highlights, setHighlights] = useState<string>('Crushed Friday carry session; grip held strong.');
  const [discomfortNotes, setDiscomfortNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Submit checkin
      athleteStorage.submitCheckIn({
        weeklyAdherenceRate: 85,
        averageSleepHours: sleepHours,
        energyRating,
        stressRating,
        currentWeightLbs: currentWeight,
        highlightsAndWins: highlights,
        strugglesAndChallenges: discomfortNotes || 'None'
      });

      // 2. Re-compute readiness
      const newReadiness = calculateDailyReadiness(
        sleepHours,
        energyRating,
        sorenessLevel,
        2,
        51,
        64
      );
      athleteStorage.saveDailyReadiness(newReadiness);

      // 3. Add notification
      athleteStorage.addNotification({
        type: 'weekly_review',
        title: 'Check-In Processed by AI Engine',
        message: `Readiness updated to ${newReadiness.scoreOutOf100}/100 (${newReadiness.readinessLevel}). Programming holds steady for upcoming block.`,
        badgeType: 'ai'
      });

      setIsSubmitting(false);
      setSubmissionComplete(true);
      setTimeout(() => {
        setSubmissionComplete(false);
        if (onSuccess) onSuccess();
        if (onCheckInComplete) onCheckInComplete();
        onClose();
      }, 1800);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0d1017] border border-[#222838] rounded-sm shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER */}
        <div className="p-4 bg-[#121622] border-b border-[#1e2536] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#00e5ff] text-black flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tight font-sans">
                AI Athlete Check-In (60-Sec)
              </h3>
              <p className="text-[11px] text-[#9ca3af] font-mono">
                Autonomous biometrics, recovery & fatigue assessment
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

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          {submissionComplete ? (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#ccff00]/20 text-[#ccff00] flex items-center justify-center mx-auto border border-[#ccff00]/40">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-black text-white uppercase">
                Check-In Analyzed & Synced!
              </h4>
              <p className="text-xs text-[#cbd5e1] font-mono max-w-sm mx-auto">
                AI Coach evaluated your recovery and sleep. Upcoming training prescriptions have been calibrated with zero human delay.
              </p>
            </div>
          ) : (
            <>
              {/* Energy / Recovery Rating (1-10) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase">
                    Physical Energy & Recovery (1 - 10)
                  </label>
                  <span className="text-xs font-mono font-bold text-[#00e5ff]">
                    {energyRating} / 10 ({energyRating >= 8 ? 'Fully Primed' : energyRating >= 5 ? 'Moderate' : 'Fatigued'})
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energyRating}
                  onChange={(e) => setEnergyRating(parseInt(e.target.value))}
                  className="w-full accent-[#00e5ff] cursor-pointer"
                />
              </div>

              {/* Muscle Soreness Rating (1-5) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase">
                    Systemic Muscle Soreness (1 - 5)
                  </label>
                  <span className="text-xs font-mono font-bold text-[#ffaa00]">
                    {sorenessLevel} / 5 ({sorenessLevel <= 2 ? 'Normal/Low' : sorenessLevel === 3 ? 'Moderate' : 'Heavy DOMS'})
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSorenessLevel(lvl)}
                      className={`py-1.5 rounded-sm border font-mono text-center cursor-pointer transition ${
                        sorenessLevel === lvl
                          ? 'bg-[#ffaa00] text-black font-black border-[#ffaa00]'
                          : 'bg-[#141824] text-[#9ca3af] border-[#202738]'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleep & Body Weight */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">
                    Avg Sleep (Hours/Night)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value) || 7)}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">
                    Current Morning Weight (lbs)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 169)}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>
              </div>

              {/* Joint Discomfort or Schedule Notes */}
              <div>
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">
                  Any Joint Discomfort or Schedule Changes?
                </label>
                <input
                  type="text"
                  value={discomfortNotes}
                  onChange={(e) => setDiscomfortNotes(e.target.value)}
                  placeholder="e.g. Mild forearm extensor tightness after Wednesday rig work"
                  className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                />
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#00e5ff] hover:bg-[#00cce6] text-black font-mono font-black text-xs uppercase rounded-sm flex items-center justify-center gap-1.5 shadow-lg shadow-[#00e5ff]/20 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'AI Analyzing Biometrics...'
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" /> Submit Check-In for Instant AI Adaptation
                    </>
                  )}
                </button>
              </div>
            </>
          )}

        </form>

      </div>
    </div>
  );
}
