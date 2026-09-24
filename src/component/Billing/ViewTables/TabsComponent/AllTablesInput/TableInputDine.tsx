import React, { useEffect, useState } from "react";

interface TableNoDataProps {
  tableNo?: any;
  tableNumber?: any;
  setTableNumber?: any;
}

const TableInputDine: React.FC<TableNoDataProps> = ({ tableNo, tableNumber, setTableNumber }) => {
  // State to store the table number entered by the user
  // const [tableNumber, setTableNumber] = useState("");
  
  useEffect(() => {
    if (tableNo) {
      setTableNumber(tableNo || "");
    }
  }, [tableNo]);

  // Function to handle changes in the input field
  const handleInputChange = (event: any) => {
    setTableNumber(event.target.value); // Update state with the entered value
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 p-4">
      <label
        className="text-gray-700 font-medium sm:w-auto w-full"
        htmlFor="tableNo"
      >
        Please Enter Table No.
      </label>
      <input
        className="border border-gray-300 rounded-md p-2 w-full sm:w-32 focus:outline-none focus:border-blue-500"
        type="text"
        id="tableNo"
        placeholder="Enter Table No."
        value={tableNumber} // Controlled component
        onChange={handleInputChange} // Handle changes
        disabled={tableNo ? true : false}
      />
    </div>
  );
};

export default TableInputDine;
