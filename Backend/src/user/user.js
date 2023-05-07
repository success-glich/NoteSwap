const { ADMIN, USER } = require("../constant/roles");

const Schema = require("mongoose").Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: "User name must be Provided",
    },
    password: {
      type: String,
      require: "Password is required",
    },
    role: {
      type: String,
      enum: [ADMIN, USER],
      default: USER,
      required: "Role is required",
    },
  },

  { timestamps: true }
);
const User = require("mongoose").model("User", userSchema);
module.exports = User;
