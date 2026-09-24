import React from "react";
interface DineInDataProps {
  recentDineInOrderList: any;
}
const DineInTab: React.FC<DineInDataProps> = ({
  recentDineInOrderList
}) => {
  const getOrderStatusColor = (orderStatusColor: String, isPaidColor: boolean) => {
    if (isPaidColor === true) {
      switch (orderStatusColor) {
        default:
          return "bg-green-400";
      }
    } else {
      switch (orderStatusColor) {
        case "save":
          return "bg-gray-400";
        case "save_and_print":
          return "bg-teal-400";
        case "kot_and_print":
          return "bg-teal-400";
        default:
          return "bg-gray-400";
      }
    }
  };
  return (
    <div className="overflow-auto mt-3">
      <table className="min-w-full text-center">
        <thead>
          <tr className="">
            <th className="py-2 px-4">Order No.</th>
            <th className="py-2 px-4">Table</th>
            <th className="py-2 px-4">Grand Total (₹)</th>
          </tr>
        </thead>
        {recentDineInOrderList?.map((d: any) => (
          <tbody className="overflow-y-auto">
            {/* <tr className="bg-[#75BC8F] text-white"> */}
            <tr
              className={`${getOrderStatusColor(d?.order_status, d?.is_paid)} text-white `}
            >
              <td className="py-2 px-4">{d?.id}</td>
              <td className="py-2 px-4">{d?.table}</td>
              <td className="py-2 px-4">₹ {d?.grand_total}</td>
            </tr>
            {/* <tr className="text-gray-800">
              <td className="py-2 px-4">20</td>
              <td className="py-2 px-4">02</td>
              <td className="py-2 px-4">₹150</td>
            </tr> */}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default DineInTab;
