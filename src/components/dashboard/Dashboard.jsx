import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  CustomBarChart,
  CustomCard,
  CustomCollapse,
  CustomStats,
} from "../main/custom";
import productCost from "../../data/productCost";

function Dashboard() {
  const [data, setData] = useState([]);
  const [itemTypeStats, setItemTypeStats] = useState([]);
  const [orderStateStats, setOrderStateStats] = useState([]);
  const [branchStats, setBranchStats] = useState([]);
  const [totalOrderData, setTotalOrderData] = useState([]);
  const [totalOrderRevenueData, setTotalOrderRevenueData] = useState([]);
  const [salesRevenue, setSalesRevenue] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);

  const getStats = async (data) => {
    let itemTypeStats = {};
    let arrItemTypeStats = [];

    let orderStateStats = {};
    let arrOrderStateStats = [];

    let branchStats = {};
    let arrBranchStats = [];

    let sortable = [];
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const elementItemType = data[index].itemType.toLowerCase();
        const elementOrderState = data[index].orderState.toLowerCase();
        const elementBranch = data[index].branch.toLowerCase();
        // item type count
        if (elementItemType) {
          if (!itemTypeStats[elementItemType]) {
            itemTypeStats[elementItemType] = 1;
          } else {
            itemTypeStats[elementItemType] = itemTypeStats[elementItemType] + 1;
          }
        }

        // order State count
        if (elementOrderState) {
          if (!orderStateStats[elementOrderState]) {
            orderStateStats[elementOrderState] = 1;
          } else {
            orderStateStats[elementOrderState] =
              orderStateStats[elementOrderState] + 1;
          }
        }

        // branch count
        if (elementBranch) {
          if (!branchStats[elementBranch]) {
            branchStats[elementBranch] = 1;
          } else {
            branchStats[elementBranch] = branchStats[elementBranch] + 1;
          }
        }
      }
    }

    let itemTypeStatskeys = Object.keys(itemTypeStats);
    let orderStateStatskeys = Object.keys(orderStateStats);

    // item type bar chart data
    for (let index = 0; index < itemTypeStatskeys.length; index++) {
      let obj = {};
      const element = itemTypeStatskeys[index];
      obj["name"] = element;
      obj["count"] = itemTypeStats[element];
      arrItemTypeStats.push(obj);
    }

    // order status bar chart data
    for (let index = 0; index < orderStateStatskeys.length; index++) {
      let obj = {};
      const element = orderStateStatskeys[index];
      obj["name"] = element;
      obj["count"] = orderStateStats[element];
      arrOrderStateStats.push(obj);
    }

    let totalSale = 0;
    let totalOrder = 0;
    for (let index = 0; index < arrItemTypeStats.length; index++) {
      const element = arrItemTypeStats[index].name.toLowerCase();
      totalOrder += arrItemTypeStats[index].count;
      for (let i = 0; i < productCost.length; i++) {
        const product = productCost[i].product.toLowerCase();
        if (product === element) {
          totalSale += productCost[i].cost * arrItemTypeStats[index].count;
        }
      }
    }
    setSalesRevenue(totalSale);
    setTotalOrder(totalOrder);

    for (var branch in branchStats) {
      sortable.push([branch, branchStats[branch]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    sortable.splice(5);

    // branch bar chart data
    for (let index = 0; index < sortable.length; index++) {
      let obj = {};
      const element = sortable[index][0];
      obj["name"] = element;
      obj["count"] = branchStats[element];
      arrBranchStats.push(obj);
    }

    const totalOrderData = { name: "Total Orders", count: totalOrder };
    const totalOrderRevenueData = {
      name: "Total Order Revenue",
      count: totalSale,
    };

    return {
      arrItemTypeStats,
      arrOrderStateStats,
      arrBranchStats,
      totalOrderData,
      totalOrderRevenueData,
    };
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + `orders`);
      const data = await response.data;
      const {
        arrItemTypeStats,
        arrOrderStateStats,
        arrBranchStats,
        totalOrderData,
        totalOrderRevenueData,
      } = await getStats(data);
      setItemTypeStats(arrItemTypeStats);
      setOrderStateStats(arrOrderStateStats);
      setBranchStats(arrBranchStats);
      setTotalOrderData(totalOrderData);
      setTotalOrderRevenueData(totalOrderRevenueData);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-5">Dashboard</h2>
      {/* stats */}
      <div className="flex flex-wrap gap-5 items-center mb-5">
        <CustomStats
          label={"Total Revenue"}
          value={`₹ ${salesRevenue}`}
        ></CustomStats>
        <CustomStats label={"Total Order"} value={totalOrder}></CustomStats>
      </div>
      {/* bar graphs */}
      <div>
        <h3 className="text-lg">Top 5 Branches</h3>
        {branchStats && <CustomBarChart data={branchStats}></CustomBarChart>}
      </div>

      <span className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <h3 className="text-lg">Total Revenue</h3>
          {totalOrderRevenueData && (
            <CustomBarChart data={[totalOrderRevenueData]}></CustomBarChart>
          )}
        </div>
        <div>
          <h3 className="text-lg">Total Orders</h3>
          {totalOrderData && (
            <CustomBarChart data={[totalOrderData]}></CustomBarChart>
          )}
        </div>
      </span>
      
      <CustomCollapse label={"Order Details"}>
        <div className="mt-5">
          <h3 className="text-lg">Order Item Types</h3>
          {itemTypeStats && (
            <CustomBarChart data={itemTypeStats}></CustomBarChart>
          )}
        </div>
        <div className="mt-5">
          <h3 className="text-lg ">Order Delivery Status</h3>
          {orderStateStats && (
            <CustomBarChart data={orderStateStats}></CustomBarChart>
          )}
        </div>
      </CustomCollapse>

      <CustomCollapse label={"Order Cards"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 mb-5">
          {data &&
            data.map((item, index) => {
              return <CustomCard key={index} {...item}></CustomCard>;
            })}
        </div>
      </CustomCollapse>
    </>
  );
}

export default Dashboard;
