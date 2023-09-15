const router = require("express").Router();

// Genre services
const {
  createGenre,
  getGenres,
  getGenreById,
  updateGenreById,
  deleteGenreById,
  // uploadGenreImage,
  // resizeImage,
} = require("../services/genre.service");

// Genre validators

// const {
//   getGenreValidator,
//   createGenreValidator,
//   deleteGenreValidator,
//   updateGenreValidator,
// } = require("../utils/validation/genre");

// router.use(passport.authenticate("jwt", { session: false }));
router.route("/").post(createGenre).get(getGenres);
router
  .route("/:id")
  .get(getGenreById)
  .put(updateGenreById)
  .delete(deleteGenreById);

module.exports = router;
