const router = require("express").Router();

const passport = require("passport");
const { allowedTo, protect } = require("../services/auth.service");

const {
  createUser,
  disableLogedUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  resizeImage,
  updateLoggedUserDate,
  updateLoggedUserPassword,
  updateUser,
  uplaodUserImage,
  getMe,
} = require("../services/user.service");

// router.use(passport.authenticate("jwt", { session: false }), protect);

router.get("/getme" /*, getLoggedUserData*/, getMe);
router.patch("/change/Password", updateLoggedUserPassword);
router.put("/update", updateLoggedUserDate);
router.delete("/delete", disableLogedUser);

// router.use(allowedTo("admin"));

router.patch("/changePassword/:id", updateLoggedUserPassword);
router
  .route("/")
  .get(getAllUsers)
  .post(uplaodUserImage, resizeImage, createUser);
router
  .route("/:id")
  .get(getOneUser)
  .put(uplaodUserImage, resizeImage, updateUser)
  .delete(deleteUser);

module.exports = router;
