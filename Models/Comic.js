const mongoose = require("mongoose");

const Comic = mongoose.model("Comic", {
  title: "string",
  description: "string",
  thumbnail: {
    path: "string",
    extension: "string",
  },
});
module.exports = Comic;
