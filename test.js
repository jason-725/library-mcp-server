import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize OpenAI client with OpenRouter endpoint
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

async function runTest() {
  try {
    console.log("Testing OpenRouter connection...");

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4-turbo", or another model supported by OpenRouter
      messages: [
        {
          role: "system",
          content:
            "You are a helpful library recommendation assistant that suggests books based on user preferences.",
        },
        {
          role: "user",
          content:
            "What is this model that is being used"  
          //"I'm looking for a historical fiction book under 400 pages that involves adventure and a strong female lead.",
        },
      ],
    });

    console.log("\n✅ Response:");
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("\n❌ Error occurred:", err);
  }
}

runTest();
