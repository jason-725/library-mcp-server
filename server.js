import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/recommend", async (req, res) => {
  const { genre, length, theme } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a book recommendation AI assistant helping users discover great reads.",
        },
        {
          role: "user",
          content: `Find me a ${genre} book that is ${length} and involves ${theme}.`,
        },
      ],
    });

    const recommendation = response.choices[0].message.content;
    res.json({ recommendation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get recommendation." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
