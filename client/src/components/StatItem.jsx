/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const StatItem = ({count, title, icon, color}) => {
  return (
    <>
      <div>
        <div className="flex items-center px-5 py-6 shadow-sm rounded-xl bg-white">
          <div className={`p-3 rounded-full bg-opacity-80 ${color}`}>
            <span className="h-8 w-8 text-white text-xl">{icon}</span>
          </div>

          <div className="mx-5">
            <h4 className="text-2xl font-semibold text-gray-700">{count}</h4>
            <div className="text-gray-500">{title}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default StatItem