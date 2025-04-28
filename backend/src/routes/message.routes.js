const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const authenticate = require("../middleware/auth.middleware");

// Send message
router.post("/", authenticate, messageController.sendMessage);

// Get 1-on-1 conversation
router.get("/:userId", authenticate, messageController.getConversation);

module.exports = router;
