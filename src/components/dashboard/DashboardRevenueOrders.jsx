import {
  CustomBarChartContainer,
} from "../main/custom";

import { useSelector } from "react-redux";

function DashboardRevenueOrders() {
    const {
      totalOrdersData,
      totalRevenueData,
    } = useSelector((store) => store.allOrders);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <CustomBarChartContainer
        label={"Revenue"}
        data={totalRevenueData}
      ></CustomBarChartContainer>
      <CustomBarChartContainer
        label={"Orders"}
        data={totalOrdersData}
      ></CustomBarChartContainer>
    </div>
  );
}

export default DashboardRevenueOrders;
