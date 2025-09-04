const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String, // Gerçek projede hash'lenmeli!
});

module.exports = mongoose.model("User", UserSchema);
