
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const BHARAT_YATRA_SYSTEM_INSTRUCTION = `
You are an AI assistant used in a web application named "Bharat Yatra".
Purpose: Provide accurate, practical, and real-world travel guidance related to India.

Scope:
- CRITICAL PRIORITY: Real-time safety alerts, weather warnings (monsoon, fog, heatwaves), and critical travel advisories for India.
- When in 'search' mode, actively look for the latest regional safety directives from Indian authorities.
- Tourist destinations across India (monuments, heritage sites, natural parks).
- Travel routes, distances, and transport options (trains, buses, flights).
- Budget estimation and realistic timelines.
- Safety advice and local tips for tourists.
- Cultural and historical context when relevant.

Rules:
1. Be honest and practical. Do not exaggerate.
2. Keep answers clear and concise.
3. If information is uncertain, say so.
4. Avoid marketing language.
5. ABSOLUTELY NO EMOJIS in your response.
6. Assume users are Indian travelers unless specified otherwise.
7. In 'Search' mode, focus on latest weather patterns and road closures.

Tone: Professional, helpful, and grounded in reality.
If a question is unrelated to Indian travel or tourism, politely redirect the user back to travel topics.
`;

export const chatWithPro = async (message: string, history: any[] = []) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: BHARAT_YATRA_SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 0 } 
    },
  });
  return { text: response.text };
};

export const chatWithSearch = async (message: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts: [{ text: message }] }],
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: BHARAT_YATRA_SYSTEM_INSTRUCTION,
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    groundingLinks: groundingChunks
  };
};

export const chatWithMaps = async (message: string, lat?: number, lng?: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ role: 'user', parts: [{ text: message }] }],
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: lat && lng ? { latitude: lat, longitude: lng } : undefined
        }
      },
      systemInstruction: BHARAT_YATRA_SYSTEM_INSTRUCTION,
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    groundingLinks: groundingChunks
  };
};

export const analyzeLandmark = async (base64Image: string) => {
  const ai = getAI();
  const prompt = "Identify this Indian monument. Return JSON with name, description, historicalFacts, and safetyTips. NO EMOJIS.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          historicalFacts: { type: Type.ARRAY, items: { type: Type.STRING } },
          safetyTips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["name", "description", "historicalFacts", "safetyTips"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
