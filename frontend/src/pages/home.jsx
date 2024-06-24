import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projects/projectSlice";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.value);
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (localStorage.getItem("token") == "" || null) navigate("/signin");
  console.log(projects);

  const handleClick = (project) => {
    console.log("Project clicked:", project);
    navigate(`/project/${project._id}`);
  };
  return (
    <div className="bg-neutral-100 h-screen w-screen ">
      <Navbar />
      <h2 className=" py-4 px-12 text-xl font-serif">Projects</h2>
      <div className="grid grid-cols-3 pe-12">
        {projects.map((project) => (
          <div
            className=" my-2 ms-12 p-4 bg-white rounded hover:shadow cursor-pointer"
            key={project._id}
            onClick={() => {
              handleClick(project);
            }}
          >
            <div className="flex">
              <h2 className=" font-serif font-thin">
                <span className=" text-sm text-neutral-500">Project:</span>{" "}
                {project.projectName}
              </h2>
            </div>
            <div className="flex">
              <p className="font-serif font-thin">
                <span className=" text-sm text-neutral-500">Type: </span>
                {project.projectType}{" "}
              </p>
            </div>
            <div className="flex">
              <p className="font-serif font-thin">
                <span className=" text-sm text-neutral-500">Leader: </span>
                {project.leader.name}{" "}
              </p>
            </div>
          </div>
        ))}
        <div
          className=" my-2 ms-12 p-4 bg-white border rounded hover:shadow flex items-center justify-center cursor-pointer"
          onClick={() => {
            navigate("/add-project");
          }}
        >
          Add Project +
        </div>
      </div>
    </div>
  );
}
