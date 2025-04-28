const app = require("./app");
const sequelize = require("./config/db.config");
const connectMongo = require("./config/mongo.config");

const PORT = process.env.PORT || 5000;

require("./models/user.model");
require("./models/skill.model");
require("./models/message.model");
require("./models/associations");

(async () => {
  try {
    await sequelize.sync({ alter: true }); // For dev only; use migrations in prod
    await connectMongo();
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to DB:", err);
  }
})();
