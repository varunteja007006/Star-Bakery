import { CustomBarChartContainer } from "../main/custom";
import { useSelector } from "react-redux";
function DashboardOrderDetails() {
  const { itemTypeStats, orderStateStats } = useSelector(
    (store) => store.allOrders
  );
  return (
    <div>
      <CustomBarChartContainer
        label={"Order Item Types"}
        data={itemTypeStats}
      ></CustomBarChartContainer>
      <CustomBarChartContainer
        label={"Order Status"}
        data={orderStateStats}
      ></CustomBarChartContainer>
    </div>
  );
}

export default DashboardOrderDetails;
