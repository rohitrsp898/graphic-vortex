import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PERSONAL_DETAILS, SKILLS, ABOUT_CONTENT } from '../constants';

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      console.warn("API_KEY not found in environment variables. Gemini features will be disabled.");
      throw new Error("API Key missing");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateDesignAdvice = async (userPrompt: string): Promise<string> => {
  try {
    const client = getAIClient();
    
    // Context injection for the persona
    const systemPrompt = `
      You are the AI Assistant for ${PERSONAL_DETAILS.name}'s portfolio website, "Graphic Vortex".
      
      Details about the designer:
      - Role: ${PERSONAL_DETAILS.role}
      - Skills: ${SKILLS.join(', ')}
      - About: ${ABOUT_CONTENT}
      - Style: Aesthetic, functional, modern, vortex-themed.
      
      Your goal is to answer questions from potential clients or visitors about design, or about Akash's background.
      Keep answers concise (under 100 words), professional, yet creative and friendly.
      If asked for a quote, give a range based on typical freelance graphic design rates (hypothetical).
      If asked to generate an image, politely explain you are a text-based assistant here to discuss design concepts.
    `;

    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "I'm having a bit of trouble visualizing that right now. Could you ask differently?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline due to a connection issue. Please feel free to email Akash directly!";
  }
};