import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Utils/api";

function CreateJob() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: ""
  });

  const handleCreate = async () => {
    try {
      await API.post("/jobs/create", data);
      alert("Job created successfully");

      navigate("/")
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4">

        <h1 className="text-2xl font-bold text-center text-purple-600">
          Create Job
        </h1>

        <input
          placeholder="Title"
          className="border p-2 rounded"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <input
          placeholder="Company"
          className="border p-2 rounded"
          onChange={(e) => setData({ ...data, company: e.target.value })}
        />

        <input
          placeholder="Location"
          className="border p-2 rounded"
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />

        <input
          placeholder="Salary"
          className="border p-2 rounded"
          onChange={(e) => setData({ ...data, salary: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />


        <input
        placeholder="Skills (comma separated)"
        className="border p-2 rounded"
        onChange={(e) =>
            setData({ ...data, skills: e.target.value.split(",") })
            }
        />

        <button
          onClick={handleCreate}
          className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Create Job
        </button>

      </div>
    </div>
  );
}

export default CreateJob