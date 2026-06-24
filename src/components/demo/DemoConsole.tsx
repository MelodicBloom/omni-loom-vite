import React, { useState, useRef } from 'react';

type Stage =
  | 'idle'
  | 'parsing'
  | 'envelope'
  | 'toolplan'
  | 'validating'
  | 'manifest'
  | 'locked'
  | 'done';

const STAGE_SEQUENCE: Stage[] = [
  'parsing', 'envelope', 'toolplan', 'validating', 'manifest', 'locked', 'done',
];

const STAGE_LABELS: Record<Stage, string> = {
  idle: 'Awaiting intent…',
  parsing: 'FrayNode — parsing intent…',
  envelope: 'JobEnvelope — structuring…',
  toolplan: 'CSA API — generating ToolPlan…',
  validating: 'Geometry validation — running checks…',
  manifest: 'Artifact manifest — sealing…',
  locked: 'Fabrication dispatch — LOCKED',
  done: 'Pipeline complete — artifact ready',
};

const STAGE_COLOR: Record<Stage, string> = {
  idle: '#94A3B8',
  parsing: '#22D3EE',
  envelope: '#22D3EE',
  toolplan: '#8B5CF6',
  validating: '#FBBF24',
  manifest: '#34D399',
  locked: '#FB7185',
  done: '#34D399',
};

export default function DemoConsole() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('idle');
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function appendLog(msg: string) {
    setLog(prev => [...prev, `[${new Date().toISOString().slice(11, 19)}] ${msg}`]);
  }

  function runPipeline() {
    if (!input.trim() || running) return;
    setRunning(true);
    setLog([]);
    setStage('parsing');
    appendLog(`Intent received: "${input.trim()}"`);

    let i = 0;
    function next() {
      if (i >= STAGE_SEQUENCE.length) {
        setRunning(false);
        return;
      }
      const s = STAGE_SEQUENCE[i++];
      setStage(s);
      appendLog(STAGE_LABELS[s]);
      timeoutRef.current = setTimeout(next, 900);
    }
    timeoutRef.current = setTimeout(next, 800);
  }

  function reset() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStage('idle');
    setLog([]);
    setInput('');
    setRunning(false);
  }

  return (
    <section id="demo" className="px-6 py-24 bg-[#080A0F]">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-mono tracking-[0.2em] text-[#22D3EE] uppercase mb-3">Interactive Demo</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Compiler Simulation</h2>
        <p className="text-[#94A3B8] mb-10 max-w-xl">Enter a creative intent. The simulated compiler will run each pipeline stage and lock fabrication dispatch. No real APIs are called.</p>

        {/* Input */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && runPipeline()}
            placeholder="e.g. a cyan geometric textile pattern with 4-axis symmetry"
            disabled={running}
            className="flex-1 px-4 py-3 rounded border border-[#263244] bg-[#111827] text-[#F8FAFC] font-mono text-sm placeholder:text-[#263244] focus:outline-none focus:border-[#22D3EE]/50 disabled:opacity-50"
          />
          <button
            onClick={runPipeline}
            disabled={running || !input.trim()}
            className="px-5 py-3 rounded bg-[#22D3EE] text-[#080A0F] font-semibold text-sm hover:bg-[#22D3EE]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Run
          </button>
          <button
            onClick={reset}
            className="px-4 py-3 rounded border border-[#263244] text-[#94A3B8] text-sm hover:border-[#22D3EE]/40 transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Stage indicator */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-2.5 h-2.5 rounded-full transition-colors"
            style={{ background: STAGE_COLOR[stage], boxShadow: stage !== 'idle' ? `0 0 8px ${STAGE_COLOR[stage]}80` : 'none' }}
          />
          <span className="text-sm font-mono" style={{ color: STAGE_COLOR[stage] }}>
            {STAGE_LABELS[stage]}
          </span>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="rounded border border-[#263244] bg-[#080A0F] font-mono text-xs overflow-hidden">
            <div className="px-4 py-2 border-b border-[#263244] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FB7185]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
              <span className="w-2 h-2 rounded-full bg-[#34D399]" />
              <span className="ml-2 text-[#263244]">omni-loom — pipeline.log</span>
            </div>
            <div className="p-4 space-y-1.5 max-h-64 overflow-y-auto">
              {log.map((entry, i) => (
                <p key={i} className="text-[#94A3B8]">{entry}</p>
              ))}
            </div>
          </div>
        )}

        {stage === 'done' && (
          <div className="mt-6 p-5 rounded border border-[#34D399]/30 bg-[#34D399]/5">
            <p className="text-xs font-mono text-[#34D399] mb-2">Artifact manifest sealed</p>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div><span className="text-[#263244]">job_id</span><span className="ml-2 text-[#94A3B8]">job-{Math.random().toString(36).slice(2, 8)}</span></div>
              <div><span className="text-[#263244]">status</span><span className="ml-2 text-[#34D399]">VALIDATED</span></div>
              <div><span className="text-[#263244]">dispatch</span><span className="ml-2 text-[#FB7185]">LOCKED</span></div>
              <div><span className="text-[#263244]">checksum</span><span className="ml-2 text-[#94A3B8]">sha256:{Math.random().toString(36).slice(2, 10)}</span></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
