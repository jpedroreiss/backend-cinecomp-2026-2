const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const createError = require("../utils/appError");
const { validateUserRegistration } = require("../utils/validators");

const JWT_SECRET = process.env.JWT_SECRET || "development-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function generateToken(user) {
  return jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

async function register(data) {
  const errors = validateUserRegistration(data);
  if (errors.length) throw createError(400, "Erro de validacao", errors);

  const email = data.email.trim().toLowerCase();
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw createError(409, "E-mail ja esta em uso");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name.trim(),
    email,
    password: hashedPassword
  });

  return sanitizeUser(user);
}

async function login(email, password) {
  if (!email || !password) {
    throw createError(400, "E-mail e senha sao obrigatorios");
  }

  const user = await User.findOne({
    where: { email: email.trim().toLowerCase() }
  });

  if (!user) throw createError(401, "E-mail ou senha invalidos");

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw createError(401, "E-mail ou senha invalidos");

  return {
    user: sanitizeUser(user),
    token: generateToken(user)
  };
}

module.exports = {
  register,
  login,
  sanitizeUser
};
