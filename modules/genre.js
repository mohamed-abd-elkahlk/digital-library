const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    books: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "book",
      },
    ],
  },
  { timestamps: true }
);
const genre = mongoose.model("genre", genreSchema);

module.exports = genre;
