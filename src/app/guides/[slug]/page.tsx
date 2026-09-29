import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TRAINING_GUIDES, TrainingGuide } from '@/data/guidesData';
import { 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import GuideChecklist from './GuideChecklist';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TRAINING_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = TRAINING_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  // Find next guide
  const currentIndex = TRAINING_GUIDES.findIndex((g) => g.slug === slug);
  const nextGuide = TRAINING_GUIDES[(currentIndex + 1) % TRAINING_GUIDES.length];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Link */}
      <div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#9ca3af] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Training Hub
        </Link>
      </div>

      {/* Guide Header */}
      <div className="space-y-4 pb-8 border-b border-[#202535]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#181c28] text-[#ccff00] border border-[#2c3349] rounded-sm">
            {guide.category}
          </span>
          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/40 rounded-sm">
            {guide.badge}
          </span>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9ca3af]">
            <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>{guide.readTime}</span>
            <span>•</span>
            <span>Level: {guide.difficulty}</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-sans leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-[#ff7733] font-mono leading-relaxed">
          {guide.subtitle}
        </p>

        <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed pt-2">
          {guide.summary}
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div className="p-6 sm:p-8 bg-[#0f1118] border-l-4 border-[#ccff00] rounded-sm relative overflow-hidden">
        <h3 className="text-xs font-mono font-bold uppercase text-[#ccff00] tracking-widest mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" /> Core Tactical Takeaways
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {guide.keyTakeaways.map((takeaway, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#d1d5db] leading-relaxed">
              <span className="text-[#ccff00] font-black font-mono">0{i + 1}.</span>
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-12">
        {guide.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight border-b border-[#1c202d] pb-2">
              {section.title}
            </h2>

            <p className="text-sm sm:text-base text-[#d1d5db] leading-relaxed">
              {section.content}
            </p>

            {/* Subpoints */}
            {section.subpoints && (
              <ul className="space-y-2 pl-2">
                {section.subpoints.map((point, pIdx) => (
                  <li key={pIdx} className="text-xs sm:text-sm text-[#9ca3af] flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] shrink-0 mt-2"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Callouts */}
            {section.callout && (
              <div className={`p-4 rounded-sm border ${
                section.callout.type === 'warning'
                  ? 'bg-[#1a1111] border-[#ff4444]/60 text-[#ffaaaa]'
                  : section.callout.type === 'pro'
                  ? 'bg-[#111a11] border-[#ccff00]/60 text-[#d4ff66]'
                  : 'bg-[#11171a] border-[#00e5ff]/60 text-[#aae8ff]'
              }`}>
                <div className="text-xs font-mono font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  {section.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#ff4444]" />}
                  {section.callout.type === 'pro' && <Sparkles className="w-4 h-4 text-[#ccff00]" />}
                  {section.callout.type === 'tip' && <ShieldCheck className="w-4 h-4 text-[#00e5ff]" />}
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-white">
                  {section.callout.text}
                </p>
              </div>
            )}

            {/* Drills Table */}
            {section.drills && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs font-mono border border-[#232738] rounded-sm">
                  <thead className="bg-[#141722] text-[#ff5500] border-b border-[#232738]">
                    <tr>
                      <th className="p-3">Drill / Exercise</th>
                      <th className="p-3">Prescribed Protocol</th>
                      <th className="p-3">Target Standard</th>
                      <th className="p-3">Coaching Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b1e2c] bg-[#0c0e14]">
                    {section.drills.map((drill, dIdx) => (
                      <tr key={dIdx} className="hover:bg-[#11141e] transition-colors">
                        <td className="p-3 font-bold text-white whitespace-nowrap">{drill.name}</td>
                        <td className="p-3 text-[#d1d5db]">{drill.protocol}</td>
                        <td className="p-3 text-[#ccff00] font-bold">{drill.target}</td>
                        <td className="p-3 text-[#9ca3af]">{drill.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Checklist Component */}
      <GuideChecklist checklist={guide.interactiveChecklist} />

      {/* FAQs Section */}
      <div className="space-y-4 pt-6 border-t border-[#1e2332]">
        <h3 className="text-xs font-mono font-bold uppercase text-[#ff5500] tracking-widest flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {guide.faqs.map((faq, fIdx) => (
            <div key={fIdx} className="p-4 bg-[#0e1017] border border-[#222736] rounded-sm">
              <h4 className="text-sm font-bold text-white mb-2">
                {faq.question}
              </h4>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Guide Link */}
      <div className="pt-8 border-t border-[#1e2332] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/guides"
          className="text-xs font-mono font-bold uppercase text-[#9ca3af] hover:text-white transition-colors"
        >
          ← All Training Guides
        </Link>
        <Link
          href={`/guides/${nextGuide.slug}`}
          className="px-5 py-3 bg-[#181b26] hover:bg-[#ff5500] hover:text-black text-white font-mono font-bold uppercase text-xs tracking-wider rounded-sm transition-all flex items-center gap-2 group"
        >
          <span>Next Guide: <strong>{nextGuide.title.slice(0, 35)}...</strong></span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
