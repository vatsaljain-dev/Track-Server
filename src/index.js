const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");

require("dotenv").config(); // Load environment variables from .env file

const app = express();

app.use(bodyParser.json()); // To Parse JSON bodies
app.use(authRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});

app.get("/", (req, res) => {
  res.send("Hi There");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
