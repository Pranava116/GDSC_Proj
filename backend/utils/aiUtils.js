import dotenv from 'dotenv';
import process from 'process';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config();

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateAIContent = async ({ readme, files }) => {
  const prompt = `
You are a senior software engineer and technical writer.  
Your task is to generate complete project documentation from the provided repository contents.  

### Documentation Requirements:

1. **Project Overview**  
   - Explain what the project is and what problem it solves.  
   - Identify the target users and main purpose.  

2. **Tech Stack**  
   - Detect and clearly list all programming languages, frameworks, and libraries used.  
   - Mention database, hosting, or APIs if relevant.  

3. **Installation & Setup**  
   - Include prerequisites (Node.js, Python, frameworks, DB).  
   - Step-by-step guide for local development setup.  

4. **Usage Guide**  
   - Show how to run the project (dev + production).  
   - Provide example commands, endpoints, or UI usage.  

5. **Features**  
   - List the main features in concise bullet points.  
   - Highlight any unique/advanced functionality.  

6. **Codebase Walkthrough**  
   - Explain the **folder structure** and purpose of each directory.  
   - For each important file, give a **short explanation** of what it does.  
   - Example:  
     - \`server.js\` → Entry point, sets up Express server.  
     - \`routes/userRoutes.js\` → Defines user-related endpoints.  
     - \`utils/db.js\` → Handles MongoDB connection.  
 

7. **API Documentation (if any)**  
   - Document all routes/endpoints with request/response examples.  
   - Include expected parameters, payloads, and response formats.  

8. **Contribution Guide**  
   - Explain how to fork, branch, and make a PR.  
   - Mention coding style or linting rules if found.  

9. **License & Credits**  
   - Summarize license (MIT, Apache, etc.) if file exists.  
   - Credit libraries/frameworks if important.  

### Style Guidelines:
### Style Guidelines:
- Use **Markdown formatting** for clean export.  
- Write in a **developer-friendly, professional tone**.  
- Add **code snippets** inside triple backticks.  
- The final output should look like a polished README.md + mini developer guide.  

### Input Repository:
{INSERT_REPO_CONTENTS_HERE}


README:
${readme}

Code Samples:
${files.slice(0, 5).map(f => `File: ${f.name}\n${f.content.slice(0, 1000)}`).join('\n\n')}
`;

  try {
    // Use Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate AI content');
  }
};
