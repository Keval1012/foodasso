import React from "react";

const LocalityWiseSummaryTable = () => {
  const data = [
    { locality: "Total", orders: 10, total: "7267.00" },
    { locality: "Alkapuri", orders: 5, total: "3377.00" },
    { locality: "Nagori Nagar", orders: 1, total: "430.00" },
    { locality: "Nirmay Nagar", orders: 1, total: "650.00" },
    { locality: "Sabarmati", orders: 1, total: "210.00" },
    { locality: "Shahibag", orders: 1, total: "790.00" },
    { locality: "Sola", orders: 1, total: "190.00" },
  ];

  return (
    <div className="w-full  p-4">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D] border-r border-gray-300">
              Locality
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D] border-r border-gray-300">
              Orders
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D]">
              Total (₹)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-300 text-[#3D3D3D]">
              <td className="py-2 px-4 border-r border-gray-300 text-[#3D3D3D]">
                {row.locality}
              </td>
              <td className="py-2 px-4 border-r border-gray-300 text-[#3D3D3D]">
                {row.orders}
              </td>
              <td className="py-2 px-4 text-[#3D3D3D]">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocalityWiseSummaryTable;
