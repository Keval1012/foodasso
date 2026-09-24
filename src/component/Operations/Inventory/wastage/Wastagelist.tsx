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
import WastageFliter from "../wastage/WastageFliter";
import Graph from "./Graph";
import WastageTable from "./WastageTable";

const Wastagelist = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Wastage Listing</h2>
          <div className="flex gap-2">
            <Link to="/operations/inventory/Wastageadd">
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                <FaPlus className="mr-2" /> Add wastage
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
        {isExpanded && <WastageFliter />}
        {/* Table */}
      </div>
      <div className="h-[422px] w-full">
        <Graph />
      </div>
      <WastageTable />
    </>
  );
};

export default Wastagelist;
