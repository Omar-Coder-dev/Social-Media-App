import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import { Toaster } from "react-hot-toast";
import PostsDetails from "./Pages/PostsDetails/PostsDetails";
import { UserContextProvider } from "./Context/UserContext";
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/EditProfile/EditProfile';
import { ProtectedRouting } from "./ProtectedRouting/ProtectedRouting";
export default function App() {
  let Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRouting><Home /></ProtectedRouting> },
        { path: "login", element: <Login /> },
        { path: "postsDetails/:id", element: <ProtectedRouting><PostsDetails /></ProtectedRouting> },
        { path: "profile", element: <ProtectedRouting><Profile /></ProtectedRouting> },
        { path: "editProfile", element: <ProtectedRouting><EditProfile /></ProtectedRouting> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={Routes} />
        <Toaster />
      </UserContextProvider>
    </>
  );
}
