import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import { login } from "../../store/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const create = async (data) => {
    setError("");
    try {
      console.log(data);
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-slate-900/80 backdrop-blur-xl p-8 shadow-xl border border-slate-800">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-white">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 mt-6 text-center text-sm">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("username", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition rounded-xl py-2"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
