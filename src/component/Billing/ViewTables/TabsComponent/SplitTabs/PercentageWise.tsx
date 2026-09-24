import { MdClose } from "react-icons/md";

const PercentageWise = () => {
  return (
    <div className="w-full max-w-lg mx-auto  bg-white shadow-lg rounded-lg">
      <div className="flex justify-between p-4">
        <h3 className="text-lg font-semibold mb-4">
          Please Provide Only Number
        </h3>
        <button
          type="button"
          className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500"
        >
          Add More
        </button>
      </div>

      {/* First Input Field */}
      <div className="mb-4 px-4">
        <label className="block mb-1 font-medium">Percentage Number:</label>
        <input
          type="text"
          placeholder="Enter Percentage Here Like 80"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Second Input Field */}
      <div className="mb-4 px-4">
        <label className="block mb-1 font-medium">Percentage Number:</label>
        <input
          type="text"
          placeholder="Enter Percentage Here Like 80"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Third Input Field with Close Icon */}
      <div className="mb-4 px-4">
        <label className="block mb-1 font-medium">Percentage Number:</label>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Enter Percentage Here Like 80"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
          <button className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600">
            <MdClose className="text-white" size={24} />
          </button>
        </div>
      </div>

      {/* Cancel and Save Buttons */}
      {/* Buttons */}
      <div className="border-t border-gray-400 bg-gray-100 ">
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

export default PercentageWise;
