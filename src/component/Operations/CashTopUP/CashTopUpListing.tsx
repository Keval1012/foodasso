import React, { useState } from "react";
import { LuEye } from "react-icons/lu";
import { FiEdit, FiPrinter } from "react-icons/fi";
import ViewCashTopUPListing from "./ViewCashTopUPListing";
import EditCashTopUpDetails from "./EditCashTopUpDetails";

interface TotalCashTopUpOrder {
  date: string;
  totalcashtopup: string;
}

const CashTopUpListing: React.FC<{
  CashTopUpListingData: TotalCashTopUpOrder[];
}> = ({ CashTopUpListingData }) => {
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleViewClick = () => {
    setShowView(true);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  return (
    <div>
      {showView ? (
        <ViewCashTopUPListing />
      ) : showEdit ? (
        <EditCashTopUpDetails />
      ) : (
        <div className="">
          <div className="table-container overflow-x-auto max-h-96">
            <table className="min-w-full bg-white text-sm border border-gray-200">
              <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
                <tr>
                  <th className="py-3 px-4 text-xs text-center">Date</th>
                  <th className="py-3 px-4 text-xs text-center">
                    Total Cash Top-Up Reported
                  </th>
                  <th className="py-3 px-4 text-xs text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {CashTopUpListingData.map((order, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "border" : ""}`}
                  >
                    <td className="py-3 px-4 text-xs text-center">
                      {order.date}
                    </td>
                    <td className="py-3 px-4 text-xs text-center">
                      {order.totalcashtopup}
                    </td>
                    <td className="py-3 px-4 text-xs text-center flex justify-center items-center gap-2">
                      <LuEye
                        className="cursor-pointer text-gray-500 w-4 h-4"
                        onClick={handleViewClick}
                      />
                      <FiEdit
                        className="cursor-pointer text-gray-500 w-4 h-4"
                        onClick={handleEditClick}
                      />
                      <FiPrinter className="cursor-pointer text-gray-500 w-4 h-4" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashTopUpListing;
