import React from 'react';
import Link from 'next/link';
import { PROGRAM_TIERS } from '@/data/programsData';
import { CheckCircle2, ShieldCheck, Flame, Zap, ArrowRight, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Coaching Programs & Pricing | GRIT OCR',
  description: 'Structured 8-week, 12-week, and 1-on-1 personalized OCR training programs for Spartan, Tough Mudder, and Hybrid athletes.',
};

export default function ProgramsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] rounded-sm">
          <ShieldCheck className="w-3.5 h-3.5" /> Proven Training Protocols
        </div>
        <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase font-sans">
          TRAINING PROGRAMS <span className="text-[#ff5500]">&</span> COACHING
        </h1>
        <p className="text-base text-[#9ca3af] leading-relaxed">
          From self-paced downloadable periodization blueprints to elite 1-on-1 personalized coaching with weekly video analysis.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PROGRAM_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-sm p-8 flex flex-col justify-between transition-all relative ${
              tier.isPopular
                ? 'bg-[#12141c] border-2 border-[#ff5500] shadow-2xl shadow-[#ff5500]/15'
                : 'bg-[#0d0f15] border border-[#222736]'
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-[#ff5500] text-black font-mono font-black text-[11px] uppercase tracking-wider clip-angled">
                {tier.badge}
              </div>
            )}

            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                {tier.name}
              </h3>
              <p className="text-xs text-[#9ca3af] mt-2 min-h-[36px]">
                {tier.tagline}
              </p>

              <div className="my-6 pb-6 border-b border-[#1e2332]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-mono font-black text-white">{tier.price}</span>
                  <span className="text-xs font-mono text-[#9ca3af]">/{tier.period}</span>
                </div>
                <div className="text-[11px] font-mono text-[#ccff00] mt-1 font-semibold">
                  Ideal for: {tier.idealFor}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-mono font-bold uppercase text-[#d1d5db] tracking-wider block">
                  Core Inclusions:
                </span>
                {tier.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#9ca3af]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="space-y-2 pt-4 border-t border-[#1c202d]">
                <span className="text-[10px] font-mono font-bold uppercase text-[#6b7280] tracking-wider block">
                  Key Deliverables:
                </span>
                {tier.deliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="text-xs text-[#d1d5db] flex items-center gap-2 font-mono">
                    <span className="text-[#ccff00]">✓</span>
                    <span>{deliv.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-[#1e2332]">
              <Link
                href="/booking"
                className={`w-full py-3.5 uppercase font-bold text-xs tracking-wider rounded-sm text-center block transition-all clip-angled ${
                  tier.isPopular
                    ? 'bg-[#ff5500] hover:bg-[#ff6a00] text-black glow-orange'
                    : 'bg-[#181b26] hover:bg-[#202534] text-white border border-[#2b3245]'
                }`}
              >
                Enroll / Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 100% Satisfaction Guarantee */}
      <div className="p-8 bg-[#0e1017] border border-[#232737] rounded-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-[#ccff00]/10 border-2 border-[#ccff00] rounded-sm flex items-center justify-center shrink-0">
          <ShieldCheck className="w-8 h-8 text-[#ccff00]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-tight">
            The 100% Clean Finish & PR Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-[#9ca3af] mt-1 leading-relaxed">
            Follow the 8 or 12-week protocol. If you do not improve your race finish time or reduce your penalty burpees on race day, send us your bib number and timing chip result for a full, unconditional refund.
          </p>
        </div>
      </div>

    </div>
  );
}
