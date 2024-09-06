const axios = require("axios");

const express = require("express");
const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip;
    const name = req.query.name || "";

    const characters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.YOUR_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );

    const charactersInfo = characters.data.results.map((character) => {
      return {
        id: character._id,
        name: character.name,
        description: character.description,
        thumbnail: `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`,
        comics: character.comics,
      };
    });

    res.json(charactersInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    let url = `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.YOUR_API_KEY}`;
    const response = await axios.get(url);
    const character = response.data;
    character.thumbnail = `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`;
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
