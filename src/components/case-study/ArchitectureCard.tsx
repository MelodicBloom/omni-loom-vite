import React from 'react';
import type { ArchitectureBlock } from '@/lib/caseStudySchema';

interface ArchitectureCardProps {
  block: ArchitectureBlock;
}

export default function ArchitectureCard({ block }: ArchitectureCardProps) {
  return (
    <div className="p-5 rounded-lg border border-[#263244] bg-[#111827] flex flex-col gap-3 hover:border-[#22D3EE]/30 transition-colors">
      <div>
        <p className="text-sm font-bold text-[#22D3EE] mb-1">{block.name}</p>
        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">{block.type}</p>
      </div>
      <p className="text-xs text-[#94A3B8] leading-relaxed flex-1">{block.responsibility}</p>
      <div className="space-y-1.5">
        {block.constraints.map((c) => (
          <div key={c} className="flex items-start gap-2">
            <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FB7185]" />
            <span className="text-[10px] font-mono text-[#64748B]">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
