import React, { useState } from "react";

const CustomerDetailsForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    dob: "",
    anniversary: "",
    sendUpdate: false,
    markAsFavorite: false,
    customerTags: "",
  });

  const handleInputChange = (e :any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e :any) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e :any) => {
    e.preventDefault();
    // Add logic to save form data
    console.log("Form Data:", formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg  w-96 shadow-lg">
        <h2 className="text-lg font-semibold px-4 py-1">Customer Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-1">
            <label className="block text-sm font-medium text-gray-700">
              Enter Below Information:
            </label>
          </div>

          {/* Email Field */}
          <div className="px-4 py-1 flex items-center">
            <label
              htmlFor="email"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none "
              placeholder="Email"
            />
          </div>

          {/* Date of Birth */}
          <div className="px-4 py-1 flex items-center">
            <label
              htmlFor="dob"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Date Of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none "
            />
          </div>

          {/* Date of Anniversary */}
          <div className="px-4 py-1 flex items-center">
            <label
              htmlFor="anniversary"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Anniversary
            </label>
            <input
              type="date"
              id="anniversary"
              name="anniversary"
              value={formData.anniversary}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none "
            />
          </div>

          {/* Preferences (Checkboxes) */}
          <div className="px-4 py-1">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferences
              </label>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="sendUpdate"
                  name="sendUpdate"
                  checked={formData.sendUpdate}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="sendUpdate"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Do Not Send Any Update
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="markAsFavorite"
                  name="markAsFavorite"
                  checked={formData.markAsFavorite}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="markAsFavorite"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Mark As Favorite
                </label>
              </div>
            </div>
          </div>

          {/* Customer Tags */}
          <div className="px-4 py-1 flex items-center">
            <label
              htmlFor="customerTags"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Customer Tags
            </label>
            <input
              type="text"
              id="customerTags"
              name="customerTags"
              value={formData.customerTags}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none "
              placeholder="Customer Tags"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-300 mt-3">
            <div className="px-4 py-2">
              
              <button
                type="button"
                className=" px-4 py-2 mr-3 border bg-white border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                onClick={() =>
                  setFormData({
                    email: "",
                    dob: "",
                    anniversary: "",
                    sendUpdate: false,
                    markAsFavorite: false,
                    customerTags: "",
                  })
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-5  mr-3 bg-green-500 text-white rounded-full hover:bg-green-600"
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

export default CustomerDetailsForm;
