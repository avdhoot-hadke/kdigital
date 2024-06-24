import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProject() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    projectName: "",
    projectType: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(values);
    try {
      const result = await axios.post("http://localhost:3000/project", values, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center ">
      <h3 className="pb-5 text-2xl">Create Project</h3>
      <form
        id="loginForm"
        className="rounded-lg p-10 bg-neutral-100"
        onSubmit={handleSignUp}
      >
        <div className="py-2">
          <label className="ps-2">Project Name</label>
          <input
            name="projectName"
            value={values.projectName}
            onChange={handleChange}
            type="text"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="Project Name"
            required
          />
        </div>

        <div className="py-2">
          <label className="ps-2">Project Type</label>
          <input
            name="projectType"
            value={values.projectType}
            onChange={handleChange}
            type="text"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="Type"
            required
          />
        </div>
        <div className="flex py-2">
          <button
            type="submit"
            className="mx-auto bg-black p-2 w-24 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
