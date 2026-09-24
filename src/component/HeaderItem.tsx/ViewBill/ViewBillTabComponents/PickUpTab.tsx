import React from 'react'
import { FiRefreshCcw } from 'react-icons/fi'

interface PickUpDataProps {
  recentOrderList: any;
}

const PickUpTab: React.FC<PickUpDataProps> = ({
  recentOrderList
}) => {

  const getOrderStatusColor = (
    orderStatusColor: String,
    isPaidColor: boolean
  ) => {
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
    <div className="overflow-auto mt-3 flex flex-col justify-between h-full">
      <div className="">
        <table className="min-w-full">
          <thead>
            <tr className="text-center">
              <th className="py-2 ">Order No.</th>
              <th className="py-2 ">Grand Total (₹)</th>
            </tr>
          </thead>
          {recentOrderList?.map((p: any) => (
            <tbody className='overflow-y-auto'>
              {/* <tr className="bg-[#75BC8F] text-gray-800 text-center"> */}
              <tr
                className={`${getOrderStatusColor(p?.order_status, p?.is_paid)} text-white text-center`}
              >
                <td className="py-2">{p?.id}</td>
                <td className="py-2 ">₹ {p?.grand_total}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default PickUpTab
