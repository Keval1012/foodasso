import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import KotOrderFilterForm from "./KotOrderFilterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOperationKotList } from "../../../Api/Operation/Api";

const Kot = () => {
  const navigate = useNavigate();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [isExpanded, setIsExpanded] = useState(false);
  const [kotList, setKotList] = useState([]);

  // const handleSearch = async () => {
  //   debugger;
  //   let data = {
  //     // start: (page - 1) * itemsPerPage,
  //     // limit: itemsPerPage,
  //     outlet_id: loginUserData?.outlet,
  //     search: {
  //       customer_fullname: "",
  //       customer_phone: "",
  //     },
  //     // "filter": {
  //     //     "kot_no": 3
  //     //     // "payment_type": 2
  //     //     // "kot_status": ["active"],
  //     //     // "table_no": ""
  //     //     // "order_type": "kot"
  //     // }
  //     // filter: {
  //     //   kot_no: "",
  //     //   payment_type: "",
  //     //   kot_status: [],
  //     //   table_no: "",
  //     //   order_type: ""
  //     // }
  //   };

  //   const res = await getOperationKotList(data);
  //   debugger;
  //   if (res?.status === 200) {
  //     setKotList(res.data?.data);
  //     // setKotTotalLength(res.data?.total_count);
  //   }
  // };

  return (
    <div>
      {" "}
      <div className=" flex justify-between items-center border-b py-3">
        <h2 className="text-xl font-semibold mb-4">KOT Details</h2>
        <div
          className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdKeyboardArrowLeft className="text-base" />
          <button className=" text-base">Back</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
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
        <div className="flex flex-wrap justify-end md:col-span-2 gap-2">
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Used in Bill
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-green-200 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Active
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-red-200 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Cancelled
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-[#ffd8a4]/20 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Not Prepared
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-[#daf2ff] rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Preparing
            </p>
          </div>
        </div>
      </div>
      {isExpanded && (
        <KotOrderFilterForm setKotFilterData={undefined}          // handleInputSearch={handleInputSearch}
          // handleSearch={handleSearch}
          // filterData={filterData}
        />
      )}
    </div>
  );
};

export default Kot;
