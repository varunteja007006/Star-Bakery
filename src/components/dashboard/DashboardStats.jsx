import { CustomStats, CustomBarChartContainer } from "../main/custom";

import { useSelector } from "react-redux";

function DashboardStats() {
  const { totalOrders, totalRevenue, branchStats } = useSelector(
    (store) => store.allOrders
  );

  return (
    <div>
      <div className="flex flex-wrap gap-5 items-center">
        <CustomStats
          label={"Total Revenue"}
          value={`₹ ${totalRevenue}`}
        ></CustomStats>
        <CustomStats
          label={"Total Orders"}
          value={`${totalOrders}`}
        ></CustomStats>
      </div>
      {/* bar graph top 5 branches */}
      <CustomBarChartContainer
        label={"Top 5 Branches"}
        data={branchStats}
      ></CustomBarChartContainer>
    </div>
  );
}

export default DashboardStats;
