const authService = require("./index");
const AuthController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    //some business logic
    try {
      const { loggedInUser, token } = await authService.attemptLogin(
        email,
        password
      );

      return res.status(200).json({
        message: "Login in successfully",
        user: loggedInUser,
        token,
      });
    } catch (err) {
      return res.status(401).json({
        message: "Not Authenticated",
        error: err.message,
      });
    }
  },
  registerUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const registerUser = await authService.registerUser(email, password);
      console.log(registerUser);
      return res.status(200).json({
        message: "User created successfully",
        user: { email, registerUser },
      });
    } catch (err) {
      return res.status(400).json({
        message: "there was some error to connect user",
        error: err.message,
      });
    }
  },
  me: (req, res) => {
    const { user } = req;
    return res.status(200).json({
      user,
    });
  },
  refreshToken: async (req, res) => {
    const { token, refreshToken } = req.tokens;
    return res.status(200).json({
      token,
      refreshToken,
    });
  },
};
module.exports = AuthController;
