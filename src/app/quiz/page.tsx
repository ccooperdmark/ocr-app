import React from 'react';
import RaceReadinessQuiz from '@/components/tools/RaceReadinessQuiz';
import { HelpCircle, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: 'OCR Race Readiness Assessment | GRIT OCR',
  description: 'Evaluate your grip endurance, 1-mile aerobic pace, pull-up capacity, and technical obstacle anxiety to receive a custom readiness score and training protocol.',
};

export default function QuizPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ccff00] rounded-sm">
          <HelpCircle className="w-3.5 h-3.5" /> Interactive Assessment Tool
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tight text-white uppercase font-sans">
          RACE READINESS <span className="text-[#ff5500]">QUIZ</span>
        </h1>
        <p className="text-sm text-[#9ca3af]">
          Answer 5 questions to pinpoint your critical physiological bottlenecks and calculate your projected obstacle clearance probability.
        </p>
      </div>

      {/* Quiz Container */}
      <RaceReadinessQuiz />

      {/* Trust factors */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-[#1c202d] text-center">
        <div className="p-4 bg-[#0c0e14] border border-[#1d212f] rounded-sm">
          <Zap className="w-5 h-5 text-[#ff5500] mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold uppercase text-white">Instant Diagnostics</h4>
          <p className="text-[11px] text-[#6b7280] mt-1">Immediate bottleneck score calculation</p>
        </div>
        <div className="p-4 bg-[#0c0e14] border border-[#1d212f] rounded-sm">
          <ShieldCheck className="w-5 h-5 text-[#ccff00] mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold uppercase text-white">Spartan SGX Aligned</h4>
          <p className="text-[11px] text-[#6b7280] mt-1">Calibrated against actual championship metrics</p>
        </div>
        <div className="p-4 bg-[#0c0e14] border border-[#1d212f] rounded-sm">
          <HelpCircle className="w-5 h-5 text-[#00e5ff] mx-auto mb-2" />
          <h4 className="text-xs font-mono font-bold uppercase text-white">Actionable Pathway</h4>
          <p className="text-[11px] text-[#6b7280] mt-1">Exact drills to fix your weakest link</p>
        </div>
      </div>

    </div>
  );
}
