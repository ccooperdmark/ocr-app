'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  Dumbbell, 
  Activity, 
  Trophy, 
  CheckCircle2, 
  Zap, 
  Flame,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { athleteStorage, PersonalRecordItem, CompletedWorkoutRecord } from '@/services/storage/athleteStorageService';

export default function IntermediateProgressSection() {
  const [prs, setPrs] = useState<PersonalRecordItem[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<CompletedWorkoutRecord[]>([]);

  useEffect(() => {
    setPrs(athleteStorage.getPersonalRecords());
    setWorkoutLogs(athleteStorage.getWorkoutLogs());

    const handleUpdate = () => {
      setPrs(athleteStorage.getPersonalRecords());
      setWorkoutLogs(athleteStorage.getWorkoutLogs());
    };
    window.addEventListener('grit_storage_update', handleUpdate);
    window.addEventListener('grit_athlete_data_changed', handleUpdate);
    return () => {
      window.removeEventListener('grit_storage_update', handleUpdate);
      window.removeEventListener('grit_athlete_data_changed', handleUpdate);
    };
  }, []);

  const totalCompleted = 14 + workoutLogs.length;
  const totalVolume = workoutLogs.reduce((acc, w) => acc + (w.totalVolumeLbs || 0), 42500);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. HEADER SUMMARY */}
      <div className="bg-[#0e111a] border border-[#232a3d] p-6 rounded-sm shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2436]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#ffaa00]/20 text-[#ffaa00] border border-[#ffaa00]/40 rounded-sm">
                Intermediate Tracking
              </span>
              <span className="text-xs font-mono text-[#9ca3af]">
                Clear trends without excessive math
              </span>
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              Progress & Milestone Analytics
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-[#121622] p-3 border border-[#22283a] rounded-sm text-center">
              <span className="text-[10px] text-[#9ca3af] uppercase block">Monthly Consistency</span>
              <span className="text-xl font-black text-[#00ff88]">94.2%</span>
            </div>
            <div className="bg-[#121622] p-3 border border-[#22283a] rounded-sm text-center">
              <span className="text-[10px] text-[#9ca3af] uppercase block">Total Sessions</span>
              <span className="text-xl font-black text-white">{totalCompleted}</span>
            </div>
          </div>
        </div>

        {/* 4 Fast Metric Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm">
            <span className="text-[10px] font-mono uppercase text-[#9ca3af] flex items-center gap-1">
              <Dumbbell className="w-3 h-3 text-[#00e5ff]" /> Strength Volume
            </span>
            <div className="text-lg font-mono font-black text-white mt-1">
              {Math.round(totalVolume).toLocaleString()} lbs
            </div>
            <span className="text-[10px] font-mono text-[#00ff88] flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +7.2% vs last cycle
            </span>
          </div>

          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm">
            <span className="text-[10px] font-mono uppercase text-[#9ca3af] flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#ff5500]" /> Trail Running
            </span>
            <div className="text-lg font-mono font-black text-white mt-1">
              24.5 km / wk
            </div>
            <span className="text-[10px] font-mono text-[#00ff88] flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> Pace: 7:15 / mile
            </span>
          </div>

          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm">
            <span className="text-[10px] font-mono uppercase text-[#9ca3af] flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#00ff88]" /> Max Dead Hang
            </span>
            <div className="text-lg font-mono font-black text-white mt-1">
              115 Seconds
            </div>
            <span className="text-[10px] font-mono text-[#00ff88] flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +15s all-time PR
            </span>
          </div>

          <div className="p-3 bg-[#121520] border border-[#1e2332] rounded-sm">
            <span className="text-[10px] font-mono uppercase text-[#9ca3af] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#ccff00]" /> Recovery Trend
            </span>
            <div className="text-lg font-mono font-black text-[#ccff00] mt-1">
              Stable (86/100)
            </div>
            <span className="text-[10px] font-mono text-[#9ca3af]">
              Fatigue well-managed
            </span>
          </div>
        </div>
      </div>

      {/* 2. PERSONAL RECORDS (PRS) SHOWCASE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ffaa00]" /> Confirmed Personal Bests & Standards
          </h4>
          <span className="text-xs font-mono text-[#9ca3af]">
            Updated automatically when logging workouts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {prs.map((pr) => (
            <div key={pr.id} className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm bg-[#161a26] text-[#00e5ff] border border-[#202738]">
                  {pr.category}
                </span>
                <h5 className="text-sm font-bold text-white pt-1">{pr.exerciseName}</h5>
                <div className="text-xs font-mono text-[#9ca3af]">Achieved: {pr.dateAchieved}</div>
              </div>

              <div className="text-right">
                <div className="text-xl font-mono font-black text-[#ffaa00]">
                  {pr.metricValue} <span className="text-xs font-normal text-[#9ca3af]">{pr.metricUnit}</span>
                </div>
                <span className="text-[9px] font-mono text-[#00ff88] uppercase block">
                  {pr.badgeLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SIMPLIFIED STRENGTH & RUNNING GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strength Progression Card */}
        <div className="p-5 bg-[#0e1017] border border-[#222736] rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#ffaa00] font-bold uppercase">Estimated Trajectory</span>
              <h5 className="text-base font-bold text-white">Strength & Pulling Endurance</h5>
            </div>
            <span className="text-xs font-mono text-[#00ff88] font-bold">+8.5% Growth</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { label: 'Strict Pull-Ups', baseline: '14 reps', current: '18 reps', target: '20 reps', pct: 90 },
              { label: 'Dead Hang (Active)', baseline: '90 sec', current: '115 sec', target: '120 sec', pct: 95 },
              { label: 'Farmer Carry (Per Hand)', baseline: '50 lbs', current: '70 lbs', target: '80 lbs', pct: 87 },
              { label: 'Trap Bar Deadlift', baseline: '205 lbs', current: '245 lbs', target: '275 lbs', pct: 89 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-white font-semibold">{item.label}</span>
                  <span className="text-[#9ca3af]">
                    Current: <strong className="text-[#00ff88]">{item.current}</strong> (Goal: {item.target})
                  </span>
                </div>
                <div className="w-full h-2 bg-[#181c28] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ffaa00] to-[#00ff88]" style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Running & Conditioning Card */}
        <div className="p-5 bg-[#0e1017] border border-[#222736] rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase">Aerobic Pace Progression</span>
              <h5 className="text-base font-bold text-white">Trail Pace & Incline Output</h5>
            </div>
            <span className="text-xs font-mono text-[#00ff88] font-bold">-25s / Mile</span>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            {[
              { label: '1-Mile Trail Pace', baseline: '7:40', current: '7:15', target: '7:00', pct: 88 },
              { label: '5K Compromised Split', baseline: '25:30', current: '23:00', target: '22:00', pct: 92 },
              { label: 'Mountain Vert Climb Rate', baseline: '450m/hr', current: '580m/hr', target: '650m/hr', pct: 85 },
              { label: 'Zone 2 Base Duration', baseline: '45 mins', current: '75 mins', target: '90 mins', pct: 83 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-white font-semibold">{item.label}</span>
                  <span className="text-[#9ca3af]">
                    Current: <strong className="text-[#ff5500]">{item.current}</strong> (Target: {item.target})
                  </span>
                </div>
                <div className="w-full h-2 bg-[#181c28] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff7700] to-[#ccff00]" style={{ width: `${item.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
