const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { mySecretKey } = require("../config/config");

const User = mongoose.model("User");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    const token = jwt.sign({ userId: user._id }, mySecretKey);

    await user.save();
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message); // 422 -> Invalid data
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must Provide email and password!" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "Invalid credentials!" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, mySecretKey);
    res.send({ token });
  } catch (error) {
    return res.status(422).send({ error: "Invalid credentials!" });
  }
});
module.exports = router;
