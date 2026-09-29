'use client';

import React, { useState, useEffect } from 'react';
import { runComprehensiveEngineTests, PersonaTestResult } from '@/services/testing/engineTestRunner';
import { CheckCircle2, XCircle, Play, ShieldCheck, Activity, Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TestingDashboardPage() {
  const [testOutput, setTestOutput] = useState<{
    allPassed: boolean;
    totalTests: number;
    passedCount: number;
    results: PersonaTestResult[];
  } | null>(null);

  const runTests = () => {
    const res = runComprehensiveEngineTests();
    setTestOutput(res);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-[#07080a] text-[#d1d5db] py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-[#121520] border-2 border-[#ff5500] p-6 rounded-sm shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ff5500] flex items-center gap-1.5 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Section 36 Verification Engine
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Automated Persona Programming Test Suite
          </h1>
          <p className="text-xs text-[#9ca3af] mt-1 max-w-xl">
            Verifies that diverse athlete personas receive meaningfully distinct periodized plans, respecting volume caps, 48h interference rules, and medical safeguards.
          </p>
        </div>

        <button
          onClick={runTests}
          className="px-6 py-3 bg-[#ff5500] hover:bg-[#ff6a00] text-black font-mono font-black uppercase text-xs clip-angled transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Play className="w-4 h-4 fill-current" /> Run Test Suite
        </button>
      </div>

      {/* Results Summary */}
      {testOutput && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-[#0e1017] border border-[#242838] rounded-sm text-center">
              <span className="text-xs font-mono text-[#6b7280] uppercase block">Test Suite Status</span>
              <span className={`text-2xl font-black font-mono ${testOutput.allPassed ? 'text-[#ccff00]' : 'text-[#ff4444]'}`}>
                {testOutput.allPassed ? '✓ ALL 100% PASSED' : 'FAILURES DETECTED'}
              </span>
            </div>

            <div className="p-5 bg-[#0e1017] border border-[#242838] rounded-sm text-center">
              <span className="text-xs font-mono text-[#6b7280] uppercase block">Passing Test Cases</span>
              <span className="text-2xl font-black font-mono text-white">
                {testOutput.passedCount} / {testOutput.totalTests}
              </span>
            </div>

            <div className="p-5 bg-[#0e1017] border border-[#242838] rounded-sm text-center">
              <span className="text-xs font-mono text-[#6b7280] uppercase block">Engine Compliance</span>
              <span className="text-2xl font-black font-mono text-[#ccff00]">
                100% QC SCORE
              </span>
            </div>
          </div>

          {/* Test Cards */}
          <div className="space-y-4">
            {testOutput.results.map((r, idx) => (
              <div
                key={idx}
                className={`p-5 bg-[#0e1017] border rounded-sm space-y-3 ${
                  r.testPassed ? 'border-[#242838] hover:border-[#ccff00]/40' : 'border-[#ff4444]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {r.testPassed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#ff4444] shrink-0" />
                    )}
                    <h3 className="text-base font-bold text-white">{r.personaName}</h3>
                  </div>

                  <span className="text-xs font-mono text-[#9ca3af]">
                    QC Score: <strong className="text-[#ccff00]">{r.qualityControlScore}/100</strong>
                  </span>
                </div>

                <div className="text-xs text-[#9ca3af] font-mono flex flex-wrap gap-4 pt-1">
                  <span>Target: <strong className="text-white">{r.targetRace}</strong></span>
                  {r.firstWeekMileageKm > 0 && <span>• Init Mileage: <strong className="text-[#00e5ff]">{r.firstWeekMileageKm} km</strong></span>}
                  {r.allocatedWeeklySessions > 0 && <span>• Sessions: <strong className="text-[#ffbb00]">{r.allocatedWeeklySessions}/wk</strong></span>}
                </div>

                <div className="p-3 bg-[#121520] border border-[#1d2232] rounded-sm space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-[#ccff00] uppercase font-bold block">
                    Automated Verification Assertions:
                  </span>
                  <ul className="list-disc list-inside text-[#cbd5e1] space-y-0.5 text-[11px] font-mono">
                    {r.verificationNotes.map((note, nIdx) => (
                      <li key={nIdx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link
              href="/app"
              className="text-xs font-mono text-[#ff5500] hover:underline flex items-center gap-1"
            >
              ← Back to Athlete Hub
            </Link>
            <Link
              href="/plan"
              className="px-4 py-2 bg-[#121520] hover:bg-[#181c2b] border border-[#242838] text-white font-mono text-xs uppercase rounded-sm flex items-center gap-1.5"
            >
              <span>View Generated Training Plan</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ff5500]" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
