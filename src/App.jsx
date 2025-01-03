import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home.jsx";
import PostDetails from "./components/PostDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {
  const isAuthenticated = localStorage.getItem("authToken");
  return (
    <Router>
      <div>
        <nav
          className="p-4 fixed top-0 w-full z-10"
          style={{ backgroundColor: "#213555" }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white text-2xl font-bold">QAnswers!</div>
            <div className="space-x-4">
              <Link to="/" className="text-white hover:text-gray-300">
                Inicio
              </Link>
              {isAuthenticated && (
                <Link
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    window.location.reload();
                  }}
                  className="text-red-300 hover:text-red-400"
                >
                  Cerrar Sesión
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/login" className="text-white hover:text-gray-300">
                  Iniciar Sesión
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/register" className="text-white hover:text-gray-300">
                  Registrarse
                </Link>
              )}
            </div>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/post/:id"
            element={
              isAuthenticated ? <PostDetails /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
