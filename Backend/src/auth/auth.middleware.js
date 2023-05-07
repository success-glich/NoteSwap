const User = require("../user/user");
const TokenHelper = require("../helper/TokenHelper");
const AuthMiddleware = {
  verifyUser: async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        message: "Bearer token not provided",
      });
    }
    //Check if the token is a bearer token
    const [bearer, token] = bearerToken.split(" ");
    if (bearer !== "Bearer") {
      return res.status(401).json({
        message: "Bearer token not provided",
      });
    }
    try {
      const {
        loggedInUser: { _id: id },
      } = await TokenHelper.verifyToken(token);
      const user = await User.findOne({ _id: id }, "-password");

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
  },
  generateTokens: async (req, res, next) => {
    const { refreshToken } = req.body;
    //Check if the refresh token exists in the db

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh Token not Provided",
      });
    }
    try {
      const { id, type } = await TokenHelper.verifyToken(refreshToken);
      if (type !== "refresh") {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }
      //We know that the token is good
      //Get the user with that id from the database
      const user = await User.findOne({ _id: id }, "-password");
      if (!user) {
        return res.status(401).json({
          message: "Invalid request",
        });
      }

      //Generate new Token pair
      const token = await TokenHelper.generateToken({ id: user._id });
      const newRefreshToken = await TokenHelper.generateRefreshToken({
        id: user._id,
        type: "refresh",
      });
      req.tokens = { toke, refreshToken: newRefreshToken };
      next();
    } catch (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
  },
  checkAdmin: async (req, res, next) => {
    const { user } = req;
    // console.log({ user });
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "NOT PERMITTED TO ADD THE RESOURCES",
      });
    }
    next();
  },
};
module.exports = AuthMiddleware;
