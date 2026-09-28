import { NextResponse } from 'next/server';
import { ai } from '@/lib/gemini';
import { AnalysisRequest, AnalysisResponse } from '@/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const topic = body.topic || body.concept;
    const category = body.category;
    const complexity = body.complexity || 'Intermediate';

    if (!topic || !category) {
      return NextResponse.json(
        { error: 'Missing required parameters: topic/concept and category' },
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

    // Lista de modelos activos soportados en la versión actual de la API
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-pro-preview'];
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
        console.warn(`Model ${model} failed, trying next... Error: ${err?.message || err}`);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error('All model attempts failed');
    }

    const rawText = response.text;

    if (!rawText) {
      throw new Error('Received empty response from Gemini API');
    }

    const parsedData: AnalysisResponse = JSON.parse(rawText);
    return NextResponse.json(parsedData, { status: 200 });

  } catch (error: any) {
    console.error('=== SERVER DETAILED ERROR ===', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Internal Server Error',
        details: String(error)
      },
      { status: 500 }
    );
  }
}