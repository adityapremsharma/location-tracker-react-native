const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  databaseURL: process.env.DATABASE_URL,
  port: process.env.PORT,
  mySecretKey: process.env.MY_SECRET_KEY,
};
