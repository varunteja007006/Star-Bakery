/* eslint-disable no-undef */

const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");

//get all orders
const getOrders = async (req, res) => {
  const query = req.query;
  let filter = {};
  if (query) {
    filter = { ...query };
  }
  const orders = await Order.find(filter).skip(0).limit(1000);
  if (orders) {
    return res.status(200).json(orders);
  } else {
    return res.status(400).json({
      error: "Something went wrong. Unable to fetch data from server",
    });
  }
};

//get single order
const getOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such sample" });
  }
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ error: "no such sample" });
  }
  res.status(200).json(order);
};

//create a new order
const createOrder = async (req, res) => {
  let { itemType, orderState, branch, customerID } = req.body;
  if (orderState === "") {
    orderState = "created";
  }
  try {
    const order = await Order.create({
      itemType,
      orderState,
      branch,
      customerID,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//export the actions
module.exports = {
  createOrder,
  getOrders,
  getOrder,
};
