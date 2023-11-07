/* eslint-disable react/prop-types */
import { CustomBarChart } from "../main/custom";

function CustomBarChartContainer({ label, data }) {
  return (
    <div className="mt-5">
      {data ? (
        <>
          <h3 className="text-lg">{label}</h3>
          <CustomBarChart data={data}></CustomBarChart>
        </>
      ) : (
        <>Oops, something went wrong....</>
      )}
    </div>
  );
}

export default CustomBarChartContainer;
