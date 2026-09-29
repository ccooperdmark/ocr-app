'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Target, 
  Timer, 
  Dumbbell, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  Heart,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ChevronLeft,
  Flame,
  Zap,
  Clock,
  Compass,
  Check
} from 'lucide-react';
import { 
  athleteStorage, 
  ComprehensiveAthleteProfile 
} from '@/services/storage/athleteStorageService';

interface AthleteIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updatedProfile: ComprehensiveAthleteProfile) => void;
}

export default function AthleteIntakeModal({ isOpen, onClose, onSave }: AthleteIntakeModalProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [profile, setProfile] = useState<ComprehensiveAthleteProfile>(() => athleteStorage.getComprehensiveProfile());
  const [parqAnswerNoAll, setParqAnswerNoAll] = useState<boolean>(true);
  const [injuryInput, setInjuryInput] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setProfile(athleteStorage.getComprehensiveProfile());
      setActiveStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTier = profile.experienceTier || 'intermediate';
    const updated = athleteStorage.saveComprehensiveProfile({
      ...profile,
      experienceTier: selectedTier,
      parqApproved: parqAnswerNoAll,
      voluntaryInjuryRestrictions: injuryInput.trim() ? [injuryInput.trim()] : profile.voluntaryInjuryRestrictions
    });
    athleteStorage.setExperienceTier(selectedTier);

    // Send automated notification
    athleteStorage.addNotification({
      type: 'auto_adaptation',
      title: 'Autonomous Training Plan Re-calibrated',
      message: `Your AI program has been fully calibrated to your ${profile.targetRaceFormat.toUpperCase()} goals, benchmark assessment scores, and ${selectedTier.toUpperCase()} experience tier.`,
      badgeType: 'ai'
    });

    if (onSave) onSave(updated);
    onClose();
  };

  const formatPace = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0d1017] border border-[#222838] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#1f2638] bg-[#121622] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-sm bg-[#ff5500] text-black font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white uppercase font-sans tracking-tight">
                  Athlete Intake & Baseline Testing Protocol
                </h2>
                <span className="px-2 py-0.5 bg-[#1a2334] text-[#ccff00] text-[9px] font-mono font-bold uppercase rounded-sm border border-[#2d3a52]">
                  Performance Standards
                </span>
              </div>
              <p className="text-xs text-[#9ca3af] font-mono">
                Multi-domain assessment & physiological calibration for personalized programming
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm hover:bg-[#1c2234] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-STEP INDICATOR TABS */}
        <div className="grid grid-cols-5 border-b border-[#1f2638] bg-[#0a0c12] text-[10px] sm:text-xs font-mono">
          {[
            { step: 1, label: '1. Profile' },
            { step: 2, label: '2. Goals' },
            { step: 3, label: '3. Fitness' },
            { step: 4, label: '4. Health' },
            { step: 5, label: '5. Tier Depth' }
          ].map((t) => (
            <button
              key={t.step}
              type="button"
              onClick={() => setActiveStep(t.step)}
              className={`py-2.5 text-center font-bold uppercase transition-all cursor-pointer ${
                activeStep === t.step 
                  ? 'bg-[#141824] text-[#ff5500] border-b-2 border-b-[#ff5500]' 
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* MODAL FORM BODY */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          
          {/* ========================================================================= */}
          {/* STEP 1: DEMOGRAPHICS & TRAINING LOGISTICS                                 */}
          {/* ========================================================================= */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-[#121622] border border-[#1e2536] rounded-sm text-[#cbd5e1] text-[11px] leading-relaxed">
                The programming engine uses your training age, equipment, and weekly availability to dynamically calibrate volume tonnage, rest intervals, and exercise patterns.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Age</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 30 })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Height (cm)</label>
                  <input
                    type="number"
                    value={profile.heightCm}
                    onChange={(e) => setProfile({ ...profile, heightCm: parseInt(e.target.value) || 175 })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.weightKg}
                    onChange={(e) => setProfile({ ...profile, weightKg: parseFloat(e.target.value) || 75 })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Training Age (Yrs)</label>
                  <input
                    type="number"
                    value={profile.trainingAgeYears}
                    onChange={(e) => setProfile({ ...profile, trainingAgeYears: parseInt(e.target.value) || 2 })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Available Training Frequency (Days/Week)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[3, 4, 5, 6].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => {
                        const dayList = days === 3 
                          ? ['monday', 'wednesday', 'saturday'] 
                          : days === 4 
                            ? ['monday', 'wednesday', 'friday', 'saturday'] 
                            : days === 5 
                              ? ['monday', 'tuesday', 'thursday', 'friday', 'saturday'] 
                              : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                        setProfile({ ...profile, availableTrainingDays: dayList });
                      }}
                      className={`py-2 rounded-sm border font-mono text-center transition cursor-pointer ${
                        profile.availableTrainingDays.length === days
                          ? 'bg-[#ff5500] text-black font-black border-[#ff5500]'
                          : 'bg-[#141824] text-[#9ca3af] border-[#222838]'
                      }`}
                    >
                      {days} Days / Week
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Target Workout Duration (Minutes)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[45, 60, 75, 90].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setProfile({ ...profile, preferredDurationMinutes: mins })}
                      className={`py-2 rounded-sm border font-mono text-center transition cursor-pointer ${
                        profile.preferredDurationMinutes === mins
                          ? 'bg-[#00e5ff] text-black font-black border-[#00e5ff]'
                          : 'bg-[#141824] text-[#9ca3af] border-[#222838]'
                      }`}
                    >
                      {mins} Minutes
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Training Environment & Equipment</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'hybrid' as const, label: 'Commercial Gym + Trail' },
                    { id: 'commercial_gym' as const, label: 'Commercial Gym Only' },
                    { id: 'home_gym' as const, label: 'Home Garage Gym' },
                    { id: 'outdoor_trail' as const, label: 'Outdoor Trail & Rig' }
                  ].map((eq) => (
                    <button
                      key={eq.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, trainingLocation: eq.id })}
                      className={`p-2 rounded-sm border font-mono text-[10px] text-center transition cursor-pointer ${
                        profile.trainingLocation === eq.id
                          ? 'bg-[#ccff00] text-black font-black border-[#ccff00]'
                          : 'bg-[#141824] text-[#9ca3af] border-[#222838]'
                      }`}
                    >
                      {eq.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: GOALS & EVENT TARGET                                              */}
          {/* ========================================================================= */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-[#121622] border border-[#1e2536] rounded-sm text-[#cbd5e1] text-[11px] leading-relaxed">
                The AI periodization engine will automatically establish your macrocycle phases (General Base → Specific Development → Peak → Race Taper) counting down directly to your event date.
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Race Organization</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'spartan' as const, label: 'Spartan Race' },
                    { id: 'tough_mudder' as const, label: 'Tough Mudder' },
                    { id: 'savage' as const, label: 'Savage Race' },
                    { id: 'rugged' as const, label: 'Rugged Maniac' }
                  ].map((org) => (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, targetRaceOrg: org.id })}
                      className={`py-2 rounded-sm border font-mono text-center transition cursor-pointer ${
                        profile.targetRaceOrg === org.id
                          ? 'bg-[#ff5500] text-black font-black border-[#ff5500]'
                          : 'bg-[#141824] text-[#9ca3af] border-[#222838]'
                      }`}
                    >
                      {org.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Target Distance Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'sprint' as const, label: 'Sprint (5K / 20 Obs)' },
                    { id: 'super' as const, label: 'Super (10K / 25 Obs)' },
                    { id: 'beast' as const, label: 'Beast (21K / 30 Obs)' },
                    { id: 'ultra' as const, label: 'Ultra (50K / 60 Obs)' }
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, targetRaceFormat: fmt.id })}
                      className={`py-2 rounded-sm border font-mono text-center transition cursor-pointer ${
                        profile.targetRaceFormat === fmt.id
                          ? 'bg-[#00e5ff] text-black font-black border-[#00e5ff]'
                          : 'bg-[#141824] text-[#9ca3af] border-[#222838]'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Race Date</label>
                  <input
                    type="date"
                    value={profile.raceDate.split('T')[0]}
                    onChange={(e) => setProfile({ ...profile, raceDate: new Date(e.target.value).toISOString() })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Expected Course Terrain</label>
                  <select
                    value={profile.expectedTerrain}
                    onChange={(e) => setProfile({ ...profile, expectedTerrain: e.target.value as any })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  >
                    <option value="mountain_vert">Mountain & Steep Elevation (Killington/Tahoe)</option>
                    <option value="rolling_hills">Rolling Trail Hills & Mud (Spartan Super/Beast)</option>
                    <option value="technical_rock">Technical Single-Track & Scree</option>
                    <option value="flat_mud">Flat Sprint Mud & Obstacle Velocity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Primary Athletic Goal</label>
                <input
                  type="text"
                  value={profile.primaryGoal}
                  onChange={(e) => setProfile({ ...profile, primaryGoal: e.target.value })}
                  placeholder="e.g. Age Group Podium Finish / Zero Burpee Obstacle Clear"
                  className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: BENCHMARKS & PHYSICAL TESTS                                       */}
          {/* ========================================================================= */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-[#121622] border border-[#1e2536] rounded-sm text-[#cbd5e1] text-[11px] leading-relaxed">
                Enter your current baseline scores. The autonomous engine uses these exact tests to calculate your starting 8 competency scores (0-100) and establish your progressive overload targets.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#10131d] border border-[#1f2638] rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase block">1. Active Dead Hang</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={profile.maxDeadHangSeconds}
                      onChange={(e) => setProfile({ ...profile, maxDeadHangSeconds: parseInt(e.target.value) || 60 })}
                      className="w-24 bg-[#141824] border border-[#242b3e] px-2 py-1 text-white font-mono rounded-sm"
                    />
                    <span className="text-white font-mono">Seconds</span>
                  </div>
                  <span className="text-[10px] text-[#9ca3af] font-mono block">Spartan Rig Standard: 90s - 120s</span>
                </div>

                <div className="p-3 bg-[#10131d] border border-[#1f2638] rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#00e5ff] font-bold uppercase block">2. 1-Mile Trail Pace</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={profile.oneMileTrailPaceSeconds}
                      onChange={(e) => setProfile({ ...profile, oneMileTrailPaceSeconds: parseInt(e.target.value) || 450 })}
                      className="w-24 bg-[#141824] border border-[#242b3e] px-2 py-1 text-white font-mono rounded-sm"
                    />
                    <span className="text-white font-mono">Sec ({formatPace(profile.oneMileTrailPaceSeconds)}/mi)</span>
                  </div>
                  <span className="text-[10px] text-[#9ca3af] font-mono block">Age Group Competitive: 7:00 - 7:30</span>
                </div>

                <div className="p-3 bg-[#10131d] border border-[#1f2638] rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#ccff00] font-bold uppercase block">3. Strict Pull-Ups</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={profile.maxStrictPullUps}
                      onChange={(e) => setProfile({ ...profile, maxStrictPullUps: parseInt(e.target.value) || 10 })}
                      className="w-24 bg-[#141824] border border-[#242b3e] px-2 py-1 text-white font-mono rounded-sm"
                    />
                    <span className="text-white font-mono">Max Reps</span>
                  </div>
                  <span className="text-[10px] text-[#9ca3af] font-mono block">8ft Wall & Rope Standard: 15+ Reps</span>
                </div>

                <div className="p-3 bg-[#10131d] border border-[#1f2638] rounded-sm space-y-1">
                  <span className="text-[10px] font-mono text-[#ffaa00] font-bold uppercase block">4. Farmer Carry (Per Hand)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      value={profile.farmerCarryWeightPerHandLbs}
                      onChange={(e) => setProfile({ ...profile, farmerCarryWeightPerHandLbs: parseInt(e.target.value) || 50 })}
                      className="w-24 bg-[#141824] border border-[#242b3e] px-2 py-1 text-white font-mono rounded-sm"
                    />
                    <span className="text-white font-mono">lbs / hand</span>
                  </div>
                  <span className="text-[10px] text-[#9ca3af] font-mono block">Beast Log/Bucket Spec: 65 - 85 lbs</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: LIFESTYLE, HEALTH & SAFETY SCREENING                              */}
          {/* ========================================================================= */}
          {activeStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* PAR-Q Health Screening */}
              <div className="p-4 bg-[#121622] border border-[#22293c] rounded-sm space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> PAR-Q Physical Activity Readiness Questionnaire
                </span>
                <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                  Has your doctor ever said you have a heart condition, or do you experience chest pain or dizziness during exercise?
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-white">
                    <input
                      type="radio"
                      name="parq"
                      checked={parqAnswerNoAll}
                      onChange={() => setParqAnswerNoAll(true)}
                      className="accent-[#00e5ff]"
                    />
                    NO — I have no medical restrictions and am cleared for vigorous training.
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#ff6666]">
                    <input
                      type="radio"
                      name="parq"
                      checked={!parqAnswerNoAll}
                      onChange={() => setParqAnswerNoAll(false)}
                      className="accent-[#ff4444]"
                    />
                    YES — I have a medical condition requiring physician evaluation.
                  </label>
                </div>
              </div>

              {/* Lifestyle & Sleep */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Typical Sleep (Hours/Night)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={profile.averageSleepHours}
                    onChange={(e) => setProfile({ ...profile, averageSleepHours: parseFloat(e.target.value) || 7.5 })}
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Voluntary Injury / Movement Restrictions</label>
                  <input
                    type="text"
                    value={injuryInput}
                    onChange={(e) => setInjuryInput(e.target.value)}
                    placeholder="e.g. Mild right knee patellar tenderness"
                    className="w-full mt-1 bg-[#141824] border border-[#242b3e] px-2.5 py-1.5 text-white font-mono rounded-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5: HOW MUCH TRAINING INFORMATION WOULD YOU LIKE?                    */}
          {/* ========================================================================= */}
          {activeStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-[#121622] border border-[#22293c] rounded-sm text-center">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ccff00] block mb-1">
                  Onboarding Experience Tier
                </span>
                <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                  HOW MUCH TRAINING INFORMATION WOULD YOU LIKE?
                </h3>
                <p className="text-[11px] text-[#9ca3af] mt-1 max-w-lg mx-auto">
                  Select your preferred coaching depth. The AI engine continuously autoregulates your program behind the scenes regardless of tier. You can switch between tiers at any time without losing any training history.
                </p>
              </div>

              <div className="space-y-3">
                {/* 1. BASIC */}
                <div 
                  onClick={() => setProfile({ ...profile, experienceTier: 'basic' })}
                  className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                    (profile.experienceTier || 'intermediate') === 'basic'
                      ? 'bg-[#00ff88]/10 border-[#00ff88] shadow-lg shadow-[#00ff88]/15 ring-1 ring-[#00ff88]'
                      : 'bg-[#10131d] border-[#1f2638] hover:border-[#333e56]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm uppercase">
                          1. BASIC
                        </span>
                        <span className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40">
                          Simple & Guided
                        </span>
                      </div>
                      <blockquote className="text-xs text-[#cbd5e1] italic font-medium">
                        &ldquo;Just tell me what to do today and keep it simple.&rdquo;
                      </blockquote>
                      <div className="text-[10px] text-[#00ff88] font-mono">
                        Primary Access: Training Plans • Nutrition • Exercise Library
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      (profile.experienceTier || 'intermediate') === 'basic'
                        ? 'border-[#00ff88] bg-[#00ff88] text-black'
                        : 'border-[#3a445d]'
                    }`}>
                      {(profile.experienceTier || 'intermediate') === 'basic' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#1f2638] text-[11px] text-[#9ca3af]">
                    <span className="font-bold text-white uppercase text-[10px] block mb-1">Best for:</span>
                    <ul className="space-y-0.5 list-disc list-inside">
                      <li>Users who want straightforward guidance</li>
                      <li>Athletes who get overwhelmed by excessive data</li>
                      <li>People focused on completing workouts and staying consistent</li>
                    </ul>
                  </div>
                </div>

                {/* 2. INTERMEDIATE */}
                <div 
                  onClick={() => setProfile({ ...profile, experienceTier: 'intermediate' })}
                  className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                    (profile.experienceTier || 'intermediate') === 'intermediate'
                      ? 'bg-[#ffaa00]/10 border-[#ffaa00] shadow-lg shadow-[#ffaa00]/15 ring-1 ring-[#ffaa00]'
                      : 'bg-[#10131d] border-[#1f2638] hover:border-[#333e56]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm uppercase">
                          2. INTERMEDIATE
                        </span>
                        <span className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase bg-[#ffaa00]/20 text-[#ffaa00] border border-[#ffaa00]/40">
                          Recommended • Balanced
                        </span>
                      </div>
                      <blockquote className="text-xs text-[#cbd5e1] italic font-medium">
                        &ldquo;I want to understand my training, track my progress, and see how I&apos;m improving without getting buried in complex data.&rdquo;
                      </blockquote>
                      <div className="text-[10px] text-[#ffaa00] font-mono">
                        Includes: Everything in Basic + Progress Tracking + 7 Performance Categories + Race Prep + Recovery & Gamification
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      (profile.experienceTier || 'intermediate') === 'intermediate'
                        ? 'border-[#ffaa00] bg-[#ffaa00] text-black'
                        : 'border-[#3a445d]'
                    }`}>
                      {(profile.experienceTier || 'intermediate') === 'intermediate' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#1f2638] text-[11px] text-[#9ca3af]">
                    <span className="font-bold text-white uppercase text-[10px] block mb-1">Best for:</span>
                    <ul className="space-y-0.5 list-disc list-inside">
                      <li>Athletes with some experience</li>
                      <li>People preparing for races or fitness milestones</li>
                      <li>Users who enjoy tracking workouts and earning progress milestones</li>
                    </ul>
                  </div>
                </div>

                {/* 3. ADVANCED */}
                <div 
                  onClick={() => setProfile({ ...profile, experienceTier: 'advanced' })}
                  className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                    profile.experienceTier === 'advanced'
                      ? 'bg-[#ff5500]/10 border-[#ff5500] shadow-lg shadow-[#ff5500]/15 ring-1 ring-[#ff5500]'
                      : 'bg-[#10131d] border-[#1f2638] hover:border-[#333e56]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white text-sm uppercase">
                          3. ADVANCED
                        </span>
                        <span className="px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40">
                          Full Platform Power
                        </span>
                      </div>
                      <blockquote className="text-xs text-[#cbd5e1] italic font-medium">
                        &ldquo;Give me everything: deep metrics, full analytics, periodization, and complete control.&rdquo;
                      </blockquote>
                      <div className="text-[10px] text-[#ff5500] font-mono">
                        Includes: Full Website • 12 OCR Domains • 107 Qualities • Macro/Meso Periodization • Grip Lab • Telemetry • Coach HQ
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                      profile.experienceTier === 'advanced'
                        ? 'border-[#ff5500] bg-[#ff5500] text-black'
                        : 'border-[#3a445d]'
                    }`}>
                      {profile.experienceTier === 'advanced' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#1f2638] text-[11px] text-[#9ca3af]">
                    <span className="font-bold text-white uppercase text-[10px] block mb-1">Best for:</span>
                    <ul className="space-y-0.5 list-disc list-inside">
                      <li>Serious racers and hybrid athletes</li>
                      <li>Competitive OCR athletes</li>
                      <li>Data-driven users who love deep training science</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between pt-3 border-t border-[#1f2638]">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-3.5 py-2 bg-[#161a26] hover:bg-[#1f2638] text-white font-mono text-xs uppercase rounded-sm flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            {activeStep < 5 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-4 py-2 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-bold text-xs uppercase rounded-sm flex items-center gap-1.5 cursor-pointer"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase rounded-sm flex items-center gap-1.5 shadow-lg shadow-[#ccff00]/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Calibrate AI Program ({profile.experienceTier?.toUpperCase() || 'INTERMEDIATE'})
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
