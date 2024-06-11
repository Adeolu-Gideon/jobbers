/* eslint-disable react/prop-types */
import BarChartComponent from "./BarChartComponent";

const ChartContainer = ({ data }) => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-5">Daily Applications</h1>
      <div className=" rounded-xl p-4 bg-white shadow-sm">
        <BarChartComponent data={data} />
      </div>
    </div>
  );
};
export default ChartContainer;
