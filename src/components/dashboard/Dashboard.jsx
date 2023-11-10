import { useEffect, useState } from "react";

import {
  CustomButton,
  CustomCollapse,
  CustomSelectBox,
  CustomAlert,
  CustomDatePicker,
} from "../main/custom";

import {
  DashboardCards,
  DashboardOrderDetails,
  DashboardStats,
  DashboardRevenueOrders,
} from "./";

import { useDispatch, useSelector } from "react-redux";
import {
  addFilters,
  clearFilters,
  getAllOrders,
  getOrdersByFilter,
} from "../../features/orders/orderSlice";

function Dashboard() {
  const {
    // filter data state values
    itemTypeFilter,
    orderStateFilter,
    startDate,
    endDate,
    // static data state values
    itemTypeOptions,
    orderStateOptions,
    // data state values
    orders,
    isLoading,
  } = useSelector((store) => store.allOrders);
  const dispatch = useDispatch();

  const [showStats, setShowStats] = useState(true);

  // handle the FILTER DATES
  const handleValueChange = (newValue) => {
    dispatch(addFilters(newValue));
  };

  // to handle the FILTER FORM
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
          alertType={"bg-sky-200"}
        ></CustomAlert>
      </div>
    );
  }

  // if orders are available
  return (
    <>
      {/* Page menu */}

      <div className="flex flex-row flex-wrap gap-5 items-center align-top justify-between">
        <div></div>
        <div>
          <CustomButton
            label={showStats ? "Hide stats" : "Show stats"}
            btnBGColor={"bg-yellow-300"}
            customClass={"btn-sm m-0 me-5 hover:bg-yellow-400"}
            handleFunction={() => {
              setShowStats(!showStats);
            }}
          ></CustomButton>

          <CustomButton
            label={"filter"}
            btnBGColor={"bg-sky-300"}
            customClass={"btn-sm m-0 hover:bg-sky-400"}
            handleFunction={() => {
              document.getElementById("filter_modal").showModal();
              setShowStats(false);
            }}
          ></CustomButton>
          <dialog id="filter_modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-5">Select Filters</h3>
              <form
                onSubmit={handleFilterForm}
                className="flex flex-col justify-around "
              >
                <CustomDatePicker
                  label="Filter by dates"
                  value={{ startDate, endDate }}
                  handleValueChange={handleValueChange}
                ></CustomDatePicker>

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
                <span className="gap-5 items-center flex flex-col lg:flex-row">
                  <CustomButton
                    type={"submit"}
                    label={"Apply Filters"}
                    btnBGColor={"bg-green-300"}
                    customClass={"btn mt-5 hover:bg-green-400  w-fit"}
                  ></CustomButton>
                  <CustomButton
                    type={"button"}
                    label={"Clear Filters"}
                    btnBGColor={"bg-red-300"}
                    customClass={"btn hover:bg-red-400 m-0 w-fit"}
                    handleFunction={() => {
                      dispatch(clearFilters());
                      dispatch(getOrdersByFilter());
                    }}
                  ></CustomButton>
                </span>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      {/* stats */}

      {showStats && (
        <div className="border border-gray-400 p-2 md:p-5 rounded-lg shadow-md">
          <h2 className="text-xl mb-5">Stats</h2>
          <DashboardStats />
        </div>
      )}

      {/* Revenue and Orders charts  */}

      <CustomCollapse label={"Revenue & Orders"}>
        <DashboardRevenueOrders />
      </CustomCollapse>

      {/* render data depending on number of orders */}

      {orders.length === 0 ? (
        <CustomAlert
          content={"No data found"}
          alertType={"alert-warning"}
        ></CustomAlert>
      ) : (
        <span>
          {/* Order Details */}
          <CustomCollapse label={"Order Details"}>
            <DashboardOrderDetails />
          </CustomCollapse>

          {/* Order cards */}
          <CustomCollapse
            customClass={"mb-0"}
            label={`Orders - ${orders.length}`}
          >
            <DashboardCards />
          </CustomCollapse>
        </span>
      )}
    </>
  );
}

export default Dashboard;
