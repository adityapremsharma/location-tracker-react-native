const express = require("express");
var cors = require("cors");
const { port } = require("./config/config");
const connectDB = require("./config/db");

// Import models
require("./models/User");
require("./models/Track");

// Auth middleware
const auth = require("./middlewares/auth");

// Import routes
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

connectDB();

app.use(authRoutes, trackRoutes);

app.get("/", auth, (req, res) => {
  res.send(req.user.email);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
