import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/navbar";
import { useParams } from "react-router-dom";

export default function Project() {
  const [project, setProject] = useState({});
  const [task, setTask] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/project/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setProject(response.data.project);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [project]);
  // console.log(project);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleTaskSubmit = async (event) => {
    event.preventDefault();
    console.log(task);
    const data = { ...task, project: id };
    try {
      const result = await axios.post("http://localhost:3000/task", data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setProject(result.data.project);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="px-12 bg-neutral-100 h-screen font-serif  flex flex-col">
        <div className="pt-4 text-center text-xl">{project.projectName}</div>
        <div className="text-center py-4">Tasks</div>
        <div className="grid grid-cols-5 bg-white border divide-x text-center py-2">
          <div>Name</div>
          <div className="col-span-2">Desc</div>
          <div> Status</div>
          <div>dueDate</div>
        </div>
        {/* {console.log("tasks>>>", project.tasks)} */}
        <div className="grid grid-cols-5 bg-neutral-50 text-center divide-x divide-y  ">
          {project.tasks != null &&
            project.tasks.map((task) => (
              <>
                <div>{task.taskName}</div>
                <div className="col-span-2  text-sm">{task.description}</div>
                <div>{task.status}</div>
                <div>{task.dueDate}</div>
              </>
            ))}
        </div>
        <div className="grid grid-cols-5 bg-white border divide-x text-center py-2">
          <input
            name="taskName"
            className="placeholder: text-center focus:outline-none"
            placeholder="Task Name"
            required
            onChange={handleChange}
          />
          <input
            name="description"
            className="placeholder: text-center col-span-2 focus:outline-none"
            placeholder="Description"
            required
            onChange={handleChange}
          />

          <select
            name="status"
            id="register_role"
            className="bg-white placeholder: text-center text-gray-900 text-sm  text-neutral-400 focus:outline-none  w-full p-2"
            required
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            name="dueDate"
            className="placeholder: text-center text-neutral-400"
            type="date"
            required
            onChange={handleChange}
          />
        </div>
        <div
          className="ms-auto p-2 border bg-green-500 text-white cursor-pointer hover:bg-green-400  rounded-lg"
          onClick={handleTaskSubmit}
        >
          Add
        </div>
      </div>
    </>
  );
}
