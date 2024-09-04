const express = require("express");
const router = express.Router();

const Character = require("../Models/Character");

router.get("/characters", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
