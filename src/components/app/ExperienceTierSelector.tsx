'use client';

import React, { useState } from 'react';
import { ExperienceTier } from '@/types/trainingPlan/athlete';
import { useExperienceTier, TIER_CONFIG } from '@/context/ExperienceTierContext';
import { 
  ShieldCheck, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  Layers, 
  Zap, 
  X, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface ExperienceTierSelectorProps {
  variant?: 'pill' | 'banner' | 'compact';
  showRecommendation?: boolean;
}

export default function ExperienceTierSelector({
  variant = 'pill',
  showRecommendation = true
}: ExperienceTierSelectorProps) {
  const { tier, setTier, tierMeta, isBasic, isIntermediate, isAdvanced } = useExperienceTier();
  const [showModal, setShowModal] = useState(false);
  const [dismissRecommendation, setDismissRecommendation] = useState(false);

  // Recommendations:
  // If in Basic, suggest Intermediate when ready for progress insight
  // If in Intermediate, suggest Advanced when ready for deep biomechanics/periodization
  const recommendation = isBasic 
    ? {
        suggestedTier: 'intermediate' as ExperienceTier,
        headline: 'Ready for Progress Tracking?',
        message: 'You’ve maintained great workout consistency. Intermediate view adds progress charts and race countdowns while keeping things clean.'
      }
    : isIntermediate 
    ? {
        suggestedTier: 'advanced' as ExperienceTier,
        headline: 'Explore 12-Domain Deep Analytics?',
        message: 'You appear comfortable with training volume metrics. Advanced view unlocks full OCR obstacle progressions, 107 athletic qualities, and sweat rate labs.'
      }
    : null;

  return (
    <div className="space-y-3">
      
      {/* 1. TIER SELECTOR BAR */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="bg-[#0e1017] p-1 border border-[#242838] rounded-sm flex items-center gap-1 shadow-inner">
          {(['basic', 'intermediate', 'advanced'] as ExperienceTier[]).map((t) => {
            const active = tier === t;
            const meta = TIER_CONFIG[t];
            return (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? t === 'basic'
                      ? 'bg-[#00ff88] text-black font-black shadow-md'
                      : t === 'intermediate'
                      ? 'bg-[#ffaa00] text-black font-black shadow-md'
                      : 'bg-[#ff5500] text-black font-black shadow-md'
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#161a26]'
                }`}
                title={meta.tagline}
              >
                {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{meta.name}</span>
                <span className={`text-[9px] font-mono px-1 py-0.2 rounded hidden sm:inline ${
                  active ? 'bg-black/20 text-black' : 'text-[#6b7280]'
                }`}>
                  {t === 'basic' ? '3 Sections' : t === 'intermediate' ? '8 Sections' : 'Full Site'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explain Tiers Button */}
        <button
          onClick={() => setShowModal(true)}
          className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm hover:bg-[#151824] border border-[#232737] transition cursor-pointer"
          title="Compare Tier Structures & Permissions"
        >
          <HelpCircle className="w-4 h-4 text-[#ffaa00]" />
        </button>
      </div>

      {/* 2. OPTIONAL AI RECOMMENDATION BANNER */}
      {showRecommendation && recommendation && !dismissRecommendation && (
        <div className="p-3 bg-[#101420] border border-[#28324a] rounded-sm flex items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#ffaa00] shrink-0" />
            <div>
              <span className="font-mono font-bold text-white uppercase text-[11px] block">
                AI Coach Suggestion: {recommendation.headline}
              </span>
              <p className="text-[11px] text-[#cbd5e1] leading-snug">
                {recommendation.message}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setTier(recommendation.suggestedTier)}
              className="px-2.5 py-1 bg-[#ffaa00] hover:bg-[#ffb726] text-black font-mono font-black text-[10px] uppercase rounded-sm cursor-pointer transition"
            >
              Try {recommendation.suggestedTier.toUpperCase()}
            </button>
            <button
              onClick={() => setDismissRecommendation(true)}
              className="p-1 text-[#6b7280] hover:text-white rounded cursor-pointer"
              title="Dismiss Suggestion"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. TIER COMPARISON MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-3xl bg-[#0e1017] border-2 border-[#2b334a] rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-4 sm:p-5 bg-[#141824] border-b border-[#232a3d] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#ff5500] text-black">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white uppercase font-sans">
                    Choose Your Experience Level
                  </h3>
                  <p className="text-xs text-[#9ca3af] font-mono">
                    Progressive disclosure: One training engine, three tailored levels of complexity
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-[#9ca3af] hover:text-white rounded hover:bg-[#1e2436] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              
              <div className="p-3 bg-[#111520] border border-[#21283a] rounded-sm text-[#cbd5e1] text-[11px] leading-relaxed">
                <strong className="text-white">Core Principle: </strong>
                All tiers receive safe, intelligent, personalized AI programming. Changing your tier alters the amount of information, tools, and analytics displayed—<strong>without ever resetting or losing existing data</strong>.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['basic', 'intermediate', 'advanced'] as ExperienceTier[]).map((t) => {
                  const meta = TIER_CONFIG[t];
                  const isCurrent = tier === t;
                  return (
                    <div
                      key={t}
                      className={`p-4 rounded-sm border flex flex-col justify-between space-y-3 transition-all ${
                        isCurrent 
                          ? `${meta.accentBg} ${meta.accentBorder} shadow-lg ring-1 ring-white/20` 
                          : 'bg-[#10121a] border-[#222736] opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span 
                            className="px-2 py-0.5 text-[10px] font-mono font-black uppercase rounded"
                            style={{ backgroundColor: `${meta.badgeColor}25`, color: meta.badgeColor, border: `1px solid ${meta.badgeColor}50` }}
                          >
                            {meta.badgeLabel}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono text-white font-bold uppercase bg-white/10 px-1.5 py-0.2 rounded">
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-black text-white uppercase">{meta.name}</h4>
                        <p className="text-[11px] text-[#cbd5e1] italic leading-snug">
                          &ldquo;{meta.userQuote}&rdquo;
                        </p>

                        <div className="pt-2 border-t border-white/10 text-[10px] font-mono space-y-1">
                          <span className="text-[#9ca3af] uppercase font-bold block">Best For:</span>
                          <ul className="list-disc list-inside text-[#cbd5e1] space-y-0.5">
                            {meta.bestFor.map((bf, i) => (
                              <li key={i}>{bf}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-white/10 text-[10px] font-mono space-y-1">
                          <span className="text-[#9ca3af] uppercase font-bold block">Primary Access:</span>
                          <div className="flex flex-wrap gap-1">
                            {meta.primarySections.map((ps, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-[#181c28] text-white rounded text-[9px]">
                                {ps}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setTier(t);
                          setShowModal(false);
                        }}
                        className={`w-full py-2 font-mono font-black text-xs uppercase rounded-sm transition cursor-pointer ${
                          isCurrent
                            ? 'bg-white/20 text-white cursor-default'
                            : 'bg-white text-black hover:bg-[#ffaa00]'
                        }`}
                      >
                        {isCurrent ? 'Current Experience' : `Select ${meta.name}`}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="p-4 bg-[#121622] border-t border-[#202738] flex justify-between items-center text-xs font-mono text-[#9ca3af]">
              <span>Switch tiers anytime • No data deletion</span>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-[#1a2132] hover:bg-[#242c42] text-white font-bold rounded-sm uppercase cursor-pointer"
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
