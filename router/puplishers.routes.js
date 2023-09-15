const router = require("express").Router();

const {
  createpuplisher,
  updatepuplisher,
  deletepuplisher,
  getpuplishers,
  getpuplisherById,
  addBookToPuplisher,
  deleteBookToPuplisher,
  getBookesOfPuplisher,
} = require("../services/puplisher.service");

const { allowedTo, protect } = require("../services/auth.service");

// router.use(protect);
router
  .route("/book/")
  .get(getBookesOfPuplisher)
  .post(addBookToPuplisher)
  .delete(deleteBookToPuplisher);

// admins

// router.use(allowedTo("admin"));
// TODO : add some search keywords to the ApiFeature
router.route("/").get(getpuplishers).post(createpuplisher);

router
  .route("/:id")
  .get(getpuplisherById)
  .put(updatepuplisher)
  .delete(deletepuplisher);

module.exports = router;
