import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WithdrawalManagement = () => {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleDateSearch = () => {
    if (selectedDate) {
      navigate("/operations/withdrawal/withdrawalmangment/add", { state: { withdrawalDate: selectedDate } });
    } else {
      alert("Please select a date");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border mt-5 rounded">
      <div className="border-b ">
        <p className="p-2">Date for Withdrawal</p>
      </div>
      <div className="bg-white p-6 rounded">
        <div className="flex items-center space-x-2">
          <label htmlFor="date" className="text-sm">
            Date
          </label>
          <div className="flex items-center border w-full rounded-md">
            <input
              type="date"
              id="date"
              className="p-2 border-none outline-none"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <button
            className="flex items-center px-4 py-2 bg-orange-100 text-orange-500 rounded-full border border-orange-500 hover:bg-orange-500 hover:text-white transition"
            onClick={handleDateSearch}  
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalManagement;
