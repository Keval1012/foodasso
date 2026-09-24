import React from "react";
import { MdKeyboardArrowLeft, MdOutlineEdit } from "react-icons/md";

const TaxListing = () => {
  const taxData = [
    {
      id: 1,
      title: "SGST",
      taxType: "Backward Tax",
      type: "Percentage (%)",
      amount: "2 (%)",
    },
    {
      id: 2,
      title: "CGST",
      taxType: "Backward Tax",
      type: "Percentage (%)",
      amount: "2.5 (%)",
    },
    {
      id: 3,
      title: "SGST",
      taxType: "Forward Tax",
      type: "Fixed (₹)",
      amount: "2.5 (₹)",
    },
  ];

  return (
    <div className=" ">
      {/* Header and Back Button */}
      <div className="flex justify-between items-center mb-6  border-b ">
        <h1 className="text-2xl font-semibold p-4">Tax Listing</h1>
        <div className="flex justify-end items-center p-4 gap-4">
          
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Tax Title
              </th>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Tax Type
              </th>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Type
              </th>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Amount
              </th>
              <th className="px-4 py-2 border-b text-left text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taxData.map((tax) => (
              <tr key={tax.id}>
                <td className="px-4 py-2 border-b">{tax.title}</td>
                <td className="px-4 py-2 border-b">{tax.taxType}</td>
                <td className="px-4 py-2 border-b">{tax.type}</td>
                <td className="px-4 py-2 border-b">{tax.amount}</td>
                <td className="px-4 py-2 border-b text-center">
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                    <MdOutlineEdit className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxListing;
