/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
import JobInfo from "./JobInfo";
import { PageBtn } from ".";

const JobContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;


  if (jobs.length === 0) {
    return (
      <div className="flex justify-center text-md mt-10 bg-red-200 p-6 rounded-xl shadow-sm">
        <p className="text-red-700">
          No Job Found. <Link to="/dashboard" className="font-bold">Click To Add Job</Link>
        </p>
      </div>
    );
  }
  return (
    <>
      <h3 className="text-lg mt-10 font-semibold">
        Showing {totalJobs} {jobs.length === 1 ? "Job" : "Jobs"}
      </h3>
      {jobs.map((job) => (
        <div
          className="lg:flex lg:items-center lg:justify-between mt-5 rounded-xl p-6 bg-white shadow-sm"
          key={job._id}
        >
          <JobInfo key={job._id} {...job} />
        </div>
      ))}
      {numOfPages > 1 && <PageBtn />}
    </>
  );
};
export default JobContainer;
