const express = require("express");
const app = express();

app.get("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(3000, () => {
  console.log("Server has started");
});
