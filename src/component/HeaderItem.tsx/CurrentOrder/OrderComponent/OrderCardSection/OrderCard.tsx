import React from "react";
import OrderStatus from "./OrderStatus";

interface OrderItem {
  name: string;
  qty: number;
  note?: string;
  variation?: string;
  addons?: string[];
}

interface Order {
  type: string;
  kot: string;
  time: string;
  customer: string;
  location: string;
  note: string;
  items: OrderItem[];
  statusColor: string;
}

const OrderCard = ({
  type,
  kot,
  time,
  customer,
  location,
  items,
  note,
  statusColor,
}: Order) => {
  return (
    <div>
      <div
        className={`max-w-smv  bg-white shadow-md rounded-lg overflow-hidden  `}
      >
        {/* Header Section */}
        <div
          className={`flex justify-between ${statusColor} p-3 rounded-t-md `}
        >
          <div className="flex items-center justify-between w-full text-white">
            <div className="w-28 broder-r border-r-2 border-gray-100">
              <p>{type}</p>
            </div>
            <div className="w-24 h-6 broder-r border-r-2 border-gray-100">
              <p className="text-center pb-4">
                {kot} <br />
                KOT No.
              </p>
            </div>
            <div className="">
              <p className="text-center">
                {time}
                <br />
                MM : SS
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="mb-1 mt-1">
          <div className="flex items-center bg-gray-300 px-3 py-2">
            <p className="font-medium">{customer}</p>
            {""}| {""}
            <p className="text-sm text-gray-500">{location}</p>
          </div>
          <p className="text-sm mt-1 flex justify-between bg-gray-300 px-3 py-2">
            <span className="font-medium">Biller</span>
            <span className="text-gray-500"> (Order note: {note})</span>
          </p>
        </div>

        {/* Order Items Section */}
        <div className="mb-4 ">
          <div className="flex justify-between border-b pb-2 mb-2 bg-gray-300 px-3 py-2">
            <span className="font-medium">Item</span>
            <span className="font-medium">Qty</span>
          </div>
          {items.map((item, index) => (
            <div className="mb-2 px-4" key={index}>
              <p className="font-medium">{item.name}</p>
              {item.note && (
                <p className="text-sm text-gray-500">Note: {item.note}</p>
              )}
              {item.variation && (
                <p className="text-sm text-gray-500">
                  Variation
                  <br />
                  <span className="ml-4">{item.variation}</span>
                </p>
              )}
              {item.addons && (
                <p className="text-sm text-gray-500">
                  Addons:
                  <br />
                  <span className="ml-4">{item.addons.join(", ")}</span>
                </p>
              )}
              <p className="text-sm text-right">{item.qty}</p>
            </div>
          ))}
        </div>
        <hr />
        {/* Action Buttons Section */}
        <div className="flex justify-end my-4 mx-4 gap-3">
          <button className="bg-gray-200 text-gray-700 rounded-full py-2 px-4">
            Cancel
          </button>
          <button className="bg-gray-800 text-white rounded-full py-2 px-4">
            Food is Ready
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
