'use client';

import { useState } from 'react';
import { PromptForm } from '@/components/PromptForm';
import { ResultDashboard } from '@/components/ResultDashboard';
import { AnalysisRequest, AnalysisResponse, ApiState } from '@/types';

export default function HomePage() {
  const [state, setState] = useState<ApiState<AnalysisResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const handleAnalyze = async (payload: AnalysisRequest) => {
    setState({ data: null, isLoading: true, error: null });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process request');
      }

      const result: AnalysisResponse = await response.json();
      setState({ data: result, isLoading: false, error: null });
    } catch (err: any) {
      setState({
        data: null,
        isLoading: false,
        error: err.message || 'An unexpected error occurred',
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
            Senior Engineering Portfolio Project
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            AI Architecture Studio
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Server-Driven UI Dashboard leveraging Next.js App Router, Gemini AI structured JSON output, and Tailwind CSS.
          </p>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <PromptForm onSubmit={handleAnalyze} isLoading={state.isLoading} />
        </div>

        {state.error && (
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
            <strong>Error:</strong> {state.error}
          </div>
        )}

        {state.isLoading && (
          <div className="p-8 text-center space-y-4">
            <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 font-mono animate-pulse">
              Requesting structured JSON from Gemini 1.5 Flash...
            </p>
          </div>
        )}

        {state.data && <ResultDashboard data={state.data} />}
      </div>
    </main>
  );
}