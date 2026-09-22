const { Op } = require("sequelize");
const { User } = require("../models");
const createError = require("../utils/appError");
const { sanitizeUser } = require("./authService");
const { validateUserUpdate } = require("../utils/validators");

async function getProfile(userId) {
  const user = await User.findByPk(userId);
  if (!user) throw createError(404, "Usuario nao encontrado");
  return sanitizeUser(user);
}

async function updateProfile(userId, data) {
  const errors = validateUserUpdate(data);
  if (errors.length) throw createError(400, "Erro de validacao", errors);

  const user = await User.findByPk(userId);
  if (!user) throw createError(404, "Usuario nao encontrado");

  if (data.email) {
    const email = data.email.trim().toLowerCase();
    const existingUser = await User.findOne({
      where: {
        email,
        id: { [Op.ne]: userId }
      }
    });

    if (existingUser) throw createError(409, "E-mail ja esta em uso");
    user.email = email;
  }

  if (data.name) user.name = data.name.trim();

  await user.save();
  return sanitizeUser(user);
}

module.exports = {
  getProfile,
  updateProfile
};
