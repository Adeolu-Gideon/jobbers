/* eslint-disable no-unused-vars */
import Content from "../components/Content";
import JobContainer from "../components/JobContainer";
import Box from "../components/Box";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import JobFilter from "../components/JobFilter";
import { createContext, useContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  
  try {
    const {data} = await customFetch.get("/jobs", {params});
    return {data, searchValues:{...params}};
  } catch (error) {
     toast.error(error?.response?.data?.message);
     return error;
  }
}

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  
  return (
    <Content>
      <Box className="pl-6 md:pl-56 lg:pl-16">
        <h1 className="text-3xl font-bold ">All Jobs</h1>
        <AllJobsContext.Provider value={{ data, searchValues }}>
          <JobFilter />
          <JobContainer />
        </AllJobsContext.Provider>
      </Box>
    </Content>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
