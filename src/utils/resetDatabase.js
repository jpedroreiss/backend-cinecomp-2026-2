require("dotenv").config();

const fs = require("fs");
const { sequelize } = require("../models");
const { databasePath, ensureDatabaseDirectory } = require("../config/database");
const { seedDatabase } = require("./seedDatabase");

async function resetDatabase() {
  try {
    if (fs.existsSync(databasePath)) {
      fs.unlinkSync(databasePath);
    }

    ensureDatabaseDirectory();
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await seedDatabase();
    console.log("Banco resetado com sucesso.");
  } catch (error) {
    console.error("Falha ao resetar o banco:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

resetDatabase();
