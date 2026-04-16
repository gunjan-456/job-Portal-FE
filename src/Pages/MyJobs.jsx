import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utils/api";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const res = await API.get("/jobs")
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
        My Jobs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white p-5 rounded shadow">
            <h2 className="font-bold">{job.title}</h2>
            <p>{job.company}</p>

            <button
              onClick={() => navigate(`/applicants/${job._id}`)}
              className="mt-3 bg-purple-500 text-white px-3 py-1 rounded"
            >
              View Applicants
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyJobs