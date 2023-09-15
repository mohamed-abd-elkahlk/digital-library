const mongoose = require("mongoose");
const Book = require("./books");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    ratings: {
      type: Number,
      min: [1, "Min ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: [true, "review ratings required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "Review must belong to user"],
    },
    // parent reference (one to many)
    book: {
      type: mongoose.Schema.ObjectId,
      ref: "book",
      required: [true, "Review must belong to book"],
    },
  },
  { timestamps: true }
);

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (bookId) {
  const result = await this.aggregate([
    // Stage 1 : get all reviews in specific book
    {
      $match: { book: bookId },
    },
    // Stage 2: Grouping reviews based on bookID and calc avgRatings, ratingsQuantity
    {
      $group: {
        _id: "book",
        avgRatings: { $avg: "$ratings" },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  // console.log(result[0].avgRatings);
  // console.log(result[0].ratingsQuantity);
  if (result.length > 0) {
    await Book.findByIdAndUpdate(bookId, {
      ratingsAverage: result[0].avgRatings,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.book);
});

reviewSchema.post("remove", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.book);
});
const review = mongoose.model("review", reviewSchema);
module.exports = review;
