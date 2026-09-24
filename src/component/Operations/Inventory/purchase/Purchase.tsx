import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai"; // Import the right arrow icon
import { FaArrowRightLong } from "react-icons/fa6";
import ImageIcon from "../../../common/ImageIcon";
import textpurches from "../../../../Styles/assets/img/PurchaseManagement.svg";
import request from "../../../../Styles/assets/img/requestmanagment.svg";
import wastage from "../../../../Styles/assets/img/wastage.svg";
import rawmatreal from "../../../../Styles/assets/img/rawmaterials.svg";
import currentstock from "../../../../Styles/assets/img/currentstock.svg";
import openstock from "../../../../Styles/assets/img/openstock.svg";
import { Link } from "react-router-dom";

const Purchase = () => {
  return (
    <div className="p-3">
      <div className="border border-gray-300 p-4 rounded-lg my-5">
        <p className="text-base font-semibold mb-4">Purchase</p>
        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {/* Purchase Management Card */}
          <Link to="/operations/inventory/PurchaseManagement">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-x-2">
                  <ImageIcon
                    src={textpurches}
                    alt="Card Logo"
                    className="cursor-pointer w-6 h-6"
                  />
                  Purchase Management
                </h2>
                <p className="text-gray-600 mt-2 p-2">
                  Keep track of your raw material purchase and inward entry.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <FaArrowRightLong size={20} />
              </span>
            </div>
          </Link>
          {/* Request for Purchase Card */}
          <Link to="/operations/inventory/RequestPurchaselist">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-x-2">
                  <ImageIcon
                    src={request}
                    alt="Card Logo"
                    className="cursor-pointer w-6 h-6"
                  />
                  Request For Purchase
                </h2>
                <p className="text-gray-600 mt-2">
                  Initiate purchase requests (PR) and keep track of the purchase
                  request.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold">
                <FaArrowRightLong size={20} />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="border border-gray-300 p-4 rounded-lg my-5">
        <p className="text-base font-semibold mb-4">Wastage and Conversion</p>
        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {/* Wastage Card */}
          <Link to="/operations/inventory/Wastagelist">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-x-2">
                  <ImageIcon
                    src={wastage}
                    alt="Card Logo"
                    className="cursor-pointer w-6 h-6"
                  />
                  Wastage
                </h2>
                <p className="text-gray-600 mt-2 p-2">
                  Enter wastage of your items/raw materials & optimize on
                  plugging leakages.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <FaArrowRightLong size={20} />
              </span>
            </div>
          </Link>
          {/* Convert Raw Material Card */}
          <Link to="/operations/inventory/ConversionTable">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold flex items-center p-2">
                  <ImageIcon
                    src={rawmatreal}
                    alt="Card Logo"
                    className="cursor-pointer w-8 h-8"
                  />
                  Convert Raw Material
                </h2>
                <p className="text-gray-600 mt-2 p-2">
                  Define raw material conversions, convert your raw materials
                  for semi-cooked/cooked foods.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <FaArrowRightLong size={20} />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="border border-gray-300 p-4 rounded-lg my-5">
        <p className="text-base font-semibold mb-4 p-2">Reports</p>
        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {/* Current Stock Card */}
          <Link to="/operations/inventory/CurrentStock">
            <div className="p-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-x-2">
                  <ImageIcon
                    src={currentstock}
                    alt="Card Logo"
                    className="cursor-pointer w-6 h-6"
                  />
                  Current Stock
                </h2>
                <p className="text-gray-600 mt-2 p-2">
                  Update closing stock of the raw material with ease.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <FaArrowRightLong size={20} />
              </span>
            </div>
          </Link>
          {/* Opening-Closing Report Card */}
          <Link to="/operations/inventory/OpeningCloseingTable">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-x-2">
                  <ImageIcon
                    src={openstock}
                    alt="Card Logo"
                    className="cursor-pointer w-6 h-6"
                  />
                  Opening-Closing Report
                </h2>
                <p className="text-gray-600 mt-2">
                  Keep your raw material stock status and purchase/consumption
                  history.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold">
                <FaArrowRightLong size={20} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
