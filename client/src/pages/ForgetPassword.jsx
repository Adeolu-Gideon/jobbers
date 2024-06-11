import { Link, Navigate } from "react-router-dom";
import { Input, SubmitBtn } from "../components";
import { useAuth } from "../context/AuthContext";

const ForgetPassword = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return null; // Optional: Add a loading spinner
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  
  return (
    <>
      <div className="flex min-h-full w-96 mx-auto my-24 flex-col px-6 py-12 lg:px-8 bg-white rounded-xl shadow-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                label="Email"
              />
            </div>

            <div>
              <SubmitBtn />
            </div>
          </form>

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
}
export default ForgetPassword