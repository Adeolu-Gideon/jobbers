/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom"
import { DashboardNavbar, Footer, MobileSidebar, Sidebar } from "../components"
import { createContext, useContext, useState } from "react";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async(user) => {
  try {
    const {data} = await customFetch.get("/users/current-user");
    return data;
    // return data;
  } catch (error) {
    return redirect("/login");
  }
}
const DashboardContext = createContext();

const DashboardLayout = () => {
  const {user} = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/login");
    await customFetch.get("/auth/logout");
    toast.success("Logged out successfully");
  };
  
  return (
    <>
      <DashboardContext.Provider value={{user, showSidebar, toggleSidebar, logoutUser}}>
        <div>
          <main>
            {/* <MobileSidebar /> */}
            <Sidebar />
            <div>
              <DashboardNavbar />
              <div>
                <Outlet context={{user}}/>
              </div>
            </div>
          </main>
        </div>
      </DashboardContext.Provider>
    </>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;