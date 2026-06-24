import React from 'react';
import type { ArchitectureBlock } from '@/lib/caseStudySchema';

interface ArchitectureCardProps {
  block: ArchitectureBlock;
}

export default function ArchitectureCard({ block }: ArchitectureCardProps) {
  return (
    <div className="p-5 rounded border border-[#263244] bg-[#111827] flex flex-col gap-3 hover:border-[#22D3EE]/30 transition-colors">
      <div>
        <p className="text-sm font-bold text-[#22D3EE] mb-1">{block.name}</p>
        <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">{block.type}</p>
      </div>
      <p className="text-xs text-[#94A3B8] leading-relaxed flex-1">{block.responsibility}</p>
      <div className="space-y-1.5">
        <div>
          <p className="text-[10px] font-mono text-[#263244] uppercase mb-1">Inputs</p>
          <div className="flex flex-wrap gap-1">
            {block.inputs.map((input) => (
              <span key={input} className="text-[10px] px-2 py-0.5 rounded bg-[#080A0F] border border-[#263244] text-[#94A3B8] font-mono">{input}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-mono text-[#263244] uppercase mb-1">Constraints</p>
          <div className="flex flex-wrap gap-1">
            {block.constraints.map((c) => (
              <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-[#FB7185]/5 border border-[#FB7185]/20 text-[#FB7185] font-mono">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
