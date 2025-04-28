const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Skill = require("./skill.model");

const Booking = sequelize.define("Booking", {
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// Relationships
User.hasMany(Booking, { foreignKey: "requesterId", as: "requestsMade" });
Booking.belongsTo(User, { foreignKey: "requesterId", as: "requester" });

Skill.hasMany(Booking, { foreignKey: "skillId" });
Booking.belongsTo(Skill, { foreignKey: "skillId" });

module.exports = Booking;
