import React, { useState } from "react";
import { MdDelete, MdAdd, MdClose } from "react-icons/md";

const ItemsWise = () => {
  return (
    <div className="w-full max-w-4xl mx-auto  bg-white shadow-lg rounded-lg overflow-y-auto">
      <div className="flex justify-between items-center mt-2 mb-2">
        <h3 className="text-lg font-semibold px-4">Add More Bills</h3>
        <button className="border-2 border-red-500 text-red-500 px-4 py-2 mx-3 rounded-lg hover:bg-red-100">
          Add More Bills
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left: Add Items */}
        <div className=" border rounded-lg bg-gray-100 mx-4">
          <h4 className="bg-gray-700 text-white px-4 py-2 rounded-t-lg">
            Add Items
          </h4>
          <div className="mt-2 px-4  ">
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Seafood Noodles</span>
            </label>
            <label className="flex items-center gap-2 mb-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Fried Egg Noodles</span>
            </label>
          </div>
        </div>

        {/* Part 1 */}
        <div className="mx-4">
          <div className="mt-3  border rounded-lg bg-gray-100 ">
            <h4 className="bg-gray-700 text-white px-3   rounded-t-lg flex justify-between items-center">
              Part 1
              <button className="bg-white text-black my-2 px-2">Add</button>
            </h4>
            <div className=" p-3">
              {" "}
              <div className="flex justify-between items-center mb-2">
                <button className="text-red-500 hover:text-red-600 bg-white ">
                  <MdClose size={20} />
                </button>
                <span>Seafood Noodles</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <button className="text-red-500 hover:text-red-600 bg-white ">
                  <MdClose size={20} />
                </button>
                <span>Fried Egg Noodles</span>
              </div>
            </div>
          </div>

          {/* Part 2 */}
          <div className="mt-3  border rounded-lg bg-gray-100">
            <h4 className="bg-gray-700 text-white px-3   rounded-t-lg flex justify-between items-center">
              Part 2
              <button className="bg-white text-black my-2 px-2">Add</button>
            </h4>
            <div className="flex justify-between items-center mb-2 p-3">
              <button className="text-red-500 hover:text-red-600 bg-white ">
                <MdClose size={20} />
              </button>
              <span>Fried Egg Noodles</span>
            </div>
          </div>

          {/* Part 3 */}
          <div className="mt-3  border rounded-lg bg-gray-100">
            <div className="flex justify-between bg-gray-700">
              {" "}
              <h4 className=" text-white px-3  rounded-t-lg flex justify-between items-center">
                Part 3
              </h4>
              <button className="bg-white text-black my-2 px-2">Add</button>
              <button className="text-red-500 hover:text-red-600">
                <MdDelete size={20} />
              </button>
            </div>

            <div className="flex justify-between items-center mb-2 p-3">
              <button className="text-red-500 hover:text-red-600 bg-white ">
                <MdClose size={20} />
              </button>
              <span>Fried Egg Noodles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel and Save Buttons */}
      <div className="border-t border-gray-400 bg-gray-100 mt-4">
        {" "}
        <div className="flex justify-end space-x-4 py-3  px-4">
          <button
            type="button"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsWise;
