import React, { useState } from 'react';

const NODES = [
  { id: 'fraynode', label: 'FrayNode', x: 80, y: 160, desc: 'Semantic front-end router. Converts intent into JobEnvelope.' },
  { id: 'jobenv', label: 'JobEnvelope', x: 220, y: 100, desc: 'Structured intent. Validated schema before any execution.' },
  { id: 'csa', label: 'CSA API', x: 360, y: 160, desc: 'Orchestration layer. Generates deterministic ToolPlans.' },
  { id: 'registry', label: 'Tool Registry', x: 360, y: 260, desc: 'Execution boundary. Only allowlisted tools may run.' },
  { id: 'webgpu', label: 'WebGPU/WASM', x: 500, y: 100, desc: 'Runtime layer. Rendering, physics, and interaction in controlled layers.' },
  { id: 'shytech', label: 'Shytech', x: 500, y: 260, desc: 'Governance pattern. Systems dormant until intentionally activated.' },
  { id: 'cmyo', label: 'CMYO Bridge', x: 640, y: 160, desc: 'Cyber-physical compiler. Validated geometry to fabrication previews.' },
  { id: 'adapters', label: 'Adapters', x: 760, y: 160, desc: 'CNC / Laser / Embroidery. Preview-only. No physical dispatch.' },
];

const EDGES = [
  ['fraynode', 'jobenv'], ['jobenv', 'csa'], ['csa', 'registry'],
  ['csa', 'webgpu'], ['registry', 'shytech'], ['webgpu', 'cmyo'],
  ['shytech', 'cmyo'], ['cmyo', 'adapters'],
];

function getNode(id: string) { return NODES.find(n => n.id === id)!; }

export default function ArchitectureDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ? NODES.find(n => n.id === hovered) : null;

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <svg width="880" height="360" viewBox="0 0 880 360" className="block mx-auto">
          {EDGES.map(([a, b]) => {
            const na = getNode(a); const nb = getNode(b);
            return (
              <line key={`${a}-${b}`}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke="#263244" strokeWidth="1.5" strokeDasharray="4 3"
              />
            );
          })}
          {NODES.map(node => (
            <g
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x="-52" y="-18" width="104" height="36" rx="6"
                fill={hovered === node.id ? '#22D3EE10' : '#111827'}
                stroke={hovered === node.id ? '#22D3EE' : '#263244'}
                strokeWidth="1.5"
              />
              <text
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="JetBrains Mono, monospace"
                fill={hovered === node.id ? '#22D3EE' : '#94A3B8'}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {active && (
        <div className="mt-4 p-4 rounded border border-[#22D3EE]/20 bg-[#22D3EE]/5 font-mono">
          <p className="text-xs text-[#22D3EE] mb-1">{active.label}</p>
          <p className="text-xs text-[#94A3B8]">{active.desc}</p>
        </div>
      )}
    </div>
  );
}
