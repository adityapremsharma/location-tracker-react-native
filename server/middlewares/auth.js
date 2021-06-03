const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { mySecretKey } = require("../config/config");

const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // authorization === Bearer alknvif90284njgf932n

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in!" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, mySecretKey, async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: "Unauthorized access!" });
    }
    try {
      const { userId } = payload;
      const user = await User.findById(userId);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).send({ error: "User does not exist!" });
    }
  });
};
