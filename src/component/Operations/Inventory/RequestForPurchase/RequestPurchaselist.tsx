import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import RequestPurchaseFliter from "./RequestPurchaseFliter";
import { getRequestForPurchase } from "../../../../Api/Operation/Api";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const RequestPurchaselist = () => {
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
  const [requestForPurchaseList, setRequestForPurchaseList] = useState([]);
  const [requestForPurchaseFilterData, setRequestForPurchaseFilterData] = useState<any>(null);

  useEffect(() => {
    fetchRequestForPurchase();
  }, [requestForPurchaseFilterData]);

  const fetchRequestForPurchase = async () => {
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
    if (requestForPurchaseFilterData !== null) {
      if (Object.keys(requestForPurchaseFilterData).length > 0) {
        Object.assign(data, { start_date: requestForPurchaseFilterData?.start_date });
        Object.assign(data, { end_date: requestForPurchaseFilterData?.end_date });
        Object.assign(data, { to_choice: requestForPurchaseFilterData?.to_choice });
        Object.assign(data, { purchase_request_number: requestForPurchaseFilterData?.purchase_request_number });
        Object.assign(data, { status: requestForPurchaseFilterData?.status });
      }
    }

    try {
      const res = await getRequestForPurchase(data);
      if (res.status === 200) {
        setRequestForPurchaseList(res.data?.data);
      }
    } catch (error) {}
  };

  console.log("requestForPurchaseList", requestForPurchaseList);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Request Purchase Listing</h2>
        <div className="flex gap-2">
          <Link to="/operations/inventory/RequestPurchaseAdd">
            <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              <FaPlus className="mr-2" /> Add Request Purchase
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
        <RequestPurchaseFliter
          setRequestForPurchaseFilterData={setRequestForPurchaseFilterData}
        />
      )}
      {/* Table */}
      <div className="overflow-auto mt-4">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">To</th>
              <th className="px-4 py-2 text-left">Request Number</th>
              <th className="px-4 py-2 text-left">Total (₹)</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Created By</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requestForPurchaseList?.length > 0
              ? requestForPurchaseList?.map((request: any) => (
                  <tr
                    key={request?.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {request?.to_id_name}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {request?.purchase_request_number}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {request?.grand_total}
                    </td>
                    <td className="px-4 py-3 text-[#3D3D3D]">
                      {dayjs(new Date(request?.create_time)).format(
                        // "YYYY-MM-DD HH:mm:ss"
                        "DD MMM YYYY"
                      )}
                    </td>
                    {/* <td className="px-4 py-3 text-[#3D3D3D]">{request?.id}</td> */}
                    {/* <td className="px-4 py-3 text-[#3D3D3D]">{request?.id}</td> */}
                    <td className="px-4 py-3 text-[#3D3D3D] flex items-center space-x-1 relative">
                      {request?.created_by}
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
                            {dayjs(new Date(request?.create_time)).format(
                              "DD-MMM-YYYY HH:mm:ss"
                            )}
                          </div>
                          <div>
                            Modified:{" "}
                            {dayjs(new Date(request?.update_time)).format(
                              "DD-MMM-YYYY HH:mm:ss"
                            )}
                          </div>
                          {/* Tooltip Arrow */}
                          {/* <div className="absolute top-0 left-2 transform -translate-y-full w-2 h-2 bg-white rotate-45 shadow-lg z-10"></div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {/* <button className="bg-green-500 text-white px-4 py-1 rounded-full"> */}
                      <button
                        className={`${request?.status === "saved" ? "bg-green-500" : "bg-yellow-500"} text-white px-4 py-1 rounded-full`}
                      >
                        {request?.status}
                      </button>
                    </td>
                  </tr>
                ))
              : "No data found"
            }
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

export default RequestPurchaselist;
