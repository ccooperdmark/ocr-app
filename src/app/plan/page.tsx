import React from 'react';
import TrainingPlanView from '@/components/app/TrainingPlanView';

export const metadata = {
  title: 'Adaptive Training Plan | Periodized OCR Architecture',
  description: 'Individualized, adaptive Obstacle Course Racing periodization covering all 10 training phases.'
};

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#d1d5db] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <TrainingPlanView />
    </div>
  );
}
