'use client';

import React, { useState } from 'react';
import { BENCHMARK_TESTS, BenchmarkTest } from '@/data/benchmarksData';
import { Award, CheckCircle, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export default function BenchmarkTracker() {
  const [selectedTest, setSelectedTest] = useState<BenchmarkTest>(BENCHMARK_TESTS[0]);
  const [userValue, setUserValue] = useState<string>('');
  const [evaluatedTier, setEvaluatedTier] = useState<string | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(userValue);
    if (isNaN(val)) return;

    const std = selectedTest.numericStandards;
    if (std.direction === 'higher') {
      if (val >= std.eliteThreshold) setEvaluatedTier('Elite / Podium Level');
      else if (val >= std.ageGroupThreshold) setEvaluatedTier('Age Group Competitive');
      else if (val >= std.openThreshold) setEvaluatedTier('Open Heat Finisher');
      else setEvaluatedTier('Novice / Building');
    } else {
      if (val <= std.eliteThreshold) setEvaluatedTier('Elite / Podium Level');
      else if (val <= std.ageGroupThreshold) setEvaluatedTier('Age Group Competitive');
      else if (val <= std.openThreshold) setEvaluatedTier('Open Heat Finisher');
      else setEvaluatedTier('Novice / Building');
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Elite / Podium Level':
        return 'bg-[#ccff00]/15 text-[#ccff00] border-[#ccff00]/50';
      case 'Age Group Competitive':
        return 'bg-[#ff7733]/15 text-[#ff7733] border-[#ff7733]/50';
      case 'Open Heat Finisher':
        return 'bg-[#ff5500]/15 text-[#ff5500] border-[#ff5500]/50';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      
      {/* Test Selector Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {BENCHMARK_TESTS.map((test) => {
          const isSelected = selectedTest.id === test.id;
          return (
            <button
              key={test.id}
              onClick={() => {
                setSelectedTest(test);
                setUserValue('');
                setEvaluatedTier(null);
              }}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-sm border transition-all ${
                isSelected
                  ? 'bg-[#1a1e2b] border-[#ff5500] text-[#ff5500] shadow-md shadow-[#ff5500]/15'
                  : 'bg-[#101218] border-[#222736] text-[#9ca3af] hover:text-white hover:border-[#353c52]'
              }`}
            >
              {test.name}
            </button>
          );
        })}
      </div>

      {/* Main Benchmark Card */}
      <div className="bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#1d212d]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#202534] text-[#ccff00] border border-[#2d3448] rounded-sm">
                Category: {selectedTest.category}
              </span>
              <span className="text-xs font-mono text-[#9ca3af]">Unit: {selectedTest.unit}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {selectedTest.name}
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1 max-w-xl">
              {selectedTest.description}
            </p>
          </div>

          {/* Interactive Calculator Input */}
          <div className="bg-[#141722] p-4 rounded-sm border border-[#242938] w-full md:w-80 shrink-0">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" /> Check Your Ranking
            </h4>
            <form onSubmit={handleEvaluate} className="space-y-3">
              <div>
                <input
                  type="number"
                  step="any"
                  placeholder={`Enter value (${selectedTest.unit})`}
                  value={userValue}
                  onChange={(e) => setUserValue(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-[#2d3345] text-white rounded-sm focus:outline-none focus:border-[#ff5500] font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-bold uppercase text-xs tracking-wider clip-angled transition-colors"
              >
                Evaluate Rank
              </button>
            </form>

            {evaluatedTier && (
              <div className={`mt-3 p-2.5 rounded-sm border text-xs font-mono font-bold text-center ${getTierBadge(evaluatedTier)} animate-in fade-in duration-200`}>
                Ranking: {evaluatedTier}
              </div>
            )}
          </div>
        </div>

        {/* Standards Grid */}
        <div className="pt-8">
          <h3 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-wider mb-4">
            Official Performance Standard Tiers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 bg-[#12141c] border border-[#1f2330] rounded-sm">
              <div className="text-[11px] font-mono font-bold text-[#9ca3af] uppercase tracking-wider mb-1">
                Tier 1: Novice
              </div>
              <div className="text-xl font-mono font-black text-gray-300">
                {selectedTest.standards.novice}
              </div>
              <p className="text-xs text-[#6b7280] mt-2">
                High obstacle failure risk. Focus on foundational joint stability and volume.
              </p>
            </div>

            <div className="p-4 bg-[#12141c] border border-[#1f2330] rounded-sm">
              <div className="text-[11px] font-mono font-bold text-[#ff5500] uppercase tracking-wider mb-1">
                Tier 2: Open Heat Finisher
              </div>
              <div className="text-xl font-mono font-black text-white">
                {selectedTest.standards.open}
              </div>
              <p className="text-xs text-[#9ca3af] mt-2">
                Solid weekend warrior level. Clears standard walls and holds grip through basic rigs.
              </p>
            </div>

            <div className="p-4 bg-[#12141c] border border-[#1f2330] rounded-sm">
              <div className="text-[11px] font-mono font-bold text-[#ff7733] uppercase tracking-wider mb-1">
                Tier 3: Age Group Contender
              </div>
              <div className="text-xl font-mono font-black text-[#ff7733]">
                {selectedTest.standards.ageGroup}
              </div>
              <p className="text-xs text-[#9ca3af] mt-2">
                Competitive field ranking. Capable of clean finishes without burpee penalties.
              </p>
            </div>

            <div className="p-4 bg-[#12141c] border border-[#2d3345] rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#ccff00]"></div>
              <div className="text-[11px] font-mono font-bold text-[#ccff00] uppercase tracking-wider mb-1">
                Tier 4: Elite / Podium
              </div>
              <div className="text-xl font-mono font-black text-[#ccff00]">
                {selectedTest.standards.elite}
              </div>
              <p className="text-xs text-[#9ca3af] mt-2">
                Championship tier. High reserve capacity and effortless obstacle navigation.
              </p>
            </div>

          </div>
        </div>

        {/* Why it matters note */}
        <div className="mt-8 p-4 bg-[#12151e] border-l-2 border-[#ff5500] rounded-r-sm">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wide mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#ff5500]" /> Why This Benchmark Matters on Course:
          </h4>
          <p className="text-xs text-[#9ca3af]">
            {selectedTest.whyItMatters}
          </p>
        </div>

      </div>
    </div>
  );
}
