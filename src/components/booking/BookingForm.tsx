'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Flame, 
  Calendar, 
  Clock, 
  Send, 
  User, 
  Mail, 
  ShieldAlert, 
  Target 
} from 'lucide-react';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetRace: 'Spartan Beast (21K)',
    experience: 'Intermediate (Completed 1-2 races)',
    biggestBottleneck: 'Grip fatigue on multi-rigs / twister',
    timeSlot: 'Weekday Evening (6:00 PM - 8:00 PM EST)',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger athletic victory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5500', '#ccff00', '#ffffff', '#ff7733']
      });
    } catch {
      // Confetti fallback
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0e1017] border-2 border-[#ccff00] rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-[#ccff00]/10 border-2 border-[#ccff00] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#ccff00]" />
        </div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#ccff00]">
          APPLICATION RECEIVED
        </span>
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
          You Are On The Roster, {formData.name || 'Athlete'}!
        </h2>
        <p className="text-sm text-[#d1d5db] mt-3 leading-relaxed max-w-lg mx-auto">
          Coach will review your baseline metrics and {formData.targetRace} timeline. Check your inbox ({formData.email}) for your consultation calendar invite and your complimentary <strong>Burpee Elimination Technique Guide</strong>.
        </p>

        <div className="mt-8 pt-6 border-t border-[#1e2332] flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/guides"
            className="px-6 py-3 bg-[#181b26] hover:bg-[#202534] text-white font-mono font-bold uppercase text-xs tracking-wider border border-[#2d3346] rounded-sm transition-colors"
          >
            Explore Training Hub
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-bold uppercase text-xs tracking-wider clip-angled transition-colors"
          >
            Submit Another Intake
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0e1017] border border-[#242838] rounded-sm p-6 sm:p-10 shadow-2xl relative">
      <div className="mb-8 pb-4 border-b border-[#1c202d]">
        <span className="text-xs font-mono font-bold tracking-widest text-[#ff5500] uppercase flex items-center gap-1.5 mb-1">
          <Target className="w-3.5 h-3.5 text-[#ff5500]" /> Athlete Intake Form
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Apply For 1-on-1 OCR Coaching
        </h2>
        <p className="text-xs text-[#9ca3af] mt-1">
          Limited to 15 active roster athletes to ensure weekly custom video analysis and individual programming.
        </p>
      </div>

      <div className="space-y-6">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#ff5500]" /> Athlete Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#ff5500]" /> Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="alex@athlete.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm"
            />
          </div>
        </div>

        {/* Target Race & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#ff5500]" /> Target Race or Distance
            </label>
            <select
              value={formData.targetRace}
              onChange={(e) => setFormData({ ...formData, targetRace: e.target.value })}
              className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm font-sans"
            >
              <option>Spartan Sprint (5K)</option>
              <option>Spartan Super (10K)</option>
              <option>Spartan Beast (21K)</option>
              <option>Spartan Trifecta (All 3 Distances)</option>
              <option>Spartan Ultra (50K)</option>
              <option>Tough Mudder / OCRWC World Championship</option>
              <option>Hyrox / Deka Fit Hybrid Race</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#ff5500]" /> Current Experience Level
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm font-sans"
            >
              <option>First Time / Beginner (Zero races completed)</option>
              <option>Intermediate (Completed 1-3 Open heats)</option>
              <option>Experienced (Age Group competitive racer)</option>
              <option>Elite / Pro Contender</option>
            </select>
          </div>
        </div>

        {/* Biggest Bottleneck */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#ff5500]" /> What is your #1 obstacle or physical limitation?
          </label>
          <select
            value={formData.biggestBottleneck}
            onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
            className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm font-sans"
          >
            <option>Grip fatigue & failing late-course rigs / twisters</option>
            <option>Mountain running endurance & steep elevation climbs</option>
            <option>Wall climbs (7ft / 8ft walls unassisted)</option>
            <option>Severe calf / hamstring cramping after Mile 6</option>
            <option>Carrying heavy loads (sandbag, bucket) without redlining</option>
            <option>Spear throw accuracy & consistency</option>
          </select>
        </div>

        {/* Preferred Consultation Slot */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" /> Preferred Strategy Call Window (30 Mins)
          </label>
          <select
            value={formData.timeSlot}
            onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
            className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm font-sans"
          >
            <option>Weekday Morning (8:00 AM - 11:00 AM EST)</option>
            <option>Weekday Mid-day (12:00 PM - 2:00 PM EST)</option>
            <option>Weekday Evening (6:00 PM - 8:00 PM EST)</option>
            <option>Saturday Morning (9:00 AM - 1:00 PM EST)</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-[#d1d5db] mb-2">
            Target Race Date or Specific Goals (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Preparing for Spartan Beast Killington in September. Want to finish sub 4:30 with zero penalties."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3 bg-[#12141c] border border-[#232736] text-white rounded-sm focus:outline-none focus:border-[#ff5500] text-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-black uppercase text-sm tracking-wider clip-angled transition-all glow-orange flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit Coaching Application
          </button>
          <p className="text-[11px] text-center font-mono text-[#6b7280] mt-3">
            Zero commitment. 100% confidential. Coach will respond within 24 hours.
          </p>
        </div>
      </div>
    </form>
  );
}
