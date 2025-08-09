import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import * as Zod from 'zod';
import { UserContext } from '../../Context/UserContext'
import { useLoading } from '../../Context/LoadingContext' 

const schema = Zod.object({
  email: Zod.string().nonempty("Email Is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  password: Zod.string().nonempty("Password Is Required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/, "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});

export default function Register() {

  let { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  let { GetUserData } = useContext(UserContext);
  let navigate = useNavigate();
  const { setLoading } = useLoading(); 

  async function handleLogin(value) {
    setLoading(true);
    try {
      let response = await axios.post("https://linked-posts.routemisr.com/users/signin", value);

      if (response?.data?.message === "success") {
        toast.success("Login Successfully");
        localStorage.setItem("token", response.data.token);
        GetUserData();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-sm mx-auto py-3">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" {...register("email")} id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" {...register("password")} id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5
          text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Login
        </button>
      </form>
    </div>
  )
}
