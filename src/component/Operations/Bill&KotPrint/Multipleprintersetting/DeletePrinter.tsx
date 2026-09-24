import React, { useState } from "react";
import { deletePrinter } from "../../../../Api/Operation/Api";
import toast from "react-hot-toast";

interface deletePrinterProps {
  setDeleteDialogOpen: any;
  printerId: any;
  fetchPrinterData: any;
};

const DeletePrinter: React.FC<deletePrinterProps> = ({
  setDeleteDialogOpen,
  printerId,
  fetchPrinterData,
}) => {

  const handleDelete = async () => {
    if (printerId) {
      try {
        const res = await deletePrinter(printerId);
        if (res.status === 200) {
          setDeleteDialogOpen(false);
          fetchPrinterData();
          toast.success(res.data?.message);
        }
      } catch (error) {}
    }
  };

  return (
    <div className=" ">
      <div className="bg-white w-full max-w-md ">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Are You Sure You Want To Delete This Printer?
          </h2>
        </div>

        <div className="flex justify-center gap-4 p-3">
          <button
            type="submit"
            className="w-[155px]h-[136px] text-gray-400 rounded-full border border-gray-300 hover:bg-custom-orange hover:text-white px-7 py-2"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-[155px]h-[136px] text-gray-400 text-base rounded-full border border-gray-300 hover:bg-custom-orange  hover:text-white px-7 py-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrinter;