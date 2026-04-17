import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utils/api"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });


      localStorage.setItem("token", res.data.token);

      
      localStorage.setItem("role", res.data.user.role);

      alert("Login successful");

      navigate("/", { replace: true });

    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-center text-blue-600">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login