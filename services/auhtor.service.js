/* eslint-disable import/no-extraneous-dependencies */

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const uploadSingleImage = require("../middleware/image");
const Author = require("../modules/author");
const factory = require("./handler.service");
const { ApiError } = require("../utils/utiles");
// Upload single image
exports.uploadAuthorImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `Author-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${filename}`);

  // Save image into our db
  req.body.image = filename;

  next();
});
// @desc   Create Author
// @route  POST /api/Author
// @access Privte or (admin/manger)
exports.createAuthor = factory.createOne(Author);

// @desc   get Author
// @route  GET /api/Author
// @access public
exports.getAuthor = factory.getAll(Author);

// @desc   get Author by id
// @route  GET /api/Author/:id
// @access public

exports.getAuthorById = factory.getOne(Author);

// @desc   updata Author by id
// @route  PUT /api/Author/:id
// @access Privte

exports.updateAuthor = factory.updateOne(Author);
// @desc   delete Author by id
// @route  DELETE /api/Author/:id
// @access Privte

exports.deleteAuthor = factory.deleteOne(Author);

// @desc   add book to  Author by id
// @route  DELETE /api/Author/:id/bookes
// @access Privte
