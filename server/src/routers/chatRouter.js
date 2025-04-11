const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/fetch-messages", chatController.fetchMessages);
router.post('/groq', chatController.chatWithAi);
module.exports = router;
