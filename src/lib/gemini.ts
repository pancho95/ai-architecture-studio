import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('CRITICAL ERROR: GEMINI_API_KEY environment variable is not set!');
}

export const ai = new GoogleGenAI({
  apiKey: apiKey,
});