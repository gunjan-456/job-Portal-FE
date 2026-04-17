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

    
      const validApps = res.data.filter((app) => app.job);

      setApplications(validApps);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <>
    
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
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

   
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
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
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                <h2 className="text-xl font-semibold">
                  {app.job.title}
                </h2>

                <p className="text-gray-600">
                  {app.job.company}
                </p>

                <p className="text-sm text-gray-500">
                  {app.job.location}
                </p>

                <p className="mt-2">
                  {app.job.description}
                </p>

                <p className="mt-2 font-bold text-green-600">
                  ₹{app.job.salary}
                </p>

               
                {app.job.skills?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {app.job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Application