const router = require("express").Router();

const {
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthor,
  getAuthorById,
  // addBookToAuthor,
  // getBooksOfAuthor,
  // deleteBookAuthor,
} = require("../services/auhtor.service");

router.route("/").get(getAuthor).post(createAuthor);

router.route("/:id").get(getAuthorById).put(updateAuthor).delete(deleteAuthor);

// router
//   .route("/:id/book")
//   .get(getBooksOfAuthor)
//   .put(addBookToAuthor)
//   .delete(deleteBookAuthor);

module.exports = router;
