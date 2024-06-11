/* eslint-disable no-unused-vars */
import { Form, redirect, useNavigation, Link, Navigate } from "react-router-dom";
import { Input } from "../components";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

// import { useAuth } from "../context/AuthContext";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  try {
    const response = await customFetch.post("/auth/login", data);
    if (response.data.user) {
      toast.success("Logged in successfully");
      return redirect("/dashboard");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login failed");
  }
  return null;
};
const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // const { isAuthenticated, loading } = useAuth();
  // if (loading) {
  //   return null; // Optional: Add a loading spinner
  // }

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace={true} />;
  // }
  return (
    <>
      <div className="flex min-h-full w-96 mx-auto my-10 flex-col px-6 py-12 lg:px-8 bg-white rounded-xl shadow-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form className="space-y-6" action="#" method="POST">
            <div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                label="Email"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                label="Password"
                required
              />
              <div className="flex justify-end text-sm mt-2">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-primary hover:text-accent"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {isSubmitting ? "Loading..." : "Sign in"}
              </button>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not registered?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-primary hover:text-accent"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
