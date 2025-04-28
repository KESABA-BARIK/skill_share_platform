const Schedule = require("../models/schedule.model");

exports.createSchedule = async (req, res) => {
  try {
    const { day, startTime, endTime, skillId } = req.body;

    const schedule = await Schedule.create({
      day,
      startTime,
      endTime,
      skillId,
      userId: req.userId,
    });

    res.status(201).json({ message: "Schedule added", schedule });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMySchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({ where: { userId: req.userId } });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule || schedule.userId !== req.userId) {
      return res.status(404).json({ message: "Schedule not found or unauthorized" });
    }

    await schedule.destroy();
    res.status(200).json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
