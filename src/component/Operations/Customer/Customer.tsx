import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Customer = () => {

  const navigate = useNavigate();
  
  return (
    <div>
      <div className=" flex justify-between items-center border-b py-3">
        <h2 className="text-xl font-semibold mb-4">Customer Listing</h2>
        <div
          className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base">Back</button>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
        <form className="w-full md:w-80">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline />
            </div>
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Here"
              required
            />
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Customer;
