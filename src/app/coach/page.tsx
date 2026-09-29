import React from 'react';
import CoachDashboardView from '@/components/app/CoachDashboardView';

export const metadata = {
  title: 'Coach Dashboard HQ | Athlete Triage & Overrides',
  description: 'Coach command portal for athlete compliance monitoring, priority overrides, and adaptive training triage.'
};

export default function CoachPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#d1d5db] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <CoachDashboardView />
    </div>
  );
}
