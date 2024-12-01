const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNameField: { type: String, required: true },
    passWordField: { type: String, required: true },
    emailField: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
