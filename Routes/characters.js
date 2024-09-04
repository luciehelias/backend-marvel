const express = require("express");
const router = express.Router();

const Character = require("../Models/Character");
const User = require("../Models/User");

router.get("/characters", async (req, res) => {
  try {
    if (req.query.apiKey) {
      const user = await User.findOne({ apiKey: req.query.apiKey });
      if (user) {
        let filters = {};

        if (req.query.name) {
          let name = new RegExp(req.query.name, "i");
          filters.name = name;
        }

        const skip = Number(req.query.skip);
        let limit;
        if (!req.query.limit) {
          limit = 100;
        } else {
          limit = Number(req.query.limit);
        }
        if (limit <= 100 && limit >= 1) {
          const results = await Character.find(search).skip(skip).limit(limit);
          const count = await Character.countDocuments(search);
          res.status(200).json({
            count: count,
            limit: limit,
            results: results,
          });
        } else {
          res
            .status(400)
            .json({ message: "La limite doit être comprise entre 1 et 100" });
        }
      } else {
        res.status(400).json({ message: "Votre apiKey n'est pas valide" });
      }
    } else {
      res.status(400).json({ message: "Vous devez entrer votre API key" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    if (req.query.apiKey) {
      const user = await User.findOne({ apiKey: req.query.apiKey });
      if (user) {
        const character = await Character.findById(req.params.characterId);
        res.json(
          character
            ? character
            : { message: "Cet id ne correspond à aucun comic Marvel" }
        );
      } else {
        res.status(400).json({ message: "Votre apiKey n'est pas valide" });
      }
    } else {
      res.status(400).json({ message: "Vous devez entrer votre API key" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
