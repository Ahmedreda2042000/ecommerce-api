// const express = require("express");
// const {
//   createCashOrder,
//   findAllOrders,
//   findSpecificOrder,
//   filterOrderForLoggedUser,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   checkoutSession,
// } = require("../services/orderService");

// const authService = require("../services/authService");

// const router = express.Router();

// router.use(authService.protect);

// router.get(
//   "/checkout-session/:cartId",
//   authService.allowedTo("user"),
//   checkoutSession
// );

// router.route("/:cartId").post(authService.allowedTo("user"), createCashOrder);
// router.get(
//   "/",
//   authService.allowedTo("user", "admin", "manager"),
//   filterOrderForLoggedUser,
//   findAllOrders
// );
// router.get("/:id", findSpecificOrder);

// router.put(
//   "/:id/pay",
//   authService.allowedTo("admin", "manager"),
//   updateOrderToPaid
// );
// router.put(
//   "/:id/deliver",
//   authService.allowedTo("admin", "manager"),
//   updateOrderToDelivered
// );

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  filterOrderForLoggedUser,
} = require("../services/orderService");

const authService = require("../services/authService");

const { createOrderValidator } = require("../utils/validators/orderValidator");
router.post(
  "/addorder",
  authService.protect,
  authService.allowedTo("user"),
  createOrderValidator,
  addOrder
);

router.get("/", getOrder);

router.put("/updateOrder/:orderID", updateOrder);
router.delete("/:id", deleteOrder);
module.exports = router;
