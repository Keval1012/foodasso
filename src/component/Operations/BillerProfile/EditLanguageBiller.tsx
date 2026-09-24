import React from "react";

const EditLanguageBiller = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="p-8 bg-white border border-gray-300">
        <form>
          <div className="mb-4 flex items-center">
            <label
              className="flex items-center text-black font-semibold"
              htmlFor="language"
            >
              Language <span className="text-red-500">*</span>
            </label>
            <div className="ml-12 relative w-[610px]">
              <select
                id="language"
                name="language"
                className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option className="hover:bg-green-600">Default Language</option>
                <option className="hover:bg-green-600">English</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLanguageBiller;
