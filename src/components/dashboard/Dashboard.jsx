import axios from "axios";
import { useState, useEffect } from "react";
import { CustomCard, CustomCollapse, CustomStats } from "../main/custom";
import productCost from "../../data/productCost";
import CustomBarChartContainer from "./CustomBarChartContainer";

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

    const totalOrderData = [{ name: "Total Orders", count: totalOrder }];
    const totalOrderRevenueData = [
      {
        name: "Total Order Revenue",
        count: totalSale,
      },
    ];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-5">Dashboard</h2>
      {/* stats */}
      <div className="flex flex-wrap gap-5 items-center">
        <CustomStats
          label={"Total Revenue"}
          value={`₹ ${salesRevenue}`}
        ></CustomStats>
        <CustomStats label={"Total Order"} value={totalOrder}></CustomStats>
      </div>

      {/* bar graphs */}
      <CustomBarChartContainer
        label={"Top 5 Branches"}
        data={branchStats}
      ></CustomBarChartContainer>

      <CustomCollapse label={"Total Revenue & Orders"}>
        <span className="grid grid-cols-1 lg:grid-cols-2 mt-5">
          <CustomBarChartContainer
            label={"Total Revenue"}
            data={totalOrderRevenueData}
          ></CustomBarChartContainer>
          <CustomBarChartContainer
            label={"Total Orders"}
            data={totalOrderData}
          ></CustomBarChartContainer>
        </span>
      </CustomCollapse>

      <CustomCollapse label={"Order Details"}>
        <CustomBarChartContainer
          label={"Order Item Types"}
          data={itemTypeStats}
        ></CustomBarChartContainer>
        <CustomBarChartContainer
          label={"Order Delivery Status"}
          data={orderStateStats}
        ></CustomBarChartContainer>
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
