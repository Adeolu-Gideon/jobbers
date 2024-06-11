import { MdCancel } from "react-icons/md";
import { FaCalendarCheck, FaBriefcase } from "react-icons/fa";
import StatItem from "./StatItem";

/* eslint-disable react/prop-types */
const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Pending",
      count: defaultStats?.pending || 0,
      icon: <FaBriefcase />,
      color: "bg-yellow-600",
    },
    {
      title: "Interview",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "bg-accent",
    },
    {
      title: "Declined",
      count: defaultStats?.declined || 0,
      icon: <MdCancel />,
      color: "bg-red-600",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3 mt-5 rounded-xl">
        {stats.map((item) => (
          <StatItem key={item.title} {...item} />
        ))}
      </div>
    </>
  );
};
export default StatsContainer;
