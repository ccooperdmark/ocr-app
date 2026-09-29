'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Flame, 
  BookOpen, 
  Timer, 
  Award, 
  HelpCircle, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight,
  Zap,
  Layers,
  Compass,
  Smartphone,
  Dumbbell
} from 'lucide-react';
import { useExperienceTier } from '@/context/ExperienceTierContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { tier, tierMeta, isBasic, isIntermediate, isAdvanced } = useExperienceTier();

  const allNavLinks = [
    { href: '/app', label: 'Athlete App', icon: Smartphone, minTier: 'basic' },
    { href: '/plan', label: 'Training Plan', icon: Layers, minTier: 'basic' },
    { href: '/library', label: 'Exercise Library', icon: Dumbbell, minTier: 'basic' },
    { href: '/races', label: 'Race Styles', icon: Compass, minTier: 'intermediate' },
    { href: '/performance', label: 'OCR Performance', icon: Zap, minTier: 'advanced' },
    { href: '/coach', label: 'Coach HQ', icon: ShieldCheck, minTier: 'advanced' },
    { href: '/testing', label: 'Engine Tests', icon: Timer, minTier: 'advanced' },
    { href: '/guides', label: 'Training Hub', icon: BookOpen, minTier: 'basic' },
  ];

  const navLinks = allNavLinks.filter(l => {
    if (l.minTier === 'basic') return true;
    if (l.minTier === 'intermediate') return isIntermediate || isAdvanced;
    if (l.minTier === 'advanced') return isAdvanced;
    return true;
  });

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090b]/90 backdrop-blur-md border-b border-[#242838]">
      {/* Top Banner Ticker */}
      <div className="bg-[#111319] border-b border-[#1c202d] py-1 px-4 text-xs font-mono text-[#9ca3af] hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: tierMeta.badgeColor }}></span>
          <span className="text-white font-bold tracking-wider">{tierMeta.name} TIER</span>
          <span className="text-[#6b7280]">|</span>
          <span style={{ color: tierMeta.badgeColor }} className="font-bold">{tierMeta.badgeLabel.toUpperCase()}</span>
          <span className="text-[#6b7280]">|</span>
          <span className="truncate max-w-md">{tierMeta.tagline}</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/app" className="hover:text-white transition-colors flex items-center gap-1 font-mono text-[11px]" style={{ color: tierMeta.badgeColor }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierMeta.badgeColor }} />
            Active Tier: {tier.toUpperCase()}
          </Link>
          <span className="text-[#4b5563]">|</span>
          <Link href="/quiz" className="hover:text-[#ccff00] text-[#9ca3af] transition-colors flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#ccff00]" /> Readiness Assessment
          </Link>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#ff5500] to-[#b33600] rounded-sm clip-angled shadow-lg shadow-[#ff5500]/20 group-hover:shadow-[#ff5500]/40 transition-all">
              <Flame className="w-6 h-6 text-black fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black italic tracking-tighter text-white uppercase font-sans">
                  GRIT<span className="text-[#ff5500]">.</span>OCR
                </span>
                <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#242838] text-[#ccff00] border border-[#333a4f]">
                  PRO
                </span>
              </div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#9ca3af] group-hover:text-white transition-colors">
                Obstacle Athletic Performance
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-sm font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-[#181b24] text-[#ff5500] border-b-2 border-[#ff5500]'
                      : 'text-[#d1d5db] hover:text-white hover:bg-[#14161f]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#ff5500]' : 'text-[#9ca3af]'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Tier Pill */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/app"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border font-mono text-xs font-bold uppercase transition hover:opacity-90"
              style={{
                borderColor: `${tierMeta.badgeColor}50`,
                backgroundColor: `${tierMeta.badgeColor}15`,
                color: tierMeta.badgeColor
              }}
              title={`Active Experience Tier: ${tierMeta.name} (${tierMeta.badgeLabel})`}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tierMeta.badgeColor }} />
              {tierMeta.name}
            </Link>

            <Link
              href="/booking"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-black bg-[#ff5500] hover:bg-[#ff6a00] clip-angled transition-all hover:translate-x-0.5 glow-orange-sm active:translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                Apply for Coaching
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/booking"
              className="px-3 py-1.5 text-xs font-bold uppercase text-black bg-[#ff5500] clip-angled mr-1"
            >
              Apply
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded bg-[#151821] text-[#d1d5db] hover:text-white border border-[#242838]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-[#ff5500]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0c10] border-b border-[#242838] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-3 rounded text-sm font-bold tracking-wide transition-colors ${
                    active 
                      ? 'bg-[#181b24] text-[#ff5500] border-l-4 border-[#ff5500]' 
                      : 'text-[#d1d5db] hover:bg-[#12141a]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${active ? 'text-[#ff5500]' : 'text-[#9ca3af]'}`} />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1e2230]">
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wider text-black bg-[#ff5500] hover:bg-[#ff6a00] clip-angled transition-all text-center"
            >
              Apply for 1-on-1 Coaching
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
