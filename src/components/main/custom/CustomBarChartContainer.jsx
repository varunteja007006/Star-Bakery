/* eslint-disable react/prop-types */
import { CustomBarChart } from ".";

function CustomBarChartContainer({ label, data }) {
  return (
    <div className="mt-5">
      {data ? (
        <>
          <h3 className="text-lg">{label}</h3>
          <CustomBarChart data={data} barColor="#0369a1"></CustomBarChart>
        </>
      ) : (
        <>Oops, something went wrong....</>
      )}
    </div>
  );
}

export default CustomBarChartContainer;
