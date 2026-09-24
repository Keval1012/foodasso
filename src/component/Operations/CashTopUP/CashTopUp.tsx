import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

// Define the props type
type CashTopUpProps = {
  onAddCashTopUp: () => void;
};

const CashTopUp: React.FC<CashTopUpProps> = ({ onAddCashTopUp }) => {
  return (
    <div>
      <div className="flex justify-between items-center border-b p-3">
        <h2 className="text-xl font-semibold mb-4">Cash Top Up</h2>
        <div className="flex gap-3">
          <button
            className="btn bg-[rgba(255,158,27,1)] items-center py-2 rounded px-4 text-base text-white"
            onClick={onAddCashTopUp}
          >
            CashTopUp
          </button>
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashTopUp;
