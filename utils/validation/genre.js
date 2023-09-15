const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddlewer = require("../../middleware/validation");

// create vaildator for get Genre
exports.getGenreValidator = [
  check("id").isMongoId().withMessage("invaild categorye id "),
  validatorMiddlewer,
];

// create vaildator for create Genre
exports.createGenreValidator = [
  check("name")
    .notEmpty()
    .withMessage("hi")
    .isLength({ max: 30, min: 3 })
    .withMessage(
      "Genre must be at least 3 characters and t most 30 characters !"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddlewer,
];

// create vaildator for deletes Genre
exports.deleteGenreValidator = [
  check("id").isMongoId().withMessage("invaild categorye id "),
  validatorMiddlewer,
];

// create vaildator for update Genre
exports.updateGenreValidator = [
  check("id").isMongoId().withMessage("invaild categorye id "),
  body("name")
    .optional()
    .isLength({ max: 30, min: 3 })
    .withMessage(
      "Genre must be at least 3 characters and t most 30 characters!"
    )
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description").optional(),
  validatorMiddlewer,
];
