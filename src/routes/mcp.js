import express from "express";
import { fetchBooks } from "../services/openLibrary.js";
import { formatContext } from "../utils/formatContext.js";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  const { query, filters } = req.body; // e.g. { "query": "Find mystery novels under 300 pages" }

  try {
    const books = await fetchBooks(filters || query);
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
      ai_reply: aiResponse.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error processing MCP request" });
  }
});

export default router;



