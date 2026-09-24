import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

const PurchaseOrderListSidebar = () => {
      const [isToggled, setIsToggled] = useState(false);

  const orders = [
    {
      date: "28 May 2024",
      time: "15:52:10",
      items: [
        { id: 1, name: "1 [Supplier]", poNumber: "PO0025146585", amount: 120 },
        {
          id: 2,
          name: "8 Foodies [Kitchen]",
          poNumber: "PO0025146585",
          amount: 250,
        },
      ],
    },
    {
      date: "29 May 2024",
      time: "16:52:10",
      items: [
        { id: 3, name: "1 [Supplier]", poNumber: "PO0025146585", amount: 80 },
        { id: 4, name: "1 [Supplier]", poNumber: "PO0025146585", amount: 50 },
        {
          id: 5,
          name: "8 Foodies [Kitchen]",
          poNumber: "PO0025146585",
          amount: 150,
        },
      ],
    },
  ];

  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      {/* Search and Filter Section */}
      <div className="flex items-center justify-between mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Invoice/Request No."
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        {/* Filters */}
        <div className="flex items-center space-x-4">
          {/* Toggle Switch */}
          <div className="flex items-center">
            <div
              id="toggle"
              className="block bg-green-400 w-10 h-6 rounded-full cursor-pointer relative"
              onClick={() => setIsToggled((prev: any) => !prev)}
            >
              <span
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  isToggled ? "transform translate-x-4 bg-blue-500" : ""
                }`}
              ></span>
            </div>
            <span className="ml-2 text-gray-600">PO/Sales before 30 days</span>
          </div>

          {/* Sort Options */}
          <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Oldest To Newest</option>
            <option>Newest To Oldest</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      {orders.map((orderGroup, index) => (
        <div key={index} className="mb-8">
          {/* Date Section */}
          <div className="text-gray-600 mb-4 font-semibold">
            {orderGroup.date} <span className="text-sm">{orderGroup.time}</span>
          </div>

          {/* Order Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {orderGroup.items.map((item) => (
              <div
                key={item.id}
                className="border border-l-4 border-l-[#DD312F] rounded-md p-4 flex items-center justify-between bg-white shadow-sm"
              >
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    name="order"
                    className="h-4 w-4 text-red-600 focus:ring-0"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <div className=" flex items-center gap-4 py-3">
                      <TiShoppingCart  size={20}/>

                      <p className="text-gray-500 text-sm">{item.poNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Right Section (Amount) */}
                <div className="text-lg font-bold text-gray-800">
                  ₹{item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchaseOrderListSidebar;
