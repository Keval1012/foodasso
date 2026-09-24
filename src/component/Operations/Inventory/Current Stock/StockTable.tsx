import React, { useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

function StockTable() {
  const initialData = [
    {
      id: 1,
      isFavorite: true,
      category: "Tomato Sauce",
      rawMaterial: "Tomato Sauce",
      currentStock: "7 Ltr.",
      avgPurchasePrice: "70/Ltr.",
      totalAvgPurchasePrice: 490,
      lastUpdated: "2024-06-28 12:30:50",
    },
    {
      id: 2,
      isFavorite: false,
      category: "Vegetables",
      rawMaterial: "Tomato",
      currentStock: "25 Kg, 500 gm",
      avgPurchasePrice: "60/Kg",
      totalAvgPurchasePrice: 1530,
      lastUpdated: "2024-06-25 10:45:10",
    },
    {
      id: 3,
      isFavorite: false,
      category: "Grains",
      rawMaterial: "Rice",
      currentStock: "45 Kg",
      avgPurchasePrice: "120/Kg",
      totalAvgPurchasePrice: 5400,
      lastUpdated: "2024-06-20 18:10:25",
    },
  ];

  const [data, setData] = useState(initialData);

  // Toggle favorite status for the selected item
  const toggleFavorite = (id : any) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const totalAveragePrice = data.reduce(
    (total, item) => total + item.totalAvgPurchasePrice,
    0
  );

  return (
    <div className="p-4">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-y-auto">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-400">
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Mark As Favorite
            </th>
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Category
            </th>
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Raw Material
            </th>
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Current Stock (A)
            </th>
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Avg. Purchase Price (B)
            </th>
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Total Avg. Purchase Price (A*B)
            </th>
            <th className="p-3 text-center font-semibold text-[#3D3D3D]">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={`border-b border-gray-400 ${
                item.id % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="p-3 text-center">
                <button onClick={() => toggleFavorite(item.id)}>
                  {item.isFavorite ? (
                    <span className="text-yellow-500 text-xl">
                      <TiStarFullOutline size={20} />
                    </span> // Filled star for favorite
                  ) : (
                    <span className="text-gray-300 text-xl">
                      <TiStarOutline size={20} />
                    </span> // Outline star for unfavorite
                  )}
                </button>
              </td>
              <td className="p-3 text-center">{item.category}</td>
              <td className="p-3 text-center">{item.rawMaterial}</td>
              <td className="p-3 bg-red-100 text-center">
                {item.currentStock}
              </td>
              <td className="p-3 text-center">{item.avgPurchasePrice}</td>
              <td className="p-3 text-center">{item.totalAvgPurchasePrice}</td>
              <td className="p-3 text-center">{item.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td colSpan={7} className="p-3 font-semibold text-left">
              Total Average Purchase Price:{" "}
              <span className="p-3 font-semibold text-red-600">
                {totalAveragePrice}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default StockTable;
