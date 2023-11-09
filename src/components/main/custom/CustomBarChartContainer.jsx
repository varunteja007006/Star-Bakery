/* eslint-disable react/prop-types */

// Custom bar chart container to give headings for the bar chart

import { CustomAlert, CustomBarChart } from ".";

function CustomBarChartContainer({ label, data }) {
  return (
    <div className="mt-5">
      {data ? (
        <>
          <h3 className="text-lg">{label}</h3>
          <CustomBarChart data={data} barColor="#0369a1"></CustomBarChart>
        </>
      ) : (
        <CustomAlert
          content="Oops something went wrong"
          alertType={"alert-warning"}
        />
      )}
    </div>
  );
}

export default CustomBarChartContainer;
