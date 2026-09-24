import React, { useState } from "react";
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import KotOrderFilterForm from "../../UpperTabs/Tabscomponents/LiverOrderform";
import OrderSearch from "./OrderSearch";

const OrderStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  return (
    <>
    <div className="flex justify-between">
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
            placeholder="search"
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

      <div className="">
        <div className="flex  items-center ">
          <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-4 py-2 mr-1">
            <div className=" h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
            <p className="">Delivery</p>
          </div>

          <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1 ml-1">
            <div className=" h-5 w-5 bg-red-400 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base  rounded-md ">
              Limit Exceed
            </p>
          </div>

          <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className=" h-5 w-5 bg-yellow-400 rounded-full"></div>

            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base  rounded-md ">
              Dine in
            </p>
          </div>
          <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className=" h-5 w-5 bg-green-400 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base  rounded-md ">
              pick up
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="">
        {isExpanded && <OrderSearch />}

    </div>
    </>
  );
};

export default OrderStatus;
<div className="flex w-full">
  <div className="flex justify-between">
    <div className=""></div>
  </div>
</div>;
