import React, { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import Sheet from "../../../common/Sheet";
import PurchaseOrderListSidebar from "../Purchase Management/PurchaseOrderListSidebar";
import Wastagesidebar from "./Wastagesidebar";
import SheetWastatge from "../../../common/SheetWastatge";

const WastageTable = () => {
  // Sample data for the calendar
  const calendarData = [
    { date: "1 June", cost: "4000" },
    { date: "2 June", cost: "3200" },
    { date: "3 June", cost: "800" },
    { date: "4 June", cost: "500" },
    { date: "5 June", cost: "1500" },
    { date: "6 June", cost: "5100" },
    { date: "7 June", cost: "3800" },
    { date: "8 June", cost: "4000" },
    { date: "9 June", cost: "3200" },
    { date: "10 June", cost: "800" },
    { date: "11 June", cost: "500" },
    { date: "12 June", cost: "1500" },
    { date: "13 June", cost: "5100" },
    { date: "14 June", cost: "3800" },
    { date: "15 June", cost: "4000" },
    { date: "16 June", cost: "3200" },
    { date: "17 June", cost: "800" },
    { date: "18 June", cost: "0" },
    { date: "19 June", cost: "1500" },
    { date: "20 June", cost: "5100" },
    { date: "21 June", cost: "3800" },
    { date: "22 June", cost: "4000" },
    { date: "23 June", cost: "3200" },
    { date: "24 June", cost: "800" },
    { date: "25 June", cost: "500" },
    { date: "26 June", cost: "1500" },
    { date: "27 June", cost: "5100" },
    { date: "28 June", cost: "3800" },
    { date: "29 June", cost: "4000" },
    { date: "30 June", cost: "3200" },
  ];
    const [isWastageSheetOpen, setIsWastageSheetOpen] = useState(false);
  const openWastageSheet = () => {
    setIsWastageSheetOpen(true);
  };

  const closeWastageSheet = () => {
    setIsWastageSheetOpen(false);
  };
  // State to track the selected day
  const [selectedDay, setSelectedDay] = useState(null);

  // State to toggle table visibility
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  // Handle click on any day
  const handleDayClick = (index: any) => {
    setSelectedDay(index);
  };

  // Handle toggle visibility of table
  const handleToggle = () => {
    setIsGraphVisible(!isGraphVisible);
  };

  // Days of the week
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="p-4 ">
      {/* Month and Year Dropdown */}
      <div className="border border-gray-300 mt-40 ">
        <div className="flex  items-center mb-6 ">
          <h2 className="text-base font-bold">June 2024</h2>
          <button onClick={handleToggle} className="focus:outline-none p-4">
            {isGraphVisible ? <FaCaretUp /> : <FaCaretDown />}
          </button>
        </div>

        {/* Conditionally Render Table */}
        {isGraphVisible && (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <th
                    key={index}
                    className="py-2 bg-gray-100 border border-gray-300 font-semibold text-center"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-4">
              {" "}
              {/* Added space between rows */}
              {/* Render Calendar Dates in Rows */}
              {Array.from({ length: Math.ceil(calendarData.length / 7) }).map(
                (_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex > 0 ? "mt-6  border-l border-gray-300" : ""
                    }
                  >
                    {calendarData
                      .slice(rowIndex * 7, rowIndex * 7 + 7)
                      .map((item, index) => (
                        <td
                          key={index}
                          onClick={() => handleDayClick(rowIndex * 7 + index)}
                          className="border-r border-g"
                        >
                          <div
                            className={`cursor-pointer border  border-gray-400 p-3 ml-3 w-40 h-[69px]  shadow-md rounded mt-3 ${
                              selectedDay === rowIndex * 7 + index
                                ? "border-l-4 border-l-[#DD312F] p-3  bg-gray-50 rounded" // Only the left border is red
                                : "border-l-4 border-l-gray-400 p-3 rounded"
                            }`}
                            onClick={openWastageSheet}
                          >
                            {" "}
                            <div className="text-start text-[#3D3D3D] ">
                              {item.date}
                            </div>
                            <div className="flex justify-end items-center text-[#3D3D3D] font-medium">
                              <LuIndianRupee />
                              <span>{item.cost}</span>
                            </div>
                          </div>
                        </td>
                      ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
      <SheetWastatge
        isOpen={isWastageSheetOpen}
        onClose={closeWastageSheet}
        title="Wastage Reports : 27 June 2024 | Total: ₹1500"
      >
        <Wastagesidebar />
      </SheetWastatge>
    </div>
  );
};

export default WastageTable;
