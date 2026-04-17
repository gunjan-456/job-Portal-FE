import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../Utils/api";

function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: []
  });


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);

        const jobData = res.data.job || res.data;

        setData({
          title: jobData.title || "",
          company: jobData.company || "",
          location: jobData.location || "",
          salary: jobData.salary || "",
          description: jobData.description || "",
          skills: jobData.skills || []
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchJob();
  }, [id]);

  
  const handleUpdate = async () => {
    try {
      await API.put(`/jobs/update/${id}`, data);
      alert("Job updated");
      navigate("/");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4">

        <h1 className="text-xl font-bold text-center text-purple-600">
          Update Job
        </h1>

        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="border p-2 rounded"
          placeholder="Title"
        />

        <input
          value={data.company}
          onChange={(e) => setData({ ...data, company: e.target.value })}
          className="border p-2 rounded"
          placeholder="Company"
        />

        <input
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="border p-2 rounded"
          placeholder="Location"
        />

        <input
          value={data.salary}
          onChange={(e) => setData({ ...data, salary: e.target.value })}
          className="border p-2 rounded"
          placeholder="Salary"
        />

        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="border p-2 rounded"
          placeholder="Description"
        />

        <input
          value={data.skills.join(", ")}
          onChange={(e) =>
            setData({
              ...data,
              skills: e.target.value.split(",").map((s) => s.trim())
            })
          }
          className="border p-2 rounded"
          placeholder="Skills (comma separated)"
        />

        <button
          onClick={handleUpdate}
          className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Update Job
        </button>

      </div>
    </div>
  );
}

export default UpdateJob