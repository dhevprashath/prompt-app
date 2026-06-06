import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing Gemini API Key");
}

const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `You are an expert Senior Software Architect, UI/UX Designer, Product Manager, and Full Stack Developer.

Your task is to transform a simple project idea into a highly detailed AI coding prompt.

IMPORTANT:
- Do NOT generate code.
- Do NOT build the application.
- ONLY generate a structured prompt.
- Output in clean Markdown format.

Generate the following sections:

1. Project Overview
2. Features
3. UI/UX Requirements
4. Frontend Requirements
5. Backend Requirements
6. Database Design
7. AI Features (if applicable)
8. Security Requirements
9. Performance Optimization
10. Deployment
11. Testing
12. Deliverables
13. Tech Stack Recommendation
14. Future Enhancements
`;

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite"
];

async function generateWithRetry(prompt, retries = 3) {
  let lastError;

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      for (let attempt = 0; attempt < retries; attempt++) {
        try {
          const result = await model.generateContent(prompt);

          const response = await result.response;

          return response.text();
        } catch (err) {
          lastError = err;

          if (
            err.message?.includes("503") ||
            err.message?.includes("overloaded") ||
            err.message?.includes("high demand")
          ) {
            const delay = Math.pow(2, attempt) * 1000;

            console.log(
              `Retry ${attempt + 1} on ${modelName} after ${delay}ms`
            );

            await new Promise((resolve) =>
              setTimeout(resolve, delay)
            );

            continue;
          }

          throw err;
        }
      }
    } catch (err) {
      console.warn(`Model ${modelName} failed`, err);
      lastError = err;
    }
  }

  throw lastError;
}

export const generatePrompt = async (idea) => {
  if (!apiKey) {
    throw new Error(
      "Gemini API key is missing. Add VITE_GEMINI_API_KEY in .env"
    );
  }

  if (!idea.trim()) {
    throw new Error("Please enter a project idea");
  }

  try {
    const fullPrompt = `
${systemPrompt}

User Idea:
${idea}
`;

    return await generateWithRetry(fullPrompt);
  } catch (error) {
    console.error(error);

    if (
      error.message?.includes("503") ||
      error.message?.includes("high demand")
    ) {
      throw new Error(
        "⚠️ Gemini servers are currently busy. Please try again in a few minutes."
      );
    }

    throw new Error(
      error.message || "Failed to generate prompt"
    );
  }
};