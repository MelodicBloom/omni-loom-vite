import React from 'react';

interface NarrativeBlockProps {
  children: React.ReactNode;
  variant?: 'default' | 'thesis';
}

export default function NarrativeBlock({ children, variant = 'default' }: NarrativeBlockProps) {
  if (variant === 'thesis') {
    return (
      <div className="border-l-2 border-[#8B5CF6] pl-6 py-2">
        <p className="text-base md:text-lg text-[#F8FAFC]/80 leading-relaxed">{children}</p>
      </div>
    );
  }
  return (
    <p className="text-[#94A3B8] leading-relaxed">{children}</p>
  );
}
