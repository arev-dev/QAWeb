import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("authToken");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5126/api/Users/login",
        {
          username,
          password,
        }
      );

      if (response.data.data) {
        localStorage.setItem("authToken", response.data.data);
        window.location.reload();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response.data.message ?? "Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 " style={{ marginTop: "10rem" }}>
      <h2 className="text-3xl font-bold text-center mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm">Nombre de Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
