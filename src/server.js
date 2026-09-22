require("dotenv").config();

const app = require("./app");
const { sequelize, ensureDatabaseDirectory } = require("./config/database");
const { seedDatabase } = require("./utils/seedDatabase");
require("./models");

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
  ensureDatabaseDirectory();
  await sequelize.authenticate();
  await sequelize.sync();
  await seedDatabase();
}

function printStartupMessage() {
  console.log(`
---------------------------------------
CineComp API
---------------------------------------

Server running on:
http://localhost:${PORT}

Swagger:
http://localhost:${PORT}/api/docs

Health:
http://localhost:${PORT}/api/health

Demo user:
marcospaulo@compjunior.com.br
PaczinBalaTensa000-

---------------------------------------
`);
}

async function closeDatabaseAndExit(signal) {
  console.log(`\n${signal} received. Closing database connection...`);
  await sequelize.close();
  process.exit(0);
}

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      printStartupMessage();
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => closeDatabaseAndExit("SIGINT"));
process.on("SIGTERM", () => closeDatabaseAndExit("SIGTERM"));

startServer();

module.exports = {
  initializeDatabase
};
