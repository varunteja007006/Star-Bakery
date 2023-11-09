/* eslint-disable react/prop-types */
import format from "date-fns/format";
import { memo } from "react";
import { Link } from "react-router-dom";

function CustomCard({
  _id,
  itemType,
  orderState,
  branch,
  customerID,
  updatedAt,
  badge,
  badgeColor,
  badgeText,
}) {
  const date = new Date(updatedAt);
  const formattedDate = format(date, "	PPPppp");

  return (
    <Link to={`/orderDetails/${_id}`}>
      <div className="p-5 bg-sky-200 border border-gray-500 rounded-md shadow-lg">
        <div className="flex flex-col flex-wrap gap-3 items-left">
          {/* card header */}
          <div className="flex flex-row flex-wrap gap-5 items-center">
            <p className="text-lg font-bold capitalize">{customerID}</p>

            <div className="badge bg-yellow-300 p-3 font-semibold">
              {itemType}
            </div>
            {badge && (
              <div className={`badge ${badgeColor} p-3 font-semibold`}>
                {badgeText}
              </div>
            )}
          </div>
          {/* card body */}
          <div className="join join-vertical">
            <p className="text-sm me-1 font-bold">Branch:</p>
            <p className="text-lg capitalize">{branch}</p>
          </div>
          <div className="join join-vertical">
            <p className="text-sm me-1 font-bold">Order Status:</p>
            <p className="text-lg capitalize"> {orderState}</p>
          </div>
          {/* card footer */}
          <div className="join join-vertical">
            <p className="text-gray-800 text-sm me-1">Last Modified Date: </p>
            <p className="text-gray-800 text-sm"> {formattedDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(CustomCard);
