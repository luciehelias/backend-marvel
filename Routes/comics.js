const express = require("express");
const router = express.Router();

const Comic = require("../Models/Comic");
const User = require("../Models/User");
const Character = require("../Models/Character");

router.get("/comics", async (req, res) => {
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
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, "i");
    }

    const skip = Number(req.query.skip);
    let limit;
    if (!req.query.limit) {
      limit = 100;
    } else {
      limit = Number(req.query.limit);
    }

    if (limit <= 100 && limit >= 1) {
      const results = await Comic.find(filters)
        .skip(skip)
        .limit(limit)
        .sort({ title: 1 });

      res.status(200).json({
        limit,
        results,
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

router.get("/comics/:characterId", async (req, res) => {
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

    const character = await Character.findByID(req.params.characterId).populate(
      "Comic"
    );
    res.json(
      character || { message: "Cet id ne correspond à aucun personnage Marvel" }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:comicId", async (req, res) => {
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

    const comic = await Comic.findById(req.params.comicId);
    res.json(comic || { message: "Cet id ne correspond à aucun comic Marvel" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
