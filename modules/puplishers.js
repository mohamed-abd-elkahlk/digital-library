const mongoose = require("mongoose");

const PublisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "book",
    },
  ],
});
const publisher = mongoose.model("publisher", PublisherSchema);

module.exports = publisher;
