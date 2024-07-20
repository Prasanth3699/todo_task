import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to /login route
    navigate("/login");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <p className="font-bold text-center text-2xl mb-5">
            Welcome to the Task Manager Application!
          </p>
          <div className="flex justify-center mx-auto">
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleClick}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
