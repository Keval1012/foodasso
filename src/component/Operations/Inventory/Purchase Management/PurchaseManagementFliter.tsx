import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

interface PurchaseDataProps {
  setPurchaseFilterData: any;
}

const PurchaseManagementFliter: React.FC<PurchaseDataProps> = ({
  setPurchaseFilterData,
}) => {
  //   const dispatch = useDispatch();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  //   const [orderTypeList, setOrderTypeList] = useState([]);

  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    from_choice: "",
    invoice_number: "",
    payment_type: "",
    stock_purchase_status: "",
  });

  const toList = [
    { value: "supplier", label: "Supplier" },
    { value: "kitchen", label: "Kitchen" },
  ];

  const paymentList = [
    { value: "unpaid", label: "Unpaid" },
    { value: "paid", label: "Paid" },
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
      // payment_type: "",
      // from_choice: "supplier",
      // invoice_number: "",
      // start_date: "",
      // end_date: "2025-01-31",
      // stock_purchase_status: "pending"
    };

    // debugger
    if (filterData.start_date) {
      Object.assign(data, { start_date: filterData.start_date });
    }
    if (filterData.end_date) {
      Object.assign(data, { end_date: filterData.end_date });
    }
    if (filterData.from_choice) {
      Object.assign(data, { from_choice: filterData.from_choice });
    }
    if (filterData.invoice_number) {
      Object.assign(data, { invoice_number: filterData.invoice_number });
    }
    if (filterData.payment_type) {
      Object.assign(data, { payment_type: filterData.payment_type });
    }
    if (filterData.stock_purchase_status) {
      Object.assign(data, { stock_purchase_status: filterData.stock_purchase_status });
    }

    debugger
    setPurchaseFilterData(data);
  };

  const handleReset = async () => {
    setFilterData({
      start_date: "",
      end_date: "",
      from_choice: "",
      invoice_number: "",
      payment_type: "",
      stock_purchase_status: ""
    });

    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
    };
    setPurchaseFilterData(data);
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
            value={filterData.from_choice}
            onChange={(e) => handleInputSearch("from_choice", e.target.value)}
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
            Invoice No.
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            placeholder="Invoice No."
            value={filterData.invoice_number}
            onChange={(e) =>
              handleInputSearch("invoice_number", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterData.payment_type}
            onChange={(e) => handleInputSearch("payment_type", e.target.value)}
          >
            <option value="" defaultChecked>
              All
            </option>
            {paymentList?.map((payment) => (
              <option key={payment.value} value={payment.value}>
                {payment.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filterData.stock_purchase_status}
            onChange={(e) =>
              handleInputSearch("stock_purchase_status", e.target.value)
            }
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
export default PurchaseManagementFliter;
