import Content from "../components/Content";
import Box from "../components/Box";
import { Input, SubmitBtn } from "../components";
import { Form, useOutletContext } from "react-router-dom";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar");
  if (file && file.size > 500000) {
    toast.error("Image size is too large");
    return null;
  }
  try {
    await customFetch.patch(`/users/update-user/`, formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const {name, lastName, email, location} = user;
  
  return (
    <Content>
      <Box className="pl-6 md:pl-56 lg:pl-16">
        <h1 className="text-3xl font-bold ">Profile</h1>
        <div className="mt-10">
          <Form
            className="space-y-6"
            action="#"
            method="POST"
            enctype="multipart/form-data"
          >
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 rounded-xl p-6 bg-white shadow-sm">
              <div>
                <Input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  className="capitalize"
                  label="Select an image file (max 0.5MB)"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="name"
                  defaultValue={name}
                  className="capitalize"
                  placeholder="First Name"
                  label="First Name"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  defaultValue={lastName}
                  className="capitalize"
                  placeholder="Last Name"
                  label="Last Name"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  defaultValue={email}
                  placeholder="Email"
                  label="Email"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="location"
                  defaultValue={location}
                  className="capitalize"
                  placeholder="Location"
                  label="Location"
                />
              </div>

              <div className="col-span-full">
                <SubmitBtn />
              </div>
            </div>
          </Form>
        </div>
      </Box>
    </Content>
  );
};
export default Profile;
