'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Flame, 
  AlertTriangle, 
  Zap,
  Target
} from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    points: number;
    category: 'endurance' | 'grip' | 'technique' | 'strength';
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'What is your primary target OCR race distance?',
    subtitle: 'This dictates the primary energy system and mileage foundation required.',
    options: [
      { label: 'Sprint (5K / 20 Obstacles)', description: 'Fast, anaerobic-heavy sprint course', points: 15, category: 'endurance' },
      { label: 'Super (10K / 25 Obstacles)', description: 'Balanced endurance and technical fatigue', points: 20, category: 'endurance' },
      { label: 'Beast (21K / 30 Obstacles)', description: 'True mountain endurance, 3-5 hours on course', points: 25, category: 'endurance' },
      { label: 'Ultra (50K / 60 Obstacles)', description: 'Extreme endurance marathon with heavy penalty loops', points: 25, category: 'endurance' }
    ]
  },
  {
    id: 2,
    title: 'What is your current continuous active bar dead hang time?',
    subtitle: 'Hanging with engaged scapular muscles on a standard pull-up bar.',
    options: [
      { label: 'Under 45 seconds', description: 'Grip will likely fail on dynamic rigs and twisters', points: 5, category: 'grip' },
      { label: '45 to 89 seconds', description: 'Can complete basic obstacles with moderate pump', points: 15, category: 'grip' },
      { label: '90 to 149 seconds', description: 'Solid competitive base for back-to-back obstacles', points: 20, category: 'grip' },
      { label: '150+ seconds (2.5+ minutes)', description: 'Elite grip endurance; zero obstacle anxiety', points: 25, category: 'grip' }
    ]
  },
  {
    id: 3,
    title: 'How many strict bodyweight pull-ups can you perform without kipping?',
    subtitle: 'Full lockout at bottom to chin completely over the bar.',
    options: [
      { label: '0 to 2 reps', description: 'Will struggle on 8ft walls, rope climb, and slip wall', points: 5, category: 'strength' },
      { label: '3 to 7 reps', description: 'Can clear walls with proper technique/momentum', points: 15, category: 'strength' },
      { label: '8 to 14 reps', description: 'Strong pulling power for rope climbs and rigs', points: 20, category: 'strength' },
      { label: '15+ reps', description: 'Elite pulling reserve capacity', points: 25, category: 'strength' }
    ]
  },
  {
    id: 4,
    title: 'What is your current flat 1-mile running pace?',
    subtitle: 'Without obstacles or hills, running at maximum sustained aerobic threshold.',
    options: [
      { label: 'Over 10:00 min / mile', description: 'Aerobic base building is your highest leverage win', points: 5, category: 'endurance' },
      { label: '8:30 to 9:59 min / mile', description: 'Solid Open heat pacing; ready for moderate volume', points: 15, category: 'endurance' },
      { label: '7:00 to 8:29 min / mile', description: 'Age Group competitive runner', points: 20, category: 'endurance' },
      { label: 'Sub 7:00 min / mile', description: 'Podium contender speed engine', points: 25, category: 'endurance' }
    ]
  },
  {
    id: 5,
    title: 'Which obstacle creates the biggest anxiety on race day?',
    subtitle: 'Pinpointing your technical bottleneck prevents 30-burpee penalties.',
    options: [
      { label: 'Multi-Rigs / Twister / Monkey Bars', description: 'Forearm pump or slipping on wet bars', points: 10, category: 'technique' },
      { label: 'The Spear Throw', description: 'High anxiety miss that costs 30 burpees instantly', points: 15, category: 'technique' },
      { label: 'The 8-Foot Wall & Rope Climb', description: 'Upper body pulling and vertical footing', points: 15, category: 'technique' },
      { label: 'Heavy Carries (50lb+ Sandbag / Bucket)', description: 'Lower back fatigue and burning legs', points: 15, category: 'technique' }
    ]
  }
];

export default function RaceReadinessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setSelectedOption(null);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Score Calculation
  const totalScore = answers.reduce((acc, optIndex, qIndex) => {
    return acc + QUIZ_QUESTIONS[qIndex].options[optIndex].points;
  }, 0);

  const getTier = (score: number) => {
    if (score >= 85) return { name: 'Podium Ready / Elite', color: '#ccff00', level: 'Elite' };
    if (score >= 65) return { name: 'Age Group Competitive', color: '#ff7733', level: 'Intermediate' };
    if (score >= 45) return { name: 'Open Heat Finisher', color: '#ff5500', level: 'Building' };
    return { name: 'Rookie / Foundation Stage', color: '#e5e7eb', level: 'Beginner' };
  };

  const tier = getTier(totalScore);

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5500] via-[#ccff00] to-[#ff5500]"></div>

      {!isCompleted ? (
        <div>
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1c202d]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500] animate-ping"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-[#9ca3af] uppercase">
                Assessment Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <span className="text-xs font-mono text-[#ccff00] font-bold">
              {Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#181b25] h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#ff5500] to-[#ccff00] h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Title */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {QUIZ_QUESTIONS[currentStep].title}
            </h2>
            <p className="text-sm text-[#9ca3af] mt-2">
              {QUIZ_QUESTIONS[currentStep].subtitle}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-sm border transition-all flex items-start justify-between group ${
                    isSelected
                      ? 'bg-[#181b26] border-[#ff5500] shadow-md shadow-[#ff5500]/10'
                      : 'bg-[#12141c] border-[#222634] hover:bg-[#161822] hover:border-[#353b4f]'
                  }`}
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-mono font-bold ${isSelected ? 'text-[#ff5500]' : 'text-white'}`}>
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <h4 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-[#e5e7eb]'}`}>
                        {option.label}
                      </h4>
                    </div>
                    <p className="text-xs text-[#9ca3af] mt-1 pl-6">
                      {option.description}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-[#ff5500] bg-[#ff5500]' : 'border-[#3a4055]'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-black"></div>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1c202d]">
            <button
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                  setSelectedOption(answers[currentStep - 1] ?? null);
                  setAnswers(answers.slice(0, -1));
                }
              }}
              disabled={currentStep === 0}
              className="px-4 py-2 text-xs font-mono font-bold uppercase text-[#9ca3af] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a00] disabled:opacity-40 disabled:pointer-events-none text-black font-bold uppercase text-sm tracking-wider clip-angled transition-all flex items-center gap-2 glow-orange-sm"
            >
              {currentStep + 1 === QUIZ_QUESTIONS.length ? 'Calculate Readiness' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center pb-6 border-b border-[#1c202d]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#181b24] border-2 border-[#ff5500] mb-4">
              <Trophy className="w-8 h-8 text-[#ff5500]" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Assessment Analysis Complete
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              Based on your physiological benchmarks and obstacle history:
            </p>
          </div>

          {/* Big Score Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#12141c] p-6 rounded-sm border border-[#222634]">
            <div className="flex flex-col justify-center items-center text-center p-4 border-b md:border-b-0 md:border-r border-[#1e2332]">
              <span className="text-xs font-mono font-bold uppercase text-[#9ca3af] tracking-wider mb-1">
                Your Race Readiness Score
              </span>
              <div className="text-6xl font-black font-mono text-white flex items-baseline gap-1 my-2">
                <span style={{ color: tier.color }}>{totalScore}</span>
                <span className="text-2xl text-[#6b7280]">/100</span>
              </div>
              <div 
                className="px-3 py-1 rounded-sm text-xs font-mono font-bold uppercase tracking-wider mt-1"
                style={{ backgroundColor: `${tier.color}20`, color: tier.color, border: `1px solid ${tier.color}40` }}
              >
                {tier.name}
              </div>
            </div>

            <div className="space-y-3 flex flex-col justify-center">
              <h4 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> Coach Diagnosis
              </h4>
              <p className="text-sm text-[#d1d5db] leading-relaxed">
                {totalScore >= 80 
                  ? "You possess a powerful athletic engine and solid baseline strength. Your remaining growth lies in compromised running under heavy fatigue and technical rig transition micro-adjustments."
                  : totalScore >= 60
                  ? "Strong potential, but you are carrying 1-2 critical bottlenecks (most likely late-race grip endurance or running pace post-carries) that will lead to 60+ burpee penalties if unaddressed."
                  : "Your current endurance and grip strength baseline will make mountain obstacles high risk for severe arm pump and exhaustion. A structured 8 to 12-week periodized protocol is strongly recommended."}
              </p>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ccff00]" /> Recommended Training Protocol
            </h3>
            
            <div className="p-5 bg-[#171a24] border-l-4 border-[#ccff00] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#ccff00] font-bold uppercase">
                  {totalScore >= 70 ? 'Recommended: 12-Week Beast & Trifecta Protocol' : 'Recommended: 8-Week Sprint & Super Blueprint'}
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {totalScore >= 70 ? '12-Week Advanced Periodization & Rig Mastery' : '8-Week Foundation Engine & Obstacle Elimination'}
                </h4>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Targeted drills for dead hang capacity, power-hiking elevation, and zero-penalty wall/spear mechanics.
                </p>
              </div>
              <Link
                href="/programs"
                className="px-5 py-2.5 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-black uppercase text-xs tracking-wider clip-angled shrink-0 transition-colors"
              >
                View Program
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                href="/guides/grip-and-rig-dominance"
                className="p-3 bg-[#11131a] hover:bg-[#161822] border border-[#222634] rounded text-xs text-[#d1d5db] flex items-center justify-between group"
              >
                <span>Read: <strong>Grip & Rig Training Guide</strong></span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ff5500] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/booking"
                className="p-3 bg-[#11131a] hover:bg-[#161822] border border-[#222634] rounded text-xs text-[#d1d5db] flex items-center justify-between group"
              >
                <span>Schedule: <strong>Free 1-on-1 Athlete Review</strong></span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ccff00] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-[#1c202d] text-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#9ca3af] hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
