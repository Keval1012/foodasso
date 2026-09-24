import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSearchOutline, IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PurchaseManagementFliter from "./PurchaseManagementFliter";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getPurchase } from "../../../../Api/Operation/Api";
import dayjs from "dayjs";

const PurchaseManagementlist = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const invoices = [
    {
      from: "1 [Supplier]",
      invoiceDate: "2024-06-28",
      invoiceNo: "3",
      poMrnNo: "3",
      total: "500",
      payment: "500.00 Paid",
      createdBy: "Biller",
      status: "Save",
      createdDate: "24-Jan-2024 19:25:50",
      modifiedDate: "24-Jan-2024 19:25:50",
    },
    {
      from: "8 Foodies [Kitchen]",
      invoiceDate: "2024-06-27",
      invoiceNo: "2",
      poMrnNo: "2",
      total: "120",
      payment: "0.00 Unpaid",
      createdBy: "Biller",
      status: "Save",
      createdDate: "24-Jan-2024 19:25:50",
      modifiedDate: "24-Jan-2024 19:25:50",
    },
    {
      from: "1 [Supplier]",
      invoiceDate: "2024-06-27",
      invoiceNo: "PO0025162486",
      poMrnNo: "5",
      total: "120",
      payment: "0.00 Unpaid",
      createdBy: "Biller",
      status: "Save",
      createdDate: "24-Jan-2024 19:25:50",
      modifiedDate: "24-Jan-2024 19:25:50",
    },
  ];

  const navigate = useNavigate();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [purchaseList, setPurchaseList] = useState([]);
  const [purchaseFilterData, setPurchaseFilterData] = useState<any>(null);

  useEffect(() => {
    fetchPurchase();
  }, [purchaseFilterData]);

  const fetchPurchase = async () => {
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
    if (purchaseFilterData !== null) {
      if (Object.keys(purchaseFilterData).length > 0) {
        Object.assign(data, { start_date: purchaseFilterData?.start_date });
        Object.assign(data, { end_date: purchaseFilterData?.end_date });
        Object.assign(data, { from_choice: purchaseFilterData?.from_choice });
        Object.assign(data, { invoice_number: purchaseFilterData?.invoice_number });
        Object.assign(data, { payment_type: purchaseFilterData?.payment_type });
        Object.assign(data, { stock_purchase_status: purchaseFilterData?.stock_purchase_status });
      }
    }

    try {
      const res = await getPurchase(data);
      if (res.status === 200) {
        setPurchaseList(res.data?.data);
      }
    } catch (error) {}
  };

  console.log("purchaseList", purchaseList);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Purchase Listing</h2>
        <div className="flex gap-2">
          <Link to="/operations/inventory/AddPurchaseManagement">
            <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              <FaPlus className="mr-2" /> Add Purchase
            </button>
          </Link>
          <div
            className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className=" text-base">Back</button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <form className="w-full md:w-80">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchOutline />
          </div>

          {/* Input Field */}
          <input
            type="search"
            id="default-search"
            className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
            disabled
          />

          {/* Up/Down Icons */}
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </div>
        </div>
      </form>
      {isExpanded && (
        <PurchaseManagementFliter
          setPurchaseFilterData={setPurchaseFilterData}
        />
      )}
      {/* Table */}
      <div className="overflow-auto mt-4">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">From</th>
              <th className="px-4 py-2 text-left">Invoice Date</th>
              <th className="px-4 py-2 text-left">Invoice No.</th>
              <th className="px-4 py-2 text-left">PO/MRN No.</th>
              <th className="px-4 py-2 text-left">Total (₹)</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Created By</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchaseList?.length > 0
              ? purchaseList?.map((purchase: any) => (
                  <tr
                    key={purchase?.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {purchase?.from_id_name}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {dayjs(new Date(purchase?.invoice_date)).format(
                        "DD MMM YYYY"
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {purchase?.invoice_number}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {purchase?.purchase_order_number}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {purchase?.grand_total}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {purchase?.payment_amount !== null
                        ? purchase?.payment_amount
                        : "0.00"}
                      <br />
                      {purchase?.payment_type}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D] flex items-center space-x-1 relative">
                      {purchase?.created_by}
                      <div className="relative group">
                        <span className="text-gray-400 cursor-pointer">
                          <IoIosInformationCircleOutline
                            size={20}
                            className="text-[#3D3D3D]"
                          />
                        </span>

                        {/* Tooltip */}
                        <div
                          className="absolute left-0  w-64 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-20
                      rounded-md shadow-lg bg-gray-200 p-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                        >
                          {" "}
                          <div>
                            Created:{" "}
                            {dayjs(new Date(purchase?.create_time)).format(
                              "DD-MMM-YYYY HH:mm:ss"
                            )}
                          </div>
                          <div>
                            Modified:{" "}
                            {dayjs(new Date(purchase?.update_time)).format(
                              "DD-MMM-YYYY HH:mm:ss"
                            )}
                          </div>
                          {/* Tooltip Arrow */}
                          {/* <div className="absolute top-0 left-2 transform -translate-y-full w-2 h-2 bg-white rotate-45 shadow-lg z-10"></div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        // className="bg-green-500 text-white px-4 py-1 rounded-full"
                        className={`${purchase?.status === "saved" ? "bg-green-500" : "bg-yellow-500"} text-white px-4 py-1 rounded-full`}
                      >
                        {purchase?.status}
                      </button>
                    </td>
                  </tr>
                ))
              : "No data found"}
            <tr className="bg-gray-100 w-full">
              <td colSpan={8} className="p-4 text-center text-sm text-gray-500">
                ℹ️ Note: We Are Displaying Latest 500 Records.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseManagementlist;
