'use client';

import React, { useState } from 'react';
import { CoachClientSummary, ClientTriageStatus, CoachOverrideAction } from '@/types/trainingPlan/coach';
import { getCoachClientsSeed } from '@/data/seedProfiles';
import { 
  Users, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Calendar, 
  TrendingDown, 
  TrendingUp, 
  Activity, 
  ChevronRight,
  Flame,
  Zap,
  Clock,
  Compass,
  FileText,
  Send,
  MessageSquare,
  CheckSquare
} from 'lucide-react';
import { athleteStorage, CoachChatMessage, WeeklyCheckInSubmission } from '@/services/storage/athleteStorageService';

export default function CoachDashboardView() {
  const [clients, setClients] = useState<CoachClientSummary[]>(() => getCoachClientsSeed());
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.athlete.id || '');
  const [triageFilter, setTriageFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCoachTab, setActiveCoachTab] = useState<'profile' | 'programming' | 'overrides' | 'messages' | 'checkins' | 'notes'>('profile');

  // Messaging & Check-in state
  const [chatMessages, setChatMessages] = useState<CoachChatMessage[]>(() => athleteStorage.getMessages());
  const [chatInput, setChatInput] = useState<string>('');
  const [checkIns, setCheckIns] = useState<WeeklyCheckInSubmission[]>(() => athleteStorage.getCheckIns());
  const [coachCheckInReview, setCoachCheckInReview] = useState<string>('');

  // Override Form state
  const [overrideNote, setOverrideNote] = useState<string>('');
  const [isSessionLocked, setIsSessionLocked] = useState<boolean>(false);
  const [appliedOverrides, setAppliedOverrides] = useState<CoachOverrideAction[]>([]);

  const selectedClient = clients.find(c => c.athlete.id === selectedClientId) || clients[0];

  const handleSendCoachMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = athleteStorage.sendMessage(chatInput.trim(), 'coach');
    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  // Filtering
  const filteredClients = clients.filter((c) => {
    const matchesSearch = c.athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.targetRace.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (triageFilter === 'all') return true;
    if (triageFilter === 'declining_performance') return c.fourWeekTrend === 'regressing';
    if (triageFilter === 'low_adherence') return c.weeklyAdherenceRatePercent < 75;
    if (triageFilter === 'upcoming_race') return c.targetRace.weeksUntilRace <= 8;
    if (triageFilter === 'low_readiness') return c.raceReadinessScore < 70;
    if (triageFilter === 'assessment_due') return c.nextAssessmentDueDays <= 3;
    if (triageFilter === 'coach_review_required') return c.triageStatus.includes('coach_review_required');
    if (triageFilter === 'injury_flagged') return c.triageStatus.includes('injury_flagged');

    return true;
  });

  const handleApplyOverride = () => {
    if (!overrideNote.trim()) return;
    const newOverride: CoachOverrideAction = {
      id: `ovr_${Date.now()}`,
      athleteId: selectedClient.athlete.id,
      sessionId: 'sess_active',
      actionType: 'insert_custom_note',
      originalValue: 'AI Generated Plan',
      overrideValue: overrideNote,
      coachComment: overrideNote,
      appliedAt: new Date().toISOString()
    };

    setAppliedOverrides(prev => [newOverride, ...prev]);
    setOverrideNote('');
    alert(`Coach Override successfully saved and pushed to ${selectedClient.athlete.name}'s live mobile schedule!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. COACH COMMAND CENTER HEADER */}
      <div className="bg-[#121520] border-2 border-[#ff5500] p-6 rounded-sm relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#202538]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider bg-[#ff5500] text-black clip-angled">
                COACH COMMAND HQ
              </span>
              <span className="text-xs font-mono text-[#ccff00] font-bold uppercase">
                {clients.length} Active Athletes Monitored
              </span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Adaptive Athlete Roster & Overrides
            </h2>
            <p className="text-xs text-[#9ca3af] mt-1 max-w-2xl leading-relaxed">
              Real-time athlete compliance, injury flags, and physiological readiness triage. Coach has absolute authority to lock, substitute, or override AI recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
              <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Avg Adherence</span>
              <span className="text-2xl font-black font-mono text-[#ccff00]">88.5%</span>
            </div>
            <div className="px-4 py-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-center">
              <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold block">Action Items</span>
              <span className="text-2xl font-black font-mono text-[#ff4444]">3 Flags</span>
            </div>
          </div>
        </div>

        {/* Triage Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-4">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search athlete or race target..."
              className="w-full bg-[#0a0c12] border border-[#23283a] rounded-sm pl-10 pr-4 py-2 text-xs text-white placeholder-[#6b7280] focus:border-[#ff5500] focus:outline-none"
            />
          </div>

          <div className="md:col-span-7 flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#ff5500]" /> Filter Roster:
            </span>
            {[
              { id: 'all', label: 'All Clients' },
              { id: 'low_adherence', label: 'Low Adherence (<75%)' },
              { id: 'declining_performance', label: 'Declining Trend' },
              { id: 'injury_flagged', label: 'Injury Flagged' },
              { id: 'assessment_due', label: 'Assessment Due' },
              { id: 'coach_review_required', label: 'Review Needed' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setTriageFilter(f.id)}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-sm border transition-all ${
                  triageFilter === f.id
                    ? 'bg-[#ff5500] text-black border-[#ff5500]'
                    : 'bg-[#0a0c12] text-[#9ca3af] border-[#202538] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. ROSTER LIST & ATHLETE DETAIL SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CLIENT LIST (Left Column) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#202538]">
            <span className="text-xs font-mono font-bold uppercase text-white">
              Athletes ({filteredClients.length})
            </span>
            <span className="text-[10px] font-mono text-[#6b7280]">Sorted by urgency</span>
          </div>

          <div className="space-y-2">
            {filteredClients.map((client) => {
              const isSelected = selectedClientId === client.athlete.id;
              const hasFlag = client.triageStatus.some(s => s !== 'on_track');

              return (
                <div
                  key={client.athlete.id}
                  onClick={() => setSelectedClientId(client.athlete.id)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#151a26] border-[#ff5500] shadow-lg'
                      : hasFlag
                      ? 'bg-[#121016] border-[#ff4444]/30 hover:border-[#ff4444]'
                      : 'bg-[#0e1017] border-[#202538] hover:border-[#ff5500]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-white">{client.athlete.name}</span>
                        {client.triageStatus.includes('injury_flagged') && (
                          <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase bg-[#ff4444] text-black rounded-sm">
                            INJURY
                          </span>
                        )}
                        {client.triageStatus.includes('low_adherence') && (
                          <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase bg-[#ffaa00] text-black rounded-sm">
                            ADHERENCE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">
                        Target: {client.targetRace.name}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black font-mono text-[#ccff00] block">
                        {client.raceReadinessScore}%
                      </span>
                      <span className="text-[9px] font-mono text-[#6b7280]">Readiness</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#6b7280] pt-3 mt-2 border-t border-[#1a1f2e]">
                    <span>Adherence: <strong className={client.weeklyAdherenceRatePercent < 75 ? 'text-[#ff4444]' : 'text-white'}>{client.weeklyAdherenceRatePercent}%</strong></span>
                    <span>Assess: <strong className="text-[#00e5ff]">{client.nextAssessmentDueDays}d</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CLIENT DETAIL & OVERRIDE CONTROLS (Right Column) */}
        {selectedClient && (
          <div className="lg:col-span-8 bg-[#0e1017] border border-[#242838] p-6 rounded-sm space-y-6">
            
            {/* Athlete Sub-Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202538]">
              <div>
                <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase tracking-wider block">
                  ATHLETE PROFILE #{selectedClient.athlete.id}
                </span>
                <h3 className="text-2xl font-black text-white uppercase">
                  {selectedClient.athlete.name}
                </h3>
                <div className="text-xs text-[#9ca3af] font-mono flex items-center gap-2 mt-0.5">
                  <span>Age: {selectedClient.athlete.age}</span>
                  <span>•</span>
                  <span>Goal: {selectedClient.targetRace.athleteGoal.replace(/_/g, ' ')}</span>
                  <span>•</span>
                  <span>Availability: {selectedClient.athlete.availableDays.length} days/wk</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSessionLocked(!isSessionLocked)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-sm border flex items-center gap-1.5 transition-all ${
                    isSessionLocked
                      ? 'bg-[#ff4444]/20 border-[#ff4444] text-[#ff4444]'
                      : 'bg-[#141824] border-[#222738] text-[#9ca3af] hover:text-white'
                  }`}
                >
                  {isSessionLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  {isSessionLocked ? 'Programming Locked' : 'Unlocked (AI Adaptive)'}
                </button>
              </div>
            </div>

            {/* Navigation Tabs for Coach */}
            <div className="flex flex-wrap border-b border-[#202538] gap-4">
              {(['profile', 'programming', 'overrides', 'messages', 'checkins', 'notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCoachTab(tab)}
                  className={`pb-2 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
                    activeCoachTab === tab
                      ? 'text-[#ff5500] border-[#ff5500]'
                      : 'text-[#6b7280] border-transparent hover:text-white'
                  }`}
                >
                  {tab === 'messages' ? <MessageSquare className="w-3.5 h-3.5" /> : tab === 'checkins' ? <CheckSquare className="w-3.5 h-3.5" /> : null}
                  <span>{tab === 'messages' ? '2-Way Chat' : tab === 'checkins' ? 'Weekly Check-Ins' : tab}</span>
                </button>
              ))}
            </div>

            {/* TAB: PROFILE & STRENGTHS/LIMITERS */}
            {activeCoachTab === 'profile' && (
              <div className="space-y-4 text-xs">
                
                {/* Flagged Issues Alert */}
                {selectedClient.flaggedNotes.length > 0 && (
                  <div className="p-3 bg-[#15121b] border border-[#ff4444]/40 rounded-sm text-xs font-mono text-[#ff8888] space-y-1">
                    <strong className="block text-white uppercase font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#ff4444]" /> Flagged Coaching Alert:
                    </strong>
                    <p>{selectedClient.flaggedNotes[0]}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ccff00] block">
                      Greatest Physiological Strengths:
                    </span>
                    <ul className="list-disc list-inside text-white font-semibold space-y-1">
                      {selectedClient.performanceProfile.greatestStrengths.slice(0, 3).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ff4444] block">
                      Primary Course Limiters:
                    </span>
                    <ul className="list-disc list-inside text-white font-semibold space-y-1">
                      {selectedClient.performanceProfile.primaryLimiters.slice(0, 3).map((l, idx) => (
                        <li key={idx}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00e5ff] block">
                    Available Equipment & Facilities:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClient.athlete.availableEquipment.map((eq, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#171b26] border border-[#272d3f] text-[#d1d5db] font-mono text-[10px] rounded-sm">
                        {eq.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: PROGRAMMING & WORKOUTS */}
            {activeCoachTab === 'programming' && (
              <div className="space-y-4 text-xs">
                <span className="text-xs font-mono font-bold uppercase text-[#ff5500] block">
                  Active Microcycle: Week 01 of {selectedClient.currentPlan.totalDurationWeeks}
                </span>

                <div className="space-y-3">
                  {selectedClient.currentPlan.mesocycles[0]?.weeks[0]?.sessions.map((sess) => (
                    <div key={sess.id} className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#ff5500] uppercase font-bold text-[10px]">{sess.dayOfWeek}</span>
                          <span className="text-white font-bold">{sess.name}</span>
                        </div>
                        <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">
                          {sess.mainExercises.map(e => e.exerciseName).join(' • ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Replaced exercise for ${sess.name}. New prescription pushed to client app.`)}
                          className="px-2.5 py-1 bg-[#171b26] hover:bg-[#222736] border border-[#282e40] text-xs font-mono text-white rounded-sm"
                        >
                          Modify Exercises
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: COACH OVERRIDE CONTROLS */}
            {activeCoachTab === 'overrides' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#ff5500] block">
                    Write Coach Override / Directive:
                  </span>
                  <textarea
                    rows={3}
                    value={overrideNote}
                    onChange={(e) => setOverrideNote(e.target.value)}
                    placeholder="Enter manual programming changes (e.g. Cut mileage by 15%, replace barbell squats with dumbbell split squats due to knee flare-up)..."
                    className="w-full bg-[#0a0c12] border border-[#242838] p-3 rounded-sm text-white font-mono text-xs focus:border-[#ff5500] focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleApplyOverride}
                      className="px-4 py-2 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-black text-xs uppercase clip-angled"
                    >
                      Apply Override to Live Plan
                    </button>
                  </div>
                </div>

                {/* Overrides Log */}
                {appliedOverrides.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono text-[#6b7280] uppercase font-bold">Applied Coach Overrides:</span>
                    {appliedOverrides.map((ovr) => (
                      <div key={ovr.id} className="p-3 bg-[#0a0c12] border border-[#202538] rounded-sm text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-[#ccff00]">
                          <span>DIRECTIVE LOGGED</span>
                          <span className="text-[#6b7280] text-[10px]">{new Date(ovr.appliedAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-white">{ovr.overrideValue}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: 2-WAY LIVE MESSAGING */}
            {activeCoachTab === 'messages' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white font-bold">
                    <MessageSquare className="w-4 h-4 text-[#ff5500]" />
                    <span>Direct Coaching Thread: {selectedClient.athlete.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#ccff00] bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Encrypted 1-on-1 Feed
                  </span>
                </div>

                {/* Message Bubble Feed */}
                <div className="h-64 overflow-y-auto p-4 rounded-sm bg-[#0a0c12] border border-[#202538] space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'coach' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center space-x-1.5 text-[10px] text-zinc-400 mb-1">
                        <span className="font-bold text-zinc-300">{msg.senderName}</span>
                        <span>•</span>
                        <span className="font-mono">{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg max-w-md text-xs leading-relaxed ${
                          msg.sender === 'coach'
                            ? 'bg-[#ff5500] text-black font-medium rounded-tr-none'
                            : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700'
                        }`}
                      >
                        {msg.messageText}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendCoachMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Message ${selectedClient.athlete.name}...`}
                    className="flex-1 bg-[#0a0c12] border border-[#202538] px-3 py-2 text-xs text-white rounded-sm focus:border-[#ff5500] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-black text-xs uppercase clip-angled flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>
              </div>
            )}

            {/* TAB: WEEKLY CHECK-INS */}
            {activeCoachTab === 'checkins' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#121520] border border-[#1e2332] rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#ccff00] block">
                      Athlete Weekly Submission (Sunday Review)
                    </span>
                    <span className="text-[10px] font-mono text-[#ffaa00] px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/40">
                      Pending Coach Review
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block">Adherence</span>
                      <span className="text-base font-bold font-mono text-[#ccff00]">92%</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block">Avg Sleep</span>
                      <span className="text-base font-bold font-mono text-white">7.8h</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block">Energy</span>
                      <span className="text-base font-bold font-mono text-sky-400">8 / 10</span>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block">Body Mass</span>
                      <span className="text-base font-bold font-mono text-amber-400">169.1 lbs</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="p-3 rounded bg-zinc-950/60 border border-zinc-800/80">
                      <strong className="text-emerald-400 block text-[11px] uppercase mb-0.5">Wins & Highlights:</strong>
                      <p className="text-zinc-300">"Nailed all compromised hill sprints on Wednesday and felt zero shoulder fatigue on the monkey bar rigs."</p>
                    </div>
                    <div className="p-3 rounded bg-zinc-950/60 border border-zinc-800/80">
                      <strong className="text-amber-400 block text-[11px] uppercase mb-0.5">Challenges & Roadblocks:</strong>
                      <p className="text-zinc-300">"Friday heavy sandbag carry burned my forearms out by 60 meters. Felt grip slipping on set 4."</p>
                    </div>
                  </div>

                  {/* Coach Check-in Review Response */}
                  <div className="pt-2 space-y-2">
                    <label className="block text-xs font-mono font-bold uppercase text-white">
                      Coach Weekly Review Feedback:
                    </label>
                    <textarea
                      rows={2}
                      value={coachCheckInReview}
                      onChange={(e) => setCoachCheckInReview(e.target.value)}
                      placeholder="Add coaching assessment feedback (e.g. Excellent aerobic consistency. Adding towel hangs to address the grip fatigue)..."
                      className="w-full bg-[#0a0c12] border border-[#202538] p-2.5 text-xs text-white rounded-sm focus:border-[#ff5500] focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        alert("Weekly Check-In Review and feedback pushed to athlete's mobile feed!");
                        setCoachCheckInReview('');
                      }}
                      className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-black text-xs uppercase clip-angled"
                    >
                      Approve & Send Review to Athlete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NOTES */}
            {activeCoachTab === 'notes' && (
              <div className="p-6 text-center bg-[#121520] border border-[#1e2332] rounded-sm space-y-2">
                <FileText className="w-8 h-8 text-[#ff5500] mx-auto" />
                <div className="text-white font-bold">Private Coaching Notes</div>
                <p className="text-[#9ca3af] text-xs max-w-sm mx-auto">
                  Athlete is responding positively to higher Zone 2 aerobic volume. Watch Achilles tendon on downhill segments.
                </p>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
