import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const MainBillKotPrint = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className=" p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Bill/KOT Print</h1>
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer" onClick={() => navigate(-1)}>
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Card 1 */}
          <Link to="/operations/printerlist">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-7 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Multiple printer setting
                </h2>
                <p className="text-sm text-gray-600">
                  Multiple printer settings let you customize your printer's
                  configuration.{" "}
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>
          {/* Card 2 */}
          <Link to="/operations/bill_print/Kotconfiguration">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Bill/Kot Preferred Configuration
                </h2>
                <p className="text-sm text-gray-600">
                  Bill/Kot Preferred configuration Edit the Printer setting.{" "}
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>
          {/* Card 3 */}
        </div>
      </div>
    </div>
  );
};

export default MainBillKotPrint;
