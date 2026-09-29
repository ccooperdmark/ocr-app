'use client';

import React from 'react';
import { 
  INTERMEDIATE_PERFORMANCE_CATEGORIES, 
  IntermediatePerformanceCategory 
} from '@/data/intermediateTierData';
import { 
  Zap, 
  TrendingUp, 
  Minus, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  Dumbbell, 
  Flame,
  ArrowUpRight,
  Info
} from 'lucide-react';

export default function IntermediatePerformanceSection() {
  const categories = INTERMEDIATE_PERFORMANCE_CATEGORIES;

  const getStatusBadge = (classification: IntermediatePerformanceCategory['classification']) => {
    switch (classification) {
      case 'Improving':
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Improving
          </span>
        );
      case 'Stable':
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 flex items-center gap-1">
            <Minus className="w-3 h-3" /> Stable
          </span>
        );
      case 'Needs Development':
        return (
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm bg-[#ff4444]/20 text-[#ff4444] border border-[#ff4444]/40 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Needs Development
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* HEADER */}
      <div className="bg-[#0e111a] border border-[#232a3d] p-6 rounded-sm shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1e2436]">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#ffaa00] tracking-widest block mb-1">
              Intermediate Performance Profile
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              7 Core Athletic Performance Categories
            </h3>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-2xl">
              High-level diagnostic status across the 7 critical fitness domains required for safe, high-output obstacle race completion.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 bg-[#121622] text-[#00ff88] border border-[#00ff88]/40 rounded-sm font-bold">
              5 Improving
            </span>
            <span className="px-3 py-1.5 bg-[#121622] text-[#00e5ff] border border-[#00e5ff]/40 rounded-sm font-bold">
              1 Stable
            </span>
            <span className="px-3 py-1.5 bg-[#121622] text-[#ff4444] border border-[#ff4444]/40 rounded-sm font-bold">
              1 Priority Focus
            </span>
          </div>
        </div>

        {/* Informative Guidance Banner */}
        <div className="mt-4 p-3 bg-[#121624] border-l-4 border-[#ffaa00] rounded-sm flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-[#ffaa00] shrink-0 mt-0.5" />
          <p className="text-[#cbd5e1] leading-relaxed">
            <strong>Coach Summary: </strong>
            Your grip, pulling strength, and aerobic base are progressing well above age-group baseline standards. The primary performance opportunity is <strong>Work Capacity (Compromised Running)</strong>, where running pace drops following heavy carries. Upcoming workouts include compromised stride intervals.
          </p>
        </div>
      </div>

      {/* 7 CATEGORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="p-5 bg-[#0e1017] border border-[#222736] rounded-sm flex flex-col justify-between space-y-4 hover:border-[#333c52] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  {cat.name}
                </span>
                {getStatusBadge(cat.classification)}
              </div>

              <div className="pt-2 border-t border-[#1a1f2e] text-xs font-mono space-y-1">
                <div className="text-[#cbd5e1]">
                  Current: <strong className="text-white">{cat.currentMetric}</strong>
                </div>
                <div className="text-[#9ca3af] text-[11px]">
                  Target Standard: <strong>{cat.targetStandard}</strong>
                </div>
              </div>

              <p className="text-xs text-[#9ca3af] leading-relaxed pt-1">
                {cat.coachInsight}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1a1f2e] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#6b7280]">Recent Velocity</span>
              <span className={`font-bold flex items-center gap-0.5 ${
                cat.trendPercentage >= 0 ? 'text-[#00ff88]' : 'text-[#ff4444]'
              }`}>
                {cat.trendPercentage >= 0 ? '+' : ''}{cat.trendPercentage}%
                <ArrowUpRight className={`w-3 h-3 ${cat.trendPercentage < 0 ? 'rotate-90' : ''}`} />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
