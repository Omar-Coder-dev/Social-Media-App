import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  let { user, setUser } = useContext(UserContext);
  let navg = useNavigate();

  function Logout() {
    localStorage.removeItem("token");
    setUser(null);
    navg("/login");
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            MyApp
          </span>
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 font-medium">
            {user ? (
              <>
                <li>
                  <NavLink
                    to="profile"
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="editProfile"
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    Edit Profile
                  </NavLink>
                </li>
                <li className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                    src={user.photo}
                    alt="User"
                  />
                  <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                    Hello{" "}
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {user.name}
                    </span>
                    <i
                      onClick={Logout}
                      className="fa-solid fa-right-from-bracket cursor-pointer hover:text-red-500 transition"
                    ></i>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
