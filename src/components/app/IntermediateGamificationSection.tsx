'use client';

import React from 'react';
import { 
  INTERMEDIATE_GAMIFICATION_DATA, 
  IntermediateGamificationData 
} from '@/data/intermediateTierData';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Target, 
  Award, 
  Zap,
  ArrowRight
} from 'lucide-react';

export default function IntermediateGamificationSection() {
  const gData = INTERMEDIATE_GAMIFICATION_DATA;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. ATHLETE LEVEL & XP BANNER */}
      <div className="bg-[#0e111a] border-2 border-[#ffaa00] p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#22293d]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider bg-[#ffaa00] text-black clip-angled">
                ATHLETE LEVEL {gData.currentLevel}
              </span>
              <span className="text-xs font-mono text-[#00ff88] font-bold">
                {gData.totalXp.toLocaleString()} Total XP
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {gData.levelTitle}
            </h3>
            <p className="text-xs text-[#9ca3af]">
              Earn XP by completing workouts, hitting weekly missions, logging nutrition, and recording personal bests.
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-2 bg-[#121622] p-4 rounded-sm border border-[#22293d]">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white font-bold">Next Level ({gData.currentLevel + 1})</span>
              <span className="text-[#ffaa00]">{gData.xpToNextLevel} XP needed</span>
            </div>
            <div className="w-full h-2.5 bg-[#181d2c] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ffaa00] to-[#00ff88]" style={{ width: '68%' }}></div>
            </div>
            <span className="text-[10px] font-mono text-[#6b7280] block text-right">
              68% Complete
            </span>
          </div>
        </div>

        {/* 2. WEEKLY MISSIONS (CHALLENGES) */}
        <div className="pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-[#ffaa00]" /> Active Weekly Missions
            </h4>
            <span className="text-[10px] font-mono text-[#00ff88]">
              Resets Every Monday 00:00 UTC
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gData.weeklyMissions.map((mission) => (
              <div 
                key={mission.id}
                className={`p-3.5 rounded-sm border flex items-center justify-between text-xs ${
                  mission.isCompleted 
                    ? 'bg-[#101622] border-[#00ff88]/50' 
                    : 'bg-[#121520] border-[#222736]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {mission.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#444f6b] shrink-0" />
                    )}
                    <span className={`font-semibold ${mission.isCompleted ? 'text-white line-through opacity-80' : 'text-white'}`}>
                      {mission.title}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#9ca3af] pl-6">
                    Progress: {mission.progress} / {mission.target} {mission.unit}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 bg-[#181d2c] text-[#ffaa00] font-mono font-bold text-[10px] rounded-sm">
                    +{mission.xpReward} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SELECTED OCR SKILL PROGRESSION */}
      <div className="p-6 bg-[#0e1017] border border-[#222736] rounded-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00e5ff]" /> Selected OCR Core Skills
            </h4>
            <p className="text-xs text-[#9ca3af]">
              Targeted skill levels for essential obstacle clearing mechanics
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#9ca3af]">
            Advanced tier unlocks 92-obstacle taxonomy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {gData.selectedSkills.map((skill) => (
            <div key={skill.id} className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#181e2e] text-[#00e5ff]">
                  {skill.currentTier}
                </span>
                <span className="text-xs font-mono font-black text-[#00ff88]">
                  {skill.progressPercent}%
                </span>
              </div>
              <h5 className="text-sm font-bold text-white pt-1">{skill.name}</h5>
              <div className="w-full h-1.5 bg-[#181d2c] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00e5ff] to-[#00ff88]" style={{ width: `${skill.progressPercent}%` }}></div>
              </div>
              <span className="text-[10px] font-mono text-[#9ca3af] block pt-1">
                Next: {skill.nextMilestone}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RECENT ACHIEVEMENTS & TROPHIES */}
      <div className="p-6 bg-[#0e1017] border border-[#222736] rounded-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono font-bold uppercase text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ffaa00]" /> Recent Achievement Badges
          </h4>
          <span className="text-xs font-mono text-[#00ff88]">4 Earned This Month</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {gData.recentAchievements.map((ach) => (
            <div key={ach.id} className="p-3.5 bg-[#121520] border border-[#1e2332] rounded-sm flex items-center gap-3">
              <div className="text-2xl p-2 bg-[#181e2e] rounded-sm border border-[#22293d]">
                {ach.badgeIcon}
              </div>
              <div>
                <h6 className="text-xs font-bold text-white leading-tight">{ach.title}</h6>
                <span className="text-[10px] font-mono text-[#ffaa00] uppercase block">{ach.category}</span>
                <span className="text-[9px] font-mono text-[#6b7280]">Earned: {ach.earnedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
