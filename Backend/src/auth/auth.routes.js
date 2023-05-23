const passport = require("passport");
const { generateToken } = require("../helper/TokenHelper");
const AuthController = require("./auth.controller");
const { verifyUser } = require("./auth.middleware");

const authRouter = require("express").Router();

authRouter.post("/login", AuthController.loginUser);
authRouter.post("/register", AuthController.registerUser);
authRouter.post("/refresh_token", generateToken, AuthController.refreshToken);
authRouter.get("/me", verifyUser, AuthController.me);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

module.exports = authRouter;
