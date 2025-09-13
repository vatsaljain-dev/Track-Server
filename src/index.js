const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middleware/requireAuth");

require("dotenv").config(); // Load environment variables from .env file

const app = express();

app.use(bodyParser.json()); // To Parse JSON bodies
app.use(authRoutes);
app.use(trackRoutes);

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

app.get("/", requireAuth, (req, res) => {
  res.send(`your email  is ${req.user.email}`);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
