const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  image: { type: String },
  biography: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  deathDate: {
    type: Date,
  },
  books: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "book",
    },
  ],
});

// const setImageURL = (doc) => {
//   if (doc.profileImg) {
//     const imageUrl = `${process.env.BASE_URL}/categories/${doc.profileImg}`;
//     doc.profileImg = imageUrl;
//   }
// };
// // findOne, findAll and update
// AuthorSchema.post("init", (doc) => {
//   setImageURL(doc);
// });

// // create
// AuthorSchema.post("save", (doc) => {
//   setImageURL(doc);
// });

const Author = mongoose.model("author", AuthorSchema);
module.exports = Author;
