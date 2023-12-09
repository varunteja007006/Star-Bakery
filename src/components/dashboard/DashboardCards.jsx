import { useSelector } from "react-redux";
import { CustomCard, CustomAlert } from "../main/custom";

function DashboardCards() {
  const { orders } = useSelector((store) => store.allOrders);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 mb-5">
      {orders.length > 0 ? (
        orders.map((item) => {
          return <CustomCard key={item._id} {...item}></CustomCard>;
        })
      ) : (
        <CustomAlert
          content={"No data found"}
          alertType={"alert-warning"}
        ></CustomAlert>
      )}
    </div>
  );
}

export default DashboardCards;
