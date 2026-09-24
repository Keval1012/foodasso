import React, { useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaRegClock, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function Wastagesidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full p-4 rounded-lg shadow-sm mt-4 overflow-y-auto">
      {/* Main Table */}
      <table className="w-full border border-gray-300 text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border-b text-[#3D3D3D]">Time</th>
            <th className="p-3 border-b text-[#3D3D3D]">Total(₹)</th>
            <th className="p-3 border-b text-[#3D3D3D]">Status</th>
            <th className="p-3 border-b text-[#3D3D3D]">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="p-3 flex items-center border-b">
              <button onClick={toggleExpand} className="text-[#3D3D3D]">
                {isExpanded ? (
                  <CiCircleMinus size={20} />
                ) : (
                  <CiCirclePlus size={20} />
                )}
              </button>
              15:20:55
            </td>

            <td className="p-3 border-b text-gray-800">1000</td>
            <td className="p-3 border-b text-gray-800">Save</td>
            <td className="p-3 border-b">
              <button className="text-gray-500 hover:text-red-600">
                <FaTrashAlt size={20} />
              </button>
                      </td>
                      
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="p-3 flex items-center border-b">
              <button onClick={toggleExpand} className="text-[#3D3D3D]">
                {isExpanded ? (
                  <CiCircleMinus size={20} />
                ) : (
                  <CiCirclePlus size={20} />
                )}
              </button>
              15:20:55
            </td>{" "}
            <td className="p-3 border-b text-gray-800">500</td>
            <td className="p-3 border-b text-gray-800">Save</td>
            <td className="p-3 border-b">
              <button className="text-gray-500 hover:text-red-600">
                <FaTrashAlt size={20} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Expandable Section */}
      {isExpanded && (
        <table className="w-full text-left mt-2 border-t">
          <thead>
            <tr className="bg-red-100">
              <th className="p-2 border-b text-[#3D3D3D] text-sm font-medium">
                Item
              </th>
              <th className="p-2 border-b text-[#3D3D3D] text-sm font-medium">
                Raw Material
              </th>
              <th className="p-2 border-b text-[#3D3D3D] text-sm font-medium">
                Quantity
              </th>
              <th className="p-2 border-b text-[#3D3D3D] text-sm font-medium">
                Avg. Purchase Price(₹)
              </th>
              <th className="p-2 border-b text-[#3D3D3D] text-sm font-medium">
                Amount(₹)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-2 border-b text-sm ">Rice</td>
              <td className="p-2 border-b text-sm ">5 Kg</td>
              <td className="p-2 border-b text-center text-sm ">
                500
              </td>
              <td className="p-2 border-b text-center text-sm ">
                500
              </td>
              <td className="p-2 border-b text-center text-sm ">
                500
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Wastagesidebar;
