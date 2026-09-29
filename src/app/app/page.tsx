import React from 'react';
import AthleteAppContainer from '@/components/app/AthleteAppContainer';
import { Smartphone, ShieldCheck, Apple, Zap } from 'lucide-react';

export const metadata = {
  title: 'GRIT OCR Mobile App | The Complete Fitness & Obstacle Platform',
  description: 'Independent commercial fitness platform combining 66 general fitness coaching systems with 25 specialized OCR performance engines, Apple HealthKit sync, and StoreKit 2 in-app purchases.',
};

export default function AppPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Platform Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#10121a] border border-[#202536] p-3.5 px-6 rounded-sm text-xs font-mono">
        <div className="flex items-center gap-2 text-[#d1d5db]">
          <Smartphone className="w-4 h-4 text-[#ff5500]" />
          <span>INDEPENDENT FITNESS PLATFORM (iOS / APPLE APP STORE READY)</span>
        </div>
        <div className="flex items-center gap-3 text-[#9ca3af]">
          <span className="flex items-center gap-1 text-[#ccff00]">
            <Apple className="w-3.5 h-3.5 fill-[#ccff00]" /> Apple HealthKit Enabled
          </span>
          <span>•</span>
          <span className="text-[#ff7733]">StoreKit 2 / IAP Ready</span>
        </div>
      </div>

      {/* Main Interactive App Container */}
      <AthleteAppContainer />

    </div>
  );
}
