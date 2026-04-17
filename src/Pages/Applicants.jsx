import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../Utils/api";

function Applicants() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);

  const fetchApplicants = async () => {
    try {
      if (!id) return;

      console.log("FRONTEND JOB ID:", id);

      const res = await API.get(`/application/job/${id}`);

      console.log("FRONTEND ID:", id)
      console.log("API DATA:", res.data)

      setApps(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-600">
          Applicants
        </h1>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          ← Back
        </button>
      </div>

      {apps.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No applicants yet
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app._id}
              className="bg-white p-5 rounded-2xl shadow"
            >
              <h2 className="text-xl font-semibold">
                {app.user?.name}
              </h2>

              <p className="text-gray-600">
                📧 {app.user?.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applicants