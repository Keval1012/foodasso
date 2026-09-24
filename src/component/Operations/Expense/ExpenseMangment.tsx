import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const ExpenseMangment = () => {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  const handleDateSearch = () => {
    if (selectedDate) {
      navigate("/operations/expense/expensemangment/add", { state: { expenseDate: selectedDate } });
    } else {
      alert("Please select a date");
    }
  };

  return (
     <><div className="flex justify-between items-center border-b px-4 py-3">
      <h2 className="text-xl font-semibold mb-4">Expense Details</h2>
      <div className="flex gap-3">

        <div
          className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base">Back</button>
        </div>
      </div>
    </div>
    <div className="max-w-3xl mx-auto px-4 my-5 border rounded">

        <div className="border-b ">
          <p className="p-2">
            please provide the date for which you want to record your expenses.{" "}
          </p>
        </div>
        <div
          className="bg-white p-6 rounded"
        >
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
            {/* <Link to="/operations/expense/expensemangment/add"> */}
              <button
                className="flex items-center px-4 py-2 bg-orange-100 text-orange-500 rounded-full border border-orange-500 hover:bg-orange-500 hover:text-white transition"
                onClick={handleDateSearch}
              >
                Search
              </button>
            {/* </Link> */}
          </div>
        </div>
      </div></>
  );
};

export default ExpenseMangment;
