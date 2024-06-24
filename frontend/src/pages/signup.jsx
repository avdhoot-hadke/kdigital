import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    role: "",
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
      const result = await axios.post("http://localhost:3000/signup/", values);
      console.log("token", result.data.token);
      if (result.data.token) localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center font-serif">
      <h3 className="pb-5 text-2xl">Register</h3>
      <form
        id="registerForm"
        className="rounded-lg p-10 bg-neutral-100"
        onSubmit={handleSignUp}
      >
        <div className="w-64">
          <label htmlFor="register_name" className="ps-2">
            Name
          </label>
          <input
            type=" text"
            id="register_name"
            name="name"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="John"
            required
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="py-2">
          <label htmlFor="register_role" className="ps-2">
            Role
          </label>
          <select
            id="register_role"
            name="role"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow block w-full p-2"
            required
            value={values.role}
            onChange={handleChange}
          >
            <option value="Team member">Team member</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div className="py-2">
          <label htmlFor="register_contact" className="ps-2">
            Contact
          </label>
          <input
            name="contact"
            value={values.contact}
            onChange={handleChange}
            type="tel"
            id="register_contact"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="contact"
            required
          />
        </div>
        <div className="py-2">
          <label htmlFor="register_email" className="ps-2">
            Email
          </label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            type=" email"
            id="register_email"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="john@gmail.com"
            required
          />
        </div>
        <div className="py-2">
          <label htmlFor="register_password" className="ps-2">
            Password
          </label>
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            id="register_password"
            className="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="password"
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
