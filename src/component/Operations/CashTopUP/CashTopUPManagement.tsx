import React from "react";

type CashTopUPManagementProps = {
  onSearchClick: () => void;
};

const CashTopUPManagement: React.FC<CashTopUPManagementProps> = ({
  onSearchClick,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4 border mt-5 rounded">
      <div className="border-b ">
        <p className="p-2">Date For Cash Top-Up</p>
      </div>
      <form
        className="bg-white p-6 rounded"
        onSubmit={(e) => {
          e.preventDefault();
          onSearchClick(); // Trigger navigation to details page
        }}
      >
        <div className="flex items-center space-x-2">
          <label htmlFor="date" className="text-sm">
            Date
          </label>
          <div className="flex items-center border w-full rounded-md">
            <input
              type="date"
              id="date"
              className="p-2 border-none outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-orange-100 text-orange-500 rounded-full border border-orange-500 hover:bg-orange-500 hover:text-white transition"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default CashTopUPManagement;
