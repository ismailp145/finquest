const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.post('/gemini', aiController.geminiApiPrompt);

module.exports = router;