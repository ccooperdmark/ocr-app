'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TRAINING_GUIDES, TrainingGuide } from '@/data/guidesData';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Layers 
} from 'lucide-react';

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Grip & Upper Body', 'Endurance & Mountain', 'Obstacle Technique', 'Periodization', 'Race-Day Fueling'];

  const filteredGuides = TRAINING_GUIDES.filter((guide) => {
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141722] border border-[#23293a] text-xs font-mono font-bold uppercase tracking-widest text-[#ccff00] rounded-sm">
          <BookOpen className="w-3.5 h-3.5" /> Spartan & Hybrid Masterclass
        </div>
        <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase font-sans">
          HOW TO TRAIN <span className="text-[#ff5500]">EFFECTIVELY</span> FOR OCR
        </h1>
        <p className="text-base text-[#9ca3af] leading-relaxed">
          The comprehensive training science, biomechanics, and periodization frameworks needed to conquer obstacles, eliminate burpee penalties, and finish injury-free.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ff5500] text-black clip-angled font-black'
                    : 'bg-[#101219] text-[#9ca3af] border border-[#222736] hover:text-white hover:border-[#353c52]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#6b7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, drills, walls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0e1017] border border-[#222736] text-white rounded-sm text-xs font-mono focus:outline-none focus:border-[#ff5500]"
            />
          </div>

        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-[#0e1017] border border-[#242838] hover:border-[#ff5500] rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all group relative overflow-hidden"
          >
            {/* Top Tag & Stats */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#181c28] text-[#ccff00] border border-[#2c3349] rounded-sm">
                  {guide.category}
                </span>
                <div className="flex items-center gap-3 text-xs font-mono text-[#9ca3af]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ff5500]" /> {guide.readTime}
                  </span>
                  <span>•</span>
                  <span>{guide.difficulty}</span>
                </div>
              </div>

              <h2 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#ff5500] transition-colors mt-2">
                <Link href={`/guides/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h2>

              <p className="text-xs font-mono text-[#ff7733] mt-1">
                {guide.subtitle}
              </p>

              <p className="text-sm text-[#9ca3af] mt-4 leading-relaxed line-clamp-3">
                {guide.summary}
              </p>

              {/* Key Takeaways preview */}
              <div className="mt-5 space-y-1.5 border-t border-[#181b26] pt-4">
                <span className="text-[11px] font-mono font-bold uppercase text-[#d1d5db] tracking-wider block">
                  Core Learnings:
                </span>
                {guide.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                  <div key={i} className="text-xs text-[#9ca3af] flex items-start gap-2">
                    <span className="text-[#ccff00] font-bold">›</span>
                    <span className="line-clamp-1">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Read Link */}
            <div className="mt-8 pt-4 border-t border-[#1a1e2b] flex items-center justify-between">
              <span className="text-xs font-mono text-[#6b7280]">
                {guide.sections.length} Technical Sections + Interactive Drills
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="px-4 py-2 bg-[#181b26] group-hover:bg-[#ff5500] group-hover:text-black text-white font-mono font-bold uppercase text-xs tracking-wider rounded-sm transition-all flex items-center gap-1.5"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 bg-[#12141c] border border-[#232736] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white uppercase tracking-tight">
            Need a Customized 12-Week Periodized Schedule?
          </h3>
          <p className="text-xs text-[#9ca3af] mt-1">
            Our certified coaches build your calendar based on your current benchmark scores and race date.
          </p>
        </div>
        <Link
          href="/booking"
          className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-bold uppercase text-xs tracking-wider clip-angled transition-colors shrink-0"
        >
          Apply for 1-on-1 Coaching
        </Link>
      </div>

    </div>
  );
}
