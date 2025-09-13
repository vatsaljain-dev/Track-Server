const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password: password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({
      token,
    });
  } catch (error) {
    return res.status(400).send("Error signing up user: " + error.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send("Email and password are required");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "Email not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid email or password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.send({ token });
  } catch (error) {
    res.status(422).send("Error logging in user: " + error.message);
  }
});

module.exports = router;
