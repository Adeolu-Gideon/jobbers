import { NavLink } from "react-router-dom";
import { links } from "./constants/data";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useDashboardContext } from "../pages/DashboardLayout";

/* eslint-disable react/no-unknown-property */
const Sidebar = () => {
  const {toggleSidebar, user} = useDashboardContext()
  return (
    <>
      <aside className="fixed z-50 ">
        <input type="checkbox" className="peer hidden" id="sidebar-open" />
        <label
          className="peer-checked:rounded-full peer-checked:p-2 peer-checked:right-6 peer-checked:bg-gray-600 peer-checked:text-white absolute top-4 z-20 mx-4 cursor-pointer md:hidden"
          for="sidebar-open"
        >
          <HiOutlineBars3 className="h-8 w-8" />
        </label>
        <nav
          aria-label="Sidebar Navigation"
          className="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-primary text-white transition-all md:h-screen md:w-52 lg:w-56"
        >
          <div className="bg-primary mt-5 py-4 pl-10 md:mt-10">
            <span className="">
              <span className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary align-bottom text-2xl font-bold">
                J
              </span>
              <span className="text-xl">obbers</span>
            </span>
          </div>
          <ul className="mt-8 space-y-3 md:mt-20">
            {links.map((item, index) => {
              const {link} = item;
              const {role} = user;
              if (link === "admin" && role !== "admin") return;
              return (
                <li key={index} className="relative">
                  <NavLink
                    to={item.link}
                    className="focus:bg-accent hover:bg-hover flex w-full space-x-2 rounded-md px-10 py-4 text-white focus:outline-none items-center"
                    onClick={toggleSidebar}
                    end
                  >
                    <item.icon
                      className="h-8 w-8 text-white mr-2"
                      aria-hidden="true"
                    />
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar