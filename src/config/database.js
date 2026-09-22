const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const databaseDir = path.resolve(__dirname, "../../database");
const databasePath = path.join(databaseDir, "cinecomp.sqlite");

function ensureDatabaseDirectory() {
  if (!fs.existsSync(databaseDir)) {
    fs.mkdirSync(databaseDir, { recursive: true });
  }
}

ensureDatabaseDirectory();

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: databasePath,
  logging: false
});

module.exports = {
  sequelize,
  databaseDir,
  databasePath,
  ensureDatabaseDirectory
};
