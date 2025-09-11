import dotenv from 'dotenv';
import process from 'process';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config();

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateAIContent = async ({ readme, files }) => {
  const prompt = `
Given the following GitHub project files and README, generate detailed documentation with sections:
- Project Overview
- Installation/Setup
- Tech Stack
- Feature List
- Code Architecture
- Usage Examples
- APIs or Functions Explained

README:
${readme}

Code Samples:
${files.slice(0, 5).map(f => `File: ${f.name}\n${f.content.slice(0, 1000)}`).join('\n\n')}
`;

  try {
    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate AI content');
  }
};
