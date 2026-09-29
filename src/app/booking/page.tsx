import React from 'react';
import BookingForm from '@/components/booking/BookingForm';
import { Target, CheckCircle2, ShieldCheck, Trophy, PhoneCall } from 'lucide-react';

export const metadata = {
  title: 'Apply for 1-on-1 OCR Coaching | GRIT OCR',
  description: 'Book your 30-minute athlete intake consultation and get customized periodization for your next race.',
};

export default function BookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ff5500] rounded-sm">
          <PhoneCall className="w-3.5 h-3.5" /> Direct Coach Access
        </div>
        <h1 className="text-4xl sm:text-5xl font-black italic tracking-tight text-white uppercase font-sans">
          ATHLETE <span className="text-[#ff5500]">APPLICATION</span>
        </h1>
        <p className="text-sm text-[#9ca3af]">
          Apply for 1-on-1 personalized OCR periodization, bi-weekly video technique analysis, and race-day tactical execution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
        
        {/* Left Side: Intake Form (8 cols) */}
        <div className="lg:col-span-8">
          <BookingForm />
        </div>

        {/* Right Side: What to expect (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0e1017] border border-[#242838] p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase text-[#ccff00] tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" /> What Happens Next
            </h3>
            
            <div className="space-y-4 text-xs text-[#9ca3af]">
              <div className="flex gap-3">
                <span className="font-mono font-bold text-white text-sm">01.</span>
                <div>
                  <strong className="text-white block mb-0.5">Application Review</strong>
                  Coach reviews your target race distance, current pacing, and bottleneck obstacles.
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-mono font-bold text-white text-sm">02.</span>
                <div>
                  <strong className="text-white block mb-0.5">30-Min Strategy Call</strong>
                  We map out your 8-week or 12-week macrocycle and benchmark milestones.
                </div>
              </div>

              <div className="flex gap-3">
                <span className="font-mono font-bold text-white text-sm">03.</span>
                <div>
                  <strong className="text-white block mb-0.5">Training App Onboarding</strong>
                  Access your daily workouts, video upload portal, and heart-rate tracking setup.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#12141c] border border-[#202535] p-6 rounded-sm text-xs space-y-3">
            <span className="font-mono font-bold uppercase text-[#ff5500] tracking-wider block">
              Athlete Requirement
            </span>
            <p className="text-[#9ca3af] leading-relaxed">
              We only accept athletes committed to logging their workouts and following safe progressive overload. No egos, no cutting corners on race-day technique.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
