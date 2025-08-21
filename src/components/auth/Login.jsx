import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../../store/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux"
import authService from "../../services/AuthService";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
        }
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
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-400 mt-6 text-center text-sm">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
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
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 transition rounded-xl py-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
