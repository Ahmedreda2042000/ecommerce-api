const OrderModel = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");

exports.addOrder = exports.getOrder = factory.createOne(OrderModel);
exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") {
    req.filterObj = { user: req.user._id };
  } else {
    res.status(405);
  }
  next();
});
exports.updateOrder = (req, res) => {
  var newproduct = req.body.product;

  OrderModel.find({ _id: req.params.orderID }).then((doc) => {
    var oldProduct = doc[0].product;
    for (var x = 0; x < newproduct.length; x++) {
      for (var y = 0; y < oldProduct.length; y++) {
        if (newproduct[x]._id === oldProduct[y]._id) {
          oldProduct[y].quantity =
            Number(oldProduct[y].quantity) + Number(newproduct[x].quantity);
          newproduct.splice(x, 1);
          break;
        }
      }
    }

    oldProduct = oldProduct.concat(newproduct);
    const newOrder = {
      product: oldProduct,
    };

    OrderModel.updateOne({ _id: req.params.orderID }, { $set: newOrder })
      .then((doc) => {
        res.status(200).json({
          massage: newOrder,
        });
      })
      .catch((err) => {
        res.status(404).json({
          massage: err,
        });
      });
  });
};

exports.deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await OrderModel.findByIdAndDelete(id);

  if (!order) {
    res.status(404).json({ msg: `No order for this id ${id}` });
  }
  res.status(204).send();
});
