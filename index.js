const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/marvel");

const charactersRouter = require("./Routes/characters");
const comicsRouter = require("./Routes/comics");
const usersRouter = require("./Routes/users");

app.use(usersRouter);
app.use(charactersRouter);
app.use(comicsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome, this is my marvel website !" });
});

app.get("*", (req, res) => {
  return res.status(404).json("This page doesn't exist");
});

app.listen(3000, () => {
  console.log("Server has started");
});
