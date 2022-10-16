const Order = require("../models/order");
const Product = require("../models/product");

// Create a new order   =>  /api/order/new
exports.newOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
};
// Get single order   =>   /api/order/:id
exports.getSingleOrder = async (req, res, next) => {
  //user is ref in populate fun and name . email are field
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({
      success: true,
      msg: "No Order found with this ID",
      order,
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// Get logged in user orders   =>   /api/orders/me
exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
};

// Get all orders - ADMIN  =>   /api/admin/orders/
exports.allOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    count: orders.length,
    orders,
  });
};

// Update / Process order - ADMIN  =>   /api/admin/order/:id
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      success: true,
      msg: "You have already delivered this order",
    });
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  console.log("orderstate", req.body.orderStatus);
  (order.orderStatus = req.body.orderStatus), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save();
}

// Delete order   =>   /api/admin/order/:id
exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: true,
      msg: "No Order found with this ID",
    });
  }

  await order.remove();

  res.status(200).json({
    success: true,
    msg: "Order Deleted Successfully",
  });
};
