import React, { useEffect, useState } from "react";

interface AssignInputProps {
  setIsAssignInputModalOpen?: any;
  waiterList?: any;
  assignTo?: any;
  setAssignTo?: any;
  tableWiseOrderData?:any
}

const AssignInput: React.FC<AssignInputProps> = ({ setIsAssignInputModalOpen, waiterList, assignTo, setAssignTo,tableWiseOrderData }) => {

  const [selectedWaiter, setSelectedWaiter] = useState(
    waiterList?.[0]?.id || ""
  );
useEffect(()=>{
  if(tableWiseOrderData?.assign_to){


    setSelectedWaiter(tableWiseOrderData.assign_to)
  }
},[tableWiseOrderData && tableWiseOrderData?.assign_to])
  const handleRadioChange = (event: any) => {
    setSelectedWaiter(event.target.value);
    console.log(selectedWaiter)
  };

  const handleDone = () => {
    setSelectedWaiter(selectedWaiter);
    setAssignTo(selectedWaiter);
    setIsAssignInputModalOpen(false);
  };

  return (
    <div className="mt-8 p-6">
      {/* Radio Button Options */}
      {waiterList?.map((waiter: any) => (
        <div className="py-4">
          <div
            className="flex justify-between items-center space-x-3"
            key={waiter?.id}
          >
            <label className="text-gray-700">{waiter?.username}</label>

            <input
              type="radio"
              name="assignTo"
              // value="Biller"
              checked={selectedWaiter}
              value={waiter?.id || assignTo}
              className="text-gray-600 focus:ring-0"
              // checked
              // checked={selectedWaiter === waiter?.username}
              onChange={handleRadioChange}
            />
          </div>
          {/* <div className="flex justify-between items-center space-x-3 mt-2">
            <label className="text-gray-700">Waiter-1</label>

            <input
              type="radio"
              name="assignTo"
              value="Waiter-1"
              className="text-gray-600 focus:ring-0"
            />
          </div> */}
        </div>
      ))}

      {/* Buttons Section */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
          onClick={() => setIsAssignInputModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AssignInput;
