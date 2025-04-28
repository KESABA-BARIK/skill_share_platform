const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule.controller");
const authenticate = require("../middleware/auth.middleware");

router.post("/", authenticate, scheduleController.createSchedule);
router.get("/", authenticate, scheduleController.getMySchedules);
router.delete("/:id", authenticate, scheduleController.deleteSchedule);

module.exports = router;
