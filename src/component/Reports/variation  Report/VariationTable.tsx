import React from "react";

const VariationTable = () => {
  const orderData = {
    sections: [
      {
        title: "7 Foodies",
        items: [
          {
            name: "Seafood Noodles (Regular)",
            code: "SN21",
            qty: 9,
            total: 160.0,
          },
          {
            name: "Fried Egg Noodles (Regular)",
            code: "FEN34A",
            qty: 12,
            total: 150.0,
          },
          { name: "Rice Wraps (Regular)", code: "RW24", qty: 16, total: 120.0 },
          {
            name: "Blue Lagoon (Regular)",
            code: "BL58",
            qty: 11,
            total: 150.0,
          },
          {
            name: "Strawberry Citrus (Regular)",
            code: "SC75",
            qty: 6,
            total: 140.0,
          },
        ],
        subtotal: { qty: 54.0, total: 720.0 },
      },
      {
        title: "7 Bar",
        items: [
          { name: "Apple Slider (Small)", code: "AS77", qty: 10, total: 90.0 },
          { name: "Blue Lagoon (Small)", code: "BL58", qty: 12, total: 90.0 },
          {
            name: "Seafood Noodles (Small)",
            code: "SN21",
            qty: 16,
            total: 90.0,
          },
        ],
        subtotal: { qty: 38.0, total: 270.0 },
      },
    ],
    total: { qty: 92.0, total: 990.0 },
  };

  return (
    <div className="w-full border border-gray-300  p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 p-4">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="py-2 px-4 text-left border-r border-gray-300  text-[#3d3d3d]">
                Variation
              </th>
              <th className="py-2 px-4 text-left  border-r border-gray-300  text-[#3d3d3d] w-2/5">
                Items
              </th>
              <th className="py-2 px-4 text-left border-r border-gray-300  text-[#3d3d3d]">
                Code
              </th>
              <th className="py-2 px-4 text-right border-r border-gray-300  text-[#3d3d3d]">
                Qty.
              </th>
              <th className="py-2 px-4 text-right">Total Sales ($)</th>
            </tr>
          </thead>
          <tbody>
            {/* Total Row */}
            <tr className="border-b bg-gray-50 border-gray-300">
              <td className="py-2 px-4 font-semibold border-r border-gray-300  text-[#3d3d3d]">
                Total
              </td>
              <td className="py-2 px-4 border-r border-gray-300  text-[#3d3d3d]">--</td>
              <td className="py-2 px-4 border-r border-gray-300  text-[#3d3d3d]">--</td>
              <td className="py-2 px-4 text-right font-semibold border-r border-gray-300  text-[#3d3d3d]">
                {orderData.total.qty.toFixed(2)}
              </td>
              <td className="py-2 px-4 text-right font-semibold">
                {orderData.total.total.toFixed(2)}
              </td>
            </tr>

            {/* Sections */}
            {orderData.sections.map((section, sIndex) => (
              <React.Fragment key={sIndex}>
                {/* Section Header */}
                <tr className="border-b border-gray-300">
                  <td colSpan={5} className="py-2 px-4 font-medium">
                    {section.title}
                  </td>
                </tr>

                {/* Section Items */}
                {section.items.map((item, iIndex) => (
                  <tr key={iIndex} className="border-b border-gray-300">
                    <td className="py-2 px-4 border-r border-gray-300  text-[#3d3d3d]">
                      {iIndex === 0 ? "Regular" : ""}
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300  text-[#3d3d3d]">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border-r border-gray-300  text-[#3d3d3d]">
                      {item.code}
                    </td>
                    <td className="py-2 px-4 text-right border-r border-gray-300  text-[#3d3d3d]">
                      {item.qty.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 text-right">
                      {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}

                {/* Section Subtotal */}
                <tr className="bg-gray-100 border-b border-gray-300">
                  <td
                    colSpan={3}
                    className="py-2 px-4 font-semibold border-r border-gray-300  text-[#3d3d3d]"
                  >
                    Sub Total
                  </td>
                  <td className="py-2 px-4 text-right font-semibold border-r border-gray-300  text-[#3d3d3d]">
                    {section.subtotal.qty.toFixed(2)}
                  </td>
                  <td className="py-2 px-4  text-right font-semibold">
                    {section.subtotal.total.toFixed(2)}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariationTable;
