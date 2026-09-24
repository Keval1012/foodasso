

import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
const KotBillSetting = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-6  border-b ">
        <h1 className="text-2xl font-semibold p-4">KOT Setting Printer</h1>
        <div className="flex justify-end items-center gap-4 p-4">
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 p-4">KOT Print Setting</h2>

      <form className="space-y-6 p-6">
        {/* Delivery, Pick Up, Dine In */}
        <div className="flex items-center space-x-4">
          <label className="block text-gray-700 w-1/3">
            Print Token Number Slip Separately
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="delivery"
                defaultChecked={false}
                className="form-checkbox"
              />
              <span className="ml-2">Delivery</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="pickup"
                defaultChecked={false}
                className="form-checkbox"
              />
              <span className="ml-2">Pick Up</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="dinein"
                defaultChecked={false}
                className="form-checkbox"
              />
              <span className="ml-2">Dine In</span>
            </label>
          </div>
        </div>

        {/* Billing Outer Space */}
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm w-1/3">
            Billing Outer Space <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-4">
            {["Top", "Bottom", "Right", "Left"].map((position) => (
              <div key={position} className=" items-center">
                {" "}
                {/* Use flex for alignment */}
                <label className="block text-sm mb-1 mr-2">
                  {" "}
                  {/* Margin to separate label and input */}
                  {position}
                </label>
                <input
                  type="text"
                  defaultValue="0"
                  className="border rounded px-3 py-2"
                  style={{ width: "143px" }} // Set fixed width
                />
              </div>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Print Token Text Font Size
          </label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-[660px]"
            style={{ width: "660px" }}
          />
        </div>

        {/* Header Text */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Header Text</label>
          <input
            type="text"
            name="headerText"
            defaultValue=""
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Footer Text */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Footer Text</label>
          <input
            type="text"
            name="footerText"
            defaultValue=""
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Main Width */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Main Width</label>
          <input
            type="text"
            name="mainWidth"
            defaultValue={250}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Sr No. Column Width */}
        <div className=" items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Sr No. Column Width
          </label>
          <input
            type="text"
            name="columnWidth"
            defaultValue={10}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Quantity Column Width */}
        <div className="gap-4">
          <div className="flex items-center space-x-2">
            <label className="block text-gray-700 w-1/3">
              Quantity Column Width *
            </label>
            <input
              type="text"
              name="quantityWidth"
              defaultValue={30}
              className="border rounded px-3 py-2 w-[660px]"
            />
          </div>
          <div className="flex items-center space-x-2 mt-5">
            <label className="block text-gray-700 w-1/3">
              Item Total Amount Column Width *
            </label>
            <input
              type="text"
              name="amountWidth"
              defaultValue={50}
              className="border rounded px-3 py-2 w-[660px]"
            />
          </div>
        </div>

        {/* Decimal Points */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Enter Decimal Point Shown In Quantity *
          </label>
          <input
            type="text"
            name="decimalPoints"
            defaultValue={50}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Line Height Between Rows */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Item Listing Line Height Between Two Rows
          </label>
          <input
            type="text"
            name="lineHeight"
            defaultValue={0}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Font Size */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Font Size *</label>
          <input
            type="number"
            name="fontSize"
            defaultValue={13}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Extra Space */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Add Extra Space In Print
          </label>
          <input
            type="text"
            name="extraSpace"
            defaultValue={0}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Font Family */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Font Family *</label>
          <input
            type="text"
            name="fontFamily"
            defaultValue="Verdana"
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Checkbox Options */}
        <div className="space-y-4 pl-[332px]">
          {[
            "Show Sr No. Column in Item Listing",
            "Show Customer Information",
            "Show Assign To Label",
            "Show Biller/Captain Name",
            "Show Quantity Before Item Name",
            "Show Item Quantity Total",
            "Print Label/Sticker For Each Kot Items On Labeled Printer",
            "Print Label/Sticker For Each Kot Items On General Printer",
            "Display Item Description Below Item Name in Kot Print",
            "Show Addon Group Name",
            "Show No. af parsons in DinE In",
            "Show Addon Quantity with the total item quantity (multiplication) to prepare in Bill.",
            "Show Item Total",
          ].map((label, index) => (
            <label key={index} className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>

        {/* Order Type Options */}
        <div className="flex items-center space-x-2">
          <label className="block font-semibold mb-2 w-1/4">
            Order Type Options *
          </label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="orderType"
                value="orderType"
                className="form-radio"
              />
              <span className="ml-2">Order Type</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="orderType"
                value="subOrderType"
                className="form-radio"
              />
              <span className="ml-2">Sub Order Type</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="orderType"
                value="both"
                className="form-radio"
              />
              <span className="ml-2">Both</span>
            </label>
          </div>
        </div>

        {/* Kot Print Options */}
        <div className="flex items-center space-x-2">
          <label className="block font-semibold mb-2 w-1/4">
            Kot Print Options *
          </label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="kotPrint"
                value="preparationArea"
                className="form-radio"
              />
              <span className="ml-2">Item Name</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="kotPrint"
                value="stationWise"
                className="form-radio"
              />
              <span className="ml-2">Short Code</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="kotPrint"
                value="stationWise"
                className="form-radio"
              />
              <span className="ml-2">Both</span>
            </label>
          </div>
        </div>
        <div className="space-y-4 pl-[332px]">
          {[
            "Print suggested food ready timing",
            "Print optional addons in bold letters. (For general printer)",
            "Show customer notes",
          ].map((label, index) => (
            <label key={index} className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6 border-t border-gray-300 p-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default KotBillSetting;
