/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Content from "../components/Content"
import Box from "../components/Box"
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { StatItem } from "../components";
import { HiUser, HiBriefcase } from "react-icons/hi2";
import { JOB_STATUS } from "../../../utils/constants";
import { FaBriefcase } from "react-icons/fa";


export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to view this page");
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Content>
      <Box className="pl-6 md:pl-56 lg:pl-16">
        <h1 className="text-3xl font-bold ">Admin</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3 mt-5 rounded-xl">
          <StatItem
            title="Total Users"
            count={users}
            icon={<HiUser />}
            color="bg-primary"
          />
          <StatItem
            title="Total Jobs"
            count={jobs}
            icon={<FaBriefcase />}
            color="bg-accent"
          />
          <StatItem
            title="Total Interviews"
            count={jobs.interview ? jobs.length : 0}
            icon={<HiBriefcase />}
            color="bg-hover"
          />
        </div>
      </Box>
    </Content>
  );
}
export default Admin