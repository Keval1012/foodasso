import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getPaymentType } from "../../../../../Api/Api";

interface CurrentOrderFilterDataProps {
  setCurrentOrderFilterData: any;
};

const CurrentOrderFilterForm: React.FC<CurrentOrderFilterDataProps> = ({ setCurrentOrderFilterData }) => {

  const [paymentTypeList, setPaymentTypeList] = useState([]);

  const [filterData, setFilterData] = useState({
    customer_fullname: "",
    customer_phone: "",
    id: "",
    payment_type: "",
    order_status: [],
    table_no: "",
    order_type: "",
  });

  const orderStatusList = [
    { value: "save", label: "Save" },
    { value: "save_and_eBill", label: "Save and eBill" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  useEffect(() => {
    fetchPaymentTypeData();
  }, []);

  const fetchPaymentTypeData = async () => {
    const res = await getPaymentType();
    if (res.status === 200) {
        setPaymentTypeList(res?.data?.data);
    }
  };

  const handleInputSearch = (field: any, value: any) => {
    setFilterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    let data = {
      search: {
        // table_no: filterData.table_no
        // customer_fullname: filterData.customer_fullname,
        // customer_phone: filterData.customer_phone,
      },
      filter: {
        // id: filterData.id,
        // payment_type: filterData.payment_type,
        // order_status: filterData.order_status,
        // order_type: filterData.order_type,
      },
    };

    if (filterData.table_no) {
      Object.assign(data.search, { table_no: filterData.table_no });
    }
    if (filterData.customer_fullname) {
      Object.assign(data.search, { customer_fullname: filterData.customer_fullname });
    }
    if (filterData.customer_phone) {
      Object.assign(data.search, { customer_phone: filterData.customer_phone });
    }
    if (filterData.id) {
      Object.assign(data.filter, { id: filterData.id });
    }
    if (filterData.payment_type) {
      Object.assign(data.filter, { payment_type: filterData.payment_type });
    }
    if (filterData.order_status.length > 0) {
      Object.assign(data.filter, { order_status: [filterData.order_status] });
    }

    setCurrentOrderFilterData(data);
  };

  const handleReset = async () => {
    setFilterData({
      customer_fullname: "",
      customer_phone: "",
      id: "",
      payment_type: "",
      order_status: [],
      table_no: "",
      order_type: "",
    });

    let data = {
        search: { },
        filter: { }
    };
    setCurrentOrderFilterData(data);
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order No.
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filterData.id}
            onChange={(e) => handleInputSearch("id", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Table No.
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filterData.table_no}
            onChange={(e) => handleInputSearch("table_no", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Type
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterData.payment_type}
            onChange={(e) => handleInputSearch("payment_type", e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {paymentTypeList?.map((type: any) => (
              <option key={type?.id} value={type?.id}>
                {type?.type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filterData.customer_fullname}
            onChange={(e) => handleInputSearch("customer_fullname", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Phone No.
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={filterData.customer_phone}
            onChange={(e) =>
              handleInputSearch("customer_phone", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order Status
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterData.order_status}
            onChange={(e) => handleInputSearch("order_status", e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {orderStatusList?.map((kot: any) => (
              <option key={kot.value} value={kot.value}>
                {kot.label}
              </option>
            ))}
          </select>
        </div>

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

export default CurrentOrderFilterForm;