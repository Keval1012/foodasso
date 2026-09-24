import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface PrinterDataProps {
  printerData: any;
};

const MainAsignBill = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { printerData } = (location.state as PrinterDataProps) || {};

  return (
    <div className=" min-h-screen">
      <div className=" p-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300">
          <h1 className="text-2xl font-semibold">
            Assign Printer - Ebill Printer
          </h1>
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Card 1 */}
          <Link to={`/operations/bill_print/assign/printer/bill/${printerData?.id}`}>
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-7 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Assign to bill{" "}
                </h2>
                <p className="text-sm text-gray-600">
                  lets you choose which order types should print on specific
                  printers.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>
          {/* Card 2 */}
          <Link to={`/operations/bill_print/assign/printer/kot/${printerData?.id}`}>
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Assign to kot{" "}
                </h2>
                <p className="text-sm text-gray-600">
                  lets you select specific order types and their corresponding
                  printer settings for KOT.{" "}
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

export default MainAsignBill;
