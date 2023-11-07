/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(express.json());
app.use(cors());

//Add routes
app.use("/api/orders", orderRoutes);

//connect to Mongo DB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "orderDB", //database name
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log("Running on port : ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
