import React, { useState } from "react";
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
import ConvertRawMaterialFliter from "./ConvertRawMaterialFliter";
import ConversionTable from "./ConversionTable";

const RequestPurchaselist = () => {
  const [isExpanded, setIsExpanded] = useState(false);


  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Convert Raw Material</h2>
        <div className="flex gap-2">
          <div className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer">
            <MdKeyboardArrowLeft className="text-base" />
            <button className=" text-base" onClick={() => navigate(-1)}>
              Back
            </button>
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
      {isExpanded && <ConvertRawMaterialFliter />}
      {/* Table */}
      <ConversionTable />
    </div>
  );
};

export default RequestPurchaselist;
