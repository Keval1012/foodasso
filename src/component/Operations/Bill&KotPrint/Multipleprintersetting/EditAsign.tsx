import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const EditAsign: React.FC = () => {
  const [printerName, setPrinterName] = useState<string>("");
  const [selectedPrinter, setSelectedPrinter] = useState<string>("");

  const handleNext = () => {
    // Handle next step logic
  };

  return (
    <div className="">
      <div className="flex justify-between items-center border-b border-gray-300 ">
        <h1 className="text-2xl font-semibold p-4">Bill/KOT Print</h1>
        <div className="flex gap-3 p-4 items-center py-2 rounded px-4 border border-gray-400">
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base">Back</button>
        </div>
      </div>
      {/* Form Section */}
      <div className="w-[989px] border border-gray-300 p-3 ml-3 mt-5 rounded-md">
        <h2 className="text-lg font-bold mb-4">Printer Details</h2>

        <div className="mb-4 flex items-center">
          <label htmlFor="printerName" className="w-1/3 text-base font-medium">
            Printer Name <span className="text-red-500">*</span>
          </label>
          <input
            id="printerName"
            type="text"
            className="w-[620px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-"
            value={printerName}
            onChange={(e) => setPrinterName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="selectPrinter"
            className="w-1/3 text-base font-medium"
          >
            Select Printer <span className="text-red-500">*</span>
          </label>
          <select
            id="selectPrinter"
            className="w-[620px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-"
            value={selectedPrinter}
            onChange={(e) => setSelectedPrinter(e.target.value)}
          >
            <option>Select Printer</option>
            {/* Add options here */}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="receiptType" className="w-1/3 text-base font-medium">
            Receipt Type
          </label>
          <select
            id="receiptType"
            className="w-[462px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-"
          >
            <option>Select Printer Receipt Type</option>
            {/* Add options here */}
          </select>
          <button className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Populate
          </button>
        </div>

        {/* Checkboxes */}
        <div className="mb-4 pl-[320px]">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-"
            />
            <span className="ml-2">Use Only For Captain Bill Print</span>
          </label>
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-"
            />
            <span className="ml-2">Use This Printer For Report Print</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6 border-t border-gray-300 p-2">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Reset
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300">
            Cancel
          </button>
          <Link to="/operations/bill_print/add/edit/billPrintSetting">
            <button
              onClick={handleNext}
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditAsign;
