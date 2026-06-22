import React from 'react';
import type { PipelineStep } from '@/lib/caseStudySchema';

interface PipelineStepCardProps {
  step: PipelineStep;
  isLast?: boolean;
}

export default function PipelineStepCard({ step, isLast = false }: PipelineStepCardProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#22D3EE]/40 bg-[#111827] text-xs font-mono font-bold text-[#22D3EE]">
          {step.step}
        </div>
        {!isLast && <div className="mt-1 w-px flex-1 bg-[#263244]" />}
      </div>
      <div className="pb-8">
        <p className="text-sm font-bold text-[#F8FAFC] mb-1">{step.label}</p>
        <p className="text-sm text-[#94A3B8] leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}
