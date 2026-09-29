'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  RACE_BRANDS, 
  RACE_COMPARISON_MATRIX, 
  RaceBrand 
} from '@/data/racesData';
import { 
  Flame, 
  Trophy, 
  Users, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Layers,
  ChevronRight
} from 'lucide-react';

type CompetitorLevel = 'beginner' | 'intermediate' | 'experienced' | 'athlete';

export default function RaceSelector() {
  const [selectedGoal, setSelectedGoal] = useState<'fun' | 'team' | 'sport' | 'ninja'>('sport');
  const [selectedLevel, setSelectedLevel] = useState<CompetitorLevel>('intermediate');
  const [activeTabRaceId, setActiveTabRaceId] = useState<string>('spartan-race');

  // Match goal to race
  const getMatchedRaceId = () => {
    switch (selectedGoal) {
      case 'fun': return 'rugged-maniac';
      case 'team': return 'tough-mudder';
      case 'sport': return 'spartan-race';
      case 'ninja': return 'savage-race';
    }
  };

  const matchedRace: RaceBrand = RACE_BRANDS.find(r => r.id === getMatchedRaceId()) || RACE_BRANDS[2];
  const training = matchedRace.trainingRoadmap[selectedLevel];

  return (
    <div className="space-y-16">
      
      {/* 1. INTERACTIVE RACE MATCHMAKER */}
      <div className="bg-[#0e1017] border-2 border-[#242838] rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5500]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mb-8 pb-4 border-b border-[#1c202d] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] flex items-center gap-1.5 mb-1">
              <Compass className="w-3.5 h-3.5" /> Race Style Matchmaker
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Find Your Ideal Race & Custom Training Plan
            </h2>
          </div>
          <span className="text-xs font-mono text-[#ccff00] font-bold">
            STEP 1 & 2: CHOOSE YOUR SETTINGS
          </span>
        </div>

        {/* Two Setting Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Setting 1: Goal */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold uppercase text-white tracking-wider">
              Setting 1: What is your primary race objective?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedGoal('fun')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedGoal === 'fun'
                    ? 'bg-[#181b26] border-[#ff5500] text-white shadow-md shadow-[#ff5500]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffbb00]" /> Fun & Party (Zero Guilt)
                </div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Bouncy slides, mud, music, no penalties
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGoal('team')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedGoal === 'team'
                    ? 'bg-[#181b26] border-[#ff5500] text-white shadow-md shadow-[#ff5500]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#ccff00]" /> Teamwork & Mental Grit
                </div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Help buddies, conquer ice & heights, untimed
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGoal('sport')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedGoal === 'sport'
                    ? 'bg-[#181b26] border-[#ff5500] text-white shadow-md shadow-[#ff5500]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#ff5500]" /> Athletic Sport & Timing
                </div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Chip timed, penalties for failure, ranking
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedGoal('ninja')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedGoal === 'ninja'
                    ? 'bg-[#181b26] border-[#ff5500] text-white shadow-md shadow-[#ff5500]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#00e5ff]" /> Technical Ninja Rigs
                </div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Extreme upper body grip & obstacle craft
                </div>
              </button>
            </div>
          </div>

          {/* Setting 2: Fitness Level */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold uppercase text-white tracking-wider">
              Setting 2: What is your current fitness level?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedLevel('beginner')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedLevel === 'beginner'
                    ? 'bg-[#181b26] border-[#ccff00] text-white shadow-md shadow-[#ccff00]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">Beginner / First-Timer</div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Zero or 1 race, building 5K jogging base
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLevel('intermediate')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedLevel === 'intermediate'
                    ? 'bg-[#181b26] border-[#ccff00] text-white shadow-md shadow-[#ccff00]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">Intermediate / Open Heat</div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Active in gym, runs 3-6 miles, wants clean finish
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLevel('experienced')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedLevel === 'experienced'
                    ? 'bg-[#181b26] border-[#ccff00] text-white shadow-md shadow-[#ccff00]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">Experienced / Age Group</div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Racing for rank, comfortable with high elevation
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLevel('athlete')}
                className={`p-3.5 rounded-sm border text-left transition-all ${
                  selectedLevel === 'athlete'
                    ? 'bg-[#181b26] border-[#ccff00] text-white shadow-md shadow-[#ccff00]/15'
                    : 'bg-[#12141c] border-[#222736] text-[#9ca3af] hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">Athlete / Podium Hunter</div>
                <div className="text-[10px] text-[#6b7280] mt-1 font-mono">
                  Pro / Elite level, sub-6:00 pace with 100lb carries
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Dynamic Match & Custom Training Breakdown Card */}
        <div className="bg-[#121520] border-2 border-[#ff5500] rounded-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#202538]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ff5500] text-black clip-angled">
                  BEST MATCH FOR YOU
                </span>
                <span className="text-xs font-mono text-[#ccff00] font-bold">
                  {matchedRace.vibe} Division
                </span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                {matchedRace.name}
              </h3>
              <p className="text-xs text-[#ff7733] font-mono mt-0.5">
                {matchedRace.tagline}
              </p>
            </div>

            <div className="bg-[#0a0c10] px-4 py-3 border border-[#222736] rounded-sm text-xs space-y-1">
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Timing & Penalties</div>
              <div className="font-bold text-white">{matchedRace.penaltySystem}</div>
            </div>
          </div>

          {/* Training Breakdown Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
              Tailored Training Strategy ({selectedLevel.toUpperCase()} LEVEL)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 bg-[#0a0c10] border border-[#1f2334] rounded-sm space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ff5500]">
                  Core Training Focus
                </span>
                <p className="text-xs sm:text-sm text-[#e5e7eb] leading-relaxed">
                  {training.focus}
                </p>
              </div>

              <div className="p-4 bg-[#0a0c10] border border-[#1f2334] rounded-sm space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00]">
                  Recommended Weekly Rhythm
                </span>
                <p className="text-xs sm:text-sm text-[#e5e7eb] leading-relaxed">
                  {training.weeklyRhythm}
                </p>
              </div>

              <div className="p-4 bg-[#0a0c10] border border-[#1f2334] rounded-sm space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff]">
                  #1 Signature Workout Drill
                </span>
                <p className="text-xs sm:text-sm text-[#e5e7eb] leading-relaxed">
                  {training.keyDrill}
                </p>
              </div>

              <div className="p-4 bg-[#0a0c10] border border-[#1f2334] rounded-sm space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#ff4444] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-[#ff4444]" /> Critical Mistake to Avoid
                </span>
                <p className="text-xs sm:text-sm text-[#ffaaaa] leading-relaxed">
                  {training.mistakeToAvoid}
                </p>
              </div>

            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-[#1e2334] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-[#9ca3af]">
              Level Recommendation: <strong className="text-white">{matchedRace.bestFor[selectedLevel]}</strong>
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/generator"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-bold uppercase text-xs tracking-wider clip-angled transition-colors text-center"
              >
                Generate Custom 7-Day Plan →
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* 2. HEAD-TO-HEAD COMPARISON MATRIX */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase">
            Head-to-Head Comparison
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            How The Big 4 OCR Races Stack Up
          </h2>
          <p className="text-xs sm:text-sm text-[#9ca3af]">
            Simple side-by-side comparison to help you choose the right event style for your goals.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-[#222738] rounded-sm">
            <thead className="bg-[#141724] text-white border-b border-[#222738]">
              <tr>
                <th className="p-4 text-[#ff5500] font-bold w-1/5">Feature / Metric</th>
                <th className="p-4 font-bold">Rugged Maniac</th>
                <th className="p-4 font-bold">Tough Mudder</th>
                <th className="p-4 font-bold text-[#ff5500]">Spartan Race</th>
                <th className="p-4 font-bold text-[#ccff00]">Savage Race</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1e2c] bg-[#0c0e14]">
              {RACE_COMPARISON_MATRIX.map((row, i) => (
                <tr key={i} className="hover:bg-[#111420] transition-colors">
                  <td className="p-4 font-bold text-white bg-[#10131d]">{row.feature}</td>
                  <td className="p-4 text-[#9ca3af]">{row.rugged}</td>
                  <td className="p-4 text-[#9ca3af]">{row.mudder}</td>
                  <td className="p-4 text-[#d1d5db] font-semibold">{row.spartan}</td>
                  <td className="p-4 text-[#9ca3af]">{row.savage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. DEEP DIVE INTO EACH RACE STYLE */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ff5500] uppercase">
            Event Profiles
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Deep Dive: Each Race Style Explained
          </h2>
        </div>

        {/* Tab Buttons for Deep Dive */}
        <div className="flex flex-wrap gap-2 justify-center">
          {RACE_BRANDS.map((race) => (
            <button
              key={race.id}
              onClick={() => setActiveTabRaceId(race.id)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm border transition-all ${
                activeTabRaceId === race.id
                  ? 'bg-[#ff5500] text-black border-[#ff5500] font-black'
                  : 'bg-[#10121a] border-[#222736] text-[#9ca3af] hover:text-white'
              }`}
            >
              {race.name}
            </button>
          ))}
        </div>

        {/* Active Race Card */}
        {(() => {
          const race = RACE_BRANDS.find(r => r.id === activeTabRaceId) || RACE_BRANDS[0];
          return (
            <div className="bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-10 space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1c202d]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#181c28] text-[#ccff00] border border-[#2b334a] rounded-sm">
                      Vibe: {race.vibe}
                    </span>
                    <span className="text-xs font-mono text-[#9ca3af]">
                      Difficulty: {race.difficulty}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                    {race.name}
                  </h3>
                  <p className="text-sm text-[#9ca3af] mt-2 max-w-3xl leading-relaxed">
                    {race.overview}
                  </p>
                </div>
              </div>

              {/* Signature Obstacles & Pros/Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Signature Obstacles */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-wider">
                    Signature Obstacles You Will Face:
                  </h4>
                  <div className="space-y-2">
                    {race.signatureObstacles.map((obs, idx) => (
                      <div key={idx} className="p-3 bg-[#12141c] border border-[#202536] rounded-sm text-xs text-[#d1d5db] flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] shrink-0"></span>
                        <span>{obs}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-[#ccff00] tracking-wider mb-2">
                      Why People Love It:
                    </h4>
                    <ul className="space-y-1.5 pl-1">
                      {race.pros.map((pro, idx) => (
                        <li key={idx} className="text-xs text-[#9ca3af] flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00] shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#ff4444] tracking-wider mb-2">
                      Watch Out For / Drawbacks:
                    </h4>
                    <ul className="space-y-1.5 pl-1">
                      {race.cons.map((con, idx) => (
                        <li key={idx} className="text-xs text-[#9ca3af] flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#ff4444] shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Best Option By Competitor Level */}
              <div className="pt-6 border-t border-[#1c202d] space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                  How {race.name} Fits Your Experience Level:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#11131a] border border-[#1f2334] rounded-sm text-xs">
                    <strong className="text-white block mb-1 font-mono uppercase text-[10px] text-[#ffbb00]">
                      Beginner:
                    </strong>
                    <span className="text-[#9ca3af]">{race.bestFor.beginner}</span>
                  </div>
                  <div className="p-3 bg-[#11131a] border border-[#1f2334] rounded-sm text-xs">
                    <strong className="text-white block mb-1 font-mono uppercase text-[10px] text-[#ccff00]">
                      Intermediate:
                    </strong>
                    <span className="text-[#9ca3af]">{race.bestFor.intermediate}</span>
                  </div>
                  <div className="p-3 bg-[#11131a] border border-[#1f2334] rounded-sm text-xs">
                    <strong className="text-white block mb-1 font-mono uppercase text-[10px] text-[#ff7733]">
                      Experienced:
                    </strong>
                    <span className="text-[#9ca3af]">{race.bestFor.experienced}</span>
                  </div>
                  <div className="p-3 bg-[#11131a] border border-[#1f2334] rounded-sm text-xs">
                    <strong className="text-white block mb-1 font-mono uppercase text-[10px] text-[#ff4422]">
                      Athlete:
                    </strong>
                    <span className="text-[#9ca3af]">{race.bestFor.athlete}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })()}
      </div>

    </div>
  );
}
