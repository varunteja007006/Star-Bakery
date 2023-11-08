import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    allOrders: orderSlice,
  },
});
