import { IoSearchOutline, IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import KotOrderFilterForm from "../Kot/KotOrderFilterForm";
import DueTabManagement from "./DuePaymentReport tab/DueTabManagement";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DuepaymentFliter from "./DuepaymentFliter";

const DuePaymentReport = () => {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="p-3">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        {/* <div className="flex space-x-2">
          <button className="bg-orange-500 text-white py-2 px-4 rounded">
            Order Wise
          </button>
          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
            Customer Wise
          </button>
        </div> */}

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
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </div>
        </div>
      </div>

      {/* Export and Print Buttons */}
      {/* <div className="mt-4 flex justify-end space-x-2">
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
          Export
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">
          Print
        </button>
        
      </div> */}
      {isExpanded && <DuepaymentFliter  />}

      <DueTabManagement />
    </div>
  );
};

export default DuePaymentReport;