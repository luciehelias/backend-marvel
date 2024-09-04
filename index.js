const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/marvel");

const charactersRouter = require("./Routes/characters");
const comicsRouter = require("./Routes/comics");

app.use(charactersRouter);
app.use(comicsRouter);

app.get("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(3000, () => {
  console.log("Server has started");
});
