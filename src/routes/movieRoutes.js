const express = require("express");
const movieController = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", authMiddleware, movieController.createMovie);
router.put("/:id", authMiddleware, movieController.updateMovie);
router.delete("/:id", authMiddleware, movieController.deleteMovie);

module.exports = router;
