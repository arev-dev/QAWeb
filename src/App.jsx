import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home.jsx";
import PostDetails from "./components/PostDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav
        className="p-4 fixed top-0 w-full z-10"
        style={{ backgroundColor: "#213555" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl">QAnswers!</div>
          <div className="space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Inicio
            </Link>
            <Link to="/login" className="text-white hover:text-gray-300">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="text-white hover:text-gray-300">
              Registrarse
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
