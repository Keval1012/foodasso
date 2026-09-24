import React from 'react'

interface DelivaryDataProps {
  recentOrderList: any;
}

const DelivaryTab: React.FC<DelivaryDataProps> = ({
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
    <div className="overflow-auto mt-3">
      <table className="min-w-full ">
        <thead>
          <tr className="text-center">
            <th className="py-2 ">Order No.</th>
            <th className="py-2 ">Grand Total (₹)</th>
          </tr>
        </thead>
        {recentOrderList?.map((d: any) => (
          <tbody className='overflow-y-auto'>
            {/* <tr className="bg-[#75BC8F] text-gray-800 text-center"> */}
            <tr
              className={`${getOrderStatusColor(d?.order_status, d?.is_paid)} text-white text-center`}
            >
              <td className="py-2">{d?.id}</td>
              <td className="py-2 ">₹ {d?.grand_total}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default DelivaryTab
