import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_DATA, ABOUT_CONTENT, SKILLS, PERSONAL_DETAILS } from '../constants';

// Initialize the API only if the key exists to prevent immediate crashes in dev environments without keys
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Construct a system instruction that gives the AI context about the portfolio
const SYSTEM_INSTRUCTION = `
You are "GraphicVortex", an AI assistant for ${PERSONAL_DETAILS.name}'s portfolio website.
Your goal is to answer visitor questions about ${PERSONAL_DETAILS.name}'s work, skills, and availability effectively and professionally.

Context about ${PERSONAL_DETAILS.name}:
- About: ${ABOUT_CONTENT}
- Skills: ${SKILLS.join(', ')}
- Portfolio Projects: ${PORTFOLIO_DATA.map(p => `${p.title} (${p.category})`).join(', ')}

Guidelines:
- Be polite, professional, yet creative.
- If asked about a specific project mentioned in the context, provide details.
- If asked about contact info, suggest they use the contact form below.
- Keep responses concise (under 100 words) unless asked for a detailed explanation.
- If the user asks about design services not listed, say ${PERSONAL_DETAILS.name} is open to discussing custom projects.
`;

let chatSession: Chat | null = null;

export const getChatResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please check back later!";
  }

  try {
    if (!chatSession) {
      chatSession = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    }

    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to my creative brain right now.";
  }
};
