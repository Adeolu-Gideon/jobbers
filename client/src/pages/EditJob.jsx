/* eslint-disable no-unused-vars */
import { Box, Content } from "../components"
import {
  Form,
  redirect,
  useNavigation,
  useLoaderData,
} from "react-router-dom";
import { Input, InputSelect } from "../components";
import customFetch from "../../../utils/customFetch";
import { JOB_EXPERIENCE, JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; 
import { useEffect, useState } from "react";


export const loader = async ({ params }) => {
  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
}
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  const file = formData.get("companyLogo");
  if (file && file.size > 500000) {
    toast.error("Image size is too large");
    return null;
  }
  try {
    await customFetch.patch(`/jobs/${params.id}`, formData);
    toast.success("Job updated successfully");
    return redirect("/dashboard/all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}
const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { quill, quillRef } = useQuill();
  const [jobDescription, setJobDescription] = useState(
    job.jobDescription || ""
  );

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(job.jobDescription || "");
      quill.on("text-change", () => {
        setJobDescription(quill.getText());
      });
    }
  }, [quill, job.jobDescription]);
  // console.log(job);
  return (
    <Content>
      <Box className="pl-6 md:pl-56 lg:pl-16">
        <h1 className="text-3xl font-bold">Edit Job</h1>
        <Form method="post" enctype="multipart/form-data">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 rounded-xl p-6 bg-white shadow-sm">
            <div>
              <Input
                type="file"
                name="companyLogo"
                id="companyLogo"
                accept="image/*"
                className="capitalize"
                label="Select Logo (max 0.5MB)"
              />
            </div>
            <div>
              <Input
                type="text"
                name="company"
                className="capitalize"
                placeholder="Meta"
                label="Company Name"
                defaultValue={job.company}
              />
            </div>
            <div>
              <Input
                type="text"
                name="position"
                className="capitalize"
                placeholder="UI Designer"
                label="Position"
                defaultValue={job.position}
              />
            </div>
            <div>
              <InputSelect
                name="jobExperience"
                label="Experience"
                items={Object.values(JOB_EXPERIENCE)}
                defaultValue={job.JOB_EXPERIENCE}
              />
            </div>
            <div>
              <Input
                type="text"
                name="jobLocation"
                className="capitalize"
                placeholder="Lagos"
                label="Job Location"
                defaultValue={job.jobLocation}
              />
            </div>
            <div>
              <Input
                type="text"
                name="jobSalary"
                className="capitalize"
                placeholder="$100K"
                label="Salary"
                defaultValue={job.jobSalary}
              />
            </div>
            <div>
              <InputSelect
                name="jobStatus"
                label="Job Status"
                items={Object.values(JOB_STATUS)}
                defaultValue={job.jobStatus}
              />
            </div>
            <div>
              <InputSelect
                name="jobType"
                label="Job Type"
                items={Object.values(JOB_TYPE)}
                defaultValue={job.jobType}
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-80 duration-300 flex w-full mt-8 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      </Box>
    </Content>
  );
}
export default EditJob