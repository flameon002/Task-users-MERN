import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <>
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        
        {registerErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white rounded-lg">
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button type="submit" 
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 my-2 px-4 rounded-md shadow-lg"> Register</button>
        </form>
        
        <p className="flex gap-x-2 justify-between mt-3">Already have an account? <Link to="/login" className="text-sky-600">Log in</Link></p>
          
      </div>
    </>
  );
}

export default RegisterPage;
