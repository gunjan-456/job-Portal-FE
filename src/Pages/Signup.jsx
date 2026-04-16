import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );

      alert("Signup successful");

      navigate("/login", { replace: true }); // 👈 redirect to login

    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80 flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-center text-green-600">
          Signup
        </h1>

        <input
          placeholder="Name"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <select
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          onClick={handleSignup}
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
        >
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup