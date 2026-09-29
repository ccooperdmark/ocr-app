'use client';

import React, { useState, useMemo } from 'react';
import { 
  OCR_EXERCISE_DATABASE, 
  getExerciseById 
} from '@/services/trainingEngine/exerciseLibraryService';
import { ExerciseDefinition, MovementPattern, ExerciseDifficulty } from '@/types/trainingPlan/exercise';
import { DomainId } from '@/types/trainingPlan/domains';
import { 
  Search, 
  Filter, 
  Dumbbell, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  Info, 
  Check, 
  RotateCcw, 
  Sliders, 
  Tag, 
  Activity, 
  ArrowUpRight, 
  X, 
  ExternalLink,
  Target,
  Trophy,
  Award
} from 'lucide-react';
import { useExperienceTier } from '@/context/ExperienceTierContext';

const DOMAIN_METADATA: { id: DomainId | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All 12 Domains', icon: '⚡' },
  { id: 'aerobic_endurance', label: '1. Aerobic Engine', icon: '🫁' },
  { id: 'running_terrain', label: '2. Running & Terrain', icon: '🏔️' },
  { id: 'anaerobic_capacity', label: '3. Anaerobic & Lactate', icon: '🔥' },
  { id: 'maximal_strength', label: '4. Maximal Strength', icon: '🏋️' },
  { id: 'grip_hanging', label: '5. Grip & Hanging', icon: '🧗' },
  { id: 'loaded_carries', label: '6. Loaded Carries', icon: '🎒' },
  { id: 'muscular_endurance', label: '7. Muscular Endurance', icon: '⏱️' },
  { id: 'power_speed', label: '8. Power & Explosiveness', icon: '💥' },
  { id: 'core_stability', label: '9. Core & Stability', icon: '🛡️' },
  { id: 'obstacle_skill', label: '10. Obstacle Technique', icon: '🎪' },
  { id: 'mobility_durability', label: '11. Mobility & Resilience', icon: '🧘' },
  { id: 'race_physiology', label: '12. Race Fuel & Strategy', icon: '🧪' }
];

export default function ExerciseLibraryView() {
  const { tier, isBasic, isIntermediate, isAdvanced } = useExperienceTier();
  const [selectedDomain, setSelectedDomain] = useState<DomainId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExerciseDifficulty | 'all'>('all');
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDefinition | null>(null);
  const [copiedExerciseId, setCopiedExerciseId] = useState<string | null>(null);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return OCR_EXERCISE_DATABASE.filter((ex) => {
      // Domain filter
      if (selectedDomain !== 'all') {
        const matchesPrimary = ex.primaryDomain === selectedDomain;
        const matchesSecondary = ex.secondaryDomains?.includes(selectedDomain as DomainId);
        if (!matchesPrimary && !matchesSecondary) return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) {
        return false;
      }

      // Movement pattern filter
      if (selectedPattern !== 'all' && ex.movementPattern !== selectedPattern) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(q);
        const matchesMuscles = ex.targetMuscles.some(m => m.toLowerCase().includes(q));
        const matchesEquipment = ex.equipmentRequired.some(eq => eq.toLowerCase().includes(q));
        const matchesCues = ex.coachingCues.some(c => c.toLowerCase().includes(q));
        const matchesNote = ex.ocrApplicationNote.toLowerCase().includes(q);
        if (!matchesName && !matchesMuscles && !matchesEquipment && !matchesCues && !matchesNote) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDomain, selectedDifficulty, selectedPattern, searchQuery]);

  const handleCopyExercise = (ex: ExerciseDefinition) => {
    const text = `${ex.name.toUpperCase()}
• Movement Pattern: ${ex.movementPattern.replace(/_/g, ' ')}
• Equipment: ${ex.equipmentRequired.join(', ')}
• Prescribed: ${ex.defaultSets} sets × ${ex.defaultRepsOrDuration} (RPE ${ex.defaultRpe})
• Coaching Cues: ${ex.coachingCues.join(' | ')}
• OCR Application: ${ex.ocrApplicationNote}`;

    navigator.clipboard.writeText(text);
    setCopiedExerciseId(ex.id);
    setTimeout(() => setCopiedExerciseId(null), 2000);
  };

  const getDifficultyBadge = (diff: ExerciseDifficulty) => {
    switch (diff) {
      case 'beginner': return 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400';
      case 'intermediate': return 'bg-sky-950/60 border-sky-500/40 text-sky-400';
      case 'advanced': return 'bg-amber-950/60 border-amber-500/40 text-amber-400';
      case 'elite': return 'bg-rose-950/60 border-rose-500/40 text-rose-400';
      default: return 'bg-zinc-800 border-zinc-700 text-zinc-300';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. HERO HEADER */}
      <div className={`p-6 rounded-sm shadow-2xl relative overflow-hidden ${
        isBasic 
          ? 'bg-[#0a0f16] border-2 border-[#00ff88]' 
          : isIntermediate 
          ? 'bg-[#12141c] border-2 border-[#ffaa00]' 
          : 'bg-[#121520] border-2 border-[#ff5500]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#202538]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider clip-angled text-black ${
                isBasic ? 'bg-[#00ff88]' : isIntermediate ? 'bg-[#ffaa00]' : 'bg-[#ff5500]'
              }`}>
                {isBasic ? 'BASIC: EXERCISE LIBRARY' : isIntermediate ? 'INTERMEDIATE: EXERCISES & PROGRESSIONS' : 'MASTER EXERCISE DATABASE'}
              </span>
              <span className="text-xs font-mono text-[#ccff00] font-bold uppercase">
                {OCR_EXERCISE_DATABASE.length} Structured Movements
              </span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight font-sans">
              {isBasic ? 'Exercise Library & Technique Guide' : isIntermediate ? 'Exercise Library & Movement Standards' : 'OCR Exercise Taxonomy & Progression Engine'}
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-3xl leading-relaxed">
              {isBasic 
                ? 'Step-by-step exercise instructions, equipment, coaching cues, common mistakes to avoid, and safe alternatives.'
                : isIntermediate
                ? 'Complete movement standards with primary & secondary muscles, difficulty ratings, and progression ladders.'
                : 'Complete movement standards, progression/regression ladders, kinematic coaching cues, and OCR course transference for Spartan, Tough Mudder, Savage, and Championship competition.'
              }
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {!isBasic && (
              <div className="px-4 py-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
                <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">12 Domains</span>
                <span className="text-2xl font-black font-mono text-[#ccff00]">100%</span>
              </div>
            )}
            <div className="px-4 py-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
              <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Filtered Matches</span>
              <span className={`text-2xl font-black font-mono ${
                isBasic ? 'text-[#00ff88]' : isIntermediate ? 'text-[#ffaa00]' : 'text-[#ff5500]'
              }`}>{filteredExercises.length}</span>
            </div>
          </div>
        </div>

        {/* 2. SEARCH & FILTER CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise by name, muscle, equipment, or obstacle note..."
              className="w-full bg-[#0a0c12] border border-[#23283a] rounded-sm pl-10 pr-4 py-2 text-xs text-white placeholder-[#6b7280] focus:border-[#ff5500] focus:outline-none font-mono"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e: any) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#0a0c12] border border-[#23283a] rounded-sm px-3 py-2 text-xs text-white focus:border-[#ff5500] focus:outline-none font-mono"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="elite">Elite Championship</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedPattern}
              onChange={(e: any) => setSelectedPattern(e.target.value)}
              className="w-full bg-[#0a0c12] border border-[#23283a] rounded-sm px-3 py-2 text-xs text-white focus:border-[#ff5500] focus:outline-none font-mono"
            >
              <option value="all">All Movement Patterns</option>
              <option value="squat">Squat</option>
              <option value="hinge">Hinge / Deadlift</option>
              <option value="lunge_unilateral">Lunge / Single-Leg</option>
              <option value="vertical_pull">Vertical Pull / Pull-Up</option>
              <option value="horizontal_pull">Horizontal Pull / Row</option>
              <option value="loaded_carry">Loaded Carry</option>
              <option value="hanging_brachiation">Hanging / Grip</option>
              <option value="aerobic_locomotion">Aerobic / Trail Running</option>
              <option value="jumping_plyometric">Jumping / Plyometrics</option>
              <option value="core_anti_extension">Core Stability</option>
              <option value="obstacle_technique">Obstacle Mechanics</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. 12 MAJOR DOMAIN FILTER STRIP */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {DOMAIN_METADATA.map((dm) => (
          <button
            key={dm.id}
            onClick={() => setSelectedDomain(dm.id)}
            className={`px-3 py-1.5 rounded-sm text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              selectedDomain === dm.id
                ? 'bg-[#ff5500] text-black border-[#ff5500] shadow-md shadow-[#ff5500]/20 font-black'
                : 'bg-[#0e1017] text-[#9ca3af] border-[#222736] hover:text-white hover:border-[#ff5500]/40'
            }`}
          >
            <span>{dm.icon}</span>
            <span>{dm.label}</span>
          </button>
        ))}
      </div>

      {/* 4. EXERCISE CARDS GRID */}
      {filteredExercises.length === 0 ? (
        <div className="p-12 text-center bg-[#0e1017] border border-dashed border-[#23283a] rounded-sm space-y-3">
          <Dumbbell className="w-10 h-10 text-[#6b7280] mx-auto" />
          <h3 className="text-base font-bold text-white uppercase">No movements match your criteria</h3>
          <p className="text-xs text-[#9ca3af]">Try clearing filters or adjusting your search query.</p>
          <button
            onClick={() => {
              setSelectedDomain('all');
              setSelectedDifficulty('all');
              setSelectedPattern('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#ff5500] text-black text-xs font-mono font-bold uppercase rounded-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-[#0e1017] border border-[#23283a] hover:border-[#ff5500]/60 rounded-sm p-4 flex flex-col justify-between transition-all group relative shadow-lg"
            >
              <div>
                {/* Badges Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase border ${getDifficultyBadge(ex.difficulty)}`}>
                    {ex.difficulty}
                  </span>
                  <span className="text-[10px] font-mono text-[#ff5500] uppercase font-semibold">
                    {ex.movementPattern.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Exercise Title */}
                <h3 
                  onClick={() => setSelectedExercise(ex)}
                  className="text-base font-bold text-white uppercase group-hover:text-[#ff5500] transition cursor-pointer"
                >
                  {ex.name}
                </h3>

                {/* Target Muscles */}
                <div className="flex flex-wrap gap-1 my-2.5">
                  {ex.targetMuscles.slice(0, 3).map((m, idx) => (
                    <span 
                      key={idx}
                      className="px-1.5 py-0.5 bg-[#141722] border border-[#222736] text-[10px] text-[#9ca3af] font-mono rounded-sm"
                    >
                      {m}
                    </span>
                  ))}
                  {ex.targetMuscles.length > 3 && (
                    <span className="text-[10px] text-[#6b7280] font-mono self-center">
                      +{ex.targetMuscles.length - 3}
                    </span>
                  )}
                </div>

                {/* Coaching Cues Preview */}
                <div className="p-2.5 bg-[#0a0c10] border-l-2 border-[#ccff00] rounded-r-sm space-y-1 mb-3">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] block">
                    Execution Focus:
                  </span>
                  <p className="text-[11px] text-[#d1d5db] leading-snug">
                    "{ex.coachingCues[0]}"
                  </p>
                </div>

                {/* OCR Application Note */}
                <p className="text-[11px] text-[#9ca3af] leading-relaxed line-clamp-2">
                  <strong className="text-white font-semibold">OCR Transfer: </strong>
                  {ex.ocrApplicationNote}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-[#1a1f2e] flex items-center justify-between text-xs font-mono">
                <div className="text-[10px] text-[#6b7280]">
                  <span>Prescription: </span>
                  <strong className="text-white">{ex.defaultSets} × {ex.defaultRepsOrDuration}</strong>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyExercise(ex)}
                    className="p-1.5 bg-[#141722] hover:bg-[#202538] text-[#9ca3af] hover:text-white rounded-sm border border-[#252b3d] transition"
                    title="Copy Exercise Prescription"
                  >
                    {copiedExerciseId === ex.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Tag className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedExercise(ex)}
                    className="px-2.5 py-1 bg-[#1a1f2e] hover:bg-[#ff5500] hover:text-black text-[#d1d5db] font-bold text-[11px] uppercase rounded-sm transition flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 5. EXERCISE DETAIL INSPECTOR MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 bg-zinc-900/60 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getDifficultyBadge(selectedExercise.difficulty)}`}>
                    {selectedExercise.difficulty}
                  </span>
                  <span className="text-xs font-mono text-[#ff5500] font-bold uppercase">
                    {selectedExercise.movementPattern.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {selectedExercise.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              
              {/* Prescribed Baseline Standard */}
              <div className={`grid ${isBasic ? 'grid-cols-3' : 'grid-cols-4'} gap-2 text-center p-3 rounded-xl bg-zinc-900/70 border border-zinc-800`}>
                <div className="p-2 rounded bg-zinc-950/60">
                  <span className="text-[10px] text-zinc-500 uppercase block">Default Sets</span>
                  <span className="text-base font-bold font-mono text-white">{selectedExercise.defaultSets}</span>
                </div>
                <div className="p-2 rounded bg-zinc-950/60">
                  <span className="text-[10px] text-zinc-500 uppercase block">Target Reps / Time</span>
                  <span className="text-base font-bold font-mono text-[#ccff00]">{selectedExercise.defaultRepsOrDuration}</span>
                </div>
                {!isBasic && (
                  <div className="p-2 rounded bg-zinc-950/60">
                    <span className="text-[10px] text-zinc-500 uppercase block">Prescribed RPE</span>
                    <span className="text-base font-bold font-mono text-amber-400">{selectedExercise.defaultRpe} / 10</span>
                  </div>
                )}
                <div className="p-2 rounded bg-zinc-950/60">
                  <span className="text-[10px] text-zinc-500 uppercase block">Rest Period</span>
                  <span className="text-base font-bold font-mono text-sky-400">{selectedExercise.defaultRestSeconds}s</span>
                </div>
              </div>

              {/* Equipment & Primary Muscles */}
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">Equipment:</span>
                  <span className="text-white font-bold">{selectedExercise.equipmentRequired.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 uppercase">Primary Muscles:</span>
                  <span className="text-[#00ff88] font-bold">{selectedExercise.targetMuscles.join(', ')}</span>
                </div>
                {!isBasic && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500 uppercase">Movement Pattern:</span>
                    <span className="text-[#ffaa00] font-bold">{selectedExercise.movementPattern.replace(/_/g, ' ')}</span>
                  </div>
                )}
              </div>

              {/* Step-by-Step Instructions */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-white block flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#ff5500]" /> Step-by-Step Technique Standards:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-zinc-300 leading-relaxed">
                  {selectedExercise.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ol>
              </div>

              {/* Coaching Cues & Mistakes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-emerald-400 block">
                    ✓ High-Yield Coaching Cues:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300">
                    {selectedExercise.coachingCues.map((cue, idx) => (
                      <li key={idx}>{cue}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-rose-400 block">
                    ⚠ Common Technique Errors:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-zinc-300">
                    {selectedExercise.commonMistakes.map((mis, idx) => (
                      <li key={idx}>{mis}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progression & Regression Ladders / Alternatives */}
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-white block">
                  {isBasic ? 'Safe Exercise Substitutions:' : 'Adaptive Movement Ladder:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                      {isBasic ? 'Easier Modification:' : 'Regression (Scale Down):'}
                    </span>
                    {selectedExercise.regressionExerciseIds.length > 0 ? (
                      selectedExercise.regressionExerciseIds.map((regId) => {
                        const reg = getExerciseById(regId);
                        return (
                          <button
                            key={regId}
                            onClick={() => setSelectedExercise(reg)}
                            className="text-xs text-sky-400 hover:underline block text-left truncate font-medium cursor-pointer"
                          >
                            ← {reg.name}
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-zinc-500 text-xs italic">Foundational Standard</span>
                    )}
                  </div>

                  {!isBasic ? (
                    <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1">Progression (Overload):</span>
                      {selectedExercise.progressionExerciseIds.length > 0 ? (
                        selectedExercise.progressionExerciseIds.map((progId) => {
                          const prog = getExerciseById(progId);
                          return (
                            <button
                              key={progId}
                              onClick={() => setSelectedExercise(prog)}
                              className="text-xs text-amber-400 hover:underline block text-left truncate font-medium cursor-pointer"
                            >
                              → {prog.name}
                            </button>
                          );
                        })
                      ) : (
                        <span className="text-zinc-500 text-xs italic">Peak Championship Standard</span>
                      )}
                    </div>
                  ) : (
                    <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1">Dumbbell / Home Alternative:</span>
                      <span className="text-xs text-emerald-400 font-medium">Standard bodyweight / dumbbell variant</span>
                    </div>
                  )}
                </div>
              </div>

              {/* OCR Application Note (Intermediate & Advanced) */}
              {!isBasic && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-orange-950/20 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" /> Race Day Course Transference:
                  </span>
                  <p className="text-zinc-200 leading-relaxed">
                    {selectedExercise.ocrApplicationNote}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
              <button
                onClick={() => handleCopyExercise(selectedExercise)}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium transition flex items-center gap-1.5"
              >
                {copiedExerciseId === selectedExercise.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Prescription!</span>
                  </>
                ) : (
                  <>
                    <Tag className="w-3.5 h-3.5" />
                    <span>Copy Prescription</span>
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-1.5 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-bold uppercase rounded transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
