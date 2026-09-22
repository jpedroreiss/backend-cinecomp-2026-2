const { Favorite, Movie } = require("../models");
const createError = require("../utils/appError");

async function getFavorites(userId) {
  const favorites = await Favorite.findAll({
    where: { userId },
    include: [
      {
        model: Movie,
        required: true
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  return favorites.map((favorite) => favorite.Movie);
}

async function addFavorite(userId, movieId) {
  const movie = await Movie.findByPk(movieId);
  if (!movie) throw createError(404, "Filme nao encontrado");

  const existingFavorite = await Favorite.findOne({
    where: { userId, movieId }
  });

  if (existingFavorite) {
    throw createError(409, "Filme ja foi adicionado aos favoritos");
  }

  await Favorite.create({ userId, movieId });
  return movie;
}

async function removeFavorite(userId, movieId) {
  const favorite = await Favorite.findOne({
    where: { userId, movieId }
  });

  if (!favorite) throw createError(404, "Filme nao esta nos favoritos");

  await favorite.destroy();
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
