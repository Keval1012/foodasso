import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

// ExpenseDetails component to manage a dynamic table of expenses
const EditExpenseDatelis = () => {
  // State to manage rows in the table, initially with one empty row
  const [rows, setRows] = useState([{}]);

  // Function to add a specified number of rows to the table
  const addRows = (count: number) => {
    setRows([...rows, ...Array(count).fill({})]);
  };

  // Function to remove a row by its index
  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="m-4 border">
      {/* Header section showing the date and a note */}
      <div className="mb-4 p-2">
        <p className="text-xl">Date: 2024-06-27</p>
        <p className="text-sm text-red-500">
          Note: Only Rows With Reason & Amount Will Get Saved.
        </p>
      </div>

      {/* Table to manage expense details */}
      <div className="overflow-x-auto p-3">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {/* Table headers */}
              <th className="px-4 py-2 border-b">Reason</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Explanation</th>
              <th className="px-4 py-2 border-b">Employee</th>
              <th className="px-4 py-2 border-b">Paid From</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through rows state and render each row with inputs */}
            {rows.map((_, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Reason dropdown */}
                <td className="px-4 py-2 border-b">
                  <select className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Select Reason</option>
                    {/* Add other options */}
                  </select>
                </td>
                {/* Amount input field */}
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Amount"
                  />
                </td>
                {/* Explanation input field */}
                <td className="px-4 py-2 border-b">
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Explanation"
                  />
                </td>
                {/* Employee dropdown */}
                <td className="px-4 py-2 border-b">
                  <select className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>Select Employee</option>
                    {/* Add other options */}
                  </select>
                </td>
                {/* Paid From dropdown */}
                <td className="px-4 py-2 border-b">
                  <select className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option>From Cash</option>
                    {/* Add other options */}
                  </select>
                </td>
                {/* Action button to delete the row */}
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => removeRow(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer section with buttons to add rows, cancel, or save */}
      <div className="flex justify-between bg-gray-100 py-4 px-2">
        {/* Button to add 10 rows */}
        <button
          onClick={() => addRows(10)}
          className="bg-red-100 hover:bg-red-700 text-red-700 hover:text-white py-2 px-4 rounded-full border border-red-700"
        >
          + Add 10 Rows
        </button>

        {/* Buttons to cancel or save */}
        <div className="flex justify-end">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-full mr-2">
            Cancel
          </button>
          <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-5 rounded-full">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseDatelis;
