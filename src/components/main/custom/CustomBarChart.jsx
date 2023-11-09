/* eslint-disable react/prop-types */

// Custom bar chart for generating the bar charts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey={"count"} fill="#b775ff" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CustomBarChart;
