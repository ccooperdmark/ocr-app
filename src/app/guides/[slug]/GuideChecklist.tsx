'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

interface GuideChecklistProps {
  checklist: {
    title: string;
    items: string[];
  };
}

export default function GuideChecklist({ checklist }: GuideChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklist.items.length;
  const isAllComplete = completedCount === totalCount && totalCount > 0;

  return (
    <div className="p-6 sm:p-8 bg-[#0c0e14] border-2 border-[#24293a] rounded-sm space-y-5 relative overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff5500]">
            Interactive Benchmark
          </span>
          <h3 className="text-lg font-black text-white uppercase tracking-tight">
            {checklist.title}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-[#ccff00]">
            {completedCount} / {totalCount} MASTERED
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#161924] h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#ff5500] to-[#ccff00] transition-all duration-300"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        ></div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2.5 pt-2">
        {checklist.items.map((item, idx) => {
          const isDone = !!checkedItems[idx];
          return (
            <button
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`w-full text-left p-3 rounded-sm border transition-all flex items-start gap-3 ${
                isDone
                  ? 'bg-[#141822] border-[#ccff00]/40 text-white'
                  : 'bg-[#10121a] border-[#1e2332] text-[#9ca3af] hover:text-white hover:border-[#2f364d]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#ccff00]" />
                ) : (
                  <Circle className="w-4 h-4 text-[#4b5563]" />
                )}
              </div>
              <span className={`text-xs sm:text-sm ${isDone ? 'line-through opacity-80' : ''}`}>
                {item}
              </span>
            </button>
          );
        })}
      </div>

      {isAllComplete && (
        <div className="p-3 bg-[#ccff00]/10 border border-[#ccff00] rounded-sm text-center text-xs font-mono font-bold text-[#ccff00] flex items-center justify-center gap-2 animate-in fade-in">
          <Trophy className="w-4 h-4" /> ALL BENCHMARKS ACHIEVED FOR THIS PILLAR!
        </div>
      )}
    </div>
  );
}
