import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { setOrderType, setLiveOrder } from "../../../../redux/Features/BillingDataSlice";
import { getOrderType, getLiveOrders } from "../../../../Api/Api";
import { useDispatch } from "react-redux";

const LiverOrderform = () => {
  const dispatch = useDispatch();
  const [orderTypes, setOrderTypes] = useState([]);
  const [kotNo, setKotNo] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [kotStatus, setKotStatus] = useState("");

  const getOrderTypes = async () => {
    const response = await getOrderType();
    if (response?.status === 200) {
      const types = response.data.data || [];
      dispatch(setOrderType(types));
      setOrderTypes(types);
      console.log(types, "Fetched order types");
    }
  };

  useEffect(() => {
    getOrderTypes();
  }, []);

  const handleSubmit = async () => {

    let data = {
      outlet: 1,
    };

    if (kotNo) Object.assign(data, { kot_id: kotNo });
    if (tableNo) Object.assign(data, { table_no: tableNo });
    if (customerName) Object.assign(data, { customer_name: customerName });
    if (customerPhone) Object.assign(data, { customer_phone: customerPhone });
    if (kotStatus) Object.assign(data, { kot_status: kotStatus });

    try {
      const res = await getLiveOrders(data);
      if (res?.status === 200) {
        dispatch(setLiveOrder(res.data?.data));
      }
    } catch (error) {
      console.error("Error fetching live orders:", error);
    }
  };

  const handleReset = async () => {
    setKotNo("");
    setTableNo("");
    setCustomerName("");
    setCustomerPhone("");
    setKotStatus("");

    let data = {
      outlet: 1,
      order_type: localStorage.getItem("orderTypeId"),
    };

    try {
      const res = await getLiveOrders(data);
      if (res?.status === 200) {
        dispatch(setLiveOrder(res.data?.data));
      }
    } catch (error) {
      console.error("Error fetching live orders on reset:", error);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <div
       
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        {/* KOT No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">KOT No.</label>
          <input
            type="text"
            value={kotNo}
            onChange={(e) => setKotNo(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter KOT No."
          />
        </div>

        {/* Table No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Table No.</label>
          <input
            type="text"
            value={tableNo}
            onChange={(e) => setTableNo(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Table No."
          />
        </div>

        {/* Order Type Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Order Type</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={kotStatus}
            onChange={(e) => setKotStatus(e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {orderTypes.map((type:any) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Customer Name"
          />
        </div>

        {/* Customer Phone No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Phone No.</label>
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Customer Phone No."
          />
        </div>

        {/* KOT Status */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">KOT Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={kotStatus}
            onChange={(e) => setKotStatus(e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {orderTypes.map((type:any) => (
              <option key={type.id} value={type.id}>
                {type.type}
              </option>
            ))}
          </select>
        </div> */}

        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
           onClick={handleSubmit}
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiverOrderform;
