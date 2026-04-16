import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utils/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

 
  const role = localStorage.getItem("role");

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

 
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

 
  const handleApply = async (jobId) => {
    try {
      await API.post("/application/apply", { jobId });
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  useEffect(() => {
    fetchJobs();
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

        <div className="flex gap-3">

         
          {role === "recruiter" && (
            <>
              <button
                onClick={() => navigate("/create-job")}
                className="bg-yellow-400 text-black px-4 py-1 rounded"
              >
                + Create Job
              </button>

              <button
                onClick={() => navigate("/my-jobs")}
                className="bg-white text-blue-500 px-4 py-1 rounded"
              >
                My Jobs
              </button>
            </>
          )}

         
          {role === "user" && (
            <button
              onClick={() => navigate("/applications")}
              className="bg-white text-blue-500 px-4 py-1 rounded"
            >
              My Applications
            </button>
          )}

        
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

    
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Jobs
        </h1>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location}</p>

                <p className="mt-2">{job.description}</p>

                <p className="mt-2 font-bold text-green-600">
                  ₹{job.salary}
                </p>

               
                {role === "user" && (
                  <button
                    onClick={() => handleApply(job._id)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Apply
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Jobs