const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModle", userSchema);
