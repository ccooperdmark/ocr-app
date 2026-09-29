'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Flame, 
  Timer as TimerIcon, 
  Zap,
  CheckCircle,
  Layers
} from 'lucide-react';

type TimerMode = 'EMOM' | 'AMRAP' | 'TABATA' | 'INTERVAL';

interface PresetWorkout {
  name: string;
  mode: TimerMode;
  workSec: number;
  restSec: number;
  rounds: number;
  description: string;
}

const PRESET_WORKOUTS: PresetWorkout[] = [
  {
    name: 'Grip Gauntlet (EMOM)',
    mode: 'EMOM',
    workSec: 40,
    restSec: 20,
    rounds: 10,
    description: 'Minute 1: 40s Dead Hang | Minute 2: 15 Towel Pull-Ups | Minute 3: 50m Heavy Farmer Carry | Repeat for 10 rounds.'
  },
  {
    name: 'Spartan Burpee Blast (Tabata)',
    mode: 'TABATA',
    workSec: 20,
    restSec: 10,
    rounds: 8,
    description: '20s max chest-to-ground burpees, 10s rest. 8 rounds. Simulates extreme lactate clearance under race pressure.'
  },
  {
    name: 'Obstacle Sufferfest (Interval)',
    mode: 'INTERVAL',
    workSec: 45,
    restSec: 15,
    rounds: 12,
    description: 'Sandbag squats, bear crawls, pull-ups, and box jumps. 45s hard effort, 15s transition.'
  },
  {
    name: '15-Minute AMRAP Grinder',
    mode: 'AMRAP',
    workSec: 900,
    restSec: 0,
    rounds: 1,
    description: '15 Minutes continuous: 400m run + 20 push-ups + 30s dead hang + 15 jump squats. Count total rounds completed.'
  }
];

export default function WorkoutTimer() {
  const [mode, setMode] = useState<TimerMode>('EMOM');
  const [workTime, setWorkTime] = useState<number>(40);
  const [restTime, setRestTime] = useState<number>(20);
  const [totalRounds, setTotalRounds] = useState<number>(10);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [phase, setPhase] = useState<'PREP' | 'WORK' | 'REST' | 'FINISHED'>('PREP');
  const [timeLeft, setTimeLeft] = useState<number>(10); // 10s prep
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
  };

  const playBeep = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtxRef.current) return;
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {
      // Audio playback failed or blocked
    }
  };

  // Timer Tick Engine
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 4 && prev > 1) {
            playBeep(440, 0.15); // countdown beep
          }

          if (prev <= 1) {
            // State transition
            if (phase === 'PREP') {
              playBeep(880, 0.4, 'triangle'); // high GO beep
              setPhase('WORK');
              return workTime;
            } else if (phase === 'WORK') {
              if (restTime > 0 && currentRound <= totalRounds) {
                playBeep(520, 0.3);
                setPhase('REST');
                return restTime;
              } else {
                if (currentRound < totalRounds) {
                  setCurrentRound((r) => r + 1);
                  playBeep(880, 0.4, 'triangle');
                  return workTime;
                } else {
                  playBeep(1046, 0.8, 'square');
                  setPhase('FINISHED');
                  setIsRunning(false);
                  return 0;
                }
              }
            } else if (phase === 'REST') {
              if (currentRound < totalRounds) {
                setCurrentRound((r) => r + 1);
                playBeep(880, 0.4, 'triangle');
                setPhase('WORK');
                return workTime;
              } else {
                playBeep(1046, 0.8, 'square');
                setPhase('FINISHED');
                setIsRunning(false);
                return 0;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, phase, currentRound, totalRounds, workTime, restTime]);

  const handleStartPause = () => {
    initAudio();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('PREP');
    setTimeLeft(10);
    setCurrentRound(1);
  };

  const handleSelectPreset = (preset: PresetWorkout, index: number) => {
    setIsRunning(false);
    setActivePresetIndex(index);
    setMode(preset.mode);
    setWorkTime(preset.workSec);
    setRestTime(preset.restSec);
    setTotalRounds(preset.rounds);
    setPhase('PREP');
    setTimeLeft(10);
    setCurrentRound(1);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'PREP': return { text: 'text-[#ffbb00]', bg: 'bg-[#ffbb00]/10', border: 'border-[#ffbb00]' };
      case 'WORK': return { text: 'text-[#ccff00]', bg: 'bg-[#ccff00]/10', border: 'border-[#ccff00]' };
      case 'REST': return { text: 'text-[#ff5500]', bg: 'bg-[#ff5500]/10', border: 'border-[#ff5500]' };
      case 'FINISHED': return { text: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10', border: 'border-[#00e5ff]' };
    }
  };

  const phaseTheme = getPhaseColor();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Preset Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESET_WORKOUTS.map((preset, idx) => {
          const isSelected = activePresetIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset, idx)}
              className={`text-left p-3.5 rounded-sm border transition-all ${
                isSelected
                  ? 'bg-[#181b26] border-[#ff5500] shadow-md shadow-[#ff5500]/10'
                  : 'bg-[#101219] border-[#222634] hover:bg-[#141620] hover:border-[#333a4c]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff5500]">
                  {preset.mode}
                </span>
                <span className="text-[10px] font-mono text-[#9ca3af]">
                  {preset.rounds} Rds
                </span>
              </div>
              <h4 className="text-sm font-bold text-white leading-tight">
                {preset.name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Main Athletic Digital Display */}
      <div className={`p-8 sm:p-12 rounded-sm bg-[#0a0c10] border-2 ${phaseTheme.border} transition-colors duration-500 shadow-2xl relative overflow-hidden`}>
        {/* Glow ambient */}
        <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${phaseTheme.bg}`}></div>

        {/* Top bar controls */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1f2433]">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-xs font-mono font-black uppercase tracking-widest rounded-sm ${phaseTheme.bg} ${phaseTheme.text}`}>
              PHASE: {phase}
            </span>
            <span className="text-xs font-mono text-[#9ca3af]">
              ROUND {currentRound} OF {totalRounds}
            </span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded bg-[#161822] text-[#9ca3af] hover:text-white border border-[#252a3a] transition-colors"
            title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#ccff00]" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Big Digital Clock */}
        <div className="py-10 sm:py-14 text-center">
          <div className={`font-mono text-7xl sm:text-9xl font-black tracking-tight ${phaseTheme.text} transition-colors select-none`}>
            {formatTime(timeLeft)}
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#9ca3af] mt-4">
            {phase === 'PREP' && 'GET READY — WORK STARTS SOON'}
            {phase === 'WORK' && 'MAXIMUM SUSTAINED POWER — WORK PHASE'}
            {phase === 'REST' && 'DEEP RECOVERY BREATHS — LOWER HEART RATE'}
            {phase === 'FINISHED' && 'WORKOUT COMPLETE — OCR ENGINE LEVEL UP'}
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#1f2433]">
          <button
            onClick={handleStartPause}
            className={`px-8 py-4 font-black uppercase text-base tracking-wider rounded-sm flex items-center gap-2 transition-all ${
              isRunning
                ? 'bg-[#e5e7eb] hover:bg-white text-black'
                : 'bg-[#ff5500] hover:bg-[#ff6a00] text-black glow-orange'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-black" /> Start Timer
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-4 bg-[#181b26] hover:bg-[#202433] text-white font-mono font-bold uppercase text-sm tracking-wider border border-[#2d3246] rounded-sm flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-[#9ca3af]" /> Reset
          </button>
        </div>
      </div>

      {/* Preset Workout Details */}
      <div className="p-5 bg-[#10121a] border border-[#222634] rounded-sm">
        <h4 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-wider mb-1 flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> Current Workout Protocol: {PRESET_WORKOUTS[activePresetIndex].name}
        </h4>
        <p className="text-sm text-[#d1d5db]">
          {PRESET_WORKOUTS[activePresetIndex].description}
        </p>
      </div>
    </div>
  );
}
