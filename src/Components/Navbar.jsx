import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-blue-500 text-white">
      <h1
        className="font-bold text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        Job Portal
      </h1>

      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar