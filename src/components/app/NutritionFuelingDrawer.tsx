'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Utensils, 
  Droplet, 
  Zap, 
  Flame, 
  Scale, 
  Clock, 
  Sun, 
  Check, 
  Copy, 
  RotateCcw,
  Sparkles,
  Award,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Layers,
  Heart,
  Activity
} from 'lucide-react';
import { 
  athleteStorage, 
  NutritionUserSettings, 
  DailyNutritionLog,
  SweatRateTestRecord
} from '@/services/storage/athleteStorageService';
import { 
  calculateDailyNutritionTargets, 
  calculateSweatRate, 
  generateRaceDayFuelingTimeline,
  DIETARY_TEMPLATES,
  SUPPLEMENT_TIERS,
  NUTRITION_MEDICAL_DISCLAIMER,
  TrainingDemandLevel,
  DailyNutritionTargets,
  RaceFuelingPlan,
  SweatRateTestResult
} from '@/services/trainingEngine/nutritionEngineService';
import { useExperienceTier } from '@/context/ExperienceTierContext';

interface NutritionFuelingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NutritionFuelingDrawer({ isOpen, onClose }: NutritionFuelingDrawerProps) {
  const { tier, isBasic, isIntermediate, isAdvanced, hasAccess } = useExperienceTier();
  const [activeTab, setActiveTab] = useState<'today' | 'race_fuel' | 'sweat_test' | 'plates' | 'settings'>('today');
  
  // Storage states
  const [settings, setSettings] = useState<NutritionUserSettings | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyNutritionLog | null>(null);
  const [pastSweatTests, setPastSweatTests] = useState<SweatRateTestRecord[]>([]);

  // Local calculation states
  const [weightLbs, setWeightLbs] = useState<number>(169);
  const [selectedDemand, setSelectedDemand] = useState<TrainingDemandLevel>('high');
  const [copiedFuelPlan, setCopiedFuelPlan] = useState<boolean>(false);
  const [copiedTodayTargets, setCopiedTodayTargets] = useState<boolean>(false);

  // Race Fueling State
  const [raceFormat, setRaceFormat] = useState<'sprint' | 'super' | 'beast' | 'ultra'>('beast');
  const [targetHours, setTargetHours] = useState<number>(3);
  const [targetMinutes, setTargetMinutes] = useState<number>(45);
  const [weatherCondition, setWeatherCondition] = useState<'cool' | 'moderate' | 'hot'>('moderate');

  // Sweat Test State
  const [preWeightInput, setPreWeightInput] = useState<number>(170.5);
  const [postWeightInput, setPostWeightInput] = useState<number>(168.0);
  const [fluidConsumedInput, setFluidConsumedInput] = useState<number>(16);
  const [durationMinutesInput, setDurationMinutesInput] = useState<number>(60);
  const [ambientTempInput, setAmbientTempInput] = useState<number>(75);
  const [testNotesInput, setTestNotesInput] = useState<string>('60 min trail tempo with elevation');
  const [testSavedBanner, setTestSavedBanner] = useState<boolean>(false);

  // Load from storage
  useEffect(() => {
    if (isOpen) {
      const s = athleteStorage.getNutritionSettings();
      setSettings(s);
      const log = athleteStorage.getTodayNutrition();
      setDailyLog(log);
      setPastSweatTests(athleteStorage.getSweatRateTests());
      if (s.manualDemandOverride && s.manualDemandOverride !== 'auto') {
        setSelectedDemand(s.manualDemandOverride as TrainingDemandLevel);
      }
    }
  }, [isOpen]);

  // Listen to external updates
  useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (e.detail?.key?.includes('nutrition') || e.detail?.key?.includes('sweat')) {
        setSettings(athleteStorage.getNutritionSettings());
        setDailyLog(athleteStorage.getTodayNutrition());
        setPastSweatTests(athleteStorage.getSweatRateTests());
      }
    };
    window.addEventListener('grit_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('grit_storage_update', handleStorageUpdate);
  }, []);

  if (!isOpen) return null;

  const currentSettings: NutritionUserSettings = settings || {
    isEnabled: true,
    primaryGoal: 'endurance_fueling',
    dietaryPreference: 'omnivore',
    allergies: [],
    trackingComplexity: 'moderate',
    sweatRateLph: 1.25,
    manualDemandOverride: 'auto',
    onboardingCompleted: true
  };

  // Compute live targets for Tab 1
  const todayTargets: DailyNutritionTargets = calculateDailyNutritionTargets(
    weightLbs,
    selectedDemand,
    currentSettings.primaryGoal,
    currentSettings.dietaryPreference,
    currentSettings.sweatRateLph
  );

  // Compute live Race Fueling Plan for Tab 2
  const racePlan: RaceFuelingPlan = generateRaceDayFuelingTimeline(
    raceFormat,
    targetHours,
    targetMinutes,
    weatherCondition,
    weightLbs,
    currentSettings.sweatRateLph
  );

  // Compute live Sweat Rate Test for Tab 3
  const sweatTestResult: SweatRateTestResult = calculateSweatRate(
    preWeightInput,
    postWeightInput,
    fluidConsumedInput,
    durationMinutesInput,
    ambientTempInput
  );

  // Water log handlers
  const addWater = (oz: number) => {
    if (!dailyLog) return;
    const current = dailyLog.consumedWaterOunces || 0;
    const updated = athleteStorage.updateNutrition({
      consumedWaterOunces: Math.max(0, current + oz)
    });
    setDailyLog(updated);
  };

  const resetWater = () => {
    const updated = athleteStorage.updateNutrition({ consumedWaterOunces: 0 });
    setDailyLog(updated);
  };

  // Toggle checklist items
  const toggleChecklist = (field: 'proteinTargetHit' | 'preWorkoutFuelHit' | 'postWorkoutFuelHit' | 'hydrationTargetHit') => {
    if (!dailyLog) return;
    const currentVal = !!dailyLog[field];
    const updated = athleteStorage.updateNutrition({ [field]: !currentVal });
    setDailyLog(updated);
  };

  // Handle saving sweat test
  const handleSaveSweatTest = () => {
    athleteStorage.saveSweatRateTest({
      testDate: new Date().toISOString().split('T')[0],
      preWeightLbs: preWeightInput,
      postWeightLbs: postWeightInput,
      fluidConsumedOz: fluidConsumedInput,
      durationMinutes: durationMinutesInput,
      temperatureF: ambientTempInput,
      sweatRateLph: sweatTestResult.sweatRateLph,
      sweatRateOzPerHour: sweatTestResult.sweatRateOzPerHour,
      dehydrationPercent: sweatTestResult.dehydrationPercent,
      sweatCategory: sweatTestResult.sweatCategory,
      notes: testNotesInput
    });
    setPastSweatTests(athleteStorage.getSweatRateTests());
    setTestSavedBanner(true);
    setTimeout(() => setTestSavedBanner(false), 3000);
  };

  // Copy Race Plan
  const handleCopyRacePlan = () => {
    const text = `OCR RACE FUELING BLUEPRINT (${raceFormat.toUpperCase()} - ${racePlan.estimatedDurationFormatted})
• 24-48h Carbo-Loading Target: ${racePlan.carboLoadingTargetGramsPerKg} (~${racePlan.carboLoadingDailyCarbs}g daily)
• Race Morning Breakfast (3-4h prior): ${racePlan.morningOfMeal.carbGrams}g Carbs, ${racePlan.morningOfMeal.proteinGrams}g Protein (${racePlan.morningOfMeal.fatGrams})
• T-15m Corral Fuel: 1 Gel (${racePlan.tMinus15Fuel.carbGrams}g carbs) + 200ml water
• Hourly In-Race Targets:
  - Carbohydrates: ${racePlan.inRaceHourlySchedule.carbGramsPerHour}g/hr (${racePlan.inRaceHourlySchedule.carbRatio})
  - Fluid: ${racePlan.inRaceHourlySchedule.fluidMlPerHour} mL/hr (${racePlan.inRaceHourlySchedule.fluidOzPerHour} oz/hr)
  - Sodium: ${racePlan.inRaceHourlySchedule.sodiumMgPerHour} mg/hr
  - Feeding Frequency: Every ${racePlan.inRaceHourlySchedule.frequencyMinutes} minutes
  - Carry Setup: ${racePlan.inRaceHourlySchedule.carryRecommendation}`;
    navigator.clipboard?.writeText(text);
    setCopiedFuelPlan(true);
    setTimeout(() => setCopiedFuelPlan(false), 2500);
  };

  // Copy Today's Targets
  const handleCopyTodayTargets = () => {
    const text = `DAILY FUELING TARGETS (${todayTargets.demandTitle})
• Calories: ${todayTargets.targetCaloriesMin} - ${todayTargets.targetCaloriesMax} kcal
• Protein: ${todayTargets.targetProteinGrams}g (${todayTargets.targetProteinPerLb} g/lb)
• Carbohydrates: ${todayTargets.targetCarbsGrams}g (${todayTargets.targetCarbsPerKg} g/kg)
• Healthy Fats: ${todayTargets.targetFatGrams}g
• Hydration: ${todayTargets.targetHydrationOz} oz (${todayTargets.targetHydrationLiters} L)
• Sodium: ${todayTargets.targetSodiumMg} mg
• Pre-Workout: ${todayTargets.preWorkout.carbsGrams}g carbs + ${todayTargets.preWorkout.proteinGrams}g protein
• Intra-Workout: ${todayTargets.intraWorkout.carbsPerHour} • ${todayTargets.intraWorkout.fluidPerHour}
• Post-Workout: ${todayTargets.postWorkout.carbsGrams}g carbs + ${todayTargets.postWorkout.proteinGrams}g protein`;
    navigator.clipboard?.writeText(text);
    setCopiedTodayTargets(true);
    setTimeout(() => setCopiedTodayTargets(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0b0d14] border-l-2 border-[#00e5ff] h-full shadow-2xl flex flex-col">
        
        {/* TOP DRAWER HEADER */}
        <div className="p-4 sm:p-5 bg-[#10131d] border-b border-[#222838] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#00e5ff] text-black flex items-center justify-center font-black">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white uppercase font-sans tracking-tight">
                  Sports Nutrition & Fueling Lab
                </h3>
                <span className="px-2 py-0.5 bg-[#192233] text-[#00e5ff] text-[9px] font-mono font-bold uppercase rounded-sm border border-[#2b3c58]">
                  ISSN / ACSM Standard
                </span>
              </div>
              <p className="text-[11px] text-[#9ca3af] font-mono">
                Dynamic metabolic targets, race fueling schedules & hydration science
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm hover:bg-[#1a1f2e] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TIER-ADAPTIVE TAB NAVIGATION BAR */}
        <div className="px-4 pt-2 bg-[#0d1017] border-b border-[#1f2536] flex flex-wrap gap-1 shrink-0">
          {[
            { id: 'today' as const, label: isBasic ? "Today's Fueling" : "Today's Targets & Logs", icon: Zap, minTier: 'basic' as const },
            { id: 'plates' as const, label: isBasic ? 'Simple Meal Guide' : 'Meal & Plate Guides', icon: Utensils, minTier: 'basic' as const },
            { id: 'race_fuel' as const, label: 'OCR Race Fuel Planner', icon: Flame, minTier: 'intermediate' as const },
            { id: 'sweat_test' as const, label: 'Sweat Rate Calculator', icon: Droplet, minTier: 'advanced' as const },
            { id: 'settings' as const, label: 'Supplements & Settings', icon: Sliders, minTier: 'intermediate' as const }
          ].filter(t => hasAccess(t.minTier)).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 text-xs font-mono font-bold uppercase rounded-t-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#141824] text-[#00e5ff] border-t-2 border-t-[#00e5ff] border-x border-[#232b3e]'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#121520]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* DRAWER BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">

          {/* ========================================================================= */}
          {/* TAB 1: TODAY'S DEMAND TARGETS & ADHERENCE                                  */}
          {/* ========================================================================= */}
          {activeTab === 'today' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* DEMAND ADJUSTER BAR */}
              <div className="p-4 bg-[#121622] border border-[#22293c] rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] block">
                      Active Training Demand Calibrator
                    </span>
                    <h4 className="text-sm font-black text-white uppercase mt-0.5">
                      {todayTargets.demandTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm border ${todayTargets.demandColor}`}>
                      {todayTargets.demandBadge}
                    </span>
                    <button
                      onClick={handleCopyTodayTargets}
                      className="px-2.5 py-1 bg-[#1a2030] hover:bg-[#252e46] text-[#00e5ff] font-mono text-[10px] font-bold rounded-sm border border-[#2d3852] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedTodayTargets ? <Check className="w-3 h-3 text-[#ccff00]" /> : <Copy className="w-3 h-3" />}
                      {copiedTodayTargets ? 'Copied' : 'Export Targets'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(['low', 'moderate', 'high', 'very_high', 'race_day'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setSelectedDemand(lvl);
                        athleteStorage.saveNutritionSettings({ manualDemandOverride: lvl });
                      }}
                      className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded-sm border transition-all cursor-pointer ${
                        selectedDemand === lvl
                          ? 'bg-[#00e5ff] text-black font-black border-[#00e5ff]'
                          : 'bg-[#0e111a] text-[#9ca3af] border-[#222738] hover:text-white'
                      }`}
                    >
                      {lvl.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="p-2.5 bg-[#0a0c12] rounded-sm border border-[#1b2030] text-[11px] text-[#cbd5e1]">
                  <strong className="text-[#ff5500]">Emphasis:</strong> {todayTargets.nutritionEmphasis}
                </div>
              </div>

              {/* DYNAMIC MACRONUTRIENT & CALORIE CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Total Calories</span>
                  <div className="text-base font-black text-white">
                    {todayTargets.targetCaloriesMin}-{todayTargets.targetCaloriesMax}
                  </div>
                  <span className="text-[9px] font-mono text-[#ff5500]">kcal</span>
                </div>

                <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Protein Target</span>
                  <div className="text-base font-black text-[#00e5ff]">
                    {todayTargets.targetProteinGrams}g
                  </div>
                  <span className="text-[9px] font-mono text-[#9ca3af]">{todayTargets.targetProteinPerLb} g/lb</span>
                </div>

                <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Carbohydrates</span>
                  <div className="text-base font-black text-[#ccff00]">
                    {todayTargets.targetCarbsGrams}g
                  </div>
                  <span className="text-[9px] font-mono text-[#9ca3af]">{todayTargets.targetCarbsPerKg} g/kg</span>
                </div>

                <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Healthy Fats</span>
                  <div className="text-base font-black text-[#ffaa00]">
                    {todayTargets.targetFatGrams}g
                  </div>
                  <span className="text-[9px] font-mono text-[#9ca3af]">{todayTargets.targetFatPerKg} g/kg</span>
                </div>

                <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Daily Water</span>
                  <div className="text-base font-black text-sky-400">
                    {todayTargets.targetHydrationOz} oz
                  </div>
                  <span className="text-[9px] font-mono text-[#9ca3af]">{todayTargets.targetHydrationLiters} L</span>
                </div>

                <div className="p-3 bg-[#11141e] border border-[#202738] rounded-sm text-center space-y-1">
                  <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Sodium Target</span>
                  <div className="text-base font-black text-purple-400">
                    {todayTargets.targetSodiumMg} mg
                  </div>
                  <span className="text-[9px] font-mono text-[#9ca3af]">Electrolytes</span>
                </div>
              </div>

              {/* PERI-WORKOUT PROTOCOL CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-[#11141e] border border-[#202738] rounded-sm space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Pre-Workout
                    </span>
                    <span className="text-[9px] font-mono text-[#9ca3af]">{todayTargets.preWorkout.timing}</span>
                  </div>
                  <div className="text-white font-bold text-xs">
                    {todayTargets.preWorkout.carbsGrams}g Carbs • {todayTargets.preWorkout.proteinGrams}g Protein
                  </div>
                  <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                    {todayTargets.preWorkout.guideline}
                  </p>
                  <div className="text-[10px] text-[#cbd5e1] font-mono pt-1">
                    <strong className="text-[#ff5500]">Suggested:</strong> {todayTargets.preWorkout.sampleFood}
                  </div>
                </div>

                <div className="p-4 bg-[#11141e] border border-[#202738] rounded-sm space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Intra-Workout
                    </span>
                    <span className={`text-[9px] font-mono uppercase ${todayTargets.intraWorkout.needed ? 'text-amber-400 font-bold' : 'text-[#6b7280]'}`}>
                      {todayTargets.intraWorkout.needed ? 'Fuel Required' : 'Hydration Only'}
                    </span>
                  </div>
                  <div className="text-white font-bold text-xs">
                    Carbs: {todayTargets.intraWorkout.carbsPerHour}
                  </div>
                  <div className="text-[11px] text-[#9ca3af]">
                    Fluid: {todayTargets.intraWorkout.fluidPerHour} • Na+: {todayTargets.intraWorkout.sodiumPerHour}
                  </div>
                  <p className="text-[11px] text-[#9ca3af] leading-relaxed pt-0.5">
                    {todayTargets.intraWorkout.guideline}
                  </p>
                </div>

                <div className="p-4 bg-[#11141e] border border-[#202738] rounded-sm space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ffaa00] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Post-Workout
                    </span>
                    <span className="text-[9px] font-mono text-[#9ca3af]">{todayTargets.postWorkout.timing}</span>
                  </div>
                  <div className="text-white font-bold text-xs">
                    {todayTargets.postWorkout.carbsGrams}g Carbs • {todayTargets.postWorkout.proteinGrams}g Protein
                  </div>
                  <p className="text-[11px] text-[#9ca3af] leading-relaxed">
                    {todayTargets.postWorkout.guideline}
                  </p>
                  <div className="text-[10px] text-[#cbd5e1] font-mono pt-1">
                    <strong className="text-[#00e5ff]">Suggested:</strong> {todayTargets.postWorkout.sampleFood}
                  </div>
                </div>
              </div>

              {/* WATER TRACKER & DAILY ADHERENCE CHECKLIST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Water Logger */}
                <div className="p-4 bg-[#101420] border border-[#1e2638] rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-sky-400 flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5" /> Daily Hydration Tracker
                    </span>
                    <button
                      onClick={resetWater}
                      className="text-[10px] font-mono text-[#6b7280] hover:text-white flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">{dailyLog?.consumedWaterOunces || 0}</span>
                    <span className="text-xs text-[#9ca3af] font-mono">/ {todayTargets.targetHydrationOz} oz target</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#1b2234] h-2.5 rounded-xs overflow-hidden">
                    <div 
                      className="bg-sky-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round(((dailyLog?.consumedWaterOunces || 0) / todayTargets.targetHydrationOz) * 100))}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => addWater(8)}
                      className="flex-1 py-1.5 bg-[#162032] hover:bg-[#202e48] border border-sky-500/30 text-sky-400 font-mono text-xs font-bold rounded-sm transition-colors cursor-pointer"
                    >
                      +8 oz
                    </button>
                    <button
                      onClick={() => addWater(16)}
                      className="flex-1 py-1.5 bg-[#162032] hover:bg-[#202e48] border border-sky-500/30 text-sky-400 font-mono text-xs font-bold rounded-sm transition-colors cursor-pointer"
                    >
                      +16 oz (Flask)
                    </button>
                    <button
                      onClick={() => addWater(24)}
                      className="flex-1 py-1.5 bg-[#162032] hover:bg-[#202e48] border border-sky-500/30 text-sky-400 font-mono text-xs font-bold rounded-sm transition-colors cursor-pointer"
                    >
                      +24 oz (Bottle)
                    </button>
                  </div>
                </div>

                {/* Adherence Checklist */}
                <div className="p-4 bg-[#101420] border border-[#1e2638] rounded-sm space-y-2.5">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] block">
                    Daily Fueling Adherence Protocol
                  </span>

                  <div className="space-y-1.5 pt-1">
                    {[
                      { key: 'proteinTargetHit' as const, label: `Hit Protein Target (${todayTargets.targetProteinGrams}g)` },
                      { key: 'preWorkoutFuelHit' as const, label: `Pre-Workout Fueling Consumed (${todayTargets.preWorkout.carbsGrams}g Carbs)` },
                      { key: 'postWorkoutFuelHit' as const, label: `Post-Workout Glycogen & EAA Window Met` },
                      { key: 'hydrationTargetHit' as const, label: `Completed Target Hydration (${todayTargets.targetHydrationOz} oz)` }
                    ].map((item) => {
                      const isChecked = !!dailyLog?.[item.key];
                      return (
                        <button
                          key={item.key}
                          onClick={() => toggleChecklist(item.key)}
                          className={`w-full p-2 rounded-sm border font-mono text-xs flex items-center justify-between transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00] font-bold'
                              : 'bg-[#0a0c12] border-[#1d2332] text-[#9ca3af] hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          <div className={`w-4 h-4 rounded-xs flex items-center justify-center border ${isChecked ? 'bg-[#ccff00] border-[#ccff00] text-black' : 'border-[#4b5563]'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: OCR RACE DAY FUELING PLANNER                                       */}
          {/* ========================================================================= */}
          {activeTab === 'race_fuel' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* RACE CONFIGURATOR BAR */}
              <div className="p-4 bg-[#121622] border border-[#22293c] rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] block">
                      Spartan / OCR Race Distance Engine
                    </span>
                    <h4 className="text-sm font-black text-white uppercase mt-0.5">
                      Personalized Intra-Race Fueling Blueprint
                    </h4>
                  </div>
                  <button
                    onClick={handleCopyRacePlan}
                    className="px-3 py-1.5 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono text-xs font-black uppercase rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedFuelPlan ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedFuelPlan ? 'Plan Copied!' : 'Copy Fueling Plan'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { id: 'sprint' as const, label: 'Sprint (5K / 20 Obs)' },
                    { id: 'super' as const, label: 'Super (10K / 25 Obs)' },
                    { id: 'beast' as const, label: 'Beast (21K / 30 Obs)' },
                    { id: 'ultra' as const, label: 'Ultra (50K / 60 Obs)' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRaceFormat(r.id)}
                      className={`p-2.5 rounded-sm border text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                        raceFormat === r.id
                          ? 'bg-[#ff5500] text-black border-[#ff5500] font-black shadow-md'
                          : 'bg-[#0e111a] text-[#9ca3af] border-[#202738] hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-2.5 bg-[#0a0c12] border border-[#1b2030] rounded-sm">
                    <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Target Duration:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={targetHours}
                        onChange={(e) => setTargetHours(parseInt(e.target.value) || 0)}
                        className="w-14 bg-[#141824] border border-[#252c40] px-2 py-1 text-white font-mono text-xs rounded-sm"
                      />
                      <span className="text-white font-mono text-xs">hrs</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="5"
                        value={targetMinutes}
                        onChange={(e) => setTargetMinutes(parseInt(e.target.value) || 0)}
                        className="w-14 bg-[#141824] border border-[#252c40] px-2 py-1 text-white font-mono text-xs rounded-sm"
                      />
                      <span className="text-white font-mono text-xs">mins</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#0a0c12] border border-[#1b2030] rounded-sm">
                    <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Ambient Weather:</span>
                    <div className="flex items-center gap-1 mt-1">
                      {(['cool', 'moderate', 'hot'] as const).map((w) => (
                        <button
                          key={w}
                          onClick={() => setWeatherCondition(w)}
                          className={`px-2 py-1 text-[10px] font-mono uppercase rounded-sm border flex-1 ${
                            weatherCondition === w
                              ? 'bg-[#00e5ff] text-black font-black border-[#00e5ff]'
                              : 'bg-[#141824] text-[#9ca3af] border-[#252c40]'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#0a0c12] border border-[#1b2030] rounded-sm">
                    <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Athlete Weight:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        value={weightLbs}
                        onChange={(e) => setWeightLbs(parseInt(e.target.value) || 165)}
                        className="w-20 bg-[#141824] border border-[#252c40] px-2 py-1 text-white font-mono text-xs rounded-sm"
                      />
                      <span className="text-white font-mono text-xs">lbs ({Math.round(weightLbs * 0.453592)} kg)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE PHASES */}
              <div className="space-y-3">
                {/* Phase 1: Carbo-loading */}
                <div className="p-4 bg-[#0e111a] border border-[#1e2536] rounded-sm space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Phase 1: 24 - 48h Carbo-Loading Window
                    </span>
                    <span className="text-[10px] font-mono text-[#ccff00] font-bold">
                      {racePlan.carboLoadingDailyCarbs}g Carbs / Day
                    </span>
                  </div>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    Target {racePlan.carboLoadingTargetGramsPerKg}. Super-compensate muscle glycogen stores without gastrointestinal bloating. Prioritize white rice, bagels, cream of rice, fruit juices, and low-fiber starch.
                  </p>
                </div>

                {/* Phase 2: Morning-of */}
                <div className="p-4 bg-[#0e111a] border border-[#1e2536] rounded-sm space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ffaa00] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Phase 2: Race Morning Breakfast ({racePlan.morningOfMeal.timing})
                    </span>
                    <span className="text-[10px] font-mono text-white font-bold">
                      {racePlan.morningOfMeal.carbGrams}g Carbs • {racePlan.morningOfMeal.proteinGrams}g Protein
                    </span>
                  </div>
                  <p className="text-xs text-[#9ca3af]">
                    {racePlan.morningOfMeal.guidance} Fat: <span className="text-[#ff5500] font-bold">{racePlan.morningOfMeal.fatGrams}</span>
                  </p>
                  <ul className="list-disc list-inside text-xs text-[#cbd5e1] space-y-1 pt-1 font-mono">
                    {racePlan.morningOfMeal.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>

                {/* Phase 3: T-15 Min Corral */}
                <div className="p-4 bg-[#0e111a] border border-[#1e2536] rounded-sm space-y-1.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Phase 3: T-Minus 15 Minutes (Corral Release)
                    </span>
                    <span className="text-[10px] font-mono text-[#ccff00] font-bold">
                      {racePlan.tMinus15Fuel.carbGrams}g Fast Carbohydrates
                    </span>
                  </div>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {racePlan.tMinus15Fuel.guidance}
                  </p>
                </div>

                {/* Phase 4: In-Race Hourly Rate */}
                <div className="p-4 bg-[#141926] border-2 border-[#ff5500] rounded-sm space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-[#252f48]">
                    <span className="text-xs font-mono font-black uppercase text-[#ff5500] flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Phase 4: In-Race Hourly Execution Schedule
                    </span>
                    <span className="text-[10px] font-mono text-white bg-[#ff5500]/20 px-2 py-0.5 rounded-sm border border-[#ff5500]/40">
                      Take fuel every {racePlan.inRaceHourlySchedule.frequencyMinutes} mins
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-3 bg-[#0c0f17] border border-[#202738] rounded-sm text-center">
                      <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Carbohydrates / Hour</span>
                      <div className="text-xl font-black text-[#ccff00] mt-1">
                        {racePlan.inRaceHourlySchedule.carbGramsPerHour}g
                      </div>
                      <span className="text-[9px] font-mono text-[#9ca3af]">{racePlan.inRaceHourlySchedule.carbRatio}</span>
                    </div>

                    <div className="p-3 bg-[#0c0f17] border border-[#202738] rounded-sm text-center">
                      <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Fluid / Hour</span>
                      <div className="text-xl font-black text-sky-400 mt-1">
                        {racePlan.inRaceHourlySchedule.fluidMlPerHour} mL
                      </div>
                      <span className="text-[9px] font-mono text-[#9ca3af]">{racePlan.inRaceHourlySchedule.fluidOzPerHour} oz/hr</span>
                    </div>

                    <div className="p-3 bg-[#0c0f17] border border-[#202738] rounded-sm text-center">
                      <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Sodium / Hour</span>
                      <div className="text-xl font-black text-purple-400 mt-1">
                        {racePlan.inRaceHourlySchedule.sodiumMgPerHour} mg
                      </div>
                      <span className="text-[9px] font-mono text-[#9ca3af]">Electrolytes</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#0a0c12] rounded-sm border border-[#1e2536] text-xs">
                    <strong className="text-[#00e5ff] font-mono">Recommended Gear & Carry:</strong>{' '}
                    <span className="text-[#cbd5e1]">{racePlan.inRaceHourlySchedule.carryRecommendation}</span>
                  </div>
                </div>

                {/* GI Distress & Cramp Triage Protocols */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-[#121520] border border-[#1f2638] rounded-sm space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> GI Distress & Nausea Prevention
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-[#cbd5e1] space-y-1">
                      {racePlan.giDistressPrevention.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-[#121520] border border-[#1f2638] rounded-sm space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Muscle Cramp Emergency Triage
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-[#cbd5e1] space-y-1">
                      {racePlan.crampTriage.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: HYDRATION & SWEAT RATE CALCULATOR                                   */}
          {/* ========================================================================= */}
          {activeTab === 'sweat_test' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* HOW TO RUN A SWEAT TEST CARD */}
              <div className="p-4 bg-[#121622] border border-[#22293c] rounded-sm space-y-2 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-sky-400 flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5" /> Gold-Standard 60-Minute Sweat Rate Protocol
                </span>
                <p className="text-[#cbd5e1] leading-relaxed">
                  1. Weigh in naked and dry immediately before a 60-minute trail tempo run.
                  2. Run at target race pace; log exactly how many ounces of fluid you drink during the session.
                  3. Towel off all sweat completely after the workout and weigh in naked again.
                  4. Enter your numbers below to calculate your exact hourly fluid and sodium deficit.
                </p>
              </div>

              {/* TEST INPUTS */}
              <div className="p-4 bg-[#0e111a] border border-[#1f2638] rounded-sm space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-white">Enter Your Test Data:</span>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  <div>
                    <label className="text-[10px] font-mono text-[#9ca3af] block">Pre-Run Dry (lbs)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={preWeightInput}
                      onChange={(e) => setPreWeightInput(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 bg-[#141824] border border-[#252c40] px-2.5 py-1.5 text-white font-mono text-xs rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#9ca3af] block">Post-Run Dry (lbs)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={postWeightInput}
                      onChange={(e) => setPostWeightInput(parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 bg-[#141824] border border-[#252c40] px-2.5 py-1.5 text-white font-mono text-xs rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#9ca3af] block">Fluid Drank (oz)</label>
                    <input
                      type="number"
                      value={fluidConsumedInput}
                      onChange={(e) => setFluidConsumedInput(parseInt(e.target.value) || 0)}
                      className="w-full mt-1 bg-[#141824] border border-[#252c40] px-2.5 py-1.5 text-white font-mono text-xs rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#9ca3af] block">Duration (mins)</label>
                    <input
                      type="number"
                      value={durationMinutesInput}
                      onChange={(e) => setDurationMinutesInput(parseInt(e.target.value) || 60)}
                      className="w-full mt-1 bg-[#141824] border border-[#252c40] px-2.5 py-1.5 text-white font-mono text-xs rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#9ca3af] block">Ambient Temp (°F)</label>
                    <input
                      type="number"
                      value={ambientTempInput}
                      onChange={(e) => setAmbientTempInput(parseInt(e.target.value) || 70)}
                      className="w-full mt-1 bg-[#141824] border border-[#252c40] px-2.5 py-1.5 text-white font-mono text-xs rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#9ca3af] block">Workout & Terrain Notes</label>
                  <input
                    type="text"
                    value={testNotesInput}
                    onChange={(e) => setTestNotesInput(e.target.value)}
                    placeholder="e.g. 60 min trail tempo with weighted vest, humid day"
                    className="w-full mt-1 bg-[#141824] border border-[#252c40] px-2.5 py-1.5 text-white font-mono text-xs rounded-sm"
                  />
                </div>
              </div>

              {/* TEST RESULTS OUTPUT */}
              <div className="p-4 bg-[#141926] border-2 border-sky-500/50 rounded-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-black uppercase text-sky-400 flex items-center gap-1.5">
                    <Scale className="w-4 h-4" /> Calculated Sweat Diagnostics
                  </span>
                  <span className="px-2.5 py-0.5 bg-sky-950/40 text-sky-300 font-mono text-[10px] font-bold uppercase rounded-sm border border-sky-500/40">
                    Category: {sweatTestResult.sweatCategory}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#0d1017] border border-[#1f2638] rounded-sm text-center">
                    <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Hourly Sweat Rate</span>
                    <div className="text-xl font-black text-white mt-1">
                      {sweatTestResult.sweatRateLph} L/hr
                    </div>
                    <span className="text-[9px] font-mono text-[#9ca3af]">{sweatTestResult.sweatRateOzPerHour} oz/hr</span>
                  </div>

                  <div className="p-3 bg-[#0d1017] border border-[#1f2638] rounded-sm text-center">
                    <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Dehydration Level</span>
                    <div className={`text-xl font-black mt-1 ${sweatTestResult.dehydrationPercent > 2.0 ? 'text-[#ff4444]' : 'text-[#ccff00]'}`}>
                      {sweatTestResult.dehydrationPercent}%
                    </div>
                    <span className="text-[9px] font-mono text-[#9ca3af]">{sweatTestResult.weightLostLbs} lbs deficit</span>
                  </div>

                  <div className="p-3 bg-[#0d1017] border border-[#1f2638] rounded-sm text-center">
                    <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Hourly Fluid Intake Target</span>
                    <div className="text-xl font-black text-sky-400 mt-1">
                      {sweatTestResult.fluidHourlyTargetOz} oz
                    </div>
                    <span className="text-[9px] font-mono text-[#9ca3af]">{sweatTestResult.fluidHourlyTargetMl} mL/hr</span>
                  </div>

                  <div className="p-3 bg-[#0d1017] border border-[#1f2638] rounded-sm text-center">
                    <span className="text-[9px] font-mono uppercase text-[#9ca3af]">Hourly Sodium Replacement</span>
                    <div className="text-xl font-black text-purple-400 mt-1">
                      {sweatTestResult.sodiumHourlyTargetMg} mg
                    </div>
                    <span className="text-[9px] font-mono text-[#9ca3af]">Electrolytes / hr</span>
                  </div>
                </div>

                <div className="p-3 bg-[#090b10] rounded-sm border border-[#1b2130] text-xs text-[#cbd5e1]">
                  <strong className="text-sky-400 font-mono">Prescription:</strong> {sweatTestResult.recommendation}
                </div>

                <div className="flex items-center justify-between pt-1">
                  {testSavedBanner ? (
                    <span className="text-xs font-mono font-bold text-[#ccff00] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved to Athlete Biometrics!
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#9ca3af] font-mono">
                      Saves your personalized sweat rate into your athlete profile.
                    </span>
                  )}

                  <button
                    onClick={handleSaveSweatTest}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-black font-mono font-bold text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Save Test To Profile
                  </button>
                </div>
              </div>

              {/* PAST SWEAT TESTS HISTORY */}
              {pastSweatTests.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#9ca3af]">Historical Sweat Tests</span>
                  <div className="space-y-2">
                    {pastSweatTests.map((t) => (
                      <div key={t.id} className="p-3 bg-[#0e111a] border border-[#1e2536] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{t.testDate}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#192233] text-sky-400 rounded-sm">
                              {t.sweatCategory}
                            </span>
                            <span className="text-[10px] font-mono text-[#9ca3af]">{t.temperatureF}°F</span>
                          </div>
                          <p className="text-[11px] text-[#9ca3af] mt-0.5">{t.notes}</p>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-sky-400 font-bold block">{t.sweatRateLph} L/hr ({t.sweatRateOzPerHour} oz/hr)</span>
                          <span className="text-[10px] text-[#9ca3af]">Dehydration: {t.dehydrationPercent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: MEAL & PLATE STRUCTURE GUIDES                                      */}
          {/* ========================================================================= */}
          {activeTab === 'plates' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* VISUAL HAND-PORTION GUIDE */}
              <div className="p-4 bg-[#121622] border border-[#22293c] rounded-sm space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] block">
                  Precision Without A Food Scale
                </span>
                <h4 className="text-sm font-black text-white uppercase">
                  Visual Hand-Portion Sizing Method
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3 bg-[#0c0e16] border border-[#1f2638] rounded-sm text-center space-y-1">
                    <span className="text-[10px] font-mono text-[#00e5ff] font-bold block uppercase">Palm = Protein</span>
                    <div className="text-sm font-black text-white">25 - 30g Protein</div>
                    <p className="text-[10px] text-[#9ca3af]">Chicken, steak, fish, tofu, Greek yogurt</p>
                  </div>

                  <div className="p-3 bg-[#0c0e16] border border-[#1f2638] rounded-sm text-center space-y-1">
                    <span className="text-[10px] font-mono text-[#ccff00] font-bold block uppercase">Cupped Hand = Carbs</span>
                    <div className="text-sm font-black text-white">30 - 35g Carbs</div>
                    <p className="text-[10px] text-[#9ca3af]">Rice, potatoes, oats, pasta, berries</p>
                  </div>

                  <div className="p-3 bg-[#0c0e16] border border-[#1f2638] rounded-sm text-center space-y-1">
                    <span className="text-[10px] font-mono text-[#ffaa00] font-bold block uppercase">Thumb = Fats</span>
                    <div className="text-sm font-black text-white">10 - 12g Fats</div>
                    <p className="text-[10px] text-[#9ca3af]">Olive oil, peanut butter, nuts, avocado</p>
                  </div>

                  <div className="p-3 bg-[#0c0e16] border border-[#1f2638] rounded-sm text-center space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">Fist = Veggies</span>
                    <div className="text-sm font-black text-white">Micronutrients</div>
                    <p className="text-[10px] text-[#9ca3af]">Broccoli, spinach, peppers, asparagus</p>
                  </div>
                </div>
              </div>

              {/* DIETARY PREFERENCE TEMPLATE VIEWER */}
              <div className="p-4 bg-[#0e111a] border border-[#1e2536] rounded-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    Dietary Template: {DIETARY_TEMPLATES[currentSettings.dietaryPreference]?.preference || 'Omnivore'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(DIETARY_TEMPLATES).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          const updated = athleteStorage.saveNutritionSettings({ dietaryPreference: key as any });
                          setSettings(updated);
                        }}
                        className={`px-2 py-0.5 text-[9px] font-mono uppercase rounded-sm border cursor-pointer ${
                          currentSettings.dietaryPreference === key
                            ? 'bg-[#ccff00] text-black font-black border-[#ccff00]'
                            : 'bg-[#141824] text-[#9ca3af] border-[#22293d]'
                        }`}
                      >
                        {key.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plates comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-[#121520] border border-[#1f2638] rounded-sm space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block">
                      Rest & Recovery Day Plate
                    </span>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      {DIETARY_TEMPLATES[currentSettings.dietaryPreference]?.restDayPlate}
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#121520] border border-[#1f2638] rounded-sm space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500] block">
                      Heavy Training / Simulation Day Plate
                    </span>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      {DIETARY_TEMPLATES[currentSettings.dietaryPreference]?.trainingDayPlate}
                    </p>
                  </div>
                </div>

                {/* Food Sources Lists */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-[#11141e] border border-[#1e2536] rounded-sm space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] block">
                      Top Protein Sources
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-[#cbd5e1] space-y-0.5">
                      {DIETARY_TEMPLATES[currentSettings.dietaryPreference]?.topProteinSources.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-[#11141e] border border-[#1e2536] rounded-sm space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] block">
                      Clean Carbohydrates
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-[#cbd5e1] space-y-0.5">
                      {DIETARY_TEMPLATES[currentSettings.dietaryPreference]?.topCarbSources.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-[#11141e] border border-[#1e2536] rounded-sm space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ffaa00] block">
                      Quick Pre-Workout Snacks
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-[#cbd5e1] space-y-0.5">
                      {DIETARY_TEMPLATES[currentSettings.dietaryPreference]?.topPreWorkoutSnacks.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SUPPLEMENTS, PREFERENCES & DISCLAIMERS                             */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              
              {/* FEATURE TOGGLE & PREFERENCES */}
              <div className="p-4 bg-[#121622] border border-[#22293c] rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#1e2536]">
                  <div>
                    <h4 className="text-sm font-black text-white uppercase">Nutrition Guidance Controls</h4>
                    <p className="text-[11px] text-[#9ca3af]">Enable or disable the nutrition module at any time.</p>
                  </div>
                  <button
                    onClick={() => {
                      const updated = athleteStorage.toggleNutrition();
                      setSettings(athleteStorage.getNutritionSettings());
                    }}
                    className={`px-4 py-2 font-mono text-xs font-black uppercase rounded-sm transition-all cursor-pointer ${
                      currentSettings.isEnabled
                        ? 'bg-[#00e5ff] text-black shadow-md'
                        : 'bg-[#202738] text-[#9ca3af]'
                    }`}
                  >
                    {currentSettings.isEnabled ? '✓ Nutrition Active' : '✕ Nutrition Disabled'}
                  </button>
                </div>

                {/* Athlete Goal Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Primary Nutrition Goal:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'endurance_fueling' as const, label: 'Endurance & Trail Fuel' },
                      { id: 'lean_muscle' as const, label: 'Lean Muscle & Strength' },
                      { id: 'race_weight_fat_loss' as const, label: 'OCR Race Weight Cut' },
                      { id: 'general_recomp' as const, label: 'Body Recomposition' }
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => {
                          const updated = athleteStorage.saveNutritionSettings({ primaryGoal: g.id });
                          setSettings(updated);
                        }}
                        className={`p-2 rounded-sm border text-center text-[10px] font-mono uppercase cursor-pointer ${
                          currentSettings.primaryGoal === g.id
                            ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff] font-bold'
                            : 'bg-[#0a0c12] border-[#1d2332] text-[#9ca3af]'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tracking Complexity Preference */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-mono text-[#9ca3af] uppercase block">Tracking Complexity:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'simple_habits' as const, label: 'Simple / Habit-Based', desc: 'Hand portions, hydration, and protein priority.' },
                      { id: 'moderate' as const, label: 'Moderate Targets', desc: 'Calories, protein gram target, flexible carbs/fat.' },
                      { id: 'advanced_precision' as const, label: 'Advanced Precision', desc: 'Exact gram ranges, peri-workout timing & race calculator.' }
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          const updated = athleteStorage.saveNutritionSettings({ trackingComplexity: c.id });
                          setSettings(updated);
                        }}
                        className={`p-2.5 rounded-sm border text-left cursor-pointer ${
                          currentSettings.trackingComplexity === c.id
                            ? 'bg-[#ccff00]/10 border-[#ccff00] text-white font-bold'
                            : 'bg-[#0a0c12] border-[#1d2332] text-[#9ca3af]'
                        }`}
                      >
                        <div className="text-xs font-mono">{c.label}</div>
                        <div className="text-[10px] text-[#9ca3af] font-sans mt-0.5">{c.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* EVIDENCE-BASED SUPPLEMENT TIERS */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase text-white block">
                  Evidence-Based Sports Supplements for OCR
                </span>

                {SUPPLEMENT_TIERS.map((tierGroup, gIdx) => (
                  <div key={gIdx} className="p-4 bg-[#0e111a] border border-[#1e2536] rounded-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold uppercase ${
                        gIdx === 0 ? 'text-[#ccff00]' : gIdx === 1 ? 'text-sky-400' : 'text-[#6b7280]'
                      }`}>
                        {tierGroup.tier}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {tierGroup.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-3 bg-[#121520] border border-[#1b2130] rounded-sm space-y-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-bold text-white text-xs">{item.name}</span>
                            <span className="text-[10px] font-mono text-[#00e5ff]">{item.optimalDose} • {item.timing}</span>
                          </div>
                          <p className="text-[11px] text-[#cbd5e1] leading-relaxed">
                            {item.ocrBenefit}
                          </p>
                          <div className="text-[10px] text-[#9ca3af] font-mono pt-0.5">
                            <strong className="text-amber-400">Note:</strong> {item.cautions}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CLINICAL MEDICAL SAFETY DISCLAIMER */}
              <div className="p-4 bg-[#140f12] border-l-4 border-l-[#ff4444] border-y border-r border-[#2d1b22] rounded-sm space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-[#ff4444] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Clinical Medical Scope & Safety Policy
                </span>
                <p className="text-[11px] text-[#fca5a5] leading-relaxed whitespace-pre-line font-mono">
                  {NUTRITION_MEDICAL_DISCLAIMER}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
