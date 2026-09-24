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

import { HiOutlinePrinter } from "react-icons/hi2";
import { TiExport } from "react-icons/ti";
import TipSummaryFliter from "./TipSummaryFliter";
import TipSummaryTable from "./TipSummaryTable";

const TipSummary = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 border-b p-3 border-gray-300">
        <h2 className="text-xl font-semibold">Tip Summary Report</h2>
        <div className="flex gap-2">
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
      <div className="flex justify-between items-center w-full">
        <form className="flex items-center p-3">
          <div className="relative w-full md:w-80">
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
      </div>
      {isExpanded && <TipSummaryFliter />}
      {/* Table */}
      {/* <OpenCloseTable /> */}
      <div className=" border border-gray-300 mt-4">
        <div className=" flex justify-between my-4 p-3">
          <h1 className="text-base text-[#3D3D3D] font-bold mb-4">
            Tip Summary 10-09-2024
          </h1>
          {/* Print and Export Buttons */}
          <div className="flex space-x-2 ml-4">
            <div className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded text-gray-700 cursor-pointer">
              <HiOutlinePrinter size={20} />
              <button type="button">Print</button>
            </div>
            <div className="flex gap-2 items-center px-4 py-2 border border-gray-300 rounded text-gray-700 cursor-pointer">
              <TiExport size={20} />
              <span>Export Excel</span>
            </div>
          </div>
        </div>
        <TipSummaryTable />
      </div>
    </div>
  );
};

export default TipSummary;
