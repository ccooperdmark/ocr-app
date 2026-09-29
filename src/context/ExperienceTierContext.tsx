'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExperienceTier } from '@/types/trainingPlan/athlete';
import { athleteStorage } from '@/services/storage/athleteStorageService';

export interface TierMetadata {
  id: ExperienceTier;
  name: string;
  badgeLabel: string;
  tagline: string;
  userQuote: string;
  description: string;
  bestFor: string[];
  primarySections: string[];
  badgeColor: string;
  accentBorder: string;
  accentBg: string;
}

export const TIER_CONFIG: Record<ExperienceTier, TierMetadata> = {
  basic: {
    id: 'basic',
    name: 'BASIC',
    badgeLabel: 'Simple & Guided',
    tagline: 'Simple, guided fitness & nutrition without unnecessary complexity',
    userQuote: 'Give me my training plan, nutrition guidance, and exercises without unnecessary complexity.',
    description: 'Focuses strictly on today’s workouts, simple nutrition, and exercise instructions. Complex periodization, sports-science analytics, and race data are managed automatically behind the scenes.',
    bestFor: [
      'Beginners',
      'Casual fitness users',
      'People who want simplicity',
      'Users who primarily want the app to tell them what to do'
    ],
    primarySections: ['Training Plans', 'Nutrition', 'Exercise Library'],
    badgeColor: '#00ff88',
    accentBorder: 'border-[#00ff88]',
    accentBg: 'bg-[#00ff88]/15'
  },
  intermediate: {
    id: 'intermediate',
    name: 'INTERMEDIATE',
    badgeLabel: 'Performance & Progress',
    tagline: 'Balanced insight, progress tracking, race preparation & recovery',
    userQuote: 'Give me my training and nutrition, plus progress tracking, performance information, race preparation, and additional training insight.',
    description: 'The sweet spot between simplicity and full athletic analysis. Includes dedicated progress tracking, 7 key performance areas, race prep countdowns, training phases, and recovery metrics.',
    bestFor: [
      'Intermediate athletes',
      'Regular exercisers',
      'Recreational competitors',
      'Users interested in understanding their progress'
    ],
    primarySections: ['Training Plans', 'Nutrition', 'Exercise Library', 'Progress', 'Performance', 'Race Prep', 'Recovery', 'Challenges'],
    badgeColor: '#ffaa00',
    accentBorder: 'border-[#ffaa00]',
    accentBg: 'bg-[#ffaa00]/15'
  },
  advanced: {
    id: 'advanced',
    name: 'ADVANCED',
    badgeLabel: 'Complete Performance System',
    tagline: 'Full platform access: all 12 domains, diagnostics, periodization & tools',
    userQuote: 'Give me full access to the entire platform, including all training, analytics, OCR, race preparation, recovery, sports-science, AI, and performance tools.',
    description: 'Unrestricted access to the entire platform. Full 12-domain OCR profiling, 107 physiological qualities, 92 obstacles across 4 leagues, macrocycles, sweat-rate labs, and telemetry.',
    bestFor: [
      'Advanced athletes',
      'Competitive athletes',
      'OCR racers',
      'Data-focused athletes',
      'Experienced fitness users',
      'Coaches wanting maximum control'
    ],
    primarySections: ['Full Platform', '12 Major Domains', '92 Obstacles', 'Grip Lab', 'Compromised Running', 'Periodization Blocks', 'Coach HQ', 'Telemetry'],
    badgeColor: '#ff5500',
    accentBorder: 'border-[#ff5500]',
    accentBg: 'bg-[#ff5500]/15'
  }
};

interface ExperienceTierContextType {
  tier: ExperienceTier;
  setTier: (tier: ExperienceTier) => void;
  tierMeta: TierMetadata;
  isBasic: boolean;
  isIntermediate: boolean;
  isAdvanced: boolean;
  hasAccess: (requiredMinTier: ExperienceTier) => boolean;
}

const ExperienceTierContext = createContext<ExperienceTierContextType | undefined>(undefined);

const TIER_ORDER: Record<ExperienceTier, number> = {
  basic: 1,
  intermediate: 2,
  advanced: 3
};

export function ExperienceTierProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTierState] = useState<ExperienceTier>('intermediate');

  useEffect(() => {
    // Read from client storage on mount
    try {
      const stored = athleteStorage.getExperienceTier();
      if (stored) {
        setTierState(stored);
      }
    } catch (e) {
      // Storage fallback
    }

    const handleTierChange = (e: any) => {
      if (e.detail?.tier) {
        setTierState(e.detail.tier);
      }
    };

    window.addEventListener('grit_experience_tier_changed', handleTierChange);
    return () => window.removeEventListener('grit_experience_tier_changed', handleTierChange);
  }, []);

  const setTier = (newTier: ExperienceTier) => {
    setTierState(newTier);
    athleteStorage.setExperienceTier(newTier);
  };

  const hasAccess = (requiredMinTier: ExperienceTier): boolean => {
    return TIER_ORDER[tier] >= TIER_ORDER[requiredMinTier];
  };

  const value: ExperienceTierContextType = {
    tier,
    setTier,
    tierMeta: TIER_CONFIG[tier],
    isBasic: tier === 'basic',
    isIntermediate: tier === 'intermediate',
    isAdvanced: tier === 'advanced',
    hasAccess
  };

  return (
    <ExperienceTierContext.Provider value={value}>
      {children}
    </ExperienceTierContext.Provider>
  );
}

export function useExperienceTier() {
  const context = useContext(ExperienceTierContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider
    const fallbackTier: ExperienceTier = typeof window !== 'undefined' 
      ? athleteStorage.getExperienceTier() 
      : 'intermediate';
    
    return {
      tier: fallbackTier,
      setTier: (t: ExperienceTier) => athleteStorage.setExperienceTier(t),
      tierMeta: TIER_CONFIG[fallbackTier],
      isBasic: fallbackTier === 'basic',
      isIntermediate: fallbackTier === 'intermediate',
      isAdvanced: fallbackTier === 'advanced',
      hasAccess: (minTier: ExperienceTier) => TIER_ORDER[fallbackTier] >= TIER_ORDER[minTier]
    };
  }
  return context;
}
