'use client';

import { useState, FormEvent } from 'react';
import { AnalysisRequest } from '@/types';
import { Sparkles, Loader2 } from 'lucide-react';

interface PromptFormProps {
  onSubmit: (payload: AnalysisRequest) => void;
  isLoading: boolean;
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState<AnalysisRequest['category']>('frontend');
  const [complexity, setComplexity] = useState<AnalysisRequest['complexity']>('intermediate');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || isLoading) return;
    onSubmit({ topic, category, complexity });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-1">
          Architecture Concept / Feature
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Server-Driven UI with WebSockets, Audio Transcriber Worker..."
          className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as AnalysisRequest['category'])}
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option value="frontend">Frontend Architecture</option>
            <option value="system-design">System Design</option>
            <option value="audio-tech">Audio & Signal Processing</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Complexity</label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value as AnalysisRequest['complexity'])}
            className="w-full rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-slate-100 focus:border-indigo-500 focus:outline-none transition-all"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating Architectural Plan...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Analyze with Gemini AI
          </>
        )}
      </button>
    </form>
  );
}