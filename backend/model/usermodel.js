const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = {
  UserModel,
};
