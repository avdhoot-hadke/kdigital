import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
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
      const result = await axios.post("http://localhost:3000/login/", values);
      console.log("token", result.data.token);
      if (result.data.token) localStorage.setItem("token", result.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="w-screen h-screen flex flex-col justify-center items-center ">
      <h3 class="pb-5 text-2xl">Login</h3>
      <form
        id="loginForm"
        class="rounded-lg p-10 bg-neutral-100"
        onSubmit={handleSignUp}
      >
        <div class="py-2">
          <label for="login_email" class="ps-2">
            Email
          </label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            type=" email"
            id="login_email"
            class="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="john@gmail.com"
            required
          />
        </div>
        <div class="py-2">
          <label for="login_password" class="ps-2">
            Password
          </label>
          <input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            id="login_password"
            class="bg-white text-gray-900 text-sm rounded-lg focus:outline-none focus:shadow  block w-full p-2 "
            placeholder="password"
            required
          />
        </div>
        <div class="flex py-2">
          <button
            type="submit"
            class="mx-auto bg-black p-2 w-24 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
