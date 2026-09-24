import React, { useState } from "react";


interface CategoryReportListProps {
  // holdOrderList: any;
  // fetchHoldOrders: any;
}

const ItemReportSidebar: React.FC<CategoryReportListProps> = ({}) => {
  const [selectedOption, setSelectedOption] = useState("header");
  const [mainWidth, setMainWidth] = useState("500");
  const [fontSize, setFontSize] = useState("12");

  const handleSave = () => {
    // Save functionality here
  };
  return (
    <>
      <div className="bg-white  rounded-lg  relative">
        {/* Header */}

        {/* Radio Buttons */}
        <div className="flex gap-4 mb-4  p-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="printOption"
              value="header"
              checked={selectedOption === "header"}
              onChange={() => setSelectedOption("header")}
              className="mr-2"
            />
            Show Bill Header
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="printOption"
              value="footer"
              checked={selectedOption === "footer"}
              onChange={() => setSelectedOption("footer")}
              className="mr-2"
            />
            Show Bill Footer
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="printOption"
              value="none"
              checked={selectedOption === "none"}
              onChange={() => setSelectedOption("none")}
              className="mr-2"
            />
            None
          </label>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-4  p-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Display To Date On Print
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Display Time On Print
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Display Summary Box On Print
          </label>
        </div>

        {/* Main Width and Font Size Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-6  p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Width
            </label>
            <input
              type="text"
              value={mainWidth}
              onChange={(e) => setMainWidth(e.target.value)}
              className="border rounded-lg p-2 w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Size
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="border rounded-lg p-2 w-full text-sm"
            >
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="relative h-full border-t  border-gray-300">
          <div className="absolute top-0 left-0 p-3 right-0 flex justify-end gap-4 px-4">
            <button className="px-4 py-2 border rounded-lg text-gray-700">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemReportSidebar;
