import React, { useState } from 'react';

const LOG_ENTRIES = [
  { ts: '2024-01-15T09:00:01Z', level: 'INFO', msg: 'JobEnvelope received', id: 'job-7f3a' },
  { ts: '2024-01-15T09:00:02Z', level: 'INFO', msg: 'ToolPlan generated — 4 tools scheduled', id: 'plan-9c1b' },
  { ts: '2024-01-15T09:00:03Z', level: 'INFO', msg: 'Tool: geometry_cleanse — PASS', id: 'tool-001' },
  { ts: '2024-01-15T09:00:04Z', level: 'INFO', msg: 'Tool: contour_validate — PASS', id: 'tool-002' },
  { ts: '2024-01-15T09:00:05Z', level: 'WARN', msg: 'Tool: kerf_compensate — SKIPPED (adapter not configured)', id: 'tool-003' },
  { ts: '2024-01-15T09:00:06Z', level: 'INFO', msg: 'Artifact manifest sealed — sha256:ab3f9d', id: 'art-001' },
  { ts: '2024-01-15T09:00:07Z', level: 'INFO', msg: 'QA gate: PASS (3/3 checks)', id: 'qa-001' },
  { ts: '2024-01-15T09:00:08Z', level: 'LOCK', msg: 'Fabrication dispatch — LOCKED', id: 'lock-001' },
];

const LEVEL_STYLES: Record<string, string> = {
  INFO: 'text-[#34D399]',
  WARN: 'text-[#FBBF24]',
  LOCK: 'text-[#FB7185]',
};

export default function TraceabilityPanel() {
  const [filter, setFilter] = useState<string>('ALL');
  const filtered = filter === 'ALL' ? LOG_ENTRIES : LOG_ENTRIES.filter(e => e.level === filter);

  return (
    <section id="traceability" className="px-6 py-24 bg-[#080A0F]">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-mono tracking-[0.2em] text-[#22D3EE] uppercase mb-3">Audit Trail</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Traceability Panel</h2>
        <p className="text-[#94A3B8] mb-8 max-w-xl">Every compiler event is logged with a timestamp, level, message, and artifact ID. Nothing executes without a trace.</p>
        <div className="flex gap-2 mb-4">
          {['ALL', 'INFO', 'WARN', 'LOCK'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-xs font-mono border transition-colors ${
                filter === f ? 'border-[#22D3EE] text-[#22D3EE] bg-[#22D3EE]/10' : 'border-[#263244] text-[#94A3B8] hover:border-[#22D3EE]/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="rounded border border-[#263244] bg-[#080A0F] overflow-hidden font-mono text-xs">
          <div className="px-4 py-2 border-b border-[#263244] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FB7185]" />
            <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
            <span className="w-2 h-2 rounded-full bg-[#34D399]" />
            <span className="ml-2 text-[#263244]">omni-loom — compiler.log</span>
          </div>
          <div className="divide-y divide-[#263244]/50">
            {filtered.map(entry => (
              <div key={entry.id} className="px-4 py-2.5 flex gap-4 hover:bg-[#111827]/50 transition-colors">
                <span className="text-[#263244] shrink-0">{entry.ts.replace('T', ' ').replace('Z', '')}</span>
                <span className={`shrink-0 w-10 ${LEVEL_STYLES[entry.level] ?? 'text-[#94A3B8]'}`}>{entry.level}</span>
                <span className="text-[#94A3B8]">{entry.msg}</span>
                <span className="ml-auto text-[#263244] shrink-0">{entry.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
