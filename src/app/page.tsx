import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  Timer, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  TrendingUp, 
  BookOpen,
  Target
} from 'lucide-react';
import { TRAINING_GUIDES } from '@/data/guidesData';
import { PROGRAM_TIERS, TESTIMONIALS } from '@/data/programsData';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden carbon-grid border-b border-[#242838]">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#ff5500]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#151822] border border-[#272d3e] text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              Spartan SGX & Hybrid Athletic Coaching
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter text-white uppercase font-sans leading-[1.05]">
              FORGE THE <span className="text-[#ff5500] text-glow-orange">UNBREAKABLE</span> OBSTACLE COURSE RACING ENGINE
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-[#9ca3af] max-w-2xl mx-auto leading-relaxed">
              Stop failing rigs and doing burpees with gassed legs. Science-backed periodization, bulletproof grip conditioning, and obstacle technique mastery for Spartan, Tough Mudder, and Championship podium racers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/generator"
                className="w-full sm:w-auto px-8 py-4 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-black uppercase text-sm tracking-wider clip-angled transition-all glow-orange flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Generate Custom Workout Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quiz"
                className="w-full sm:w-auto px-8 py-4 bg-[#141722] hover:bg-[#1c202e] text-white font-mono font-bold uppercase text-sm tracking-wider border border-[#282f42] rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Take Readiness Quiz</span>
              </Link>
            </div>

            {/* Fast Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-[#1e2332] max-w-4xl mx-auto text-left">
              <div className="p-4 bg-[#0e1017]/80 border border-[#202535] rounded-sm">
                <div className="text-2xl sm:text-3xl font-mono font-black text-white">98.4%</div>
                <div className="text-[11px] font-mono text-[#ff5500] uppercase tracking-wider mt-0.5">Finish Rate</div>
              </div>
              <div className="p-4 bg-[#0e1017]/80 border border-[#202535] rounded-sm">
                <div className="text-2xl sm:text-3xl font-mono font-black text-[#ccff00]">120+</div>
                <div className="text-[11px] font-mono text-[#9ca3af] uppercase tracking-wider mt-0.5">Podium Finishes</div>
              </div>
              <div className="p-4 bg-[#0e1017]/80 border border-[#202535] rounded-sm">
                <div className="text-2xl sm:text-3xl font-mono font-black text-white">0</div>
                <div className="text-[11px] font-mono text-[#ff5500] uppercase tracking-wider mt-0.5">Burpees on Clean Runs</div>
              </div>
              <div className="p-4 bg-[#0e1017]/80 border border-[#202535] rounded-sm">
                <div className="text-2xl sm:text-3xl font-mono font-black text-white">100%</div>
                <div className="text-[11px] font-mono text-[#ccff00] uppercase tracking-wider mt-0.5">Customized Coaching</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE 3 PILLARS OF OBSTACLE COURSE RACING DOMINATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ff5500] uppercase">
            The Performance System
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            The 3 Pillars of Obstacle Course Racing Domination
          </h2>
          <p className="text-sm text-[#9ca3af] mt-2">
            Most athletes train for obstacle course racing like traditional road running. We train the specific physiological adaptations required when heart rates spike to 175 BPM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-[#0e1017] border border-[#242838] p-8 rounded-sm hover:border-[#ff5500] transition-colors group relative overflow-hidden">
            <div className="w-12 h-12 bg-[#ff5500]/10 border border-[#ff5500] rounded-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-[#ff5500]" />
            </div>
            <span className="text-[11px] font-mono text-[#ff5500] font-bold uppercase tracking-wider">Pillar 01</span>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mt-1 mb-3">
              The Aerobic Mountain Engine
            </h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Zone 2 mitochondrial base conditioning combined with mountain power-hiking protocols. Build the cardiovascular capacity to flush lactate while continuing to run 7:30-minute miles.
            </p>
            <div className="mt-6 pt-4 border-t border-[#1c202d]">
              <Link href="/guides/trail-running-and-hills" className="text-xs font-mono font-bold uppercase text-white hover:text-[#ff5500] flex items-center gap-1">
                Read Mountain Guide <ChevronRight className="w-3.5 h-3.5 text-[#ff5500]" />
              </Link>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#0e1017] border border-[#242838] p-8 rounded-sm hover:border-[#ccff00] transition-colors group relative overflow-hidden">
            <div className="w-12 h-12 bg-[#ccff00]/10 border border-[#ccff00] rounded-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-[#ccff00]" />
            </div>
            <span className="text-[11px] font-mono text-[#ccff00] font-bold uppercase tracking-wider">Pillar 02</span>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mt-1 mb-3">
              Bulletproof Grip & Rigs
            </h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              70% of race penalties happen on late-race multi-rigs. We train active scapular dead hangs, towel pull-ups, and kinetic hip-swing momentum so you fly through monkey bars with zero arm pump.
            </p>
            <div className="mt-6 pt-4 border-t border-[#1c202d]">
              <Link href="/guides/grip-and-rig-dominance" className="text-xs font-mono font-bold uppercase text-white hover:text-[#ccff00] flex items-center gap-1">
                Read Grip Guide <ChevronRight className="w-3.5 h-3.5 text-[#ccff00]" />
              </Link>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#0e1017] border border-[#242838] p-8 rounded-sm hover:border-[#ff7733] transition-colors group relative overflow-hidden">
            <div className="w-12 h-12 bg-[#ff7733]/10 border border-[#ff7733] rounded-sm flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-[#ff7733]" />
            </div>
            <span className="text-[11px] font-mono text-[#ff7733] font-bold uppercase tracking-wider">Pillar 03</span>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight mt-1 mb-3">
              Zero-Penalty Obstacle Tech
            </h3>
            <p className="text-sm text-[#9ca3af] leading-relaxed">
              Heel-hook pops for 8-foot walls, effortless J-Hook rope locks, and 3-point spear throw accuracy. Save 10+ minutes per race by never performing a single penalty burpee or loop.
            </p>
            <div className="mt-6 pt-4 border-t border-[#1c202d]">
              <Link href="/guides/obstacle-mastery" className="text-xs font-mono font-bold uppercase text-white hover:text-[#ff7733] flex items-center gap-1">
                Read Obstacle Guide <ChevronRight className="w-3.5 h-3.5 text-[#ff7733]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED "HOW TO TRAIN EFFECTIVELY" GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase">
              Knowledge Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
              How to Train Effectively for Obstacle Course Racing
            </h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              Actionable guides written by Spartan SGX Certified Coaches.
            </p>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#ff5500] hover:text-white transition-colors"
          >
            <span>View All 5 Training Pillars</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAINING_GUIDES.slice(0, 3).map((guide) => (
            <div
              key={guide.id}
              className="bg-[#0c0e14] border border-[#222736] rounded-sm p-6 flex flex-col justify-between hover:border-[#ff5500] transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#181b26] text-[#ccff00] border border-[#2b3145] rounded-sm">
                    {guide.category}
                  </span>
                  <span className="text-xs font-mono text-[#9ca3af]">{guide.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ff5500] transition-colors leading-snug">
                  <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
                </h3>
                <p className="text-xs text-[#9ca3af] mt-2 line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1b1e2b] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6b7280]">Difficulty: {guide.difficulty}</span>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="text-xs font-mono font-bold uppercase text-[#ff5500] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Read Blueprint →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ATHLETE TOOLS BANNER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-sm bg-gradient-to-r from-[#12151f] via-[#0f1118] to-[#12151f] border border-[#272e42] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-bold uppercase bg-[#202638] text-[#ff5500] border border-[#303952] rounded-sm">
                <Target className="w-3.5 h-3.5 text-[#ff5500]" /> 5-Minute Assessment Tool
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Where Is Your Critical Race Bottleneck?
              </h2>
              <p className="text-sm text-[#9ca3af] leading-relaxed max-w-xl">
                Take our interactive 5-question Race Readiness Quiz. We analyze your grip time, 1-mile pace, and pull-up capacity to calculate your exact readiness score and pinpoint why you might be failing obstacles.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/quiz"
                  className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-bold uppercase text-xs tracking-wider clip-angled transition-colors glow-orange-sm"
                >
                  Start Assessment Now
                </Link>
                <Link
                  href="/timer"
                  className="px-6 py-3 bg-[#181b26] hover:bg-[#222637] text-white font-mono font-bold uppercase text-xs tracking-wider border border-[#2d3448] rounded-sm transition-colors flex items-center gap-2"
                >
                  <Timer className="w-4 h-4 text-[#ccff00]" /> Try Obstacle Course Racing WOD Timer
                </Link>
              </div>
            </div>

            <div className="bg-[#0a0c10] p-6 rounded-sm border border-[#222736] space-y-3">
              <div className="text-xs font-mono font-bold uppercase text-[#9ca3af]">Quick Benchmark Standards</div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-[#1b1e2a]">
                <span className="text-[#d1d5db]">Active Dead Hang</span>
                <span className="font-mono text-[#ccff00] font-bold">2:30 Min (Elite)</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-[#1b1e2a]">
                <span className="text-[#d1d5db]">Strict Pull-Ups</span>
                <span className="font-mono text-[#ff7733] font-bold">12+ Reps (Age Group)</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2">
                <span className="text-[#d1d5db]">50lb Bucket 100m</span>
                <span className="font-mono text-white font-bold">&lt; 45s (Podium)</span>
              </div>
              <Link href="/benchmarks" className="block text-center text-xs font-mono font-bold uppercase text-[#ff5500] hover:underline pt-2">
                View All Standards & Calculator →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROGRAMS & COACHING TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ff5500] uppercase">
            Structured Protocols
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            Choose Your Race Preparation Pathway
          </h2>
          <p className="text-sm text-[#9ca3af] mt-2">
            Whether you want a downloadable 8-week blueprint or 1-on-1 weekly adaptive coaching with custom video reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROGRAM_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-sm p-8 flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? 'bg-[#12141c] border-2 border-[#ff5500] shadow-xl shadow-[#ff5500]/10'
                  : 'bg-[#0d0f15] border border-[#222736]'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-[#ff5500] text-black font-mono font-black text-[11px] uppercase tracking-wider clip-angled">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {tier.name}
                  </h3>
                </div>
                <p className="text-xs text-[#9ca3af] min-h-[36px]">
                  {tier.tagline}
                </p>

                <div className="my-6 pb-6 border-b border-[#1e2332]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-mono font-black text-white">{tier.price}</span>
                    <span className="text-xs font-mono text-[#9ca3af]">/{tier.period}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#ccff00] mt-1">
                    Ideal for: {tier.idealFor}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase text-[#d1d5db] tracking-wider block">
                    What You Get:
                  </span>
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#9ca3af]">
                      <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#1e2332]">
                <Link
                  href="/booking"
                  className={`w-full py-3.5 uppercase font-bold text-xs tracking-wider rounded-sm text-center block transition-all clip-angled ${
                    tier.isPopular
                      ? 'bg-[#ff5500] hover:bg-[#ff6a00] text-black glow-orange-sm'
                      : 'bg-[#181b26] hover:bg-[#202534] text-white border border-[#2b3245]'
                  }`}
                >
                  Enroll / Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ATHLETE RESULTS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase">
            Proven Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            Burpee-Free Finishes & Podium PRs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-[#0e1017] border border-[#232737] p-6 rounded-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#181b26] text-[#ff5500] border border-[#2b3145] rounded-sm">
                    {t.metric}
                  </span>
                  <Trophy className="w-4 h-4 text-[#ccff00]" />
                </div>
                <p className="text-xs text-[#d1d5db] italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#1a1e2b]">
                <div className="font-bold text-sm text-white">{t.name}</div>
                <div className="text-[11px] font-mono text-[#9ca3af]">{t.race}</div>
                <div className="text-[10px] font-mono text-[#ccff00]">{t.result}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-sm bg-gradient-to-b from-[#181c28] to-[#0d0f15] border-2 border-[#ff5500] text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="w-14 h-14 bg-[#ff5500] rounded-sm clip-angled flex items-center justify-center mx-auto mb-2">
            <Flame className="w-7 h-7 text-black fill-black" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Ready to Dominate Your Next Starting Coral?
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] max-w-xl mx-auto">
            Stop leaving obstacles to luck. Get customized periodization and video technique coaching tailored to your upcoming race course.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/booking"
              className="px-8 py-4 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-black uppercase text-sm tracking-wider clip-angled transition-all glow-orange"
            >
              Apply for 1-on-1 Coaching
            </Link>
            <Link
              href="/quiz"
              className="px-8 py-4 bg-[#11131a] hover:bg-[#181c28] text-white font-mono font-bold uppercase text-sm tracking-wider border border-[#2b3348] rounded-sm transition-colors"
            >
              Take Race Readiness Quiz
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
