const Skill = require("../models/skill.model");

exports.createSkill = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newSkill = await Skill.create({
      title,
      description,
      category,
      userId: req.userId,
    });

    res.status(201).json({ message: "Skill created", skill: newSkill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    // Optional: make sure only owner can update
    if (skill.userId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { title, description, category } = req.body;
    await skill.update({ title, description, category });

    res.status(200).json({ message: "Skill updated", skill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    if (skill.userId !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await skill.destroy();
    res.status(200).json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
