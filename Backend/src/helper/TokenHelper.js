const { JWT_SECRET } = require("../config/vars");

const jwt = require("jsonwebtoken");

const TokenHelper = {
  generateToken: async (payload, option = { expiresIn: "7d" }) => {
    // console.log(payload);
    try {
      const token = jwt.sign(payload, JWT_SECRET, { ...option });
      return token;
    } catch (err) {
      return err.message;
    }
  },
  verifyToken: async (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  },
  generateRefreshToken: async (payload, option = { expiresIn: "7d" }) => {
    const token = jwt.sign(payload, JWT_SECRET, { ...option });
    return token;
  },
};
module.exports = TokenHelper;
