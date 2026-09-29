import React from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck, Mail, MapPin, Trophy, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-[#1c202d] text-[#9ca3af] relative overflow-hidden">
      {/* Background Subtle Orange Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ff5500]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#ff5500] rounded-sm clip-angled">
                <Flame className="w-5 h-5 text-black fill-black" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white uppercase font-sans">
                GRIT<span className="text-[#ff5500]">.</span>OCR
              </span>
            </Link>
            <p className="text-sm text-[#9ca3af] leading-relaxed max-w-sm">
              Science-backed personal training, periodization, and obstacle technique coaching for Spartan Race, Tough Mudder, and Championship hybrid athletes.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold bg-[#12151e] border border-[#232737] rounded text-[#d1d5db]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff5500]" /> Spartan SGX L2
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold bg-[#12151e] border border-[#232737] rounded text-[#d1d5db]">
                <Trophy className="w-3.5 h-3.5 text-[#ccff00]" /> OCRWC Qualifier Coach
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#ff5500] pl-2">
              Training Hub
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/guides/grip-and-rig-dominance" className="hover:text-white transition-colors flex items-center gap-1">
                  Grip & Rig Mastery <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
                </Link>
              </li>
              <li>
                <Link href="/guides/trail-running-and-hills" className="hover:text-white transition-colors flex items-center gap-1">
                  Trail & Hill Engine <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
                </Link>
              </li>
              <li>
                <Link href="/guides/obstacle-mastery" className="hover:text-white transition-colors flex items-center gap-1">
                  Zero Burpee Obstacles <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
                </Link>
              </li>
              <li>
                <Link href="/guides/periodization-and-taper" className="hover:text-white transition-colors flex items-center gap-1">
                  12-Week Periodization <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
                </Link>
              </li>
              <li>
                <Link href="/guides/race-day-fueling-and-gear" className="hover:text-white transition-colors flex items-center gap-1">
                  Race-Day Fueling & Gear <ArrowUpRight className="w-3 h-3 text-[#6b7280]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Athlete Tools */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#ccff00] pl-2">
              Athlete Tools
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/races" className="hover:text-[#ccff00] text-white font-medium transition-colors">
                  Race Styles Guide (Spartan vs Mudder)
                </Link>
              </li>
              <li>
                <Link href="/generator" className="hover:text-white transition-colors">
                  Custom Workout Generator
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Race Readiness Quiz
                </Link>
              </li>
              <li>
                <Link href="/timer" className="hover:text-white transition-colors">
                  OCR WOD & Interval Timer
                </Link>
              </li>
              <li>
                <Link href="/benchmarks" className="hover:text-white transition-colors">
                  Fitness Benchmark Standards
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Coaching Programs & Pricing
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#ff5500] transition-colors font-medium">
                  Apply for 1-on-1 Coaching
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Location */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#ff5500] pl-2">
              Coaching HQ
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <span>Remote Worldwide Coaching & Field Clinics</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>coach@gritocr-performance.com</span>
              </div>
              <div className="pt-2">
                <Link 
                  href="/booking" 
                  className="inline-block px-3.5 py-1.5 bg-[#151822] hover:bg-[#1f2433] text-xs font-bold uppercase tracking-wider text-white border border-[#2b3044] rounded-sm transition-colors"
                >
                  Schedule Athlete Intake →
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#181b24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} GRIT OCR ATHLETIC PERFORMANCE. All rights reserved.</p>
          <p className="text-[#6b7280]">
            Spartan, Tough Mudder, and OCRWC are trademarks of their respective owners and not officially affiliated.
          </p>
        </div>
      </div>
    </footer>
  );
}
