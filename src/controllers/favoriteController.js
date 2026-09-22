const favoriteService = require("../services/favoriteService");

async function getFavorites(req, res, next) {
  try {
    const movies = await favoriteService.getFavorites(req.userId);
    return res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    return next(error);
  }
}

async function addFavorite(req, res, next) {
  try {
    const movie = await favoriteService.addFavorite(req.userId, req.params.movieId);
    return res.status(201).json({
      success: true,
      message: "Filme adicionado aos favoritos",
      data: movie
    });
  } catch (error) {
    return next(error);
  }
}

async function removeFavorite(req, res, next) {
  try {
    await favoriteService.removeFavorite(req.userId, req.params.movieId);
    return res.json({
      success: true,
      message: "Filme removido dos favoritos"
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
};
