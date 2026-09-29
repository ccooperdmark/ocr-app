'use client';

import React, { useState, useMemo } from 'react';
import { 
  MAJOR_OCR_DOMAINS, 
  DomainSection, 
  SubQualityItem,
  ALL_PERFORMANCE_QUALITIES
} from '@/data/performanceQualitiesData';
import { 
  Sliders, 
  Search, 
  Filter, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Target,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers
} from 'lucide-react';

export default function PerformanceQualitiesLab() {
  // Layout mode: 'simplified' (12 major domains overview) vs 'complex' (every sub-quality categorized under major domain headings)
  const [layoutMode, setLayoutMode] = useState<'simplified' | 'complex'>('complex');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyWeaknesses, setOnlyWeaknesses] = useState<boolean>(false);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Dynamic scores state keyed by quality id
  const [qualityScores, setQualityScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    ALL_PERFORMANCE_QUALITIES.forEach((q) => {
      initial[q.id] = q.defaultScore;
    });
    return initial;
  });

  const handleScoreChange = (id: string, val: number) => {
    setQualityScores((prev) => ({
      ...prev,
      [id]: val
    }));
  };

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetScores = () => {
    const initial: Record<string, number> = {};
    ALL_PERFORMANCE_QUALITIES.forEach((q) => {
      initial[q.id] = q.defaultScore;
    });
    setQualityScores(initial);
  };

  // Helper to calculate domain average
  const getDomainScore = (domain: DomainSection) => {
    const scores = domain.qualities.map((q) => qualityScores[q.id] ?? q.defaultScore);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  // Status and color helpers
  const getScoreColor = (score: number) => {
    if (score >= 82) return 'text-[#ccff00]';
    if (score >= 75) return 'text-[#ffbb00]';
    if (score >= 68) return 'text-[#ff7733]';
    return 'text-[#ff3333]';
  };

  const getScoreBg = (score: number) => {
    if (score >= 82) return 'bg-[#ccff00]/10 border-[#ccff00]/40 text-[#ccff00]';
    if (score >= 75) return 'bg-[#ffbb00]/10 border-[#ffbb00]/40 text-[#ffbb00]';
    if (score >= 68) return 'bg-[#ff7733]/10 border-[#ff7733]/40 text-[#ff7733]';
    return 'bg-[#ff3333]/10 border-[#ff3333]/40 text-[#ff3333]';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 82) return 'bg-[#ccff00]';
    if (score >= 75) return 'bg-[#ffbb00]';
    if (score >= 68) return 'bg-[#ff7733]';
    return 'bg-[#ff3333]';
  };

  const getTierLabel = (score: number) => {
    if (score >= 85) return 'Elite Pro';
    if (score >= 78) return 'Competitive AG';
    if (score >= 70) return 'Developing';
    return 'Bottleneck';
  };

  // Aggregate metrics
  const allScores = Object.values(qualityScores);
  const overallAverage = Math.round(allScores.reduce((a, b) => a + b, 0) / (allScores.length || 1));
  const masteredCount = allScores.filter((s) => s >= 80).length;
  const bottleneckCount = allScores.filter((s) => s < 75).length;

  // Filtered domains and qualities
  const filteredDomains = useMemo(() => {
    return MAJOR_OCR_DOMAINS.map((domain) => {
      // If specific domain selected in dropdown, check domain ID
      if (selectedDomainFilter !== 'all' && domain.id !== selectedDomainFilter) {
        return null;
      }

      const matchingQualities = domain.qualities.filter((q) => {
        const score = qualityScores[q.id] ?? q.defaultScore;
        const matchesWeakness = !onlyWeaknesses || score < 75;
        
        if (!matchesWeakness) return false;

        if (!searchQuery.trim()) return true;

        const query = searchQuery.toLowerCase();
        return (
          q.name.toLowerCase().includes(query) ||
          q.whyItMatters.toLowerCase().includes(query) ||
          q.typicalRaceDemands.toLowerCase().includes(query) ||
          q.proDrill.toLowerCase().includes(query) ||
          domain.title.toLowerCase().includes(query)
        );
      });

      // If search query is active and no qualities match, hide domain
      if (searchQuery.trim() && matchingQualities.length === 0) {
        return null;
      }

      // If only weaknesses active and no weak qualities match, hide domain
      if (onlyWeaknesses && matchingQualities.length === 0) {
        return null;
      }

      return {
        ...domain,
        filteredQualities: matchingQualities
      };
    }).filter(Boolean) as (DomainSection & { filteredQualities: SubQualityItem[] })[];
  }, [selectedDomainFilter, searchQuery, onlyWeaknesses, qualityScores]);

  const scrollToDomain = (domainId: string) => {
    setLayoutMode('complex');
    setTimeout(() => {
      const el = document.getElementById(`domain-section-${domainId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. TOP ANALYTICS & EXECUTIVE READINESS DASHBOARD */}
      <div className="bg-[#121520] border-2 border-[#ff5500] p-6 rounded-sm space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#202538] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider bg-[#ff5500] text-black clip-angled">
                12 MAJOR DOMAINS
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#1c2132] text-[#ccff00] border border-[#ccff00]/30">
                107 PHYSIOLOGY FACTORS
              </span>
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">
              OCR Performance Qualities Architecture
            </h3>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-2xl leading-relaxed">
              Every physiological engine, movement pattern, carry dynamic, and tissue durability factor required to podium across Spartan, Tough Mudder, and Ultra courses.
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#0b0d13] border border-[#23283a] px-4 py-3 rounded-sm text-center min-w-[110px]">
              <div className={`text-2xl font-black font-mono ${getScoreColor(overallAverage)}`}>
                {overallAverage}
                <span className="text-xs text-[#6b7280]">/100</span>
              </div>
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase font-bold mt-0.5">
                OCR Index
              </div>
            </div>

            <div className="bg-[#0b0d13] border border-[#23283a] px-4 py-3 rounded-sm text-center min-w-[110px]">
              <div className="text-2xl font-black font-mono text-[#ccff00]">
                {masteredCount}
              </div>
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase font-bold mt-0.5">
                Mastered (≥80)
              </div>
            </div>

            <div className="bg-[#0b0d13] border border-[#23283a] px-4 py-3 rounded-sm text-center min-w-[110px]">
              <div className="text-2xl font-black font-mono text-[#ff4444]">
                {bottleneckCount}
              </div>
              <div className="text-[10px] font-mono text-[#9ca3af] uppercase font-bold mt-0.5">
                Bottlenecks (&lt; 75)
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT MODE TOGGLE BAR: SIMPLIFIED VS COMPLEX */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#9ca3af] uppercase font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#ff5500]" /> Layout Mode:
            </span>
            <div className="bg-[#0a0c12] p-1 border border-[#22283a] rounded-sm flex items-center gap-1">
              <button
                onClick={() => setLayoutMode('simplified')}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 ${
                  layoutMode === 'simplified'
                    ? 'bg-[#ccff00] text-black font-black shadow-md'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Simplified (12 Major Domains)
              </button>
              <button
                onClick={() => setLayoutMode('complex')}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 ${
                  layoutMode === 'complex'
                    ? 'bg-[#ff5500] text-black font-black shadow-md'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> Complex (Deep-Dive by Category)
              </button>
            </div>
          </div>

          <button
            onClick={resetScores}
            className="px-3 py-1.5 bg-[#171b26] hover:bg-[#202535] border border-[#292f42] text-[#9ca3af] hover:text-white text-xs font-mono font-bold uppercase rounded-sm flex items-center gap-1.5 transition-colors self-end sm:self-auto"
          >
            <RotateCcw className="w-3 h-3 text-[#ff5500]" /> Reset Scores
          </button>
        </div>

        {/* SEARCH, FILTER & BOTTLENECK CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search qualities, race demands, or coach drills..."
              className="w-full bg-[#0a0c12] border border-[#23283a] rounded-sm pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#6b7280] focus:border-[#ff5500] focus:outline-none transition-colors"
            />
          </div>

          {/* Domain Filter Dropdown */}
          <div className="md:col-span-4 relative">
            <Filter className="w-4 h-4 text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={selectedDomainFilter}
              onChange={(e) => setSelectedDomainFilter(e.target.value)}
              className="w-full bg-[#0a0c12] border border-[#23283a] rounded-sm pl-9 pr-8 py-2.5 text-xs text-white focus:border-[#ff5500] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All 12 Major Domains</option>
              {MAJOR_OCR_DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.domainNumber < 10 ? `0${d.domainNumber}` : d.domainNumber}. {d.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6b7280] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Weakness Toggle Button */}
          <div className="md:col-span-3 flex items-center">
            <button
              onClick={() => setOnlyWeaknesses(!onlyWeaknesses)}
              className={`w-full py-2.5 px-3 text-xs font-mono font-bold uppercase rounded-sm border transition-all flex items-center justify-center gap-2 ${
                onlyWeaknesses
                  ? 'bg-[#ff4444]/20 text-[#ff4444] border-[#ff4444]'
                  : 'bg-[#0a0c12] text-[#9ca3af] border-[#23283a] hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {onlyWeaknesses ? 'Showing Bottlenecks' : 'Filter Bottlenecks (< 75)'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY QUICK-JUMP HORIZONTAL BAR (WHEN IN COMPLEX MODE) */}
      {layoutMode === 'complex' && (
        <div className="sticky top-0 z-30 bg-[#0c0e14]/95 backdrop-blur-md border-y border-[#202538] py-2.5 px-1 shadow-lg overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-[10px] font-mono font-bold text-[#6b7280] uppercase tracking-wider pl-2 flex items-center gap-1">
              <Target className="w-3 h-3 text-[#ff5500]" /> Jump To Domain:
            </span>
            {MAJOR_OCR_DOMAINS.map((domain) => {
              const domScore = getDomainScore(domain);
              return (
                <button
                  key={domain.id}
                  onClick={() => {
                    const el = document.getElementById(`domain-section-${domain.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-sm bg-[#121520] hover:bg-[#1c2233] border border-[#23293c] text-[#9ca3af] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span className="text-[#ff5500]">0{domain.domainNumber}.</span>
                  <span>{domain.title.split('&')[0].split(',')[0].trim()}</span>
                  <span className={`text-[10px] font-bold ${getScoreColor(domScore)}`}>
                    ({domScore})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LAYOUT 1: SIMPLIFIED EXECUTIVE OVERVIEW (ALL 12 MAJOR DOMAINS)         */}
      {/* ========================================================================= */}
      {layoutMode === 'simplified' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-[#202538]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#ccff00] rounded-full animate-pulse"></span>
              <h4 className="text-lg font-black text-white uppercase tracking-wider">
                Simplified Layout: 12 Major OCR Performance Domains
              </h4>
            </div>
            <span className="text-xs font-mono text-[#9ca3af]">
              Click any domain card to expand into complex sub-category breakdown
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredDomains.map((domain) => {
              const domScore = getDomainScore(domain);
              const weakCount = domain.qualities.filter((q) => (qualityScores[q.id] ?? q.defaultScore) < 75).length;
              const domainTier = getTierLabel(domScore);

              return (
                <div
                  key={domain.id}
                  className="bg-[#0e1017] border border-[#242838] hover:border-[#ff5500] p-5 rounded-sm flex flex-col justify-between space-y-5 transition-all group hover:shadow-xl hover:shadow-[#ff5500]/5"
                >
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 bg-[#171b26] text-[#ff5500] border border-[#ff5500]/30 rounded-sm">
                        DOMAIN {domain.domainNumber < 10 ? `0${domain.domainNumber}` : domain.domainNumber} / 12
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm border ${getScoreBg(domScore)}`}>
                        {domainTier}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-[#ff5500] transition-colors leading-tight">
                        {domain.title}
                      </h4>
                      <p className="text-xs text-[#9ca3af] mt-1 leading-relaxed">
                        {domain.tagline}
                      </p>
                    </div>

                    {domain.whyItMattersSynopsis && (
                      <div className="bg-[#121520] border-l-2 border-l-[#ff5500] p-3 rounded-sm space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ff5500] block">
                          Why It Matters
                        </span>
                        <p className="text-xs text-[#d1d5db] leading-relaxed">
                          {domain.whyItMattersSynopsis}
                        </p>
                      </div>
                    )}

                    {/* Score Bar & Numeric Display */}
                    <div className="bg-[#121520] p-3 rounded-sm border border-[#1e2332] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold">
                        <span className="text-[#9ca3af] uppercase">Domain Index</span>
                        <span className={`text-base font-black ${getScoreColor(domScore)}`}>
                          {domScore} / 100
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#0a0c12] rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${getScoreBarColor(domScore)}`}
                          style={{ width: `${domScore}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#6b7280]">
                        <span>{domain.qualities.length} sub-qualities tracked</span>
                        {weakCount > 0 ? (
                          <span className="text-[#ff5500] font-bold">
                            ⚠️ {weakCount} bottleneck{weakCount > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-[#ccff00] font-bold">✓ Zero bottlenecks</span>
                        )}
                      </div>
                    </div>

                    {/* Sub-Qualities Chip Cloud Preview */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold">
                        Tracked Performance Qualities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.qualities.map((q) => {
                          const qScore = qualityScores[q.id] ?? q.defaultScore;
                          return (
                            <span
                              key={q.id}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-sm border ${
                                qScore < 75 
                                  ? 'bg-[#ff4444]/10 border-[#ff4444]/40 text-[#ff7777]'
                                  : 'bg-[#151926] border-[#222738] text-[#d1d5db]'
                              }`}
                            >
                              {q.name}: <strong className={getScoreColor(qScore)}>{qScore}</strong>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Action: Jump to complex view for this domain */}
                  <button
                    onClick={() => scrollToDomain(domain.id)}
                    className="w-full py-2.5 px-4 bg-[#141824] hover:bg-[#ff5500] text-[#ff5500] hover:text-black font-mono font-bold uppercase text-xs rounded-sm border border-[#ff5500]/40 hover:border-[#ff5500] flex items-center justify-center gap-2 transition-all group-hover:bg-[#ff5500] group-hover:text-black"
                  >
                    <span>Inspect Sub-Categories</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. LAYOUT 2: COMPLEX DEEP-DIVE (MAJOR HEADINGS + ALL SUB-CATEGORIES)      */}
      {/* ========================================================================= */}
      {layoutMode === 'complex' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          
          {filteredDomains.length === 0 ? (
            <div className="p-12 text-center bg-[#0e1017] border border-[#242838] rounded-sm space-y-3">
              <AlertTriangle className="w-8 h-8 text-[#ffbb00] mx-auto" />
              <h4 className="text-lg font-bold text-white uppercase">No Qualities Found</h4>
              <p className="text-xs text-[#9ca3af] max-w-md mx-auto">
                No performance qualities matched your search filters. Try clearing the search query or disabling the bottleneck filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDomainFilter('all');
                  setOnlyWeaknesses(false);
                }}
                className="px-4 py-2 bg-[#ff5500] text-black font-mono font-bold uppercase text-xs rounded-sm clip-angled"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredDomains.map((domain) => {
              const domScore = getDomainScore(domain);
              const qualitiesToRender = domain.filteredQualities || domain.qualities;
              const weakCount = qualitiesToRender.filter((q) => (qualityScores[q.id] ?? q.defaultScore) < 75).length;

              return (
                <section
                  key={domain.id}
                  id={`domain-section-${domain.id}`}
                  className="space-y-6 pt-4 scroll-mt-20"
                >
                  {/* MAJOR HEADING BANNER FOR THIS DOMAIN */}
                  <div className="bg-[#0e1017] border-l-4 border-l-[#ff5500] border-y border-r border-[#242838] p-6 rounded-sm shadow-xl">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase tracking-widest bg-[#ff5500] text-black clip-angled">
                            DOMAIN {domain.domainNumber < 10 ? `0${domain.domainNumber}` : domain.domainNumber}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#ccff00] uppercase">
                            {qualitiesToRender.length} Individual Sub-Categories Tracked
                          </span>
                          {weakCount > 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] rounded-sm">
                              {weakCount} Bottleneck{weakCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                          {domain.domainNumber}. {domain.title}
                        </h3>

                        <p className="text-xs text-[#9ca3af] max-w-3xl leading-relaxed">
                          {domain.tagline}
                        </p>

                        {domain.whyItMattersSynopsis && (
                          <div className="bg-[#141824] border-l-2 border-l-[#ff5500] border-y border-r border-[#20273a] p-3 rounded-sm mt-3 max-w-3xl space-y-1">
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#ff5500] block">
                              Why It Matters
                            </span>
                            <p className="text-xs text-[#e5e7eb] leading-relaxed">
                              {domain.whyItMattersSynopsis}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Domain Aggregate Score Gauge */}
                      <div className="bg-[#121520] border border-[#23283a] p-4 rounded-sm flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#9ca3af] block">
                            Domain Score
                          </span>
                          <span className={`text-2xl font-black font-mono ${getScoreColor(domScore)}`}>
                            {domScore}
                            <span className="text-xs text-[#6b7280]">/100</span>
                          </span>
                          <span className="text-[10px] font-mono block text-[#6b7280]">
                            {getTierLabel(domScore)}
                          </span>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-[#1f2436] flex items-center justify-center relative">
                          <Activity className={`w-6 h-6 ${getScoreColor(domScore)}`} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* SUB-CATEGORY GRID: EVERY QUALITY BROKEN INTO ITS OWN CATEGORY CARD */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {qualitiesToRender.map((quality) => {
                      const score = qualityScores[quality.id] ?? quality.defaultScore;
                      const isExpanded = expandedCards[quality.id] ?? false;
                      const isWeakness = score < 75;

                      return (
                        <div
                          key={quality.id}
                          className={`bg-[#0c0e14] border rounded-sm p-5 space-y-4 transition-all ${
                            isWeakness
                              ? 'border-[#ff4444]/50 hover:border-[#ff4444] shadow-sm shadow-[#ff4444]/10'
                              : 'border-[#1e2332] hover:border-[#ff5500]/60'
                          }`}
                        >
                          {/* Quality Title & Live Score */}
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-bold text-white tracking-wide">
                                  {quality.name}
                                </h4>
                                {isWeakness && (
                                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#ff4444]/20 text-[#ff4444] rounded-sm">
                                    Bottleneck
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-[#6b7280] uppercase">
                                Domain 0{domain.domainNumber} • {getTierLabel(score)}
                              </span>
                            </div>

                            <div className="text-right shrink-0">
                              <span className={`text-xl font-black font-mono ${getScoreColor(score)}`}>
                                {score}
                                <span className="text-xs text-[#6b7280]">/100</span>
                              </span>
                            </div>
                          </div>

                          {/* Interactive Score Slider */}
                          <div className="space-y-1.5 bg-[#121520] p-3 rounded-sm border border-[#1b2030]">
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#9ca3af] uppercase font-bold">
                              <span>Athlete Competency Score</span>
                              <span className={getScoreColor(score)}>
                                {score >= 85 ? 'Elite Tier' : score >= 75 ? 'Race Ready' : 'Priority Limiter'}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="30"
                              max="100"
                              value={score}
                              onChange={(e) => handleScoreChange(quality.id, parseInt(e.target.value))}
                              className="w-full h-2 bg-[#090a0f] rounded-lg appearance-none cursor-pointer accent-[#ff5500]"
                            />
                            <div className="flex justify-between text-[9px] font-mono text-[#6b7280]">
                              <span>30 (Untrained)</span>
                              <span>65 (Limiter)</span>
                              <span>80 (Competitive)</span>
                              <span>100 (World Class)</span>
                            </div>
                          </div>

                          {/* Why It Matters & Typical Race Demands */}
                          <div className="space-y-2.5 text-xs">
                            <div className="bg-[#12151e] p-3 rounded-sm border border-[#1d2232] space-y-1">
                              <div className="flex items-center gap-1.5 text-[#ff5500] font-mono font-bold uppercase text-[10px] tracking-wider">
                                <Zap className="w-3 h-3" /> Why It Matters In OCR:
                              </div>
                              <p className="text-[#d1d5db] leading-relaxed">
                                {quality.whyItMatters}
                              </p>
                            </div>

                            <div className="bg-[#12151e] p-3 rounded-sm border border-[#1d2232] space-y-1">
                              <div className="flex items-center gap-1.5 text-[#ccff00] font-mono font-bold uppercase text-[10px] tracking-wider">
                                <Target className="w-3 h-3" /> Typical Race Demands:
                              </div>
                              <p className="text-[#9ca3af] leading-relaxed">
                                {quality.typicalRaceDemands}
                              </p>
                            </div>
                          </div>

                          {/* Accordion: Diagnostic Test Protocol & Coach Drill */}
                          <div className="border-t border-[#1b1f2e] pt-3">
                            <button
                              onClick={() => toggleExpand(quality.id)}
                              className="w-full flex items-center justify-between text-xs font-mono text-[#9ca3af] hover:text-white transition-colors"
                            >
                              <span className="flex items-center gap-1.5 font-bold uppercase text-[10px] text-[#ff7733]">
                                <Sparkles className="w-3.5 h-3.5" />
                                {isExpanded ? 'Hide Test Protocol & Coach Drill' : 'View Diagnostic Test & Pro Drill'}
                              </span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#ff5500]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#6b7280]" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="mt-3 space-y-2.5 text-xs animate-in slide-in-from-top-2 duration-150">
                                <div className="p-3 bg-[#0a0c12] border border-[#202638] rounded-sm space-y-1">
                                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-[#00e5ff]">
                                    <ShieldCheck className="w-3 h-3" /> Benchmark Diagnostic Protocol:
                                  </div>
                                  <p className="text-[#cbd5e1] font-mono text-[11px] leading-relaxed">
                                    {quality.testProtocol}
                                  </p>
                                </div>

                                <div className="p-3 bg-[#0a0c12] border border-[#202638] rounded-sm space-y-1">
                                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-[#ccff00]">
                                    <Flame className="w-3 h-3" /> Prescribed Training Drill:
                                  </div>
                                  <p className="text-[#cbd5e1] font-mono text-[11px] leading-relaxed">
                                    {quality.proDrill}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })
          )}

        </div>
      )}

      {/* 5. FOOTER EXPORT & SUMMARY CALLOUT */}
      <div className="bg-[#0e1017] border border-[#242838] p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            OCR Physiological Readiness Profile Saved
          </h4>
          <p className="text-xs text-[#9ca3af]">
            Scores are linked to your adaptive training cycle and compromised running progression.
          </p>
        </div>

        <button
          onClick={() => {
            alert(`Physiological Diagnostic Exported! Overall OCR Index: ${overallAverage}/100 with ${masteredCount} Mastered Factors and ${bottleneckCount} Critical Bottlenecks across 12 Major Domains.`);
          }}
          className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-black uppercase text-xs clip-angled transition-all glow-orange"
        >
          Export Diagnostic Summary
        </button>
      </div>

    </div>
  );
}
