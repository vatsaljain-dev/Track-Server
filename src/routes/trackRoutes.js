const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const Track = require("../models/Track");

const router = express.Router();

// Middleware to ensure the user is authenticated
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  try {
    const userId = req.user._id;
    const tracks = await Track.find({ userId: userId });
    res.send(tracks);
  } catch {
    res.status(500).send("Error fetching tracks");
  }
});

module.exports = router;
