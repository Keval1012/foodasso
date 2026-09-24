import React, { useState } from "react";

const CustomerTexInfo = () => {
  const [gstNumber, setGstNumber] = useState("");

  const handleInputChange = (e:any) => {
    setGstNumber(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add logic to save the GST number
    console.log("GST Number Saved:", gstNumber);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className=" bg-white rounded-lg  w-80 shadow-lg">
        <h2 className="text-lg font-semibold p-4">
          Customer GST Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" flex items-center gap-4 p-4">
            <label
              htmlFor="gst"
              className="block text-sm font-medium text-gray-700"
            >
              GST No.
            </label>
            <input
              type="text"
              id="gst"
              value={gstNumber}
              onChange={handleInputChange}
              className="flex-grow mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="GST NUMBER"
            />
          </div>

          <div className="flex justify-end space-x-3 bg-gray-200  border-t border-gray-300">
            <div className="p-4">
              <button
                type="button"
                className="py-2 px-4 border bg-white border-gray-300 rounded-full mr-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setGstNumber("")} // Logic to handle cancel
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerTexInfo;
