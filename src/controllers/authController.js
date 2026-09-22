const authService = require("../services/authService");

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: "Usuario criado com sucesso",
      data: user
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body.email, req.body.password);
    return res.json({
      success: true,
      message: "Login realizado com sucesso",
      data
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login
};
