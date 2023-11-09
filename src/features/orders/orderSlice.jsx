/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialFiltersState = {
  itemTypeFilter: "",
  orderStateFilter: "",
  time: "",
  skip: 0,
  limit: 0,
  sort: -1,
};

const initialState = {
  isLoading: true,
  orders: [],
  itemTypeStats: [""],
  orderStateStats: [""],
  branchStats: [""],
  totalOrders: 0,
  totalOrdersData: [""],
  totalRevenue: 0,
  totalRevenueData: [""],
  itemTypeOptions: ["cake", "cookies", "muffins"],
  orderStateOptions: ["created", "shipped", "delivered", "canceled"],
  ...initialFiltersState,
};

export const getAllOrders = createAsyncThunk(
  "dashboard/allOrders",
  async (_, thunkAPI) => {
    let url = import.meta.env.VITE_API_URL + `orders`;

    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrdersByFilter = createAsyncThunk(
  "dashboard/filteredOrders",
  async (_, thunkAPI) => {
    const { skip, limit, time, itemTypeFilter, orderStateFilter, sort } =
      thunkAPI.getState().allOrders;
    let url =
      import.meta.env.VITE_API_URL +
      `orders?skip=${skip}&limit=${limit}&time=${time}&orderState=${orderStateFilter}&itemType=${itemTypeFilter}&sort=${sort}`;

    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ordersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    addFilters: (state, { payload }) => {
      return { ...state, ...payload };
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        const { orders, stats } = { ...payload };
        state.isLoading = false;
        state.orders = orders;
        state.itemTypeStats = stats.itemTypeStats;
        state.orderStateStats = stats.orderStateStats;
        state.branchStats = stats.branchStats;
        state.totalOrders = stats.totalOrders;
        state.totalRevenue = stats.totalRevenue;
        state.totalOrdersData = stats.totalOrdersData;
        state.totalRevenueData = stats.totalRevenueData;
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      })
      .addCase(getOrdersByFilter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByFilter.fulfilled, (state, { payload }) => {
        const { orders: filteredOrders, stats: filteredStats } = { ...payload };
        state.isLoading = false;
        state.orders = filteredOrders;
        state.itemTypeStats = filteredStats.itemTypeStats;
        state.orderStateStats = filteredStats.orderStateStats;
        console.log(filteredStats);
      })
      .addCase(getOrdersByFilter.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      });
  },
});

export const { addFilters, clearFilters, showLoading, hideLoading } =
  ordersSlice.actions;
export default ordersSlice.reducer;
