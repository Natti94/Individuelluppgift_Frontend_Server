const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBPW);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
