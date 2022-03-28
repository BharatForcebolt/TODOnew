const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Task: {
    type: String,
    required: true
  }
});

const User = mongoose.model("users", UserSchema)

module.exports = User;