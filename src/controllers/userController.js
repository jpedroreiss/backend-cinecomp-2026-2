const userService = require("../services/userService");

async function getMe(req, res, next) {
  try {
    const user = await userService.getProfile(req.userId);
    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    return next(error);
  }
}

async function updateMe(req, res, next) {
  try {
    const user = await userService.updateProfile(req.userId, req.body);
    return res.json({
      success: true,
      message: "Usuario atualizado com sucesso",
      data: user
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMe,
  updateMe
};
