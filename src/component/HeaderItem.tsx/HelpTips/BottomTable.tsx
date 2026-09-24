import React from "react";

const shortcuts = [
  { keys: "Green Color", description: "Printed Order" },
  { keys: "Grey Color", description: "Saved Order without Print" },
  { keys: "Red Color", description: "Paid via Wallet" },
  { keys: "Ctrl+Z", description: "On Hold" },
  { keys: "Ctrl+A", description: "accept online orders" },
  { keys: "Ctrl+E", description: "focus on bill no search box" },
];

const BottomTable = () => {
  return (
    <div className="p-4 w-full max-w-6xl mx-auto rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b bg-gray-100 text-left text-gray-700">
                Shortcut keys for Recent Orders
              </th>
              <th className="px-4 py-2 border-b bg-gray-100 text-left text-gray-700">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map((shortcut, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-gray-700 text-base">
                  {shortcut.keys}
                </td>
                <td className="px-4 py-2 border-b text-gray-700 text-base">
                  {shortcut.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BottomTable;
