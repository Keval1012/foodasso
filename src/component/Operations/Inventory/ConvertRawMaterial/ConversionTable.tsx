import React, { useState } from "react";

function ConversionTable() {
  const [data, setData] = useState([
    {
      conversionName: "Conversion Of Noodles",
      itemName: "Rice",
      quantity: 1,
      unit: "Kg",
      createdBy: "Pragnesh Vala",
      createdDate: "29-June-2024 17:22:45",
      modifiedDate: "29-June-2024 17:22:45",
    },
    {
      conversionName: "Conversion Of Tomato Sauce",
      itemName: "Tomato",
      quantity: 2,
      unit: "Kg",
      createdBy: "Pragnesh Vala",
      createdDate: "29-June-2024 17:22:45",
      modifiedDate: "29-June-2024 17:22:45",
    },
  ]);

  // Handle quantity change
  const handleQuantityChange = (index : any , value : any) => {
    const updatedData = [...data];
    updatedData[index].quantity = value;
    setData(updatedData);
  };

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Conversion Name
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Quantity
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Created/Modified By
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-400">
              <td className="px-6 py-4 font-medium text-gray-900">
                {item.conversionName}
              </td>
              <td className="px-6 py-4 bg-red-100">
                <div className="space-y-2">
                  <p className="text-gray-700 font-semibold">{item.itemName}</p>
                  <div className="flex items-center  rounded-md ">
                    {/* Editable Input for Quantity */}
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      className="w-[279px] px-3 py-2 border-none outline-none "
                    />

                    {/* Unit */}
                    <span className="px-3 py-2 border  bg-gray-200 text-gray-700">
                      {item.unit}
                    </span>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <p className="text-gray-900">{item.createdBy}</p>
                <p className="text-gray-500 text-sm">
                  Created: {item.createdDate}
                </p>
                <p className="text-gray-500 text-sm">
                  Modified: {item.modifiedDate}
                </p>
              </td>
              <td className="px-6 py-4">
                <button className="border border-gray-400 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                  Convert Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex justify-end space-x-4 mt-4 bg-red-100 p-4">
        <button className="border border-gray-400 px-4 py-2 rounded-full  text-gray-700 hover:bg-red-100">
          Convert Now
        </button>
      </div> */}
    </div>
  );
}

export default ConversionTable;
