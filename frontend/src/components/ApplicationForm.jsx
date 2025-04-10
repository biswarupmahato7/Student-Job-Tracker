import React, { useState } from "react";
import axios from "axios";

const ApplicationForm = ({ onApplicationAdded }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!company || !role || !status || !date || !link) {
      setErrorMessage("Please fill in all fields!");
      return; // Exit if any field is missing
    }

    const newApplication = { company, role, status, date, link };

    try {
      // Send the POST request to add the application
      await axios.post(
        "https://student-job-tracker-zdt8.onrender.com/api/job-applications",
        newApplication
      );

      // Clear form fields after submission
      setCompany("");
      setRole("");
      setStatus("Applied");
      setDate("");
      setLink("");
      setErrorMessage(""); // Clear any previous error messages

      // Notify parent component about the new application
      onApplicationAdded();
    } catch (error) {
      console.error("Error adding application:", error);
      setErrorMessage("Error adding application. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-500 p-6 rounded-lg shadow-xl space-y-6 transition-all font-bold hover:shadow-2xl"
    >
      {/* Display error message if any */}
      {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}

      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-300"
      >
        Add Application
      </button>
    </form>
  );
};

export default ApplicationForm;
