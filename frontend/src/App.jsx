
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationForm from "./components/ApplicationForm";
import Filters from "./components/Filters";
import JobApplicationItem from "./components/JobApplicationItem";

function App() {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    axios
      .get("https://student-job-tracker-zdt8.onrender.com/api/job-applications")
      .then((response) => setApplications(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`https://student-job-tracker-zdt8.onrender.com/api/job-applications/${id}`, {
        status: newStatus,
      });
      const response = await axios.get("https://student-job-tracker-zdt8.onrender.com/api/job-applications");
      setApplications(response.data);
      toast.success(`Status updated to ${newStatus}!`);
    } catch (error) {
      toast.error("Error updating status!",error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://student-job-tracker-zdt8.onrender.com/api/job-applications/${id}`);
    setApplications(applications.filter((app) => app._id !== id));
  };

  // Function to return status color based on status type
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-yellow-500";
      case "Interview":
        return "bg-orange-500";
      case "Offer":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredApplications = applications.filter((app) => {
    const statusMatch = filterStatus ? app.status === filterStatus : true;
    const appDate = new Date(app.date).toISOString().split("T")[0];
    const dateMatch = filterDate ? appDate === filterDate : true;
    return statusMatch && dateMatch;
  });

  const handleApplicationAdded = (newApplication) => {
    setApplications((prevApplications) => [...prevApplications, newApplication]);
  };

  return (
    <div className="min-h-screen bg-gray-700 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-white mb-8 transition-transform transform hover:scale-105">
          Student Job Tracker
        </h1>

        <ApplicationForm onApplicationAdded={handleApplicationAdded} />

        <Filters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterDate={filterDate}
          setFilterDate={setFilterDate}
        />

        <h2 className="text-2xl font-semibold text-center text-white mt-10">
          All Applications
        </h2>

        <ul className="space-y-6 mt-6">
          {filteredApplications.length === 0 ? (
            <p className="text-center text-white font-semibold mt-6">
              No Applications Found!
            </p>
          ) : (
            filteredApplications.map((app) => (
              <JobApplicationItem
                key={app._id}
                app={app}
                handleStatusChange={handleStatusChange}
                handleDelete={handleDelete}
                getStatusColor={getStatusColor}
              />
            ))
          )}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
