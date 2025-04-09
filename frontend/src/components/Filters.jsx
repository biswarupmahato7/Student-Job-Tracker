// src/components/Filters.jsx
import React from "react";

const Filters = ({ filterStatus, setFilterStatus, filterDate, setFilterDate }) => {
  return (
    <div className="flex space-x-4 mb-8 mt-8 font-bold text-gray-400">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option className="text-black" value="">
          All Statuses
        </option>
        <option className="text-black" value="Applied">
          Applied
        </option>
        <option className="text-black" value="Interview">
          Interview
        </option>
        <option className="text-black" value="Offer">
          Offer
        </option>
        <option className="text-black" value="Rejected">
          Rejected
        </option>
      </select>

      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Filters;
