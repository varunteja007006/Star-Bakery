/* eslint-disable no-undef */
const express = require("express");
const {
  createOrder,
  getOrders,
  getOrder,
} = require("../controllers/orderController");

//express router
const router = express.Router();

//get all orders
router.get("/", getOrders);

//get a single order
router.get("/:id", getOrder);

//post a new order
router.post("/", createOrder);

module.exports = router;
