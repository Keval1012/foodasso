import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const EditBillSetting: React.FC = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    headerText: "",
    footerText: "",
    messageForCustomer: "",
  });

  const [errors, setErrors] = useState({
    restaurantName: "",
    headerText: "",
    footerText: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let newErrors = {
      restaurantName: "",
      headerText: "",
      footerText: "",
    };

    if (!formData.restaurantName) {
      newErrors.restaurantName = "Restaurant Name is required";
    }
    if (!formData.headerText) {
      newErrors.headerText = "Header Text is required";
    }
    if (!formData.footerText) {
      newErrors.footerText = "Footer Text is required";
    }

    setErrors(newErrors);

    return (
      !newErrors.restaurantName &&
      !newErrors.headerText &&
      !newErrors.footerText
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6  border-b ">
        <h1 className="text-2xl font-semibold p-4">Bill Setting Printer</h1>
        <div className="flex justify-end items-center gap-4 p-4">
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 p-4">Bill Print Setting</h2>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="restaurantName"
              className="text-base font-medium w-1/3"
            >
              Restaurant Name <span className="text-red-500">*</span>
            </label>
            <input
              id="restaurantName"
              name="restaurantName"
              type="text"
              className={`w-2/3 px-3 py-2 border ${
                errors.restaurantName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter Name"
              style={{ width: "660px" }} // Set fixed width
              value={formData.restaurantName}
              onChange={handleChange}
            />
          </div>
          {errors.restaurantName && (
            <p className="text-red-500 text-sm">{errors.restaurantName}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="headerText" className="text-base font-medium w-1/3">
              Header Text <span className="text-red-500">*</span>
            </label>
            <input
              id="headerText"
              name="headerText"
              type="text"
              className={`w-2/3 px-3 py-2 border ${
                errors.headerText ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter Restaurant Name, Address, etc."
              style={{ width: "660px" }} // Set fixed width
              value={formData.headerText}
              onChange={handleChange}
            />
          </div>
          {errors.headerText && (
            <p className="text-red-500 text-sm">{errors.headerText}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="footerText" className="text-base font-medium w-1/3">
              Footer Text <span className="text-red-500">*</span>
            </label>
            <input
              id="footerText"
              name="footerText"
              type="text"
              className={`w-2/3 px-3 py-2 border ${
                errors.footerText ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter Restaurant Address, Phone Number, etc."
              style={{ width: "660px" }} // Set fixed width
              value={formData.footerText}
              onChange={handleChange}
            />
          </div>
          {errors.footerText && (
            <p className="text-red-500 text-sm">{errors.footerText}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="messageForCustomer"
              className="text-base font-medium w-1/3"
            >
              Message For New Customer
            </label>
            <input
              id="messageForCustomer"
              name="messageForCustomer"
              type="text"
              className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter Message"
              style={{ width: "660px" }} // Set fixed width
              value={formData.messageForCustomer}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Checkbox Section */}
        <div className="mb-4 pl-[439px] py-3">
          {/* <h2 className="font-semibold text-lg mb-2">Bill Settings</h2> */}
          <div>
            {[
              { id: "showHeader", label: "Show Restaurant Name" },
              { id: "showMedal", label: "Show “Retail Invoice” On Top" },
              {
                id: "showCustomer",
                label: "Show Sr No. Column in Item Listing",
              },
              { id: "showFooter", label: "Show Assign to Label" },
              { id: "hideDetails", label: "Show No of persons in Dine in" },
            ].map(({ id, label }) => (
              <div className=" items-center mb-2" key={id}>
                <input type="checkbox" id={id} className="mr-2" />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}

            {/* Radio buttons for date format */}
            <div className="flex gap-3">
              {[
                { id: "showDate", label: "Show Date" },
                { id: "showDateTime", label: "Show Date & Time" },
                { id: "orderCreatedDate", label: "Order Created Date" },
                { id: "initialBillDate", label: "Initial Bill Date" },
              ].map(({ id, label }) => (
                <div className="flex items-center mb-2" key={id}>
                  <input
                    type="radio"
                    name="dateFormat"
                    id={id}
                    className="mr-2"
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            {/* Additional Checkboxes */}
            {[
              { id: "showFooterAddress", label: "Show header bold in bill" },
              { id: "showRoundOff", label: "Show Footer Bold In Bill" },
              { id: "showDiscounts", label: "Show Restaurant Name Bold" },
              { id: "showCustomerPhone", label: "Show Customer's Phone No" },
              { id: "showTaxAmount", label: "Show Amount (xxx@) in Taxes" },
              { id: "showDiscountReason", label: "Show Discount Reason" },
              {
                id: "showAddonsPrice",
                label: "Show Addons price in bill print",
              },
              {
                id: "showAddonsRow",
                label: "Show Addons as a separate row in bill print",
              },
              { id: "showAddonGroupName", label: "Show Addon Group Name" },
              {
                id: "showSpecialNotes",
                label: "Show Special Notes in bill print",
              },
              { id: "showLogo", label: "Print restaurant logo in bill" },
              { id: "showZeroTaxes", label: "Show Zero Taxes" },
              {
                id: "showAddonQuantity",
                label:
                  "Show Addon Quantity with the total item quantity (multiplication) to prepare in Bill",
              },
            ].map(({ id, label }) => (
              <div className=" items-center mb-2" key={id}>
                <input type="checkbox" id={id} className="mr-2" />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
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

        {/* Billing Item Box Height */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Billing Item Box Height <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="0"
              className="border rounded px-3 py-2"
              style={{ width: "660px" }} // Set fixed width
            />
          </div>
        </div>

        {/* Font Sizes */}
        {[
          { label: "Restaurant Name Font Size", defaultValue: "14" },
          { label: "Header Footer Font Size For Bill", defaultValue: "13" },
          { label: "Dato Bill-No. Box Font Size", defaultValue: "13" },
          { label: "Item Listing Box Font Size For Bill", defaultValue: "13" },
          { label: "Grand Total Text Font Size", defaultValue: "14" },
          { label: "Billing Font Family", options: ["Verdana"] },
        ].map(({ label, defaultValue, options }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">
                {label} <span className="text-red-500">*</span>
              </label>
              {options ? (
                <select
                  className="border rounded px-3 py-2"
                  style={{ width: "660px" }}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  defaultValue={defaultValue}
                  className="border rounded px-3 py-2"
                  style={{ width: "660px" }} // Set fixed width
                />
              )}
            </div>
          </div>
        ))}

        {/* Paper Size */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">Paper Size</label>
            <select
              className="border rounded px-3 py-2"
              style={{ width: "660px" }}
            >
              <option value="">Select Paper Size</option>
            </select>
          </div>
        </div>

        {/* Column Widths */}
        {[
          { label: "Sr.No. Column Width", defaultValue: "10" },
          { label: "Quantity Column Width", defaultValue: "20" },
          { label: "Item Price Column Width", defaultValue: "40" },
          { label: "Item Total Amount Column Width", defaultValue: "55" },
        ].map(({ label, defaultValue }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={defaultValue}
                className="border rounded px-3 py-2"
                style={{ width: "660px" }} // Set fixed width
              />
            </div>
          </div>
        ))}

        {/* Item Listing Spacing */}
        {[
          {
            label: "Item Listing Line Height Between Two Rows",
            defaultValue: "5",
          },
          { label: "Extra Gap Between Separation", defaultValue: "5" },
          { label: "Items Per Page In Bill", defaultValue: "0" },
          { label: "Enter Decimal Point Shown In Quantity", defaultValue: "0" },
        ].map(({ label, defaultValue }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={defaultValue}
                className="border rounded px-3 py-2"
                style={{ width: "660px" }} // Set fixed width
              />
            </div>
          </div>
        ))}

        {/* Select Decimal Points */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Select Decimal Points For Bill Print Calculation
            </label>
            <select
              className="border rounded px-3 py-2"
              style={{ width: "660px" }}
            >
              <option value="master">Master Decimal</option>
            </select>
          </div>
        </div>

        {/* Show Add-On Quantity Checkbox */}
        <div className="mb-4 pl-[439px]">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm">
              Show Add-On/Quantity With The Total Item Quantity (Multiplication)
              To Prepare In Bill
            </span>
          </label>
        </div>

        {/* Complimentary and Sales Return Labels */}
        {[
          {
            label: "Complimentary Bill Label",
            defaultValue: "Complimentary Bill",
          },
          {
            label: "Sales Return Bill Label",
            defaultValue: "Sales Return Bill",
          },
        ].map(({ label, defaultValue }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">{label}</label>
              <input
                type="text"
                defaultValue={defaultValue}
                className="border rounded px-3 py-2"
                style={{ width: "660px" }} // Set fixed width
              />
            </div>
          </div>
        ))}

        {/* Main Sub Total Label */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Main Sub Total Label <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Sub Total"
              className="border rounded px-3 py-2"
              style={{ width: "660px" }} // Set fixed width
            />
          </div>
        </div>

        {/* Show FSSAI */}
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm w-1/3">
            Show FSSAI <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            {["None", "Below Header", "Below Footer"].map((option) => (
              <label className="flex items-center space-x-2" key={option}>
                <input
                  type="radio"
                  name="fssai"
                  defaultChecked={option === "None"}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Print Options */}
        {[
          { label: "Print Tax Amount In The Bill", defaultChecked: true },
          { label: "Print HSN Code", defaultChecked: false },
        ].map(({ label, defaultChecked }) => (
          <div className="mb-4 pl-[439px]" key={label}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="form-checkbox"
              />
              <span className="text-sm">{label}</span>
            </label>
          </div>
        ))}
        {/* button */}
        <div className="mt-6 flex justify-end space-x-4 border-t border-gray-300 p-3">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded-full">
            Reset
          </button>
          <button type="submit" className="px-4 py-2  bg-gray-300 rounded-full">
            Cancle
          </button>
          <Link to="/operations/bill_print/add/edit/KotSetting">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-full"
            >
              Next
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditBillSetting;
