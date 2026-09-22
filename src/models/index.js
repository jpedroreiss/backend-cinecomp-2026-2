const { sequelize } = require("../config/database");
const User = require("./User");
const Movie = require("./Movie");
const Favorite = require("./Favorite");

User.hasMany(Favorite, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Favorite.belongsTo(User, {
  foreignKey: "userId"
});

Movie.hasMany(Favorite, {
  foreignKey: "movieId",
  onDelete: "CASCADE"
});

Favorite.belongsTo(Movie, {
  foreignKey: "movieId"
});

module.exports = {
  sequelize,
  User,
  Movie,
  Favorite
};
