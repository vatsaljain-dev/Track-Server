const express = require("express");

const router = express.Router();

router.post("/signup", (req, res) => {
  console.log("req.body:", req.body);
  res.send("User signed up");
});

module.exports = router;
