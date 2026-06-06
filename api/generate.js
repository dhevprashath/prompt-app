import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are an expert Senior Software Architect, UI/UX Designer, Product Manager, and Full Stack Developer.

Your task is to transform a simple project idea into a highly detailed AI coding prompt.

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

IMPORTANT:
- Do NOT generate source code.
- Do NOT build the project.
- ONLY generate a professional software development prompt.
- Output in clean Markdown format.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { idea } = req.body;

    if (!idea || !idea.trim()) {
      return res.status(400).json({
        error: "Project idea is required",
      });
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const models = [
      "gemini-2.5-flash-lite",
      "gemini-2.5-flash"
    ];

    let output = null;

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
        });

        const result = await model.generateContent(
          `${systemPrompt}\n\nUser Idea:\n${idea}`
        );

        const response = await result.response;

        output = response.text();

        break;
      } catch (err) {
        console.log(`Model failed: ${modelName}`);
      }
    }

    if (!output) {
      throw new Error(
        "Gemini servers are currently busy."
      );
    }

    return res.status(200).json({
      text: output,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error:
        "⚠️ Gemini servers are busy right now. Please try again in a minute.",
    });
  }
}