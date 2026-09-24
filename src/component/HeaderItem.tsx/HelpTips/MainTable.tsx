import React from "react";

const shortcuts = [
  { keys: "Ctrl+I", description: "Item Report" },
  { keys: "Ctrl+K", description: "Kot Listing" },
  { keys: "Ctrl+Shift+K", description: "Kot Live View" },
  { keys: "Ctrl+L", description: "Logout" },
  { keys: "Ctrl+M", description: "Manual Sync" },
  { keys: "Ctrl+N", description: "Notifications" },
  { keys: "Ctrl+O", description: "Order Listing" },
  { keys: "Ctrl+Shift+O", description: "Order Live View" },
  { keys: "Ctrl+P", description: "Online Order Listing" },
  { keys: "Ctrl+R", description: "Order Report" },
  { keys: "Ctrl+S", description: "Sales Report" },
  { keys: "Ctrl+T", description: "Table Management" },
  {
    keys: "Ctrl+Backspace",
    description: 'Go To Previous Main Page (Similar To Click On "Back" Button)',
  },
  { keys: "End", description: "Generate Bill From Kot Items" },
];

interface HelpTipsDataProps {
  helpTipsList: any;
};

const MainTable: React.FC<HelpTipsDataProps> = ({ helpTipsList }) => {
  return (
    <div className="p-4 w-full mx-auto rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b bg-gray-100 text-left text-gray-700 text-base">
                Shortcut Keys
              </th>
              <th className="px-4 py-2 border-b bg-gray-100 text-left text-gray-700 text-base">
                Description
              </th>
              <th className="px-4 py-2 border-b bg-gray-100 text-left text-red-500">
                <span className="ml-2">Support@Foodasso.Com</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {helpTipsList?.map((shortcut: any) => (
              <tr key={shortcut?.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-gray-700 text-base">
                  {shortcut?.shortcut_key}
                </td>
                <td className="px-4 py-2 border-b text-gray-700 text-base">
                  {shortcut?.description}
                </td>
                <td className="px-4 py-2 border-b text-gray-700 text-base">
                  {""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
