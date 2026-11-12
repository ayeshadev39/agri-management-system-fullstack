const sequelize = require("./config/db");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1);
  }
})();