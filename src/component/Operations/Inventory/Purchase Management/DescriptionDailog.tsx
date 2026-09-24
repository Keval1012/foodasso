import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DescriptionModalProps {
  onClose: any;
  rowDescription: any;
  setRows: any;
}

const DescriptionDailog: React.FC<DescriptionModalProps> = ({
  onClose,
  rowDescription,
  setRows
}) => {

  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(rowDescription.description);
  }, [rowDescription]);

  const handleSave = () => {
    handleRowChange(rowDescription?.id, "description", description);
    onClose();
  };

  const handleRowChange = (index: any, field: any, value: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row?.id === index ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <>
      <div className=" border-gray-300 rounded-lg p-2">
        <div>
          <textarea
            placeholder="Description"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mx-3 my-3 mb-4 gap-4 bg-[#F2F2F2]">
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium text-center inline-flex items-center bg-white text-gray-500 border rounded-full my-3 mb-4"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-xs font-medium text-center inline-flex items-center bg-green-500 text-white border rounded-full my-3 mb-4"
          onClick={handleSave}
        >
          Done
        </button>
      </div>
    </>
  );
};

export default DescriptionDailog;
