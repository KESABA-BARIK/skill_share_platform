const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Op } = require("sequelize");
const Skill = require("../models/skill.model");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful",
      user: {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      avatarUrl: user.avatarUrl,
    }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.userId, {
        attributes: ["id", "name", "email", "bio", "location", "avatarUrl"],
      });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.updateMyProfile = async (req, res) => {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      // ✅ Use fields directly from req.body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.bio = req.body.bio || user.bio;
      user.location = req.body.location || user.location;
  
      // ✅ Handle avatar file upload
      if (req.file) {
        user.avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
      
  
      // ✅ Save changes
      await user.save();
  
      res.status(200).json({
        message: "Profile updated",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          location: user.location,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ message: err.message });
    }
  };
  

  exports.getPublicProfile = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByPk(id, {
        attributes: ["id", "name", "bio", "location", "avatarUrl"],
        include: [
          {
            model: Skill,
            as: "skills",
            attributes: ["id", "title", "description", "category"],
          },
        ],
      });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.searchUsers = async (req, res) => {
    try {
      const { skill, location, category } = req.query;
  
      const whereUser = {};
      if (location) whereUser.location = { [Op.like]: `%${location}%` };
  
      const whereSkill = {};
      if (skill) whereSkill.title = { [Op.like]: `%${skill}%` };
      if (category) whereSkill.category = { [Op.like]: `%${category}%` };
  
      const users = await User.findAll({
        where: whereUser,
        attributes: ["id", "name", "bio", "location", "avatarUrl"],
        include: [
          {
            model: Skill,
            as: "skills",
            where: Object.keys(whereSkill).length ? whereSkill : undefined,
            required: !!(skill || category),
            attributes: ["id", "title", "description", "category"],
          },
        ],
      });
  
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
