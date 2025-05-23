const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Message = sequelize.define("Message", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Message;
