import React, { useState } from "react";

const ViewCashTopUPListing = () => {
  return (
    <div className="p-4">
      <div className="border rounded-lg shadow-sm">
        <div className="p-4 text-lg font-semibold border-b">
          Date:{" "}
          <span className="font-normal">
            Cash Top-Up details Date : 2024-05-25
          </span>
          <span className="ml-4 text-gray-600"> (Total - 200.00)</span>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Explanation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 border">from owner</td>
                <td className="px-6 py-4 border">200.00</td>
                <td className="px-6 py-4 border">--</td>
              </tr>
             
              <tr className="font-semibold bg-gray-100">
                <td className="px-6 py-4 ">Total</td>
                <td className="px-6 py-4 ">200.00</td>
                <td className="px-6 py-4 "></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCashTopUPListing;
