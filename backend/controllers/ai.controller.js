
const aiService = require('../services/ai.service');

async function geminiApiPrompt(req, res){
  try {
    const { prompt } = req.body;
    const result = await aiService.runGeminiPrompt(prompt);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}

module.exports = {
  geminiApiPrompt
};