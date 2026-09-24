import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { getLiveKotView } from "../../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import { setLiveKot } from '../../../../redux/Features/BillingDataSlice';

interface OrderType {
  id: string; // assuming id is a string, adjust type as necessary
  type: string;
}

const OrderSearch: React.FC = () => {
  const [kotNo, setKotNo] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [timeExceed, setTimeExceed] = useState<string>("");
  const [isSearchDisabled, setIsSearchDisabled] = useState<boolean>(true);
  const [orderType, setOrderType] = useState<Record<string, boolean>>({});
  const dispatch = useDispatch();

  const orderTypes: OrderType[] = useSelector((state: any) => state.billingData.orderType);

  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType((prev) => ({ ...prev, [type.id]: !prev[type.id] }));
  };

  const handleReset = async () => {
    setOrderType({});
    setKotNo("");
    setCustomerPhone("");
    setCustomerName("");
    setTimeExceed("");
    const payload = {
      outlet_id: 1,
      kot_status: "not_prepared",
    };
    const response = await getLiveKotView(payload);
    if (response?.status === 200) {
      dispatch(setLiveKot(response.data?.data || []));
    }
    setIsSearchDisabled(true); // Disable search button on reset
  };

  const handleSearch = async () => {
    const payload: {
      outlet_id: number;
      kot_status: string;
      order_type?: string[]; // This will now hold the IDs
      kot_no?: string;
      customer_phone?: string;
      customer_name?: string;
      time_exceed?: string;
    } = {
      outlet_id: 1,
      kot_status: "not_prepared",
      order_type: Object.keys(orderType).filter((key) => orderType[key]),
    };
    if (kotNo) payload.kot_no = kotNo;
    if (customerPhone) payload.customer_phone = customerPhone;
    if (customerName) payload.customer_name = customerName;
    if (timeExceed) payload.time_exceed = timeExceed;

    const response = await getLiveKotView(payload);
    if (response?.status === 200) {
      dispatch(setLiveKot(response.data?.data || []));
    }
    setIsSearchDisabled(false);
  };

  useEffect(() => {
    setIsSearchDisabled(
      !kotNo && !customerPhone && !customerName && !timeExceed && 
      !Object.values(orderType).includes(true)
    );
  }, [kotNo, customerPhone, customerName, timeExceed, orderType]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <label className="font-semibold text-gray-700">Order Type:</label>
        <div className="flex items-center gap-4">
          {orderTypes.map((type) => (
            <label key={type.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={orderType[type.id] || false}
                onChange={() => handleOrderTypeChange(type)}
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="text-gray-700 capitalize">{type.type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700">KOT No.</label>
          <input
            type="text"
            value={kotNo}
            onChange={(e) => setKotNo(e.target.value)}
            placeholder="Enter KOT No."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Phone</label>
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Enter Customer Phone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter Customer Name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Time Exceed (Minutes):</label>
          <input
            type="text"
            value={timeExceed}
            onChange={(e) => setTimeExceed(e.target.value)}
            placeholder="Enter Time Exceed"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className={`px-4 py-2 text-white bg-red-500 rounded-md flex items-center gap-2 ${
            isSearchDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearch}
          disabled={isSearchDisabled}
        >
          <IoIosSearch /> Search
        </button>
      </div>
    </div>
  );
};

export default OrderSearch;
