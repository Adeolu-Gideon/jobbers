/* eslint-disable no-unused-vars */
import {
  Form,
  Link,
  useSubmit
} from "react-router-dom";
import { Input, InputSelect, SubmitBtn } from "../components";
import customFetch from "../../../utils/customFetch";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useAllJobsContext } from "../pages/AllJobs";

const JobFilter = () => {
  const { searchValues } = useAllJobsContext();
  const {search, jobStatus, jobType, sort} = searchValues
  const submit = useSubmit();

  const debounce = (onChange) => {
    let debounceTimer;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <>
      <div className="w-full mt-5 rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-lg font-medium text-gray-700 sm:truncate sm:text-xl sm:tracking-tight">
          Filter Jobs
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Use filters to further refine search
        </p>
        <Form>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <Input
                type="search"
                name="search"
                className="capitalize"
                defaultValue={search}
                placeholder="Search by position, company or location"
                label="Search"
                onChange={debounce((form) => {
                  submit(form);
                })}
              />
            </div>
            <div>
              <InputSelect
                name="jobStatus"
                className="capitalize"
                label="Job Status"
                items={["all", ...Object.values(JOB_STATUS)]}
                defaultValue={jobStatus}
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
              />
            </div>
            <div>
              <InputSelect
                name="jobType"
                label="Job Type"
                items={["all", ...Object.values(JOB_TYPE)]}
                defaultValue={jobType}
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
              />
            </div>
            <div>
              <InputSelect
                name="sort"
                label="Sort By"
                items={[...Object.values(JOB_SORT_BY)]}
                defaultValue={sort}
                onChange={(e) => {
                  submit(e.currentTarget.form);
                }}
              />
            </div>
            <div className="col-span-full">
              <Link
                to="/dashboard/all-jobs"
                type="submit"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300 flex w-full mt-8 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Reset Filter
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default JobFilter;
