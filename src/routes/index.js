const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const favoriteRoutes = require("./favoriteRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  return res.json({
    success: true,
    status: "ok",
    message: "CineComp API esta rodando"
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
