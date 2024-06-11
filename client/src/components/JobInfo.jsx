/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  HiBriefcase,
  HiCurrencyDollar,
  HiCalendar,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Form, Link } from "react-router-dom";
day.extend(advancedFormat);

const JobInfo = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  jobSalary,
  jobStatus,
  jobDescription,
  createdAt,
  companyLogo
}) => {
  const date = day(createdAt).format("MMM D, YYYY");


  return (
    <>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 mb-5">
          {companyLogo ? (
            <div className="group relative h-12 w-12 overflow-hidden rounded-lg">
              <img
                src={companyLogo}
                alt="company logo"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="group relative h-14 w-14 overflow-hidden rounded-lg bg-accent">
              <h1 className="text-3xl font-bold text-white text-center mt-2">
                {company.charAt(0).toUpperCase()}
              </h1>
            </div>
          )}

          <div>
            <h2 className="text-lg font-medium text-gray-700 sm:truncate sm:text-xl sm:tracking-tight capitalize">
              {position}
            </h2>
            <p className="text-gray-500 capitalize">{company}</p>
          </div>

          <span
            className={`text-xs text-gray-500 capitalize text-center -mt-5 ${
              jobStatus === "pending"
                ? "text-blue-600 bg-blue-200 p-1 rounded-md"
                : jobStatus === "interview"
                ? "text-green-600 bg-green-200 p-1 rounded-md"
                : jobStatus === "declined"
                ? "text-red-600 bg-red-200 p-1 rounded-md"
                : ""
            }`}
          >
            {jobStatus}
          </span>
        </div>
        {/* <p className="overflow-hidden pr-7 text-sm flex text-justify">
         {jobDescription}
        </p> */}
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-xs text-gray-500 capitalize">
            <HiBriefcase
              className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {jobType}
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500 capitalize">
            <FaLocationDot
              className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {jobLocation}
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500 capitalize">
            <HiCurrencyDollar
              className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {jobSalary}
          </div>
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <HiCalendar
              className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {date}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:block">
          <Link
            to={`../edit-job/${_id}`}
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300 inline-flex items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <HiOutlinePencilSquare
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Edit
          </Link>
        </span>

        <span className="ml-3 sm:block">
          <Form method="post" action={`../delete-job/${_id}`}>
            <button
              type="submit"
              className="transition ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-80 duration-300 inline-flex items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <RiDeleteBin5Line
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Delete
            </button>
          </Form>
        </span>
      </div>
    </>
  );
};
export default JobInfo;
