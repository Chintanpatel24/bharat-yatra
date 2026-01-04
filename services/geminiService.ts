
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Standard Chat using Gemini 3 Pro for complex reasoning.
 * Uses thinkingConfig for higher quality responses.
 */
export const chatWithPro = async (message: string, history: any[] = []) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: 'You are the Bharat Yatra Pro Assistant. You provide deep, complex insights into Indian culture, travel planning, and legal/safety advice. Use your reasoning capabilities to provide highly detailed and accurate responses.',
      thinkingConfig: { thinkingBudget: 16384 }
    },
  });
  return { text: response.text };
};

/**
 * Search Grounded Chat using Gemini 3 Flash.
 * Optimized for real-time safety alerts and travel advisories.
 */
export const chatWithSearch = async (message: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts: [{ text: message }] }],
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: 'You are the Bharat Yatra Real-Time Safety & Advisories Assistant. Your absolute priority is the safety and well-being of tourists in India. Use Google Search to find and prioritize critical real-time information, including safety alerts, weather warnings, natural disaster updates, and official travel advisories. Always provide actionable advice and cite your sources.',
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    groundingLinks: groundingChunks
  };
};

/**
 * Maps Grounded Chat using Gemini 2.5 Flash.
 */
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
    },
  });

  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    groundingLinks: groundingChunks
  };
};

/**
 * Landmark Analysis using Pro for high-quality identification.
 */
export const analyzeLandmark = async (base64Image: string) => {
  const ai = getAI();
  const prompt = "Identify this monument or landmark in India. Provide its name, a short description, 3 historical facts, and 2 safety tips. Return JSON with: name, description, historicalFacts (array), safetyTips (array).";

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
