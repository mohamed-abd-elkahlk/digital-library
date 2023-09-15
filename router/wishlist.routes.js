const router = require("express").Router();

const authService = require("../services/auth.service");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../services/wishlist.service");

// router.use(authService.protect, authService.allowedTo("user"));

router.route("/").post(addProductToWishlist).get(getLoggedUserWishlist); //cheked

router.delete("/:productId", removeProductFromWishlist);

module.exports = router;
