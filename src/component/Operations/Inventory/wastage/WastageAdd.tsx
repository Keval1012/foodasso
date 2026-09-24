import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../common/Dilog-Box";
import DescriptionDailog from "../Purchase Management/DescriptionDailog";

// Define a TypeScript interface for row items
interface RowItem {
  item: string;
  quantity: number;
  unit: string;
  price: number;
  amount: number;
}

function WastageAdd() {
    const [isDescriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
       const handleOpenDescriptionDialog = () => setDescriptionDialogOpen(true);
       const handleCloseDescriptionDialog = () =>
         setDescriptionDialogOpen(false);
  const navigate = useNavigate();
  const [rows, setRows] = useState<RowItem[]>([
    { item: "Rice", quantity: 1, unit: "Kg", price: 100, amount: 100 },
  ]);

  // Function to add a new row
  const addNewRow = () => {
    setRows([
      ...rows,
      { item: "", quantity: 0, unit: "", price: 0, amount: 0 }, // Initialize numeric fields with 0
    ]);
  };

  // Function to handle row data change
  const handleRowChange = (
    index: number,
    field: keyof RowItem,
    value: string | number
  ) => {
    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            [field]:
              field === "quantity" || field === "price" || field === "amount"
                ? Number(value)
                : value,
          }
        : row
    );
    setRows(updatedRows);
  };

  // Function to delete a row
  const deleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="border border-gray-300  rounded-lg p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-300">
        <h2 className="text-xl font-semibold p-4 ">Add Wastage </h2>
        <div className="flex gap-2 p-4">
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className=" text-base">Back</button>
          </div>
        </div>
      </div>
      {/* Date and Wastage For */}
      <div className="items-center gap-4 mb-6 ">
        <h2>
          {" "}
          <h2 className="text-xl font-semibold border-b border-gray-300 p-4">
            Wastage Detail
          </h2>
        </h2>
        <div className="flex flex-col p-4">
          <label htmlFor="date" className="text-sm font-medium mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            className="w-48 border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          onClick={addNewRow}
          className="bg-orange-500 text-white px-4 py-2 mt-6 rounded-md font-semibold"
        >
          Add New
        </button>
      </div>
      {/* Wastage Item Details Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b font-semibold">
                Wastage Item Details
              </th>
              <th className="p-3 border-b font-semibold">Quantity *</th>
              <th className="p-3 border-b font-semibold">Unit *</th>
              <th className="p-3 border-b font-semibold">
                Avg. Purchase Price
              </th>
              <th className="p-3 border-b font-semibold">Amount</th>
              <th className="p-3 border-b font-semibold">
                Description & Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="p-3 border-b">
                  <select
                    value={row.item}
                    onChange={(e) =>
                      handleRowChange(index, "item", e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="Rice">Rice</option>
                    <option value="Other Item">Other Item</option>
                  </select>
                </td>
                <td className="p-3 border-b">
                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      handleRowChange(index, "quantity", Number(e.target.value))
                    }
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="1"
                  />
                </td>
                <td className="p-3 border-b">
                  <select
                    value={row.unit}
                    onChange={(e) =>
                      handleRowChange(index, "unit", e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="Kg">Kg</option>
                    <option value="Grams">Grams</option>
                  </select>
                </td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    value={row.price}
                    onChange={(e) =>
                      handleRowChange(index, "price", Number(e.target.value))
                    }
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="100"
                  />
                </td>
                <td className="p-3 border-b">
                  <input
                    type="text"
                    value={row.amount}
                    onChange={(e) =>
                      handleRowChange(index, "amount", Number(e.target.value))
                    }
                    className="border border-gray-300 rounded-md p-2 w-full"
                    placeholder="100"
                  />
                </td>
                <td className=" flex gap-4 p-3  text-center">
                  <button
                    onClick={handleOpenDescriptionDialog}
                    className="text-gray-500 ml-3  border border-gray-200 bg-white p-2"
                  >
                    <TbFileDescription size={20} />
                  </button>
                  <button
                    onClick={() => deleteRow(index)}
                    className="text-gray-500 border border-gray-200 bg-white p-2"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer Buttons */}
      <div className="flex justify-end gap-4 mt-6 bg-[#F2F2F2] p-4">
        <button className="px-6 py-2  bg-white border border-gray-300 rounded-full text-gray-600">
          Cancel
        </button>
        <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-semibold">
          Save
        </button>
      </div>
      <DialogBox
        isOpen={isDescriptionDialogOpen}
        onClose={handleCloseDescriptionDialog}
        title="Description"
      >
        <DescriptionDailog onClose={undefined} rowDescription={undefined} setRows={undefined} />
      </DialogBox>{" "}
    </div>
  );
}

export default WastageAdd;
