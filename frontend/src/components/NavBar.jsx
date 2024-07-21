import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("token");
    if (token) {
      // Assuming token presence means authentication
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage to log out
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Optionally redirect to home page or login page
    window.location.href = "/";
  };

  return (
    <>
      <div className="px- mx-auto max-w-7xl sm:px-6 ">
        <div className="relative pt-1 pb-4 sm:pb-4">
          <nav
            className="relative flex items-center justify-between sm:h-10 md:justify-center"
            aria-label="Global"
          >
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link to="/dashboard">
                  <span className="sr-only">Task Manager</span>
                  <img
                    className="w-auto h-8 sm:h-10"
                    src="/todo-list.svg"
                    loading="lazy"
                    width="202"
                    height="40"
                  />
                </Link>
                <div className="flex items-center -mr-2 md:hidden">
                  <button
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"
                    type="button"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:space-x-10 list-none">
              <li>
                <Link
                  to="/"
                  className="text-base font-semibold text-gray-900 list-none hover:text-blue-700"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="text-base font-semibold  text-gray-900 list-none hover:text-blue-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/taskboard"
                  className="text-base font-semibold text-gray-900 list-none  hover:text-blue-700 "
                >
                  Task Board
                </Link>
              </li>
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              <div className="inline-flex rounded-full shadow">
                <div>
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className=" inline-flex items-center px-4 py-2 text-base text-gray-900  border border-transparent rounded-full cursor-pointer font-base"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="  inline-flex items-center px-4 py-2 text-base text-gray-900  border border-transparent rounded-full cursor-pointer font-base"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
