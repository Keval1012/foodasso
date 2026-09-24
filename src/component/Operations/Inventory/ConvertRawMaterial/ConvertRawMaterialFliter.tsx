import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import KotOrderFilterForm from "../../Kot/KotOrderFilterForm";
// import { useDispatch, useSelector } from "react-redux";
// import { getOperationKotList } from "../../../Api/Operation/Api";
// import {
//   setKotFilterOpeData,
//   setKotListOpeData,
// } from "../../../redux/Features/OperationDataSlice";
// import { getOrderType } from "../../../Api/Api";

// interface KotFilterDataProps {
//   handleInputSearch: any;
//   filterData: any;
// }

const ConvertRawMaterialFliter = ({}) => {
  return (
    <div className="p-4 border rounded-md mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter KOT No."
            // value={filterData.kot_no}
            // onChange={(e) => handleSearch("kot_no", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            // value={filterData.order_type}
            // onChange={(e) => handleInputSearch( e.target.value)}
          >
            <option value="">All</option>
          </select>
        </div>
        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
            // onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none "
            // onClick={handleSearch}
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConvertRawMaterialFliter;
