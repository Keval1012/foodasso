import React, { useState } from "react";
import sync from "../../Styles/assets/img/sync-icon.svg";
import syncbulb from "../../Styles/assets/img/bulb.svg";
import { useNavigate } from "react-router-dom";

const DataSync = () => {
  // State to track selected input mode (keyboard or touch)
  const [selectedMode, setSelectedMode] = useState("");

  // State to store sync code input
  const [syncCode, setSyncCode] = useState("");

  // State to handle validation error messages
  const [error, setError] = useState("");

  // Handle change event for radio buttons
  const handleRadioChange = (event: any) => {
    setSelectedMode(event.target.value);
  };

  // Handle change event for sync code input field
  const handleInputChange = (event: any) => {
    setSyncCode(event.target.value);
  };
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = () => {
    // Example validation: Sync code should be at least 6 characters long
    if (syncCode.trim().length < 6) {
      setError("Sync code must be at least 6 characters long.");
    } else {
      setError("");
      // Handle the form submission here
      console.log("Sync Code Submitted:", syncCode);
      navigate("/sync/billing_setup");
    }
  };

  return (
    <div className="p-6 w-full bg-white rounded-xl border border-gray-300 space-y-4">
      {/* Header and input mode selection */}
      <div className="grid grid-cols-3">
        <div>
          <h4>Data Sync</h4>
        </div>
        <div className="col-span-2 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          {/* Keyboard radio button */}
          <label className="flex items-center cursor-pointer space-x-2 border rounded-md p-4">
            <input
              type="radio"
              name="inputMode"
              value="keyboard"
              checked={selectedMode === "keyboard"}
              onChange={handleRadioChange}
              className="hidden peer"
            />
            <div
              className={`w-4 h-4 border-2 rounded-full ${
                selectedMode === "keyboard"
                  ? "bg-[#039855] border-[#039855]"
                  : "bg-white border-gray-300"
              } peer-checked:bg-[#039855] peer-checked:border-[#039855]`}
            />
            <span className="text-xs">Switch to Keyboard</span>
          </label>
          {/* Touch radio button */}
          <label className="flex items-center cursor-pointer space-x-2 border rounded-md p-4">
            <input
              type="radio"
              name="inputMode"
              value="touch"
              checked={selectedMode === "touch"}
              onChange={handleRadioChange}
              className="hidden peer"
            />
            <div
              className={`w-4 h-4 border-2 rounded-full ${
                selectedMode === "touch"
                  ? "bg-[#039855] border-[#039855]"
                  : "bg-white border-gray-300"
              } peer-checked:bg-[#039855] peer-checked:border-[#039855]`}
            />
            <span className="text-xs">Switch to Touch</span>
          </label>
        </div>
      </div>

      {/* Sync code prompt and input */}
      <div className="flex items-center space-x-4">
        <img src={sync} alt="Sync Icon" className="w-8 h-8" />
        <h2 className="text-lg text-red-600">Why do I need sync code?</h2>
      </div>
      <p className="text-gray-700 text-xs pl-3">
        Sync Code is required to sync data between the biller app and Foodasso
        Dashboard.
      </p>
      <div className="space-y-2 bg-gray-100 p-4 rounded-md">
        <label htmlFor="syncCode" className="text-xs text-gray-500">
          Sync code
        </label>
        <input
          type="text"
          id="syncCode"
          placeholder="Enter Your Sync Code"
          value={syncCode}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md ${
            error ? "border-red-500" : ""
          }`}
        />
        {/* Display validation error message */}
        {error && <p className="text-red-600 text-xs">{error}</p>}
        <div className="flex justify-end">
          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-full"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Instructions for getting sync code */}
      <div className="bg-pink-100 p-4 rounded-md text-gray-700">
        <div className="flex">
          <img className="" src={syncbulb} alt="Sync Instructions" />
          <h3 className="py-3 pl-2 font-semibold text-sm text-red-600">
            How to get sync code
          </h3>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            You can get your sync code from the Foodasso dashboard with your
            secure login.
          </li>
          <li>
            Follow these steps to get sync code: Owners Dashboard &gt; User
            Management &gt; Biller App &gt; Sync Code
          </li>
          <li>
            If you are having any problems with POS, contact our support team.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DataSync;
