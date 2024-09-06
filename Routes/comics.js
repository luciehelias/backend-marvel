const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  const limit = req.query.limit || 100;
  const skip = req.query.skip;
  const title = req.query.name || "";

  let url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.YOUR_API_KEY}&limit=${limit}&skip=${skip}&title=${title}`;

  try {
    const response = await axios.get(url);
    const comics = response.data;

    const comicsInfo = comics.results.map((comic) => {
      return {
        id: comic._id,
        title: comic.title,
        description: comic.description,
        thumbnail: `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`,
      };
    });

    res.json(comicsInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    let url = `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.YOUR_API_KEY}`;
    const response = await axios.get(url);
    const comic = response.data;
    comic.thumbnail = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;
    res.json(comic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.YOUR_API_KEY}`
    );
    const comics = response.data.comics;

    const comicsInfos = comics.map((comic) => {
      return {
        id: comic._id,
        title: comic.title,
        description: comic.description,
        thumbnail: `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`,
      };
    });

    console.log(comicsInfos);
    res.json(comicsInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
