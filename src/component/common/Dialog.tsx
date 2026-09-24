import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function CustomDialog({ isOpen, onClose, onSelect }: any) {
  if (!isOpen) return null;

  const outlets = [
    { name: "All Outlet", id: "" },
    { name: "7 Foodies", id: "333014" },
    { name: "8 Foodies", id: "335032" },
    { name: "ABC", id: "335110" },
  ];

  const handleSelect = (outletName: string) => {
    onSelect(outletName);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <IoCloseCircleOutline size={30} />
        </button>
        <h2 className="text-xl mb-4 text-start">Select Outlet</h2>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border rounded-xl border-gray-300 mb-4"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b text-start">Outlet Name</th>
              <th className="p-2 border-b text-end">ID</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((outlet) => (
              <tr
                key={outlet.id}
                className="cursor-pointer hover:bg-custom-gray"
                onClick={() => handleSelect(outlet.name)}
              >
                <td className="p-2 border-b">{outlet.name}</td>
                <td className="p-2 border-b text-end">{outlet.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
