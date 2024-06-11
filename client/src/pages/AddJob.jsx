/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Content from "../components/Content";
import Box from "../components/Box";
import { Form, redirect, useOutletContext } from "react-router-dom";
import { Input, InputSelect } from "../components";
import customFetch from "../../../utils/customFetch";
import { JOB_EXPERIENCE, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; 

export const action = async ({ request }) => {
  const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  const file = formData.get("companyLogo");
  if (file && file.size > 500000) {
    toast.error("Image size is too large");
    return null;
  }

  const jobDescription = formData.get("jobDescription");

  try {
    const jobData = {
      ...Object.fromEntries(formData),
      jobDescription
    };

    await customFetch.post("/jobs", jobData);
    toast.success("Job created successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return null;



  // const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  // try {
  //   await customFetch.post("/jobs", data);
  //   toast.success("Job created successfully");
  //   return redirect("/dashboard/all-jobs");
  // } catch (error) {
  //   toast.error(error?.response?.data?.message);
  //   return error;
  // }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const { quill, quillRef } = useQuill();
  const [jobDescription, setJobDescription] = useState("");

  React.useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
         setJobDescription(quill.getText());
      });
    }
  }, [quill]);

  return (
    <Content>
      <Box className="pl-6 md:pl-56 lg:pl-16">
        <h1 className="text-3xl font-bold ">Add Job</h1>
        <Form method="post" enctype="multipart/form-data">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 rounded-xl p-6 bg-white shadow-sm">
            <div>
              <Input
                type="file"
                name="companyLogo"
                id="companyLogo"
                accept="image/*"
                className="capitalize"
                label="Company Logo (max 0.5MB)"
              />
            </div>
            <div>
              <Input
                type="text"
                name="company"
                className="capitalize"
                placeholder="Meta"
                label="Company Name"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                name="position"
                className="capitalize"
                placeholder="UI Designer"
                label="Position"
                required
              />
            </div>
            <div>
              <InputSelect
                name="jobExperience"
                label="Experience"
                items={Object.values(JOB_EXPERIENCE)}
                defaultValue={JOB_EXPERIENCE.ENTRY_LEVEL}
              />
            </div>
            <div>
              <Input
                type="text"
                name="jobLocation"
                className="capitalize"
                placeholder="Lagos"
                label="Job Location"
                defaultValue={user.location}
                required
              />
            </div>
            <div>
              <Input
                type="text"
                name="jobSalary"
                className="capitalize"
                placeholder="$100K"
                label="Salary"
                required
              />
            </div>
            {/* <div>
              <label
                htmlFor="jobStatus"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Job Status
              </label>
              <select
                name="jobStatus"
                id="jobStatus"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-50 sm:text-sm sm:leading-6"
                defaultValue={JOB_STATUS.PENDING}
              >
                {Object.values(JOB_STATUS).map((status) => {
                  return (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  );
                })}
              </select>
            </div> */}
            <div>
              <InputSelect
                name="jobStatus"
                label="Job Status"
                items={Object.values(JOB_STATUS)}
                defaultValue={JOB_STATUS.PENDING}
              />
            </div>
            <div>
              <InputSelect
                name="jobType"
                label="Job Type"
                items={Object.values(JOB_TYPE)}
                defaultValue={JOB_TYPE.FULL_TIME}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="jobDescription"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Job Description
              </label>
              <div className="mt-2.5">
                <div style={{ height: 300 }}>
                  <div ref={quillRef} />
                  <input
                    type="hidden"
                    name="jobDescription"
                    value={jobDescription}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <SubmitBtn />
            </div>
          </div>
        </Form>
      </Box>
    </Content>
  );
};
export default AddJob;
