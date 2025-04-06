const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.controller");

router.post("/gemini/decision", aiController.generateDecisions);
router.post("/gemini/summary", aiController.generateSummary);
console.log("✅ aiRoutes hit 1");
module.exports = router;
console.log("✅ aiRoutes hit 2");
