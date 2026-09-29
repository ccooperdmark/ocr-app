import React from 'react';
import ExerciseLibraryView from '@/components/app/ExerciseLibraryView';

export const metadata = {
  title: 'Master Exercise Library | 12 OCR Performance Domains',
  description: 'Complete structured exercise library covering all 12 OCR domains, movement patterns, equipment options, and progression ladders.'
};

export default function ExerciseLibraryPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#d1d5db] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ExerciseLibraryView />
    </div>
  );
}
