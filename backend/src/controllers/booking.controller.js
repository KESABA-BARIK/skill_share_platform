const Booking = require("../models/booking.model");
const Skill = require("../models/skill.model");
const User = require("../models/user.model");

exports.createBooking = async (req, res) => {
  try {
    const { skillId, message } = req.body;

    // Check if skill exists
    const skill = await Skill.findByPk(skillId);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // Prevent booking your own skill
    if (skill.userId === req.userId) {
      return res.status(400).json({ message: "You can't request your own skill" });
    }

    const booking = await Booking.create({
      skillId,
      message,
      requesterId: req.userId,
    });

    res.status(201).json({ message: "Booking request sent", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { requesterId: req.userId },
      include: [{ model: Skill }],
    });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRequestsForMySkills = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Skill,
          where: { userId: req.userId },
        },
        {
          model: User,
          as: "requester",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByPk(id, {
      include: [{ model: Skill }],
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only the skill owner can update status
    if (booking.Skill.userId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "Status updated", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
