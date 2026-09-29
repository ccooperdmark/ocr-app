'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  X, 
  ChevronRight, 
  Flame, 
  Zap, 
  Info,
  Activity,
  Heart
} from 'lucide-react';
import { athleteStorage } from '@/services/storage/athleteStorageService';
import { useExperienceTier } from '@/context/ExperienceTierContext';

interface AiCoachAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSessionName?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isMedicalAlert?: boolean;
}

const INJURY_KEYWORDS = [
  'pain', 'hurt', 'sharp', 'ache', 'sprain', 'tear', 'pop', 
  'swollen', 'inflamed', 'injury', 'dislocate', 'tendonitis', 'impingement', 'numb'
];

export default function AiCoachAssistantDrawer({
  isOpen,
  onClose,
  activeSessionName = "Compromised Trail Engine & Grip Gauntlet"
}: AiCoachAssistantDrawerProps) {
  const { tier, isBasic, isIntermediate, isAdvanced } = useExperienceTier();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: isBasic 
        ? `Hello Alex! I am your AI personal training assistant. I'm here to help guide your daily workouts, exercise setup, and simple nutrition. How can I help you today?`
        : isIntermediate
        ? `Hello Alex! I am your AI Performance Coach. I am tracking your training phases, progress trends, recovery markers, and upcoming race countdown. What would you like insight on?`
        : `Hello Alex! I am your GRIT AI Performance Coach. I am actively tracking your 12 OCR Performance Domains, recent RPE scores, and your target Spartan Beast preparation. How can I assist your training today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  // Tier-Specific Prompt Pills
  const suggestedPrompts = isBasic 
    ? [
        'What am I doing today?',
        'How do I perform this exercise?',
        'What should I eat before training?',
        'What weight should I use?',
        'Why did my workout change?'
      ]
    : isIntermediate
    ? [
        'Why did my training load increase?',
        'What am I improving?',
        'Which fitness area needs more work?',
        'Why am I doing this training phase?',
        'How should I fuel my long workout?'
      ]
    : [
        'Why did you increase my weekly running volume?',
        'Why did my interval volume remain unchanged?',
        'What physiological quality is this workout targeting?',
        'Which OCR performance domain is currently limiting me?',
        'Why did my readiness change?',
        'How does this mesocycle prepare me for my race?'
      ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Check for Medical / Pain keywords
    const lower = query.toLowerCase();
    const detectedInjury = INJURY_KEYWORDS.some(kw => lower.includes(kw));

    setTimeout(() => {
      let aiReply: ChatMessage;

      if (detectedInjury || lower.includes('eating disorder') || lower.includes('kidney') || lower.includes('diabetes')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `SAFETY & CLINICAL DISCLAIMER: I detected terms relating to medical pathology or clinical conditions. As an AI sports performance coach, I operate strictly within athletic conditioning and general sports nutrition science. I CANNOT diagnose, prescribe medical nutrition therapy (MNT), or treat clinical conditions. 

Action Recommended:
1. For injury/pain: Halt aggravating loads and consult a Physical Therapist (DPT) or Sports Medicine Physician.
2. For clinical nutrition or metabolic concerns: Work directly with a licensed Registered Dietitian (RD/CSSD) or Endocrinologist.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMedicalAlert: true
        };
      } else if (lower.includes('why did my workout change') || lower.includes('adaptation') || lower.includes('why did it change')) {
        if (isBasic) {
          aiReply = {
            id: `ai_${Date.now()}`,
            sender: 'ai',
            text: `Your workout was adjusted based on your recent training to help you recover well and continue progressing safely.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        } else if (isIntermediate) {
          aiReply = {
            id: `ai_${Date.now()}`,
            sender: 'ai',
            text: `Your workout was adjusted based on your logged session feedback. Your training load increased slightly as part of your current endurance progression while preserving joint health.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        } else {
          const latestAdapt = athleteStorage.getAdaptations()[0];
          aiReply = {
            id: `ai_${Date.now()}`,
            sender: 'ai',
            text: latestAdapt 
              ? `Autonomous AI Adaptation Analysis:
• Status: ${latestAdapt.confidenceScore} Confidence (${latestAdapt.adaptationType.replace('_', ' ').toUpperCase()})
• Reason: ${latestAdapt.plainLanguageExplanation}
• Trigger: ${latestAdapt.triggerMetric}
• Affected Exercises: ${latestAdapt.affectedExercises ? latestAdapt.affectedExercises.join(', ') : 'Primary Mesocycle Load'}
Deterministic safety guardrails verify all volume progressions stay under +8% weekly.`
              : `Your workouts follow your current Specific Base & Grip Capacity mesocycle. When you log workouts with RPE ≤ 7.5, progressive overload (+5 lbs) triggers automatically.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
      } else if (lower.includes('what am i doing today') || lower.includes('what am i training today')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isBasic
            ? `Today's workout is ${activeSessionName}. You will do a warm-up, followed by your main strength and endurance exercises, and finish with a relaxing cooldown.`
            : `Today you have ${activeSessionName}. Target focus is moderate aerobic adaptation combined with upper body pulling volume. Keep rest periods under 90 seconds.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('what weight should i use') || lower.includes('increase my weight') || lower.includes('overload')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isBasic
            ? `Choose a weight where you can complete all prescribed repetitions with good form. You should feel challenged, but feel like you could perform 1 or 2 more reps if needed.`
            : isIntermediate
            ? `Target RPE 7-8 (2 Reps in Reserve). If you complete all sets cleanly with no form breakdown, increase the load by 2.5–5 lbs on your next session.`
            : `Autonomous Overload Directive: If all sets hit target tempo with RPE ≤ 7.5 and RIR ≥ 2, apply progressive overload of +2.5% to +5% for next microcycle. If technical failure occurs, hold tonnage constant.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('what should i eat') || lower.includes('fuel my long workout') || lower.includes('nutrition')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isBasic
            ? `Eat a wholesome meal with carbs (such as oatmeal, rice, or a banana) 1-2 hours before training. Drink plenty of water throughout the day.`
            : isIntermediate
            ? `Pre-Workout (60-90 min prior): 40-50g easily digestible carbs + 20g protein. Hydrate with 16-20 oz water. For workouts over 60 minutes, have an energy chew or hydration mix handy.`
            : `Metabolic Fueling Protocol: Target 1.2g/kg CHO in the 2-hour pre-training window. If high CNS/glycolytic demand, supplement 30g branched cyclic dextrin intra-workout with 450mg sodium. Post-workout: 0.4g/kg protein + 0.8g/kg CHO.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('why did you increase my weekly running volume') || lower.includes('running volume')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isBasic
            ? `Your running plan progressed this week.`
            : isIntermediate
            ? `Your weekly running volume increased slightly as part of your current endurance progression.`
            : `Weekly running volume increased 7%, while high-intensity running volume remained stable. This protects aerobic decoupling threshold while expanding mitochondrial density.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('what am i improving') || lower.includes('which fitness area')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isIntermediate
            ? `Your Grip Stamina (+12%) and Pulling Strength (+8.5%) are improving quickly! Your primary area to develop next is Work Capacity (Compromised Running)—maintaining run pace right after loaded carries.`
            : `Diagnostics show Domain 5 (Grip) and Domain 4 (Max Strength) leading at 88/100 and 85/100. Primary limiter: Transition Velocity Drop (+23% decay) in Compromised Locomotion.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('why am i doing this training phase') || lower.includes('mesocycle')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isIntermediate
            ? `You are in Strength Endurance (Week 4 of 8). This phase builds the muscular stamina and grip durability you need so your forearms don't fail when reaching the obstacle rigs.`
            : `Current Mesocycle: Strength Endurance & Hill Durability. Targets capillary density in type I and IIa fibers, elevation vert clearance, and isometric forearm lactate threshold prior to the Week 9 Race Simulation block.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('why did my readiness change') || lower.includes('readiness')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isIntermediate
            ? `Your readiness is currently 86/100 (Optimal). Your 7.8 hours of sleep and low muscle soreness mean your body has absorbed recent training stress and is ready for today's session.`
            : `Daily Readiness: 86/100. Breakdown: Sleep Score 26/30 (7.8h), Soreness Score 22/25 (2/5 rating), Workload Stress 21/25 (ACWR 1.08), Biometrics 17/20 (RHR 51 BPM, HRV 62ms). Proceed with 100% planned volume.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('sweat') || lower.includes('hydration')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Hydration & Sweat Rate Science for OCR:
• Dehydration exceeding 2.0% body weight causes steep decays in grip endurance and cardiac drift (heart rate rises while pace slows).
• Recommended protocol: Run our built-in 60-Minute Sweat Rate Test (Dry Pre-Weight - Dry Post-Weight + Fluid Drank).
• Most athletes lose 1.0 to 1.8 Liters of sweat per hour containing 800-1200mg sodium. Replace 80-90% of this hourly volume during long weekend trail simulations.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('carb') || lower.includes('target higher') || lower.includes('macro')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Carbohydrate Periodization Breakdown:
• Today's session places High Demands on muscle glycogen due to heavy carries and lactate threshold trail intervals.
• We scale carbohydrates up to ~6.0 g/kg (340-380g) today so your Type II motor units have immediate glucose substrate.
• On Rest / Active Recovery days, your carb target drops to 2.5-3.5 g/kg while protein elevates to 2.2 g/kg to maximize tissue remodeling and cellular recovery.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('today') || lower.includes('workout') || lower.includes('session')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Today's session "${activeSessionName}" is designed around concurrent lactate clearance and dynamic grip stamina. 

Why it's in your Beast plan:
1. Running with pre-fatigued forearms simulates miles 8–12 of a Spartan Beast when your grip is occluded from mud climbs.
2. The 90s rest intervals force rapid hydrogen ion buffering, directly raising your anaerobic threshold.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('nutrition') || lower.includes('fuel') || lower.includes('eat') || lower.includes('beast')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Spartan Beast (21K) Fueling Protocol:
• 36-48h Prior: Carbo-load at 8-10 g/kg/day (white rice, bagels, cream of rice, low fiber).
• Morning-of (3-4h prior): 2.0g carbs/kg (e.g. 2 bagels with jam + banana + 500ml electrolyte water), < 10g fat.
• T-15m Corral: 1 energy gel with 150ml water.
• In-Race: Target 60-80g carbs/hr (2:1 maltodextrin-to-fructose ratio) + 600-800ml fluid/hr + 600-900mg sodium/hr. Sip fuel every 20 minutes from mile 1!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('spear') || lower.includes('throw')) {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: `Spear Throw mastery standard:
1. Clear the tether cord completely over the barricade fence before lifting the spear.
2. Find the center-of-gravity pivot point across your index finger; grip 1 inch behind it.
3. Keep throwing elbow high and drive linear like a dart—do not throw side-arm like a baseball. Take two deep belly breaths to lower HR before releasing.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        aiReply = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: isBasic
            ? `I am here to guide your workouts and nutrition. Let me know if you need help with an exercise, what to eat, or today's schedule!`
            : isIntermediate
            ? `I have analyzed your profile. Your training consistency is 94% and you are on track for your target goals. Feel free to ask about your workouts, training phases, nutrition, or recovery.`
            : `Based on your current 52.4 VO2max and 88/100 Grip score: Your aerobic ceiling is sufficient for an Age Group podium. The highest leverage improvement is reducing your compromised pace decay when transitioning from heavy carries to trail running. Maintain consistent Zone 2 base volume while keeping RPE at 7/10.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1017] border-l-2 border-[#ff5500] h-full shadow-2xl flex flex-col">
        
        {/* DRAWER HEADER */}
        <div className="p-4 sm:p-5 bg-[#121520] border-b border-[#242838] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#ff5500] flex items-center justify-center text-black">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-black text-white uppercase font-sans">
                  GRIT AI Performance Coach
                </h3>
                <span className="px-1.5 py-0.2 bg-[#1e2334] text-[#ccff00] text-[9px] font-mono font-bold uppercase rounded-sm border border-[#2b334a]">
                  Evidence-Informed
                </span>
              </div>
              <p className="text-[11px] text-[#9ca3af] font-mono">
                Context: Alex Morgan • Beast Plan • RPE History Active
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9ca3af] hover:text-white rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QUICK ACTION PROMPT PILLS */}
        <div className="p-3 bg-[#0a0c10] border-b border-[#1c202d] flex flex-wrap gap-1.5 shrink-0">
          {[
            'Why did my workout change?',
            'What am I training today?',
            'Should I increase my weight?',
            'What if I missed yesterday?',
            'Explain my weekly review',
            'Pre & Post Fueling Advice',
            'Spear Throw Technique Cues'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 bg-[#141724] hover:bg-[#1f2438] text-[#ccff00] border border-[#242b40] rounded-sm text-[10px] font-mono font-bold transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* CONVERSATION STREAM */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isAi ? 'items-start' : 'items-end justify-end'}`}
              >
                {isAi && (
                  <div className="w-6 h-6 rounded-full bg-[#181c28] border border-[#2a3246] text-[#ff5500] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3.5 rounded-sm space-y-1 ${
                    m.isMedicalAlert
                      ? 'bg-[#210f13] border-l-4 border-[#ff3333] text-[#ff9999]'
                      : isAi
                      ? 'bg-[#121520] border border-[#242838] text-[#d1d5db]'
                      : 'bg-[#ff5500] text-black font-bold ml-auto'
                  }`}
                >
                  {m.isMedicalAlert && (
                    <div className="flex items-center gap-1.5 text-[#ff4444] font-mono font-black text-[10px] uppercase mb-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Clinical Safety Guardrail Triggered
                    </div>
                  )}
                  <p className="whitespace-pre-line leading-relaxed text-[11px] font-sans">
                    {m.text}
                  </p>
                  <span className={`text-[9px] font-mono block text-right mt-1 ${isAi ? 'text-[#6b7280]' : 'text-black/70'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-[#9ca3af] text-[11px] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00] animate-spin" />
              <span>Analyzing physiological demands and workout telemetry...</span>
            </div>
          )}
        </div>

        {/* INPUT FORM */}
        <div className="p-4 bg-[#121520] border-t border-[#242838] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about workout rationale, obstacle technique, pacing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#090b10] border border-[#242838] text-white text-xs font-mono rounded-sm outline-none focus:border-[#ff5500] placeholder-[#6b7280]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2 bg-[#ff5500] hover:bg-[#e04b00] disabled:bg-[#333] disabled:text-[#777] text-black font-mono text-xs font-black uppercase rounded-sm flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
          <div className="text-[10px] text-[#6b7280] font-mono mt-1.5 flex items-center justify-between">
            <span>Powered by GRIT Biomechanical Reasoning</span>
            <span className="text-[#ff5500]">Strict medical safety active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
