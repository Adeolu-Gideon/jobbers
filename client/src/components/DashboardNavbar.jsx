import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {  HiOutlineBell, HiUser } from "react-icons/hi2";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

 const DashboardNavbar = () => {
   const { user } = useDashboardContext();
   const {avatar} = user;
   const navigate = useNavigate();

   const logoutUser = async () => {
     navigate("/login");
     await customFetch.get("/auth/logout");
     toast.success("Logged out successfully");
   };
  
  return (
    <Disclosure as="nav" className="bg-white shadow-sm top-0">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center justify-center left-0 sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 ml-16 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative flex rounded-full h-8 w-8 items-center justify-center bg-secondary text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <span className="flex relative">
                    <HiOutlineBell
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                    <span className="animate-ping-custom duration-100 absolute inline-flex rounded-full h-2 w-2 right-1 bg-red-500"></span>
                  </span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="avatar"
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <HiUser
                          className="bg-white text-primary border border-primary h-8 w-8 rounded-full"
                          alt="avatar"
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logoutUser}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Log out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default DashboardNavbar;