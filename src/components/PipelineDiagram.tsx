import React, { useState } from 'react';
import type { PipelineStep } from '@/lib/caseStudySchema';

interface PipelineDiagramProps {
  steps: PipelineStep[];
}

export default function PipelineDiagram({ steps }: PipelineDiagramProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="pipeline" className="px-6 py-24 bg-[#080A0F]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-mono tracking-[0.2em] text-[#22D3EE] uppercase mb-3">Compiler Pipeline</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          From Intent to Artifact
        </h2>
        <div className="flex flex-wrap gap-2 items-center">
          {steps.map((step, i) => (
            <React.Fragment key={step.step}>
              <button
                onClick={() => setActive(active === step.step ? null : step.step)}
                className={`px-4 py-2.5 rounded border text-xs font-mono transition-all ${
                  active === step.step
                    ? 'border-[#22D3EE] bg-[#22D3EE]/10 text-[#22D3EE]'
                    : 'border-[#263244] bg-[#111827] text-[#94A3B8] hover:border-[#22D3EE]/40 hover:text-[#F8FAFC]'
                }`}
              >
                <span className="text-[#263244] mr-1.5">{step.step}.</span>{step.label}
              </button>
              {i < steps.length - 1 && <span className="text-[#263244] font-mono">&#8594;</span>}
            </React.Fragment>
          ))}
        </div>
        {active !== null && (() => {
          const s = steps.find(s => s.step === active);
          return s ? (
            <div className="mt-6 p-5 rounded border border-[#22D3EE]/20 bg-[#22D3EE]/5">
              <p className="text-xs font-mono text-[#22D3EE] mb-1">Step {s.step} — {s.label}</p>
              <p className="text-sm text-[#F8FAFC]/80 leading-relaxed">{s.description}</p>
            </div>
          ) : null;
        })()}
      </div>
    </section>
  );
}
