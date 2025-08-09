import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from './../../Context/UserContext';
import { toast } from 'react-hot-toast';

export default function EditProfile() {
 let {GetUserData} = useContext(UserContext)
  let { register, handleSubmit } = useForm();
 async function UploadImageProfile(value) {
    let formData = new FormData();
    formData.append("photo", value.photo[0]);
  let {data} = await axios.put(
      `https://linked-posts.routemisr.com/users/upload-photo`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        }
      }
    )
    if (data.message == "success") {
      toast.success("Profile picture updated successfully!");
      GetUserData();
    }
    console.log(data);
  }
  return (
    <form
      onSubmit={handleSubmit(UploadImageProfile)}
      className="flex flex-col items-center py-3 gap-4 w-full"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-3/4 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          {...register("photo")}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>

      <button
        type="submit"
        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
          Upload Profile Picture
        </span>
      </button>
    </form>
  );
}
