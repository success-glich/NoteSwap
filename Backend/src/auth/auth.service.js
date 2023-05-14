const authHelper = require("./auth.helper");
const TokenHelper = require("../helper/TokenHelper");
class AuthService {
  User;
  constructor(User) {
    this.User = User;
  }
  async attemptLogin(email, password) {
    try {
      console.log(email, password);

      const user = await this.User.findOne({ email });
      if (!user) {
        throw new Error("Authentication failed");
      }

      const isValidPassword = await authHelper.compareHash(
        password,
        user.password
      );
      console.log(isValidPassword);
      if (!isValidPassword) {
        throw new Error("Authentication failed");
      }
      const loggedInUser = JSON.parse(JSON.stringify(user));
      delete loggedInUser.password;
      const token = await TokenHelper.generateToken({
        loggedInUser,
      });
      console.log(token);

      return { loggedInUser, token };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async registerUser(email, password) {
    try {
      const user = await this.User.findOne({ email });

      if (user) {
        throw new Error("User already exits");
      }
      const hashedPassword = await authHelper.hash(password);
      const newUser = await new this.User({
        email,
        password: hashedPassword,
      }).save();
      const registerUser = JSON.parse(JSON.stringify(newUser));
      delete registerUser.password;
      return registerUser;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = AuthService;
