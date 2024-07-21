import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskBoard from "./pages/TaskBoard";
// import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
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
              path="/dashboard"
              element={
                // <PrivateRoute>
                //   <Dashboard />
                // </PrivateRoute>
                <Dashboard />
              }
            />
          </Routes>
        </AuthProvider>
      </Layout>
    </Router>
  );
}

export default App;
