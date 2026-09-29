'use client';

import React, { useState, useMemo } from 'react';
import { 
  OBSTACLE_LIBRARY, 
  ObstacleProfile, 
  RACE_COURSES, 
  RaceBrandId, 
  RaceFormatId, 
  ObstacleCategory,
  RaceCourseProfile,
  getCourseProfile
} from '@/data/obstacleProficiencyData';
import { 
  Layers, 
  Trophy, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Search, 
  Filter, 
  Compass, 
  Flame, 
  ArrowRight, 
  ChevronRight, 
  Sliders, 
  Info, 
  Target, 
  Clock,
  Sparkles,
  Activity,
  Award
} from 'lucide-react';

interface BrandMeta {
  id: RaceBrandId;
  name: string;
  badgeColor: string;
  tagline: string;
  formats: { id: RaceFormatId; label: string; count: number }[];
}

const BRANDS: BrandMeta[] = [
  {
    id: 'spartan-race',
    name: 'Spartan Race',
    badgeColor: '#ff5500',
    tagline: 'Competitive Sport & Strict 30-Burpee / Penalty Loop Standards',
    formats: [
      { id: 'spartan-sprint', label: 'Sprint (5K • 20 Obs)', count: 20 },
      { id: 'spartan-stadion', label: 'Stadion (5K • 15 Obs)', count: 15 },
      { id: 'spartan-super', label: 'Super (10K • 28 Obs)', count: 28 },
      { id: 'spartan-beast', label: 'Beast (21K • 34 Obs)', count: 34 },
      { id: 'spartan-ultra', label: 'Ultra (50K • 34+ Obs)', count: 34 }
    ]
  },
  {
    id: 'tough-mudder',
    name: 'Tough Mudder',
    badgeColor: '#ff9900',
    tagline: 'Teamwork, Camaraderie, Cold Water Plunges & Zero Individual Penalties',
    formats: [
      { id: 'tough-mudder-5k', label: '5K (9 Signature Obs)', count: 9 },
      { id: 'tough-mudder-10k', label: '10K+ (19 Obs)', count: 19 },
      { id: 'tough-mudder-classic', label: '15K Classic (21 Obs)', count: 21 },
      { id: 'tough-mudder-wtm', label: 'World’s Toughest Mudder (24h)', count: 9 }
    ]
  },
  {
    id: 'savage-race',
    name: 'Savage Race',
    badgeColor: '#00e5ff',
    tagline: 'Technical Ninja Rigs & SavagePRO "Keep Your Wristband" Rule',
    formats: [
      { id: 'savage-blitz', label: 'Blitz (3 Miles • 10 Obs)', count: 10 },
      { id: 'savage-standard', label: 'Standard (6 Miles • 19 Obs)', count: 19 },
      { id: 'savage-pro', label: 'SavagePRO Championship (9 Must-Clear Obs)', count: 9 }
    ]
  },
  {
    id: 'rugged-maniac',
    name: 'Rugged Maniac',
    badgeColor: '#ccff00',
    tagline: '5K Adult Playground, Giant Water Slides & Zero Penalty Mud Run',
    formats: [
      { id: 'rugged-maniac-5k', label: '5K Festival (18 Obs)', count: 18 }
    ]
  }
];

const CATEGORIES: { id: 'all' | ObstacleCategory; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'Climbing', label: 'Climbing' },
  { id: 'Swinging & Rig', label: 'Swinging & Rig' },
  { id: 'Heavy Carries', label: 'Heavy Carries' },
  { id: 'Walls', label: 'Walls' },
  { id: 'Crawls & Balance', label: 'Crawls & Balance' },
  { id: 'Water & Mud', label: 'Water & Mud' },
  { id: 'Throwing', label: 'Throwing' },
  { id: 'Agility & Mental', label: 'Agility & Mental' }
];

export default function ObstacleProficiencyView() {
  const [brandFilter, setBrandFilter] = useState<'all' | RaceBrandId>('all');
  const [formatFilter, setFormatFilter] = useState<'all' | RaceFormatId>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ObstacleCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'explorer' | 'roster'>('explorer');

  // Selected Obstacle State
  const [selectedObstacleId, setSelectedObstacleId] = useState<string>(OBSTACLE_LIBRARY[0].id);

  // User Interactive Competency Scores Override
  const [userScores, setUserScores] = useState<Record<string, number>>({});

  // When brand filter changes, reset format filter if not matching
  const handleBrandChange = (brand: 'all' | RaceBrandId) => {
    setBrandFilter(brand);
    setFormatFilter('all');
  };

  // Filtered Obstacles List
  const filteredObstacles = useMemo(() => {
    return OBSTACLE_LIBRARY.filter((obs) => {
      // 1. Race Brand
      if (brandFilter !== 'all' && !obs.races.includes(brandFilter)) {
        return false;
      }
      // 2. Race Format
      if (formatFilter !== 'all' && !obs.raceFormats.includes(formatFilter)) {
        return false;
      }
      // 3. Category
      if (categoryFilter !== 'all' && obs.category !== categoryFilter) {
        return false;
      }
      // 4. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = obs.name.toLowerCase().includes(q);
        const matchCat = obs.category.toLowerCase().includes(q);
        const matchDesc = obs.description.toLowerCase().includes(q);
        const matchPenalty = obs.penaltyType.toLowerCase().includes(q);
        const matchFail = obs.whyPeopleFail.some(f => f.toLowerCase().includes(q));
        if (!matchName && !matchCat && !matchDesc && !matchPenalty && !matchFail) {
          return false;
        }
      }
      return true;
    });
  }, [brandFilter, formatFilter, categoryFilter, searchQuery]);

  // Selected Obstacle
  const selectedObstacle = useMemo(() => {
    const found = OBSTACLE_LIBRARY.find(o => o.id === selectedObstacleId);
    if (found && filteredObstacles.some(o => o.id === found.id)) {
      return found;
    }
    return filteredObstacles[0] || OBSTACLE_LIBRARY[0];
  }, [selectedObstacleId, filteredObstacles]);

  // Active Course Profile (if formatFilter is selected)
  const activeCourseProfile = useMemo(() => {
    if (formatFilter === 'all') return null;
    return getCourseProfile(formatFilter);
  }, [formatFilter]);

  // Active Brand Meta
  const activeBrandMeta = useMemo(() => {
    if (brandFilter === 'all') return null;
    return BRANDS.find(b => b.id === brandFilter);
  }, [brandFilter]);

  // Current Competency Score for selected obstacle
  const currentCompetency = userScores[selectedObstacle.id] ?? selectedObstacle.techniqueRating;

  const handleScoreChange = (newVal: number) => {
    setUserScores(prev => ({
      ...prev,
      [selectedObstacle.id]: newVal
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. TOP HEADER & METRICS BANNER */}
      <div className="bg-[#12141c] border border-[#242838] p-6 sm:p-8 rounded-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ff5500]/20 text-[#ff5500] border border-[#ff5500]/40 rounded-sm">
                Master Course Taxonomy
              </span>
              <span className="text-xs font-mono text-[#9ca3af]">
                92 Authentic Obstacles Across All Major Races
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1 font-sans">
              Obstacle Proficiency System (0-100)
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-3xl leading-relaxed">
              Every obstacle in obstacle course racing categorized strictly by race brand and race distance. Inspect technical execution, failure rates, penalty risks, step-by-step progression ladders, diagnostic tests, and weekly training drills.
            </p>
          </div>

          {/* Quick View Mode Toggle */}
          <div className="bg-[#0a0c10] p-1 border border-[#202536] rounded-sm flex items-center shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('explorer')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 ${
                viewMode === 'explorer'
                  ? 'bg-[#ff5500] text-black font-black shadow-sm'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Interactive Inspector
            </button>
            <button
              onClick={() => setViewMode('roster')}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-1.5 ${
                viewMode === 'roster'
                  ? 'bg-[#ccff00] text-black font-black shadow-sm'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" /> Course Obstacle Roster
            </button>
          </div>
        </div>

        {/* Brand Statistics Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#1c202d]">
          <div className="p-3 bg-[#0a0c10] border border-[#1f2434] rounded-sm">
            <div className="text-[10px] font-mono text-[#ff5500] uppercase font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#ff5500]" /> Spartan Race
            </div>
            <div className="text-xl font-mono font-black text-white mt-0.5">34 Obstacles</div>
            <div className="text-[10px] text-[#6b7280]">Sprint, Super, Beast, Ultra</div>
          </div>
          <div className="p-3 bg-[#0a0c10] border border-[#1f2434] rounded-sm">
            <div className="text-[10px] font-mono text-[#ff9900] uppercase font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#ff9900]" /> Tough Mudder
            </div>
            <div className="text-xl font-mono font-black text-white mt-0.5">21 Obstacles</div>
            <div className="text-[10px] text-[#6b7280]">5K, 10K, 15K Classic, WTM</div>
          </div>
          <div className="p-3 bg-[#0a0c10] border border-[#1f2434] rounded-sm">
            <div className="text-[10px] font-mono text-[#00e5ff] uppercase font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00e5ff]" /> Savage Race
            </div>
            <div className="text-xl font-mono font-black text-white mt-0.5">19 Obstacles</div>
            <div className="text-[10px] text-[#6b7280]">Blitz, Standard, SavagePRO</div>
          </div>
          <div className="p-3 bg-[#0a0c10] border border-[#1f2434] rounded-sm">
            <div className="text-[10px] font-mono text-[#ccff00] uppercase font-bold flex items-center gap-1">
              <Award className="w-3 h-3 text-[#ccff00]" /> Rugged Maniac
            </div>
            <div className="text-xl font-mono font-black text-white mt-0.5">18 Obstacles</div>
            <div className="text-[10px] text-[#6b7280]">5K Mud & Festival Run</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORIZATION NAVIGATION (RACE BRAND & RACE FORMAT TABS) */}
      <div className="bg-[#0e1017] border border-[#222736] p-4 sm:p-6 rounded-sm space-y-4">
        
        {/* Level 1: Race Brand Category Tabs */}
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-[#9ca3af] block mb-2 tracking-wider flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#ff5500]" /> 1. Select Race Category
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBrandChange('all')}
              className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-all ${
                brandFilter === 'all'
                  ? 'bg-white text-black font-black shadow-md'
                  : 'bg-[#141722] text-[#9ca3af] hover:text-white border border-[#222738]'
              }`}
            >
              All Races (92 Obstacles)
            </button>
            {BRANDS.map((b) => {
              const isActive = brandFilter === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => handleBrandChange(b.id)}
                  style={{ borderColor: isActive ? b.badgeColor : undefined }}
                  className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1c202e] text-white border-2 shadow-md'
                      : 'bg-[#141722] text-[#9ca3af] hover:text-white border border-[#222738]'
                  }`}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: b.badgeColor }}
                  />
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 2: Sub-Format Filters */}
        {activeBrandMeta && (
          <div className="pt-3 border-t border-[#1c202d]">
            <span className="text-[10px] font-mono font-bold uppercase text-[#9ca3af] block mb-2 tracking-wider flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#ccff00]" /> 2. Filter by Specific Race Distance / Format
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFormatFilter('all')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all ${
                  formatFilter === 'all'
                    ? 'bg-[#ff5500] text-black font-black'
                    : 'bg-[#12141c] text-[#9ca3af] hover:text-white border border-[#202536]'
                }`}
              >
                All {activeBrandMeta.name} ({OBSTACLE_LIBRARY.filter(o => o.races.includes(activeBrandMeta.id)).length})
              </button>
              {activeBrandMeta.formats.map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setFormatFilter(fmt.id)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm transition-all ${
                    formatFilter === fmt.id
                      ? 'bg-[#ccff00] text-black font-black'
                      : 'bg-[#12141c] text-[#d1d5db] hover:text-white border border-[#202536]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Course Profile Highlight Banner */}
        {activeCourseProfile && (
          <div className="p-4 bg-[#11141e] border-l-4 border-[#ff5500] rounded-sm space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-white uppercase text-sm">
                  {activeCourseProfile.name} Course Profile
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#1e2334] text-[#ccff00] rounded-sm">
                  {activeCourseProfile.difficulty}
                </span>
              </div>
              <div className="font-mono text-[11px] text-[#ff7733]">
                Distance: <strong className="text-white">{activeCourseProfile.distance}</strong> • Obstacles: <strong className="text-white">{activeCourseProfile.obstacleCount} Stations</strong>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[#1c202d]">
              <div className="text-[#9ca3af]">
                <strong className="text-[#d1d5db]">Terrain Profile:</strong> {activeCourseProfile.courseTerrain}
              </div>
              <div className="text-[#9ca3af]">
                <strong className="text-[#ff5500]">Penalty System:</strong> {activeCourseProfile.penaltyRule}
              </div>
            </div>
          </div>
        )}

        {/* Search Bar & Obstacle Category Chips */}
        <div className="pt-3 border-t border-[#1c202d] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#9ca3af] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search obstacles by name, category, failure reason, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#12141c] border border-[#242838] text-white text-xs font-mono rounded-sm placeholder-[#6b7280] focus:outline-none focus:border-[#ff5500]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9ca3af] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-[#9ca3af] shrink-0">
              Showing <strong className="text-[#ccff00]">{filteredObstacles.length}</strong> of {OBSTACLE_LIBRARY.length} Obstacles
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-sm transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-[#2b334a] text-white border border-[#ff5500]'
                    : 'bg-[#10121a] text-[#9ca3af] hover:text-white border border-[#1e2230]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 3. MAIN DISPLAY: INTERACTIVE INSPECTOR VS COURSE ROSTER */}
      {viewMode === 'explorer' ? (
        /* EXPLORER MODE: TWO COLUMN SPLIT (SELECTOR + DETAIL INSPECTOR) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Categorized Obstacles Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2 max-h-[750px] overflow-y-auto pr-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#9ca3af] block mb-2 tracking-wider">
              Matching Obstacles ({filteredObstacles.length})
            </span>

            {filteredObstacles.length === 0 ? (
              <div className="p-6 bg-[#0e1017] border border-[#222736] rounded-sm text-center space-y-2">
                <AlertTriangle className="w-6 h-6 text-[#ff5500] mx-auto" />
                <div className="text-xs text-white font-bold">No obstacles matched your filters</div>
                <button
                  onClick={() => {
                    setBrandFilter('all');
                    setFormatFilter('all');
                    setCategoryFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1 bg-[#181c28] text-xs font-mono text-[#ccff00] rounded-sm uppercase"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredObstacles.map((obs) => {
                const isSelected = selectedObstacle.id === obs.id;
                const score = userScores[obs.id] ?? obs.techniqueRating;
                return (
                  <button
                    key={obs.id}
                    onClick={() => setSelectedObstacleId(obs.id)}
                    className={`w-full text-left p-3 rounded-sm border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#181b26] border-[#ff5500] shadow-md shadow-[#ff5500]/15'
                        : 'bg-[#0e1017] border-[#222736] hover:bg-[#12141c]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.2 bg-[#161a26] text-[#9ca3af] rounded-sm">
                          {obs.category}
                        </span>
                        {obs.races.map(r => (
                          <span 
                            key={r}
                            className={`text-[8px] font-mono font-bold uppercase px-1 py-0.2 rounded-sm ${
                              r === 'spartan-race' ? 'bg-[#ff5500]/20 text-[#ff5500]' :
                              r === 'tough-mudder' ? 'bg-[#ff9900]/20 text-[#ff9900]' :
                              r === 'savage-race' ? 'bg-[#00e5ff]/20 text-[#00e5ff]' :
                              'bg-[#ccff00]/20 text-[#ccff00]'
                            }`}
                          >
                            {r.replace('-race', '')}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {obs.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#ff7733]">
                        Fail Rate: {obs.averageFailureRate}
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0 ml-2">
                      <div className="text-xs font-black text-[#ccff00]">
                        {score}/100
                      </div>
                      <div className="text-[9px] text-[#6b7280]">Score</div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Obstacle Inspector & Progression Ladder (8 cols) */}
          <div className="lg:col-span-8 bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-8 space-y-6">
            
            {/* Header with Title and Race Badges */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#1c202d]">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#181c28] text-[#ccff00] border border-[#2b334a] rounded-sm">
                    {selectedObstacle.category}
                  </span>
                  {selectedObstacle.races.map((r) => (
                    <span
                      key={r}
                      className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border rounded-sm ${
                        r === 'spartan-race' ? 'bg-[#ff5500]/10 text-[#ff5500] border-[#ff5500]/30' :
                        r === 'tough-mudder' ? 'bg-[#ff9900]/10 text-[#ff9900] border-[#ff9900]/30' :
                        r === 'savage-race' ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30' :
                        'bg-[#ccff00]/10 text-[#ccff00] border-[#ccff00]/30'
                      }`}
                    >
                      {r.replace('-', ' ')}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
                  {selectedObstacle.name}
                </h3>

                <p className="text-xs text-[#d1d5db] leading-relaxed max-w-2xl">
                  {selectedObstacle.description}
                </p>
              </div>

              {/* Interactive Score Widget */}
              <div className="p-3 bg-[#12141c] border border-[#202536] rounded-sm text-center shrink-0 min-w-[130px]">
                <span className="text-[10px] font-mono text-[#9ca3af] uppercase block">Competency Score</span>
                <span className="text-3xl font-mono font-black text-[#ccff00] block my-0.5">
                  {currentCompetency}/100
                </span>
                <span className="text-[9px] font-mono text-[#ff7733] block">
                  Fail Rate: {selectedObstacle.averageFailureRate}
                </span>
              </div>
            </div>

            {/* Interactive Self-Assessment Competency Slider */}
            <div className="p-3.5 bg-[#12151f] border border-[#222736] rounded-sm space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#ff5500]" /> Athlete Self-Assessment Score:
                </span>
                <span className="font-bold text-[#ccff00]">{currentCompetency}/100</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={currentCompetency}
                onChange={(e) => handleScoreChange(parseInt(e.target.value))}
                className="w-full accent-[#ff5500] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#6b7280]">
                <span>Novice / High Risk (30)</span>
                <span>Proficient (60-75)</span>
                <span>Elite / 100% Clearance (90+)</span>
              </div>
            </div>

            {/* Sub-Score Breakdown (Technique, Grip, Pulling, Fatigue, Wet) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              <div className="p-2.5 bg-[#12141c] border border-[#202536] rounded-sm">
                <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Technique</div>
                <div className="text-base font-mono font-bold text-white">{selectedObstacle.techniqueRating}%</div>
              </div>
              <div className="p-2.5 bg-[#12141c] border border-[#202536] rounded-sm">
                <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Grip Demand</div>
                <div className="text-base font-mono font-bold text-[#ff5500]">{selectedObstacle.gripRating}%</div>
              </div>
              <div className="p-2.5 bg-[#12141c] border border-[#202536] rounded-sm">
                <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Pulling Power</div>
                <div className="text-base font-mono font-bold text-[#00e5ff]">{selectedObstacle.pullingRating}%</div>
              </div>
              <div className="p-2.5 bg-[#12141c] border border-[#202536] rounded-sm">
                <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Fatigue Res.</div>
                <div className="text-base font-mono font-bold text-[#ff7733]">{selectedObstacle.fatigueResistance}%</div>
              </div>
              <div className="p-2.5 bg-[#12141c] border border-[#202536] rounded-sm">
                <div className="text-[10px] font-mono text-[#9ca3af] uppercase">Wet Condition</div>
                <div className="text-base font-mono font-bold text-[#ccff00]">{selectedObstacle.wetConditionRating}%</div>
              </div>
            </div>

            {/* Race Penalty Rule Callout */}
            <div className="p-3.5 bg-[#14121a] border-l-4 border-[#ff5500] rounded-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#ff5500] shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs">
                <span className="font-mono font-bold text-white uppercase block">
                  Official Race Penalty for Failure:
                </span>
                <p className="text-[#ff7733] font-mono">
                  {selectedObstacle.penaltyType}
                </p>
              </div>
            </div>

            {/* Why People Fail Section */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#ff5500]" /> Why Competitors Fail on Course
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedObstacle.whyPeopleFail.map((reason, idx) => (
                  <div key={idx} className="p-3 bg-[#12141c] border border-[#202536] rounded-sm flex items-start gap-2 text-xs text-[#d1d5db]">
                    <span className="text-[#ff5500] font-mono font-bold shrink-0 mt-0.5">•</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Skill Progression Ladder */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#ccff00]" /> Step-by-Step Skill Progression Ladder
              </h4>
              <div className="space-y-2.5">
                {selectedObstacle.progressionLadder.map((step) => (
                  <div key={step.level} className="p-3.5 bg-[#12141c] border border-[#202536] rounded-sm flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#1e2334] text-[#ccff00] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.level}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="text-xs font-bold text-white">{step.name}</div>
                      <p className="text-[11px] text-[#9ca3af] leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono pt-1">
                        <span className="text-[#ff7733]">
                          Pass Standard: <strong>{step.targetBenchmark}</strong>
                        </span>
                        <span className="text-[#6b7280]">
                          Equipment: {step.equipment}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Diagnostic Test & Weekly Training Drill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#11141e] border-l-4 border-[#ccff00] rounded-sm text-xs space-y-1.5">
                <strong className="text-white uppercase font-mono block flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-[#ccff00]" /> Diagnostic Benchmark:
                </strong>
                <div className="font-bold text-[#ccff00]">{selectedObstacle.diagnosticTest.name}</div>
                <p className="text-[#9ca3af] text-[11px]">{selectedObstacle.diagnosticTest.protocol}</p>
                <div className="text-[10px] font-mono text-white pt-1">
                  Target: <strong>{selectedObstacle.diagnosticTest.passCriteria}</strong>
                </div>
              </div>

              <div className="p-4 bg-[#11141e] border-l-4 border-[#00e5ff] rounded-sm text-xs space-y-1.5">
                <strong className="text-white uppercase font-mono block flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#00e5ff]" /> Recommended Weekly Drill:
                </strong>
                <p className="text-[#d1d5db] text-[11px] leading-relaxed">
                  {selectedObstacle.recommendedWeeklyDrill}
                </p>
                <div className="text-[10px] font-mono text-[#00e5ff]">
                  Integrate 1–2x weekly in compromised training sessions.
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ROSTER / CHECKLIST MODE: FULL COURSE OVERVIEW BY CATEGORY */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-[#12141c] border border-[#222736] rounded-sm">
            <div>
              <h3 className="text-lg font-black text-white uppercase font-sans">
                {activeCourseProfile ? `${activeCourseProfile.name} Complete Course Obstacle Roster` : 'All Race Obstacles by Movement Category'}
              </h3>
              <p className="text-xs text-[#9ca3af]">
                Categorized master breakdown of every obstacle station with failure rates, race penalties, and quick diagnostic criteria.
              </p>
            </div>
            <div className="text-xs font-mono text-[#ccff00]">
              Total: {filteredObstacles.length} Obstacles Listed
            </div>
          </div>

          {/* Grouped by Obstacle Category */}
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => {
            const catObstacles = filteredObstacles.filter(o => o.category === cat.id);
            if (catObstacles.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#202538]">
                  <h4 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#ff5500] rounded-sm"></span>
                    {cat.label} ({catObstacles.length})
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catObstacles.map((obs) => {
                    const score = userScores[obs.id] ?? obs.techniqueRating;
                    return (
                      <div
                        key={obs.id}
                        onClick={() => {
                          setSelectedObstacleId(obs.id);
                          setViewMode('explorer');
                        }}
                        className="p-4 bg-[#0e1017] border border-[#222736] hover:border-[#ff5500] rounded-sm space-y-3 cursor-pointer transition-all hover:bg-[#12141c] group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {obs.races.map(r => (
                                <span
                                  key={r}
                                  className={`text-[8px] font-mono font-bold uppercase px-1 py-0.2 rounded-sm ${
                                    r === 'spartan-race' ? 'bg-[#ff5500]/20 text-[#ff5500]' :
                                    r === 'tough-mudder' ? 'bg-[#ff9900]/20 text-[#ff9900]' :
                                    r === 'savage-race' ? 'bg-[#00e5ff]/20 text-[#00e5ff]' :
                                    'bg-[#ccff00]/20 text-[#ccff00]'
                                  }`}
                                >
                                  {r.replace('-race', '')}
                                </span>
                              ))}
                            </div>
                            <h5 className="text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors leading-tight">
                              {obs.name}
                            </h5>
                          </div>
                          <div className="text-right font-mono shrink-0">
                            <span className="text-xs font-black text-[#ccff00]">{score}/100</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#9ca3af] line-clamp-2">
                          {obs.description}
                        </p>

                        <div className="pt-2 border-t border-[#1c202d] space-y-1 text-[10px] font-mono">
                          <div className="flex justify-between text-[#ff7733]">
                            <span>Fail Rate:</span>
                            <strong>{obs.averageFailureRate}</strong>
                          </div>
                          <div className="flex justify-between text-[#9ca3af]">
                            <span>Penalty:</span>
                            <span className="text-right truncate max-w-[170px]">{obs.penaltyType}</span>
                          </div>
                        </div>

                        <div className="text-[10px] font-mono text-[#00e5ff] flex items-center justify-between group-hover:translate-x-0.5 transition-transform">
                          <span>Inspect progression ladder & drill</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
