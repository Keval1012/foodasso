import React from "react";

const CoverSizeReportTable = () => {
  const tableData = [
    { date: "2024-09-24", persons: 0 },
    { date: "2024-09-23", persons: 10 },
    { date: "2024-09-16", persons: 8 },
    { date: "2024-09-10", persons: 5 },
    { date: "2024-09-05", persons: 0 },
    { date: "2024-08-28", persons: 16 },
    { date: "2024-08-15", persons: 20 },
    { date: "2024-08-10", persons: 10 },
    { date: "2024-08-01", persons: 5 },
    // Add more data as needed
  ];

  const totalPersons = tableData.reduce((acc, item) => acc + item.persons, 0);

  return (
    <div className="w-full mt-5">
      <table className="w-full border border-[#3D3D3D36]">
        <thead className="bg-gray-100 border-b border-[#3D3D3D36]">
          <tr className=" border-b border-[#3D3D3D36]">
            <th className="py-2 px-4 text-left font-semibold text-[#3d3d3d] border-r border-[#3D3D3D36]">
              Date
            </th>
            <th className="py-2 px-4 text-left font-semibold text-[#3d3d3d]">
              No. Of Persons (Success Orders)
            </th>
          </tr>
          <tr className="bg-gray-100 border-b border-[#3D3D3D36]">
            <td className="py-2 px-4 font-semibold border-r border-[#3D3D3D36] text-[#3d3d3d]">
              Total
            </td>
            <td className="py-2 px-4 font-semibold text-[#3d3d3d]">
              {totalPersons}
            </td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="border-b border-[#3D3D3D36]">
              <td className="py-2 px-4 border-r border-[#3D3D3D36] text-[#3D3D3D]">
                {row.date}
              </td>
              <td className="py-2 px-4 text-[#3D3D3D]">{row.persons}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoverSizeReportTable;
