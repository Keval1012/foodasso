import React from "react";
import OrderStatus from "./OrderStatus";
import { cancelLiveKotView, updateLiveKotView } from "../../../../Api/Api";
import { Timer } from "../../../../constants/Timer";
import { useSelector } from "react-redux";

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

// const OrderCard = ({
//   type,
//   kot,
//   time,
//   customer,
//   location,
//   items,
//   note,
//   statusColor,
// }: Order) => {

interface OrderCardDataProps {
  kot: any;
  fetchLiveKotView: any;
}

const OrderCard: React.FC<OrderCardDataProps> = ({ kot, fetchLiveKotView }) => {

  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};

  const getOrderTypeColor = (orderTypeColor: String) => {
    switch (orderTypeColor) {
      case "Dine In":
        return "bg-yellow-400";
      case "Delivery":
        return "bg-gray-300";
      case "Pick Up":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const handleCancelKot = async (kotId: any) => {
    if (kotId) {
      let data = {
        username: loginUserData?.username,
        password: loginUserData?.user_password,
        cancel_resoan: "no need kot",
        item_ids: (kot?.order_items)?.map((o: any) => o?.id),
      };

      try {
        const res = await cancelLiveKotView(kotId, data);
        if (res?.status === 200) {
          console.log(res);
          fetchLiveKotView();
        }
      } catch (error) {}
    }
  };

  const handleFoodIsReady = async (kotId: any) => {
    if (kotId) {
      try {
        const res = await updateLiveKotView(kotId);
        if (res?.status === 200) {
          console.log(res);
          fetchLiveKotView();
        }
      } catch (error) {}
    }
  };

  return (
    <div key={kot?.id}>
      {/* <OrderStatus/> */}
      <div className={`max-w-sm shadow-md rounded-lg overflow-hidden  `}>
        {/* Header Section */}
        <div
          className={`flex justify-between ${getOrderTypeColor(kot?.order_type)} p-3 rounded-t-md `}
          // className={`flex justify-between bg-purple-500 p-3 rounded-t-md `}
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-28 broder-r border-r-2 border-gray-100">
              <p>
                {kot?.order_type === "Dine In" && kot?.table} {kot?.order_type}
              </p>
            </div>
            <div className="w-24 h-6 broder-r border-r-2 border-gray-100">
              <p className="text-center mb-4">
                {kot?.kot_no} <br />
                KOT No.
              </p>
            </div>
            <div className="">
              <p className="text-center">
                {/* {time} */}
                <Timer createTime={kot?.create_time} />
                <br />
                MM : SS
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="mb-1 mt-1">
          {kot?.customer_name && (
            <div className="flex items-center bg-gray-300 px-3 py-2">
              {/* <p className="font-medium">{kot?.customer_name}</p>
              {kot?.customer_name ? " | " : ""}
              <p className="text-sm text-gray-500">{kot?.customer_phone}</p> */}
              <p className="font-medium">
                {kot?.customer_name
                  ? kot?.customer_name +
                    (kot?.customer_phone !== null
                      ? " | " + kot?.customer_phone
                      : "")
                  : ""}
              </p>
            </div>
          )}
          <p className="text-sm mt-1 flex justify-between bg-gray-300 px-3 py-2">
            <span className="font-medium">{kot?.biller_name}</span>
            {/* <span className="text-gray-500"> (Order note: {note})</span> */}
          </p>
        </div>

        {/* Order Items Section */}
        <div className="mb-4 ">
          <div className="flex justify-between border-b pb-2 mb-2 bg-gray-300 px-3 py-2">
            <span className="font-medium">Item</span>
            <span className="font-medium">Qty</span>
          </div>
          {kot?.order_items?.map((item: any) => (
            <div className="mb-2 px-4" key={item?.id}>
              <p className="font-medium">{item?.item_name}</p>
              {/* {item.note && (
                <p className="text-sm text-gray-500">Note: {item.note}</p>
              )} */}
              {/* {item.variation && (
                <p className="text-sm text-gray-500">
                  Variation
                  <br />
                  <span className="ml-4">{item.variation}</span>
                </p>
              )} */}
              {/* {item.addons && (
                <p className="text-sm text-gray-500">
                  Addons:
                  <br />
                  <span className="ml-4">{item.addons.join(", ")}</span>
                </p>
              )} */}
              <p className="text-sm text-right">{item?.quantity}</p>
            </div>
          ))}
        </div>
        <hr />
        {/* Action Buttons Section */}
        <div className="flex justify-end my-4 mx-4 gap-3">
          <button
            className="bg-gray-200 text-gray-700 rounded-full py-2 px-4"
            onClick={() => handleCancelKot(kot?.id)}
          >
            Cancel
          </button>
          <button
            className="bg-gray-800 text-white rounded-full py-2 px-4"
            onClick={() => handleFoodIsReady(kot?.id)}
          >
            Food is Ready
          </button>
        </div>
      </div>

      {/* <br />
      <hr />
      <div
        className={`max-w-sm  bg-white shadow-md rounded-lg overflow-hidden  `}
      >
        <div
          className={`flex justify-between ${statusColor} p-3 rounded-t-md `}
        >
          <div className="flex items-center justify-between w-full text-white">
            <div className="w-28 broder-r border-r-2 border-gray-100">
              <p>{type}</p>
            </div>
            <div className="w-24 h-6 broder-r border-r-2 border-gray-100">
              <p className="text-center mb-4">
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
        <div className="flex justify-end my-4 mx-4 gap-3">
          <button
            className="bg-gray-200 text-gray-700 rounded-full py-2 px-4"
            onClick={() => handleCancelKot(600)}
          >
            Cancel
          </button>
          <button
            className="bg-gray-800 text-white rounded-full py-2 px-4"
            onClick={() => handleFoodIsReady(603)}
          >
            Food is Ready
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default OrderCard;
