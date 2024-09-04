const mongoose = require("mongoose");
const Character = mongoose.model("Character", {
  name: "string",
  description: "string",
  thumbnail: {
    path: "string",
    extension: "string",
  },
  comics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comic",
    },
  ],
});

module.exports = Character;
