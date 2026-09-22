const { Op } = require("sequelize");
const { Movie, Favorite } = require("../models");
const createError = require("../utils/appError");
const { validateMovie, normalizeMoviePayload } = require("../utils/validators");

const ALLOWED_SORT_FIELDS = ["title", "releaseYear", "rating", "createdAt"];

function buildMovieFilters(query) {
  const where = {};

  if (query.search) {
    const search = `%${query.search.trim()}%`;
    where[Op.or] = [
      { title: { [Op.like]: search } },
      { description: { [Op.like]: search } },
      { director: { [Op.like]: search } }
    ];
  }

  if (query.genre) where.genre = { [Op.like]: `%${query.genre.trim()}%` };
  if (query.director) where.director = { [Op.like]: `%${query.director.trim()}%` };
  if (query.releaseYear) where.releaseYear = Number(query.releaseYear);
  if (query.minRating) where.rating = { [Op.gte]: Number(query.minRating) };

  return where;
}

async function getMovies(query) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 10, 1), 100);
  const offset = (page - 1) * limit;
  const sortBy = ALLOWED_SORT_FIELDS.includes(query.sortBy) ? query.sortBy : "title";
  const orderValue = String(query.order || "asc").toLowerCase();
  const order = orderValue === "desc" ? "DESC" : "ASC";
  const where = buildMovieFilters(query);

  if (query.releaseYear && Number.isNaN(Number(query.releaseYear))) {
    throw createError(400, "Erro de validacao", ["releaseYear deve ser um numero"]);
  }
  if (query.minRating && Number.isNaN(Number(query.minRating))) {
    throw createError(400, "Erro de validacao", ["minRating deve ser um numero"]);
  }

  const { rows, count } = await Movie.findAndCountAll({
    where,
    limit,
    offset,
    order: [[sortBy, order]]
  });

  return {
    movies: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit)
    }
  };
}

async function getMovieById(id) {
  const movie = await Movie.findByPk(id);
  if (!movie) throw createError(404, "Filme nao encontrado");
  return movie;
}

async function createMovie(data) {
  const errors = validateMovie(data);
  if (errors.length) throw createError(400, "Erro de validacao", errors);

  return Movie.create(normalizeMoviePayload(data));
}

async function updateMovie(id, data) {
  const errors = validateMovie(data, true);
  if (errors.length) throw createError(400, "Erro de validacao", errors);

  const movie = await getMovieById(id);
  await movie.update(normalizeMoviePayload(data));
  return movie;
}

async function deleteMovie(id) {
  const movie = await getMovieById(id);
  await Favorite.destroy({ where: { movieId: id } });
  await movie.destroy();
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
