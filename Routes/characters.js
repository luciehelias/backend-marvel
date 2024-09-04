const express = require("express");
const router = express.Router();

const Character = require("../Models/Character");
const User = require("../Models/User");

router.get("/characters", async (req, res) => {
  try {
    if (!req.query.apiKey) {
      return res
        .status(400)
        .json({ message: "Vous devez entrer votre API key" });
    }

    const user = await User.findOne({ apiKey: req.query.apiKey });
    if (!user) {
      return res.status(400).json({ message: "Votre apiKey n'est pas valide" });
    }

    let filters = {};
    if (req.query.name) {
      filters.name = new RegExp(req.query.name, "i");
    }

    const skip = Number(req.query.skip);
    let limit;
    if (!req.query.limit) {
      limit = 100;
    } else {
      limit = Number(req.query.limit);
    }

    if (limit <= 100 && limit >= 1) {
      const results = await Character.find(filters).skip(skip).limit(limit);

      res.status(200).json({
        limit: limit,
        results: results,
      });
    } else {
      res
        .status(400)
        .json({ message: "La limite doit être comprise entre 1 et 100" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    if (!req.query.apiKey) {
      return res
        .status(400)
        .json({ message: "Vous devez entrer votre API key" });
    }

    const user = await User.findOne({ apiKey: req.query.apiKey });
    if (!user) {
      return res.status(400).json({ message: "Votre apiKey n'est pas valide" });
    }

    const character = await Character.findById(req.params.characterId);
    res.json(
      character || { message: "Cet id ne correspond à aucun comic Marvel" }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
