import React from 'react';

interface SystemSignalCardProps {
  signal: string;
  status: 'active' | 'dormant' | 'locked' | 'pass';
  description?: string;
}

const STATUS_STYLES: Record<string, string> = {
  active: 'text-[#34D399] border-[#34D399]/30 bg-[#34D399]/10',
  dormant: 'text-[#94A3B8] border-[#263244] bg-[#111827]',
  locked: 'text-[#FB7185] border-[#FB7185]/30 bg-[#FB7185]/10',
  pass: 'text-[#22D3EE] border-[#22D3EE]/30 bg-[#22D3EE]/10',
};

export default function SystemSignalCard({ signal, status, description }: SystemSignalCardProps) {
  return (
    <div className="p-4 rounded border border-[#263244] bg-[#111827] flex items-start gap-3">
      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 mt-0.5 ${STATUS_STYLES[status] ?? STATUS_STYLES.dormant}`}>
        {status.toUpperCase()}
      </span>
      <div>
        <p className="text-sm font-bold text-[#F8FAFC]">{signal}</p>
        {description && <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{description}</p>}
      </div>
    </div>
  );
}
