/* eslint-disable no-undef */

const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");
const { getStats } = require("../utils/getStats");

//get all orders
const getOrders = async (req, res) => {
  const query = req.query;
  let filter = {};
  // if startDate and endDate query exists
  if (query.startDate || query.endDate) {
    let fromDate = new Date(query.startDate);
    let toDate = new Date(query.endDate);

    if (query.startDate == query.endDate) {
      toDate.setHours(toDate.getHours() + 24);
    }

    if (!query.startDate) {
      fromDate.setFullYear(1900, 1, 1); // (year, month[0-11], day[1-31])
    }

    if (!query.endDate) {
      toDate = new Date(); // (year, month[0-11], day[1-31])
    }
    filter = {
      ...filter,
      createdAt: {
        $gte: fromDate,
        $lt: toDate,
      },
    };
  }

  // if orderState query exists
  if (query.orderState) {
    filter = { ...filter, orderState: query.orderState };
  }
  // if itemType query exists
  if (query.itemType) {
    filter = { ...filter, itemType: query.itemType };
  }
  console.log(filter);
  // fetch the order
  const orders = await Order.find(filter)
    .skip(query.skip)
    .limit(query.limit)
    .sort(query.sort);

  if (orders) {
    const stats = getStats(orders);
    return res.status(200).json({ orders, stats });
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
