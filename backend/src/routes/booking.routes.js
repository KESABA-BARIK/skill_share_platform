const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const authenticate = require("../middleware/auth.middleware");

// Create a new booking request
router.post("/", authenticate, bookingController.createBooking);

// View my outgoing requests
router.get("/my-requests", authenticate, bookingController.getMyRequests);

// View requests sent to my skills
router.get("/incoming", authenticate, bookingController.getRequestsForMySkills);

// Update booking status (accept/reject)
router.put("/:id/status", authenticate, bookingController.updateBookingStatus);

module.exports = router;
