const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Check if the model already exists and use it, otherwise define a new model
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
