const asyncHandler = require("express-async-handler");
const Puplisher = require("../modules/puplishers");
const factory = require("./handler.service");
const { ApiError } = require("../utils/utiles");

// @desc   Create category
// @route  POST /api/category
// @access Privte or (admin/manger)
exports.createpuplisher = factory.createOne(Puplisher);

// @desc   get category
// @route  GET /api/category
// @access public
exports.getpuplishers = factory.getAll(Puplisher);

// @desc   get category by id
// @route  GET /api/category/:id
// @access public

exports.getpuplisherById = factory.getOne(Puplisher, "books");

// @desc   updata category by id
// @route  PUT /api/category/:id
// @access Privte

exports.updatepuplisher = factory.updateOne(Puplisher);
// @desc   delete category by id
// @route  DELETE /api/category/:id
// @access Privte

exports.deletepuplisher = factory.deleteOne(Puplisher);

exports.addBookToPuplisher = asyncHandler(async (req, res, next) => {
  const puplisher = Puplisher.findByIdAndUpdate(
    req.user,
    {
      $addToSet: { books: req.body.book },
    },
    { new: true }
  );

  if (!puplisher) {
    return next(new ApiError("puplisher not found", 403));
  }

  res.status(200).json({ data: puplisher });
});

exports.deleteBookToPuplisher = asyncHandler(async (req, res, next) => {
  const puplisher = Puplisher.findByIdAndUpdate(
    req.user,
    {
      $pull: { books: req.body.book },
    },
    { new: true }
  );
  if (!puplisher) {
    return next(new ApiError("puplisher not found", 403));
  }

  res.status(200).json({ data: puplisher });
});

exports.getBookesOfPuplisher = asyncHandler(async (req, res, next) => {});
