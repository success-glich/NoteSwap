const bcrypt = require("bcryptjs");

const SALT_ROUNDS = 10;
module.exports = {
  compareHash: (plainText, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hash, (err, data) => {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(true);
        }
      });
    });
  },
  hash: async (plainText) => {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      bcrypt.hash(plainText, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  },
};
