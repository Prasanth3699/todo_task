import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import image1 from "../assets/todo-1.jpg";
import image2 from "../assets/todo-2.jpg";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to /login route
    navigate("/register");
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <div className=""></div>
        <main className="relative z-10 container mx-auto p-4 text-center text-white min-h-screen overflow-y-auto">
          <Navbar />
          <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
            <div className="bg-gray-50 shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-2xl leading-6 font-medium text-gray-900">
                  Task Manager helps teams move work forward.
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Collaborate, manage projects, and reach new productivity
                  peaks. From high rises to the home office, the way your team
                  works is unique—accomplish it all with Task Manager.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-1/2 px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Boards, Lists, and Cards
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Task Manager boards, lists, and cards enable you to organize
                    and prioritize your projects in a fun, flexible, and
                    rewarding way.
                  </p>
                </div>
                <div className="md:w-1/2 px-4 py-5 sm:px-6">
                  <img
                    src={image2}
                    alt="Boards"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-1/2 order-2 md:order-1 px-4 py-5 sm:px-6">
                  <img
                    src={image1}
                    alt="Workflow"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-1/2 order-1 md:order-2 px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Built-In Workflow Automation
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    With Task Manager built-in automation, Butler, reduce the
                    number of tedious tasks (and clicks) on your project board
                    by harnessing the power of automation across your entire
                    team.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Ready to get your team started on Task Manager?
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Sign up and start organizing your tasks today.
              </p>
              <div className="mt-6">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleClick}
                >
                  Sign Up - Its Free!
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
