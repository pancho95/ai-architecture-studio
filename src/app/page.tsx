'use client';

import { useState } from 'react';
import { PromptForm } from '@/components/PromptForm';
import { ResultDashboard } from '@/components/ResultDashboard';
import { AnalysisRequest, AnalysisResponse } from '@/types';
import { AlertTriangle } from 'lucide-react';

export default function Home() {
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (payload: AnalysisRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Captura el mensaje limpio formateado desde el backend (status 429 o 500)
        throw new Error(data.error || 'Ocurrió un error inesperado al procesar la solicitud.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Architecture Studio
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Server-Driven UI Dashboard leveraging Next.js App Router, Gemini AI structured JSON output, and Tailwind CSS.
          </p>
        </div>

        {/* Form Box */}
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
          <PromptForm onSubmit={handleAnalyze} isLoading={isLoading} />

          {/* Banner Elegante de Error (Cuota o Servidor) */}
          {error && (
            <div className="mt-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm flex items-start gap-3 transition-all animate-in fade-in">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-amber-300">Aviso del Sistema</p>
                <p className="text-amber-200/90 leading-relaxed">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard con Resultados */}
        {result && <ResultDashboard data={result} />}
      </div>
    </main>
  );
}