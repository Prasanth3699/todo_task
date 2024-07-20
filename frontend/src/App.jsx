import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskBoard from "./pages/TaskBoard";
// import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/taskboard"
            element={
              // <PrivateRoute>
              //   <TaskBoard />
              // </PrivateRoute>
              <TaskBoard />
            }
          />
          <Route
            path="/"
            element={
              // <PrivateRoute>
              //   <Dashboard />
              // </PrivateRoute>
              <Dashboard />
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
