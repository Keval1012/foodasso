import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const LocalityWiseSummaryFliter: React.FC = () => {
  // State for start and end dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handlereset = () => {
    setStartDate("");
    setEndDate("");
  };
  return (
    <div className="p-4 border rounded-md">
      <form
        // onSubmit={handleSubmit}
        className="pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Order type  */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Group
          </label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
            onClick={handlereset}
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none"
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocalityWiseSummaryFliter;
