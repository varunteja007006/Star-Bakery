/* eslint-disable no-undef */

//Import Mongoose
const mongoose = require("mongoose");

//Get Schema from mongoose
const Schema = mongoose.Schema;

//Create the model using Schema
const orderSchema = new Schema(
  {
    itemType: {
      type: String,
      required: true,
    },
    orderState: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    customerID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
