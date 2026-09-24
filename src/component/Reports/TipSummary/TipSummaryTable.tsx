import React from "react";

const TipSummaryTable = () => {
  const employeeTips = [
    { name: "Ramesh", amount: "500.00" },
    { name: "Harsh", amount: "250.00" },
    { name: "Aditya", amount: "250.00" },
    { name: "Other", amount: "200.00" },
  ];

  const tableTips = [
    { table: "Delivery/Pick Up", amount: "500.00" },
    { table: "A5", amount: "200.00" },
    { table: "G1", amount: "200.00" },
    { table: "A1", amount: "100.00" },
    { table: "G6", amount: "100.00" },
    { table: "N-AC8", amount: "100.00" },
  ];

  const totalTip = 1200;

  return (
    <div className="w-full  p-4">
      <div className="bg-gray-100 py-2 px-4 font-semibold text-lg border border-gray-300">
        Total Tip: ₹{totalTip}
      </div>

      {/* Employee-wise Tip Section */}
      <div className="mt-4">
        <div className="py-2 px-4 text-red-500 font-semibold">
          Employee-wise Tip
        </div>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D] border-r border-gray-300">
                Employee
              </th>
              <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D]">
                Amount (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {employeeTips.map((row, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-2 px-4 border-r border-gray-300">
                  {row.name}
                </td>
                <td className="py-2 px-4">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table-wise Tip Section */}
      <div className="mt-4">
        <div className="py-2 px-4 text-red-500 font-semibold">
          Table-wise Tip
        </div>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D] border-r border-gray-300">
                Table
              </th>
              <th className="py-2 px-4 text-left font-semibold text-[#3D3D3D]">
                Amount (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {tableTips.map((row, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-2 px-4 border-r border-gray-300">
                  {row.table}
                </td>
                <td className="py-2 px-4">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipSummaryTable;
