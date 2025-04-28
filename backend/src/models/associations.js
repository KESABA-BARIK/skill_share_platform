const User = require("./user.model");
const Skill = require("./skill.model");
const Message = require("./message.model");

// User ↔ Skill
User.hasMany(Skill, { foreignKey: "userId", as: "skills", onDelete: "CASCADE" });
Skill.belongsTo(User, { foreignKey: "userId", as: "user" });

// Add any other associations here, e.g. for Message:
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

// module.exports = { User, Skill};
module.exports = { User, Skill, Message };
