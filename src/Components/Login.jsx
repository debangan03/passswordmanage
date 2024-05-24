import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage(props) {
  let token = localStorage.getItem("AccessToken");
  const getlogin = async (token) => {
    let res = await fetch("http://localhost:5000/verifylogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    let status = await res.json();
    if (status.status) {
      window.location = "http://localhost:5173";
    }
  };

  useEffect(() => {
    if (token) {
      getlogin(token);
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login details:", { email, password });
    let res = await axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    });
    // console.log(res);
    if (res?.data?.success) {
      localStorage.setItem("AccessToken", res?.data?.token);
      window.location = "/";
    }
    // Here, you'd usually handle the login logic, like calling an API.
  };

  return (
    <div className="min-h-screen flex items-center px-10  justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white border-[1px] border-black rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Sign In
            </button>
          </div>
          <span className="text-sm mt-2">
            Don&apos;t have an Account?{" "}
            <Link to="/Signup" className="text-emerald-700 font-semibold">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
