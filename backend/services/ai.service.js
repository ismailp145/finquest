require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not defined in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runGeminiPrompt(prompt) {
  try {
    // Use a standard model name
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log("Sending prompt to Gemini API...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Received response from Gemini API");

    try {
      // Remove code block formatting if it exists (e.g., ```json)
      const clean = text.replace(/```json|```/g, "").trim();
      const json = JSON.parse(clean);
      console.log("✅ Parsed JSON successfully");
      return json;
    } catch (err) {
      console.error("❌ JSON parsing error:", err);
      console.log("Raw text:", text);
      return { summary: text }; // Return the raw text if JSON parsing fails
    }
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return { error: "Failed to generate content", details: err.message };
  }
}

module.exports = {
  runGeminiPrompt,
};
