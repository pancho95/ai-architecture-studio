import { NextResponse } from 'next/server';
import { ai } from '@/lib/gemini';
import { AnalysisRequest, AnalysisResponse } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const topic = body.topic || body.concept;
    const category = body.category;
    const complexity = body.complexity || 'intermediate';

    if (!topic || !category) {
      return NextResponse.json(
        { error: 'Parámetros requeridos faltantes: concepto y categoría.' },
        { status: 400 }
      );
    }

    const prompt = `You are a Senior Software Architect.
Analyze the following request:
- Topic/Concept: "${topic}"
- Category: "${category}"
- Target Complexity: "${complexity}"

Return ONLY a valid JSON object matching this TypeScript interface:
{
  "title": "Short descriptive title",
  "summary": "Concise architectural overview (2-3 sentences)",
  "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"],
  "metrics": [
    {"label": "Performance Score", "value": "98/100", "status": "optimal"},
    {"label": "Implementation Effort", "value": "Medium", "status": "neutral"}
  ],
  "codeSnippet": "Optional clean TypeScript/Tailwind snippet showing core implementation details",
  "recommendedStack": ["Next.js", "TypeScript", "Tailwind CSS"]
}`;

    // Intentar primero con modelos de respuesta rápida
    const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash'];
    let response = null;
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        if (response) break;
      } catch (err: any) {
        console.warn(`Falló el modelo ${model}:`, err?.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error('No se pudo conectar con ningún modelo.');
    }

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Respuesta vacía recibida desde la API.');
    }

    const parsedData: AnalysisResponse = JSON.parse(rawText);
    return NextResponse.json(parsedData, { status: 200 });

  } catch (error: any) {
    console.error('=== SERVER ERROR ===', error);

    const errorStr = String(error?.message || error);
    const isQuotaError = error?.status === 429 || errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED');

    // Mensaje limpio en español para el usuario
    const friendlyMessage = isQuotaError
      ? 'Se ha alcanzado el límite de cuota gratuita por minuto. Aguarda unos 30 segundos y vuelve a intentarlo.'
      : 'No fue posible generar el análisis arquitectónico en este momento. Inténtalo más tarde.';

    return NextResponse.json(
      { error: friendlyMessage },
      { status: isQuotaError ? 429 : 500 }
    );
  }
}