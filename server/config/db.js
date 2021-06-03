const mongoose = require("mongoose");
const { databaseURL } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(err.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", (error) => {
  console.log(`MongoDB error: ${error}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = connectDB;
