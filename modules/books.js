const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.ObjectId, ref: "author", required: true },
    publisher: {
      type: mongoose.Schema.ObjectId,
      ref: "publisher",
      required: true,
    },
    year: { type: Number, required: true },
    cover: { type: String },
    description: { type: String, required: true },
    price: {
      type: Number,
      default: 0,
    },
    copies: { type: Number, default: 0 },
    borrowers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    ISBN: { type: Number, unique: true },
    numberOfPages: { type: Number, required: true },
    averageRating: {
      type: Number,
      min: [1, "rating must be above or equal 1.0"],
      max: [5, "rating must be bleow or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    notes: { type: String },
    relatedBooks: { type: Array },
    language: {
      type: String,
      required: true,
    },
    wantToRead: {
      type: Number,
      default: 0,
    },
    genre: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "genre",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// title: The title of the book.
// author: The author of the book.
// genre: The genre of the book.
// year: The year the book was published.
// cover: The URL of the book's cover image.
// description: A brief description of the book.
// copies: The number of copies of the book that are available.
// notes: A collection of notes about the book, such as quotes, reviews, or recommendations.
// tags: An array of tags that describe the book.
// ISBN: The book's ISBN number.
// numberOfPages: The number of pages in the book.
// averageRating: The average rating of the book by users.

bookSchema.virtual("reviwes", {
  ref: "review",
  foreignField: "book",
  localField: "_id",
});

bookSchema.pre(/^find/, function (next) {
  this.populate({
    path: "genre publisher author",
    select: "name -_id",
  });
  next();
});

// const setImageURL = (doc) => {
//   if (doc.cover) {
//     const imageUrl = `${process.env.BASE_URL}/categories/${doc.cover}`;
//     doc.cover = imageUrl;
//   }
// };
// // findOne, findAll and update
// bookSchema.post("init", (doc) => {
//   setImageURL(doc);
// });

// // create
// bookSchema.post("save", (doc) => {
//   setImageURL(doc);
// });
const Book = mongoose.model("books", bookSchema);

module.exports = Book;
