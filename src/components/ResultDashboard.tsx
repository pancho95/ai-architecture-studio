'use client';

import { AnalysisResponse } from '@/types';
import { CheckCircle2, Code2, Activity } from 'lucide-react';

interface ResultDashboardProps {
  data: AnalysisResponse;
}

export function ResultDashboard({ data }: ResultDashboardProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white mb-2">{data.title}</h2>
        <p className="text-slate-300 leading-relaxed">{data.summary}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.metrics.map((metric, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex justify-between items-center">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                {metric.label}
              </span>
              <p className="text-xl font-bold text-slate-100 mt-0.5">{metric.value}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Architectural Takeaways</h3>
        <ul className="space-y-2">
          {data.keyTakeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Snippet */}
      {data.codeSnippet && (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <Code2 className="w-4 h-4" />
            <span className="text-xs font-mono uppercase">Reference Implementation</span>
          </div>
          <pre className="text-sm font-mono text-indigo-300 overflow-x-auto p-4 rounded-md bg-slate-900 border border-slate-800">
            <code>{data.codeSnippet}</code>
          </pre>
        </div>
      )}
    </div>
  );
}