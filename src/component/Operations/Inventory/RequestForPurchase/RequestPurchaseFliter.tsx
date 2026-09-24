import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import KotOrderFilterForm from "../../Kot/KotOrderFilterForm";
import { useSelector } from "react-redux";

interface RequestForPurchaseDataProps {
  setRequestForPurchaseFilterData: any;
}

const RequestPurchaseFliter: React.FC<RequestForPurchaseDataProps> = ({
  setRequestForPurchaseFilterData,
}) => {

  //   const dispatch = useDispatch();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  //   const [orderTypeList, setOrderTypeList] = useState([]);

  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    to_choice: "",
    purchase_request_number: "",
    status: "",
  });

  const toList = [
    { value: "supplier", label: "Supplier" },
    { value: "kitchen", label: "Kitchen" }
  ];

  const statusList = [
    { value: "saved", label: "Saved" },
    { value: "processed", label: "Processed" },
    { value: "sent & email", label: "Sent & Email" },
    { value: "cancelled", label: "Cancelled" },
  ];

  //   useEffect(() => {
  //     fetchOrderTypeData();
  //   }, []);

  //   const fetchOrderTypeData = async () => {
  //     const res = await getOrderType();
  //     if (res?.status === 200) {
  //       setOrderTypeList(res?.data?.data);
  //     }
  //   };
  //   console.log(orderTypeList);

  const handleInputSearch = (field: any, value: any) => {
    setFilterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
      // to_choice: "", // supplier, kitchen, restaurant
      // purchase_request_number: "",
      // status: "saved",
      // payment_type: "unpaid",
      // start_date: "2023-01-01",
      // end_date: "2024-10-21",
    };
    
    // debugger
    if (filterData.start_date) {
      Object.assign(data, { start_date: filterData.start_date });
    }
    if (filterData.end_date) {
      Object.assign(data, { end_date: filterData.end_date });
    }
    if (filterData.to_choice) {
      Object.assign(data, { to_choice: filterData.to_choice });
    }
    if (filterData.purchase_request_number) {
      Object.assign(data, { purchase_request_number: filterData.purchase_request_number });
    }
    if (filterData.status) {
      Object.assign(data, { status: filterData.status });
    }

    // debugger
    setRequestForPurchaseFilterData(data);
  };

  const handleReset = () => {
    setFilterData({
      start_date: "",
      end_date: "",
      to_choice: "",
      purchase_request_number: "",
      status: "",
    });

    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen
    };
    setRequestForPurchaseFilterData(data);
  };

  return (
    <div className="p-4 border rounded-md mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter KOT No."
            value={filterData.start_date}
            onChange={(e) => handleInputSearch("start_date", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter Table No."
            value={filterData.end_date}
            onChange={(e) => handleInputSearch("end_date", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterData.to_choice}
            onChange={(e) => handleInputSearch("to_choice", e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {toList?.map((to) => (
              <option key={to.value} value={to.value}>
                {to.label}
              </option>
            ))}
          </select>
        </div>
        {/* Table No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Request Number
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            placeholder="Request Number"
            value={filterData.purchase_request_number}
            onChange={(e) =>
              handleInputSearch("purchase_request_number", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterData.status}
            onChange={(e) => handleInputSearch("status", e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {statusList?.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
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
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none "
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
export default RequestPurchaseFliter;
