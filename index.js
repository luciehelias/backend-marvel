const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

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

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
