const express = require("express");
const router = express.Router();

const Comic = require("../Models/Comic");

router.get("/comics", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:comicId", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
