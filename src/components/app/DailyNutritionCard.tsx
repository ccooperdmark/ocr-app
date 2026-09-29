'use client';

import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Droplet, 
  Zap, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Sliders, 
  ShieldCheck,
  EyeOff,
  Check,
  Award
} from 'lucide-react';
import { Session } from '@/types/trainingPlan/plan';
import { 
  athleteStorage, 
  NutritionUserSettings, 
  DailyNutritionLog 
} from '@/services/storage/athleteStorageService';
import { 
  calculateSessionDemand, 
  calculateDailyNutritionTargets, 
  DailyNutritionTargets 
} from '@/services/trainingEngine/nutritionEngineService';
import { useExperienceTier } from '@/context/ExperienceTierContext';

interface DailyNutritionCardProps {
  session?: Session | null;
  onOpenNutritionLab?: () => void;
}

export default function DailyNutritionCard({ session, onOpenNutritionLab }: DailyNutritionCardProps) {
  const { tier, isBasic, isIntermediate, isAdvanced } = useExperienceTier();
  const [settings, setSettings] = useState<NutritionUserSettings | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyNutritionLog | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Load from storage
  useEffect(() => {
    setSettings(athleteStorage.getNutritionSettings());
    setDailyLog(athleteStorage.getTodayNutrition());
  }, []);

  // Listen to external updates
  useEffect(() => {
    const handleStorageUpdate = (e: any) => {
      if (e.detail?.key?.includes('nutrition')) {
        setSettings(athleteStorage.getNutritionSettings());
        setDailyLog(athleteStorage.getTodayNutrition());
      }
    };
    window.addEventListener('grit_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('grit_storage_update', handleStorageUpdate);
  }, []);

  if (!settings) return null;

  // 1. IF NUTRITION GUIDANCE IS DISABLED (OPTIONAL STATE)
  if (!settings.isEnabled) {
    return (
      <div className="p-4 bg-[#0a0c12] border border-[#1e2332] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#161a26] text-[#00e5ff] flex items-center justify-center border border-[#242c40]">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              Integrated Sports Nutrition Guidance
              <span className="text-[10px] font-mono text-[#9ca3af] uppercase px-1.5 py-0.2 bg-[#141824] rounded-sm">
                Optional
              </span>
            </div>
            <p className="text-[11px] text-[#9ca3af]">
              Calibrate daily carbohydrates, protein, electrolytes, and race fueling dynamically to today's workout demand.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const updated = athleteStorage.saveNutritionSettings({ isEnabled: true });
            setSettings(updated);
          }}
          className="px-3.5 py-1.5 bg-[#00e5ff] hover:bg-[#00cce6] text-black font-mono font-bold text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" /> Enable Fueling Guidance
        </button>
      </div>
    );
  }

  // 2. IF ENABLED: COMPUTE DYNAMIC TARGETS
  const calculatedDemand = calculateSessionDemand(session);
  const activeDemand = (settings.manualDemandOverride && settings.manualDemandOverride !== 'auto')
    ? settings.manualDemandOverride
    : calculatedDemand;

  const targets: DailyNutritionTargets = calculateDailyNutritionTargets(
    169, // Athlete weight
    activeDemand,
    settings.primaryGoal,
    settings.dietaryPreference,
    settings.sweatRateLph
  );

  // Toggle checklist items
  const toggleChecklist = (field: 'proteinTargetHit' | 'preWorkoutFuelHit' | 'postWorkoutFuelHit' | 'hydrationTargetHit') => {
    if (!dailyLog) return;
    const currentVal = !!dailyLog[field];
    const updated = athleteStorage.updateNutrition({ [field]: !currentVal });
    setDailyLog(updated);
  };

  return (
    <div className="bg-[#0e1017] border border-[#242838] rounded-sm p-5 space-y-4 shadow-xl">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b2030]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-sm bg-[#ff5500]/10 border border-[#ff5500]/40 text-[#ff5500] flex items-center justify-center">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-white uppercase tracking-tight">
                Daily Fueling Strategy
              </h4>
              <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm border ${targets.demandColor}`}>
                {targets.demandBadge}
              </span>
            </div>
            <p className="text-[11px] text-[#9ca3af] font-mono mt-0.5">
              Synced to: {session ? session.name : "Today's Active Microcycle"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenNutritionLab?.()}
            className="px-3 py-1 bg-[#161a26] hover:bg-[#1f2538] border border-[#2d354b] text-[#00e5ff] text-[11px] font-mono font-bold uppercase rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> {isBasic ? "Fueling Guide" : "Sports Nutrition Lab"}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm text-xs font-mono"
            title={isExpanded ? "Collapse Card" : "Expand Card"}
          >
            {isExpanded ? "▲ Hide" : "▼ Details"}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* NUTRITION EMPHASIS BANNER */}
          <div className="p-3 bg-[#131622] border-l-2 border-l-[#00e5ff] border-y border-r border-[#1e2436] rounded-sm flex items-start gap-2.5 text-xs">
            <Zap className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white uppercase text-[11px] block font-mono">
                {isBasic ? "Today's Nutrition Focus:" : "Session Nutrition Emphasis:"}
              </span>
              <p className="text-[#cbd5e1] text-[11px] mt-0.5">
                {isBasic 
                  ? "Higher carbohydrate intake and steady hydration to fuel today's workout and speed muscle recovery."
                  : targets.nutritionEmphasis}
              </p>
            </div>
          </div>

          {/* DYNAMIC MACRONUTRIENT & CALORIE TARGET GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            <div className="p-3 bg-[#0a0c10] border border-[#1b2030] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Daily Energy</span>
              <div className="text-sm font-black text-white mt-1">
                {targets.targetCaloriesMin} - {targets.targetCaloriesMax}
              </div>
              <span className="text-[9px] font-mono text-[#ff5500]">kcal</span>
            </div>

            <div className="p-3 bg-[#0a0c10] border border-[#1b2030] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Protein Target</span>
              <div className="text-sm font-black text-[#00e5ff] mt-1">
                {targets.targetProteinGrams}g
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">
                {isBasic ? "Daily Goal" : `${targets.targetProteinPerLb} g/lb`}
              </span>
            </div>

            <div className="p-3 bg-[#0a0c10] border border-[#1b2030] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Carbohydrates</span>
              <div className="text-sm font-black text-[#ccff00] mt-1">
                {targets.targetCarbsGrams}g
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">
                {isBasic ? "Workout Fuel" : `${targets.targetCarbsPerKg} g/kg`}
              </span>
            </div>

            <div className="p-3 bg-[#0a0c10] border border-[#1b2030] rounded-sm text-center">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Healthy Fats</span>
              <div className="text-sm font-black text-[#ffaa00] mt-1">
                {targets.targetFatGrams}g
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">Essential Oils</span>
            </div>

            <div className="p-3 bg-[#0a0c10] border border-[#1b2030] rounded-sm text-center col-span-2 sm:col-span-1">
              <span className="text-[9px] font-mono uppercase text-[#9ca3af] block">Hydration</span>
              <div className="text-sm font-black text-[#00e5ff] mt-1">
                {targets.targetHydrationOz} oz
              </div>
              <span className="text-[9px] font-mono text-[#9ca3af]">{targets.targetHydrationLiters} Liters</span>
            </div>
          </div>

          {/* PERI-WORKOUT FUELING PROTOCOLS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* Pre-Workout */}
            <div className="p-3.5 bg-[#121520] border border-[#1e2436] rounded-sm space-y-1.5 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Pre-Workout Window
                </span>
                <span className="text-[9px] font-mono text-[#9ca3af]">{targets.preWorkout.timing}</span>
              </div>
              <div className="text-white font-bold text-[11px]">
                {targets.preWorkout.carbsGrams}g Carbs • {targets.preWorkout.proteinGrams}g Protein
              </div>
              <p className="text-[10px] text-[#9ca3af] leading-relaxed">
                {targets.preWorkout.guideline}
              </p>
              <div className="text-[10px] text-[#cbd5e1] font-mono pt-1">
                <strong className="text-[#ff5500]">Suggested:</strong> {targets.preWorkout.sampleFood}
              </div>
            </div>

            {/* Intra-Workout */}
            <div className="p-3.5 bg-[#121520] border border-[#1e2436] rounded-sm space-y-1.5 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Intra-Workout Window
                </span>
                <span className={`text-[9px] font-mono uppercase ${targets.intraWorkout.needed ? 'text-amber-400 font-bold' : 'text-[#6b7280]'}`}>
                  {targets.intraWorkout.needed ? 'Fuel Required' : 'Hydration Only'}
                </span>
              </div>
              <div className="text-white font-bold text-[11px]">
                Carbs: {targets.intraWorkout.carbsPerHour}
              </div>
              <div className="text-[10px] text-[#9ca3af]">
                Fluid: {targets.intraWorkout.fluidPerHour} • Na+: {targets.intraWorkout.sodiumPerHour}
              </div>
              <p className="text-[10px] text-[#9ca3af] leading-relaxed pt-0.5">
                {targets.intraWorkout.guideline}
              </p>
            </div>

            {/* Post-Workout */}
            <div className="p-3.5 bg-[#121520] border border-[#1e2436] rounded-sm space-y-1.5 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-[#1b2030]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ffaa00] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Post-Workout Window
                </span>
                <span className="text-[9px] font-mono text-[#9ca3af]">{targets.postWorkout.timing}</span>
              </div>
              <div className="text-white font-bold text-[11px]">
                {targets.postWorkout.carbsGrams}g Carbs • {targets.postWorkout.proteinGrams}g Protein
              </div>
              <p className="text-[10px] text-[#9ca3af] leading-relaxed">
                {targets.postWorkout.guideline}
              </p>
              <div className="text-[10px] text-[#cbd5e1] font-mono pt-1">
                <strong className="text-[#00e5ff]">Suggested:</strong> {targets.postWorkout.sampleFood}
              </div>
            </div>
          </div>

          {/* DAILY FUELING ADHERENCE CHECKLIST */}
          <div className="p-3 bg-[#0a0c10] border border-[#1b2030] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-[10px] font-mono uppercase font-bold text-[#9ca3af]">
              Today's Fueling Adherence:
            </span>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { key: 'proteinTargetHit' as const, label: `Protein (${targets.targetProteinGrams}g)` },
                { key: 'preWorkoutFuelHit' as const, label: 'Pre-Workout Fuel' },
                { key: 'postWorkoutFuelHit' as const, label: 'Post-Workout Fuel' },
                { key: 'hydrationTargetHit' as const, label: `Hydration (${targets.targetHydrationOz}oz)` }
              ].map((item) => {
                const isChecked = !!dailyLog?.[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleChecklist(item.key)}
                    className={`px-2.5 py-1 rounded-sm border font-mono text-[10px] flex items-center gap-1.5 transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-[#ccff00]/15 border-[#ccff00] text-[#ccff00] font-bold'
                        : 'bg-[#141724] border-[#22293d] text-[#9ca3af] hover:text-white'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-xs flex items-center justify-center border ${isChecked ? 'bg-[#ccff00] border-[#ccff00] text-black' : 'border-[#4b5563]'}`}>
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                athleteStorage.saveNutritionSettings({ isEnabled: false });
                setSettings({ ...settings, isEnabled: false });
              }}
              className="text-[10px] font-mono text-[#6b7280] hover:text-[#ff4444] transition-colors self-end sm:self-auto cursor-pointer"
              title="Disable nutrition guidance"
            >
              Turn Off Nutrition
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
