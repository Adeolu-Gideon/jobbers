/* eslint-disable no-unused-vars */
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { 
  HomeLayout, 
  Login, 
  Register, 
  Landing, 
  Profile, 
  Stats, 
  Admin, 
  AllJobs, 
  AddJob, 
  DashboardLayout, 
  EditJob,
  Settings, 
  Error } from "./pages";
import ForgetPassword from "./pages/ForgetPassword";
import {action as RegisterAction} from "./pages/Register";
import {action as LoginAction} from "./pages/Login";
import {action as addJobAction} from "./pages/AddJob";
import {action as editJobAction} from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as updateProfileAction } from "./pages/Profile";

import { loader as DashboardLoader } from "./pages/DashboardLayout";
import { loader as allJobLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { loader as adminLoader } from "./pages/Admin";
import { loader as statsLoader } from "./pages/Stats";
import ProtectedRoute from "./components/ProtectedRoute ";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: RegisterAction,
      },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "forgot-password",
        element: <ForgetPassword />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    loader: DashboardLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AddJob />,
        action: addJobAction,
      },
      {
        path: "stats",
        element: <Stats />,
        loader: statsLoader,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
        loader: allJobLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        action: updateProfileAction,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "admin",
        element: <Admin />,
        loader: adminLoader,
      },
      {
        path: "edit-job/:id",
        element: <EditJob />,
        loader: editJobLoader,
        action: editJobAction,
      },
      {
        path: "delete-job/:id",
        action: deleteJobAction,
      },
    ],
  },
]);

const  App = () => {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
  
}

export default App
