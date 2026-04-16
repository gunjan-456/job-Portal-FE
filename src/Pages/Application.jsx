import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utils/api";

function Application() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 
  const fetchApplication = async () => {
    try {
      const res = await API.get("/application/my");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <>
      {/* 🔵 Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-blue-500 text-white">
        <h1
          className="font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Job Portal
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* 📄 Applications */}
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not applied to any jobs
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-5 rounded-2xl shadow"
              >
                <h2 className="text-xl font-semibold">
                  {app.job?.title}
                </h2>

                <p className="text-gray-600">
                  {app.job?.company}
                </p>

                <p className="text-sm text-gray-500">
                  {app.job?.location}
                </p>

                <p className="mt-2">
                  {app.job?.description}
                </p>

                <p className="mt-2 font-bold text-green-600">
                  ₹{app.job?.salary}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Application