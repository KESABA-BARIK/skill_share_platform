
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const User = require("./user.model");
const Skill = require("./skill.model");

const Schedule = sequelize.define("Schedule", {
  day: {
    type: DataTypes.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"),
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

User.hasMany(Schedule, { foreignKey: "userId" });
Schedule.belongsTo(User, { foreignKey: "userId" });

Skill.hasMany(Schedule, { foreignKey: "skillId" });
Schedule.belongsTo(Skill, { foreignKey: "skillId" });

module.exports = Schedule;
