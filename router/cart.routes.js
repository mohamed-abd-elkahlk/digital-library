const express = require("express");

const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../services/cart.service");
const authService = require("../services/auth.service");

const router = express.Router();

router.use(authService.protect /* authService.allowedTo("user")* */);
router
  .route("/") // chkead
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.put("/applyCoupon", applyCoupon); // chkead

router
  .route("/:itemId")
  .put(updateCartItemQuantity) // chkead
  .delete(removeSpecificCartItem); // chkead

module.exports = router;
