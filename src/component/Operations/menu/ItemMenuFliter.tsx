import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const ItemMenuFliter = () => {
  return (
    <div className="p-4 border rounded-md">
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* KOT No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
          />
        </div>

        {/* Table No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Short Code
          </label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none ">
                <option value="default" disabled selected>
                  Select an option
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none ">
                <option value="default" disabled selected>
                  Select an option
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </label>
        </div>
        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none "
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemMenuFliter;
