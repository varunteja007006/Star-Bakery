import { useEffect } from "react";
import {
  CustomButton,
  CustomCard,
  CustomCollapse,
  CustomStats,
  CustomSkeleton,
  CustomSelectBox,
  CustomAlert,
} from "../main/custom";
import CustomBarChartContainer from "./CustomBarChartContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilters,
  getAllOrders,
  getOrdersByFilter,
} from "../../features/orders/orderSlice";

function Dashboard() {
  const {
    itemTypeFilter,
    orderStateFilter,
    itemTypeOptions,
    orderStateOptions,
    orders,
    isLoading,
    totalOrders,
    totalRevenue,
    itemTypeStats,
    totalOrdersData,
    totalRevenueData,
    orderStateStats,
    branchStats,
  } = useSelector((store) => store.allOrders);

  const dispatch = useDispatch();

  // to handle the filter form
  const handleFilterForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters = Object.fromEntries(formData);
    e.currentTarget.reset();

    // dispatch the action and thunk API for filters
    dispatch(addFilters(filters));
    dispatch(getOrdersByFilter());
  };

  // on initial render dispatch thunk API to fetch data
  useEffect(() => {
    dispatch(getAllOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   if orders loading
  if (isLoading) {
    return (
      <div>
        <progress className="progress w-56 mb-5"></progress>
        <CustomAlert
          content={"Please wait while we fetch your data"}
          alertType={"bg-purple-200"}
        ></CustomAlert>
      </div>
    );
  }

  //   if orders are 0
  if (orders.length === 0) {
    return (
      <CustomAlert
        content={"No data found"}
        alertType={"alert-warning"}
      ></CustomAlert>
    );
  }

  // if orders are available
  return (
    <>
      <span className="flex flex-row flex-wrap gap-5 items-center align-top justify-between">
        <h2 className="text-xl font-semibold mb-5">Dashboard</h2>

        <CustomButton
          label={"filter"}
          btnBGColor={"bg-purple-300"}
          customClass={"btn-sm mt-0 hover:bg-purple-400 "}
          handleFunction={() =>
            document.getElementById("filter_modal").showModal()
          }
        ></CustomButton>
        <dialog id="filter_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Select Filters</h3>
            <form onSubmit={handleFilterForm}>
              <CustomSelectBox
                name={"itemTypeFilter"}
                id={"itemTypeFilter"}
                label={"Item Type"}
                value={itemTypeFilter}
                options={itemTypeOptions}
              ></CustomSelectBox>
              <CustomSelectBox
                name={"orderStateFilter"}
                id={"orderStateFilter"}
                label={"Order Status"}
                value={orderStateFilter}
                options={orderStateOptions}
              ></CustomSelectBox>
              <CustomButton
                type={"submit"}
                label={"Apply Filters"}
                btnBGColor={"bg-green-300"}
                customClass={"btn mt-5 hover:bg-green-400"}
              ></CustomButton>
              <CustomButton
                label={"Clear Filters"}
                btnBGColor={"bg-red-300"}
                customClass={"btn mt-5 hover:bg-red-400"}
              ></CustomButton>
            </form>
          </div>
        </dialog>
      </span>
      {/* stats */}
      <div className="flex flex-wrap gap-5 items-center">
        <CustomStats
          label={"Total Revenue"}
          value={`₹ ${totalRevenue}`}
        ></CustomStats>
        <CustomStats label={"Total Orders"} value={totalOrders}></CustomStats>
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
            data={totalRevenueData}
          ></CustomBarChartContainer>
          <CustomBarChartContainer
            label={"Total Orders"}
            data={totalOrdersData}
          ></CustomBarChartContainer>
        </span>
      </CustomCollapse>
      <CustomCollapse label={"Order Details"}>
        <CustomBarChartContainer
          label={"Order Item Types"}
          data={itemTypeStats}
        ></CustomBarChartContainer>
        <CustomBarChartContainer
          label={"Order Status"}
          data={orderStateStats}
        ></CustomBarChartContainer>
      </CustomCollapse>
      {/* Order cards */}
      <CustomCollapse customClass={"mb-0"} label={`Orders - ${orders.length}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 mb-5">
          {orders.length > 0 ? (
            orders.map((item, index) => {
              return <CustomCard key={index} {...item}></CustomCard>;
            })
          ) : (
            <CustomSkeleton></CustomSkeleton>
          )}
        </div>
      </CustomCollapse>
    </>
  );
}

export default Dashboard;
