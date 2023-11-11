/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { CustomAlert, CustomButton, PageBody } from "../components/main/custom";
import { useEffect, useState } from "react";
import axios from "axios";
import format from "date-fns/format";

function OrderDetails() {
  const params = useParams();

  const [data, setData] = useState("");

  const [isLoading, setisLoading] = useState(true);

  const getSingleOrder = async (params) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/api/orders/${params.id}`
      );
      const data = await response.data;
      setData(data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleOrder(params);
  }, []);

  //   if order loading
  if (isLoading) {
    return (
      <PageBody>
        <progress className="progress w-56 mb-5"></progress>
        <CustomAlert
          content={"Please wait while we fetch your data"}
          alertType={"bg-sky-200"}
        ></CustomAlert>
      </PageBody>
    );
  }

  // if loading is done and data is available
  if (data) {
    const { _id, itemType, orderState, branch, customerID, updatedAt } = {
      ...data,
    };

    const date = new Date(updatedAt);
    const formattedDate = format(date, "	PPPppp");
    return (
      <PageBody PageTitle={"Order Details"}>
        <div className="flex flex-col flex-wrap gap-3 items-left">
          <div className="join join-vertical">
            <p className="text-sm me-1 font-bold">Customer ID:</p>
            <p className="text-lg capitalize">{customerID}</p>
          </div>
          <div className="join join-vertical">
            <p className="text-sm me-1 font-bold">Item:</p>
            <p className="text-lg capitalize">{itemType}</p>
          </div>
          <div className="join join-vertical">
            <p className="text-sm me-1 font-bold">Branch:</p>
            <p className="text-lg capitalize">{branch}</p>
          </div>
          <div className="join join-vertical">
            <p className="text-sm me-1 font-bold">Order Status:</p>
            <p className="text-lg capitalize"> {orderState}</p>
          </div>
          <div className="join join-vertical">
            <p className="text-gray-800 text-sm me-1">Last Modified Date: </p>
            <p className="text-gray-800 text-sm"> {formattedDate}</p>
          </div>
          <div className="join join-vertical">
            <p className="text-gray-800 text-sm me-1">Order reference ID: </p>
            <p className="text-gray-800 text-sm"> {_id}</p>
          </div>
          <Link to={`/`}>
            <CustomButton
              label={"Back to home"}
              btnBGColor={"bg-yellow-300"}
              customClass={"w-fit hover:bg-yellow-400"}
            ></CustomButton>
          </Link>
        </div>
      </PageBody>
    );
  }
}

export default OrderDetails;
