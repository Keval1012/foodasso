import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerWiseFilterOpeData, setCustomerWiseOpeData, setDuePaymentFilterOpeData, setDuePaymentOpeData, setOrderWiseFilterOpeData, setOrderWiseOpeData } from "../../../redux/Features/OperationDataSlice";
import { getCustomerWiseDuePayment, getDuePayment, getOrderWiseDuePayment } from "../../../Api/Operation/Api";

const DuepaymentFliter = () => {

  const dispatch = useDispatch();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [filterData, setFilterData] = useState({
    name: "",
    phone: "",
    order_id: ""
  });

  const handleInputSearch = (field: any, value: any) => {
    setFilterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    let data = {
      outlet_id: loginUserData?.outlet,
      // "name": "demo"
      // "phone": "2222222222"
    };

    if (filterData.name) {
      Object.assign(data, { name: filterData.name });
    }
    if (filterData.phone) {
      Object.assign(data, { phone: filterData.phone });
    }
    if (filterData.order_id) {
      Object.assign(data, { order_id: filterData.order_id });
    }

    const tabVal = localStorage.getItem("tabValue");

    if (tabVal === 'order wise') {
      dispatch(setOrderWiseFilterOpeData(data));
      const res = await getOrderWiseDuePayment(data);
      if (res.status === 200) {
        dispatch(setOrderWiseOpeData(res.data));
      }
    }
    else if (tabVal === 'customer wise') {
      dispatch(setCustomerWiseFilterOpeData(data));
      const res = await getCustomerWiseDuePayment(data);
      if (res.status === 200) {
        dispatch(setCustomerWiseOpeData(res.data));
      }
    }
    else {
      dispatch(setDuePaymentFilterOpeData(data));
      const res = await getDuePayment(data);
      if (res?.status === 200) {
        dispatch(setDuePaymentOpeData(res.data));
      }
    }
    
  };

  const handleReset = async () => {
    setFilterData({
      name: "",
      phone: "",
      order_id: "",
    });

    let data = {
      outlet_id: loginUserData?.outlet,
    };

    const tabVal = localStorage.getItem("tabValue");
    
    if (tabVal === "order wise") {
      const res = await getOrderWiseDuePayment(data);
      if (res?.status === 200) {
        dispatch(setOrderWiseOpeData(res.data));
        dispatch(setOrderWiseFilterOpeData(null));
      }
    }
    else if (tabVal === "customer wise") {
      const res = await getCustomerWiseDuePayment(data);
      if (res?.status === 200) {
        dispatch(setCustomerWiseOpeData(res.data));
        dispatch(setCustomerWiseFilterOpeData(null));
      }
    } else {
      const res = await getDuePayment(data);
      if (res?.status === 200) {
        dispatch(setDuePaymentOpeData(res.data));
        dispatch(setDuePaymentFilterOpeData(null));
      }
    }
    
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* KOT No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            // placeholder="Enter KOT No."
            value={filterData.name}
            onChange={(e) => handleInputSearch("name", e.target.value)}
          />
        </div>

        {/* Table No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile No.
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            // placeholder="Enter Table No."
            value={filterData.phone}
            onChange={(e) => handleInputSearch("phone", e.target.value)}
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bill No.
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            // placeholder="Enter Customer Name"
            value={filterData.order_id}
            onChange={(e) => handleInputSearch("order_id", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={handleSearch}
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuepaymentFliter;
