import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Utils/api";

function Applicants() {
  const [apps, setApps] = useState([]);
  const { jobId } = useParams();

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/application/job/${jobId}`);
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>

      {apps.map((a) => (
        <div key={a._id} className="border p-3 mb-2 rounded">
          <p><b>Name:</b> {a.user?.name}</p>
          <p><b>Email:</b> {a.user?.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Applicants;