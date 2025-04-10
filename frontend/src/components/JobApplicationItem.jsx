
import React from "react";

const JobApplicationItem = ({ app, handleStatusChange, handleDelete, getStatusColor }) => {
  return (
    <li className="bg-gray-400 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="text-lg font-semibold">
        {app.company} - {app.role}
      </div>
      <div className={`text-white font-bold p-2 rounded-md ${getStatusColor(app.status)}`}>
        Status: {app.status}
      </div>
      <div className="text-gray-600 mt-2">Applied on: {new Date(app.date).toLocaleDateString()}</div>

      <div className="space-x-4 mt-4">
        <select
          value={app.status}
          onChange={(e) => handleStatusChange(app._id, e.target.value)}
          className="p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={() => handleDelete(app._id)}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default JobApplicationItem;
