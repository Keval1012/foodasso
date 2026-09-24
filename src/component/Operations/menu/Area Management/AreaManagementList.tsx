import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";

const AreaManagementList = () => {
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6  border-b ">
        <h1 className="text-2xl font-semibold p-4">Area Listing</h1>
        <div className="flex justify-end items-center gap-4">
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
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
          />

          {/* Up/Down Icons */}
          <div className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"></div>
        </div>
      </form>

      {/* Table Section */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm text-start">
              <th className="px-4 py-2 border-b  text-start">Name</th>
              <th className="px-4 py-2 border-b  text-start">Total Tables</th>
              <th className="px-4 py-2 border-b  text-start">Tables</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">AC</td>
              <td className="px-4 py-2">8</td>
              <td className="px-4 py-2 space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200"
                  >
                    {num}
                  </button>
                ))}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Non-AC</td>
              <td className="px-4 py-2">6</td>
              <td className="px-4 py-2 space-x-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200"
                  >
                    {num}
                  </button>
                ))}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Garden</td>
              <td className="px-4 py-2">4</td>
              <td className="px-4 py-2 space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200"
                  >
                    {num}
                  </button>
                ))}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Terrace</td>
              <td className="px-4 py-2">5</td>
              <td className="px-4 py-2 space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200"
                  >
                    {num}
                  </button>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreaManagementList;
