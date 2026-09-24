import React from "react";

const PortionWise: React.FC = () => {
  return (
    <div className="">
      <form className="space-y-4">
        {/* Customer Paid */}
        <p className="px-3 py-2">
          please enter number in which bill can be splited :
        </p>
        <div className="flex flex-col md:flex-row md:items-center gap-2 px-3 pt-3">
          <label className="mb-2 md:mb-0  text-gray-700">1/</label>
          <input
            type="text"
            placeholder=""
            min={0}
            className="w-full  border border-gray-300 rounded-md p-2 focus:outline-none "
          />
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-400 bg-gray-100 ">
          {" "}
          <div className="flex justify-end space-x-4 mt-4 px-3 pb-3">
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
      </form>
    </div>
  );
};

export default PortionWise;
