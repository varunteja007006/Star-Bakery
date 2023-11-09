/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dummy = { name: "No data", count: 0 };

const initialFiltersState = {
  itemTypeFilter: "",
  orderStateFilter: "",
  startDate: "",
  endDate: "",
  skip: 0,
  limit: 0,
  sort: -1,
};

const initialState = {
  isLoading: true,
  orders: [],
  itemTypeStats: [dummy],
  orderStateStats: [dummy],
  branchStats: [dummy],
  totalOrders: 0,
  totalOrdersData: [dummy],
  totalRevenue: 0,
  totalRevenueData: [dummy],
  itemTypeOptions: ["cake", "cookies", "muffins"],
  orderStateOptions: ["created", "shipped", "delivered", "cancelled"],
  ...initialFiltersState,
};

// get all orders
export const getAllOrders = createAsyncThunk(
  "dashboard/allOrders",
  async (_, thunkAPI) => {
    const { skip, limit, sort } = thunkAPI.getState().allOrders;

    let url =
      import.meta.env.VITE_API_URL +
      `/api/orders?skip=${skip}&limit=${limit}&sort=${sort}`;

    try {
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// get orders by applying filter
export const getOrdersByFilter = createAsyncThunk(
  "dashboard/filteredOrders",
  async (_, thunkAPI) => {
    const {
      skip,
      limit,
      startDate,
      endDate,
      itemTypeFilter,
      orderStateFilter,
      sort,
    } = thunkAPI.getState().allOrders;

    let url =
      import.meta.env.VITE_API_URL +
      `/api/orders?skip=${skip}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&orderState=${orderStateFilter}&itemType=${itemTypeFilter}&sort=${sort}`;

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
        state.totalOrdersData = filteredStats.totalOrdersData;
        state.totalRevenueData = filteredStats.totalRevenueData;
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
