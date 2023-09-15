const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const Genre = require("../modules/genre");
const Publishers = require("../modules/puplishers");
const Author = require("../modules/author");
const Book = require("../modules/books");
const uploadSingleImage = require("../middleware/image");
const { ApiError } = require("../utils/utiles");
const factory = require("./handler.service");
// const factory = require("./handler.service");
// Upload single image
// exports.uploadCategoryImage = uploadSingleImage("image");

// // Image processing
// exports.resizeImage = asyncHandler(async (req, res, next) => {
//   const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
//   if (req.file) {
//     await sharp(req.file.buffer)
//       .resize(600, 600)
//       .toFormat("jpeg")
//       .jpeg({ quality: 95 })
//       .toFile(`uploads/categories/${filename}`);

//     // Save image into our db
//     req.body.image = filename;
//   }

//   next();
// });

exports.puplishBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);
  // add the book we created to the req object
  req.book = book;
  next();
});

exports.addBookGenre = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findByIdAndUpdate(req.body.genre, {
    $addToSet: { books: req.book._id },
  });
  if (!genre) {
    return next(new ApiError(`no genre with this id: ${req.body.genre}`, 404));
  }
  next();
});

exports.addBookAuthor = asyncHandler(async (req, res, next) => {
  const author = await Author.findByIdAndUpdate(req.body.author, {
    $addToSet: { books: req.book._id },
  });

  if (!author) {
    return next(
      new ApiError(`no author with this id: ${req.body.author}`, 404)
    );
  }
  next();
});

exports.addBookPublisher = asyncHandler(async (req, res, next) => {
  const Publisher = await Publishers.findByIdAndUpdate(req.body.publisher, {
    $addToSet: { books: req.book._id },
  });
  if (!Publisher) {
    return next(
      new ApiError(`no Publisher with this id: ${req.body.publisher}`, 404)
    );
  }
  res.status(201).json({
    success: true,
    message: "book created and all data had saved in database",
    data: req.book,
  });
});

exports.getBooks = factory.getAll(Book);

exports.updateData = factory.updateOne(Book);

exports.changeAuthor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.author) {
    const book = Book.findByIdAndUpdate(
      id,
      {
        $set: { author: req.body.author },
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "book authore has been updated",
      data: book,
    });
  }
  next();
});

exports.changeGenre = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.genre) {
    const book = Book.findByIdAndUpdate(
      id,
      {
        $set: { genre: req.body.genre },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "book genre has been updated",
      data: book,
    });
  }
  next();
});

exports.changePuplisher = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.publisher) {
    const book = Book.findByIdAndUpdate(
      id,
      {
        $set: { publisher: req.body.publisher },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "book publisher has been updated",
      data: book,
    });
  }
  next();
});

exports.getBookById = factory.getOne(Book);

exports.deleteBook = factory.deleteOne(Book);
