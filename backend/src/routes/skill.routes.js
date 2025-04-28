const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill.controller");
const authenticate = require("../middleware/auth.middleware");

// Public routes
router.get("/", skillController.getAllSkills);
router.get("/:id", skillController.getSkillById);

// Protected routes
router.post("/", authenticate, skillController.createSkill);
router.put("/:id", authenticate, skillController.updateSkill);
router.delete("/:id", authenticate, skillController.deleteSkill);

module.exports = router;
