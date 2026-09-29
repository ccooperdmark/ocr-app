import React from 'react';
import OcrPerformanceView from '@/components/app/OcrPerformanceView';

export const metadata = {
  title: 'OCR Performance Matrix | 12 Performance Domains & Diagnostics',
  description: 'Evidence-informed 12-domain OCR athletic performance profiling and diagnostic limiters.'
};

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#d1d5db] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <OcrPerformanceView />
    </div>
  );
}
