const express = require('express');
const mongoose = require('mongoose');
const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose'); // Import the Mongoose store for Express-Brute
const User = require('../Models/User'); // Make sure the path is correct

const router = express.Router();

// Define the schema for the brute force store
const bruteForceSchema = new mongoose.Schema({
  _id: { type: String }, // IP address
  data: { type: Object },
  expires: { type: Date },
});

const BruteForce = mongoose.model('bruteforce', bruteForceSchema);

// Set up the Mongoose store for Express-Brute
const store = new MongooseStore(BruteForce);

// Initialize Express-Brute with the Mongoose store
const bruteforce = new ExpressBrute(store);

// Example protected route using bruteforce
router.post('/register', bruteforce.prevent, async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ msg: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
