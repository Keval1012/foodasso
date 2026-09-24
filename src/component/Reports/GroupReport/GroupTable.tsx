import React from "react";

const GroupTable = () => {
    const data = [
      {
        group: "Foodies",
        items: [
          {
            name: "Seafood Noodles",
            qty: 9,
            amount: 180,
            discount: 0,
            netAmount: 160,
            tax: 8.75,
            total: 168.75,
          },
          {
            name: "Fried Egg Noodles",
            qty: 12,
            amount: 150,
            discount: 0,
            netAmount: 150,
            tax: 8.75,
            total: 158.75,
          },
          {
            name: "Rice Wraps",
            qty: 16,
            amount: 120,
            discount: 0,
            netAmount: 120,
            tax: 4.26,
            total: 124.26,
          },
          {
            name: "Shrimp Noodles",
            qty: 11,
            amount: 160,
            discount: 0,
            netAmount: 160,
            tax: 8.75,
            total: 168.75,
          },
          {
            name: "Veggie Noodles",
            qty: 6,
            amount: 150,
            discount: 0,
            netAmount: 150,
            tax: 6.26,
            total: 156.26,
          },
        ],
      },
      {
        group: "Bar",
        items: [
          {
            name: "Apple Slider",
            qty: 10,
            amount: 120,
            discount: 0,
            netAmount: 120,
            tax: 6.26,
            total: 126.26,
          },
          {
            name: "Blue Lagoon",
            qty: 12,
            amount: 150,
            discount: 0,
            netAmount: 150,
            tax: 8.75,
            total: 158.75,
          },
          {
            name: "Strawberry Citrus",
            qty: 16,
            amount: 140,
            discount: 0,
            netAmount: 140,
            tax: 6.26,
            total: 146.26,
          },
        ],
      },
    ];
  return (
    <div className="w-full  border-[#3d3d3d36] border 0 mt-4">
      {" "}
      <div className="overflow-x-auto p-4">
        {/* <h2 className="text-gray-700 font-bold mb-2">Sales Report</h2> */}
        <table className="w-full text-sm text-left border border-[#3d3d3d36]">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Group</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Items</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Qty.</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">My Amount (₹)</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Total Discount (₹)</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Net Amount (₹)</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Total Tax (₹)</th>
              <th className="px-4 py-2 border border-[#3d3d3d36]">Total Sales (₹)</th>
            </tr>
          </thead>
          <tbody>
            {/* Total row */}
            <tr className="bg-gray-100 font-bold">
              <td className="px-4 py-2 border border-[#3d3d3d36]">Total</td>
              <td className="px-4 py-2 border border-[#3d3d3d36]" colSpan={2}>
                --
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36]">1150.00</td>
              <td className="px-4 py-2 border border-[#3d3d3d36]">0.00</td>
              <td className="px-4 py-2 border border-[#3d3d3d36]">1150.00</td>
              <td className="px-4 py-2 border border-[#3d3d3d36]">60.04</td>
              <td className="px-4 py-2 border border-[#3d3d3d36]">1210.04</td>
            </tr>
            {data.map((group, groupIndex) => (
              <>
                <tr
                  key={`group-${groupIndex}`}
                  className="font-semibold"
                >
                  <td className="px-4 py-2 border border-[#3d3d3d36]" colSpan={8}>
                    {group.group}
                  </td>
                </tr>
                {group.items.map((item, itemIndex) => (
                  <tr
                    key={`item-${groupIndex}-${itemIndex}`}
                    className="border border-[#3d3d3d36]-b"
                  >
                    <td className="px-4 py-2 border border-[#3d3d3d36]"></td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">{item.name}</td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">{item.qty}</td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">
                      {item.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">
                      {item.discount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">
                      {item.netAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">{item.tax.toFixed(2)}</td>
                    <td className="px-4 py-2 border border-[#3d3d3d36]">
                      {item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {/* Subtotal row */}
                <tr className="font-bold bg-gray-100">
                  <td className="px-4 py-2 border border-[#3d3d3d36]" colSpan={2}>
                    Sub Total
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36]">
                    {group.items.reduce((sum, item) => sum + item.qty, 0)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36]">
                    {group.items
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36]">
                    {group.items
                      .reduce((sum, item) => sum + item.discount, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36]">
                    {group.items
                      .reduce((sum, item) => sum + item.netAmount, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36]">
                    {group.items
                      .reduce((sum, item) => sum + item.tax, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36]">
                    {group.items
                      .reduce((sum, item) => sum + item.total, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTable;
