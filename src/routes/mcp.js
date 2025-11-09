import express from "express";
import { fetchBooks } from "../services/openLibrary.js";
import { formatContext } from "../utils/formatContext.js";
import OpenAI from "openai";

const router = express.Router();

// Configure OpenAI client for OpenRouter
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1"
});

console.log("Key loaded:", !!process.env.OPENAI_API_KEY);
console.log("Base URL:", process.env.OPENAI_BASE_URL);

router.post("/recommend", async (req, res) => {
  const { genre, length, theme } = req.body;
  
  const query = `Recommend a book with genre: ${genre}, length: ${length}, and theme: ${theme}.`;
  try {
    const books = await fetchBooks({ genre, length, theme });
    const context = formatContext(books);

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo", 
      messages: [
        { role: "system", content: "You are a helpful library assistant." },
        { role: "user", content: `${query}\n\nCONTEXT: ${JSON.stringify(context)}` },
      ],
    });

    res.json({
      context,
      recommendation: aiResponse.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing MCP request" });
  }
});

export default router;