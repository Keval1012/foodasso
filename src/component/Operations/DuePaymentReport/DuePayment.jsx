import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";

// Define the props type
// type ExpenseProps = {
//   onAddExpense: () => void;
// };

const DuePayment = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b py-3">
        <h2 className="text-xl font-semibold mb-4">due payment report</h2>
        <div className="flex gap-3">
    
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default DuePayment;
