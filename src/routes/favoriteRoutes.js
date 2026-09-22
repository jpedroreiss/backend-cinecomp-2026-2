const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.get("/", favoriteController.getFavorites);
router.post("/:movieId", favoriteController.addFavorite);
router.delete("/:movieId", favoriteController.removeFavorite);

module.exports = router;
