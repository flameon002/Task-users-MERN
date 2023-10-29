import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import {Link} from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();
  // const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    signin(data);
  });

  return (
    <>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div>
          {signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white rounded-lg mb-2" key={i}>
              {error}
            </div>
          ))}
          <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-lg">
            <h1 className="text-3xl font-bold mb-3">Login</h1>

            <form onSubmit={onSubmit}>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 shadow-lg"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}

              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 shadow-lg"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 my-2 px-4 rounded-md shadow-lg"
              >
                {" "}
                Login
              </button>
            </form>
            <p className="flex gap-x-2 justify-between mt-3">Don´t have an account? <Link to="/register" className="text-sky-600">Sign up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
