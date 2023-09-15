const router = require("express").Router();
// const reviewsRoute = require("./reviews.routes");
const {
  puplishBook,
  addBookAuthor,
  addBookGenre,
  addBookPublisher,
  deleteBook,
  getBooks,
  getBookById,
  changeAuthor,
  changeGenre,
  changePuplisher,
  updateData,
} = require("../services/book.service");
// puplisher
// router.use("/:booktId/reviews", reviewsRoute);

router
  .route("/")
  .post(puplishBook, addBookAuthor, addBookGenre, addBookPublisher)
  .get(getBooks);
router
  .route("/:id")
  .put(changeAuthor, changeGenre, changePuplisher, updateData)
  .get(getBookById)
  .delete(deleteBook);
module.exports = router;
