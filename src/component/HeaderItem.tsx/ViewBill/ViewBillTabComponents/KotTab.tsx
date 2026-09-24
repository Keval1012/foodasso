import React from "react";

interface KotTabDataProps {
  recentKotOrderList: any;
}

const KotTab: React.FC<KotTabDataProps> = ({
  recentKotOrderList
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
    <div className="overflow-auto">
      <table className="min-w-full text-center">
        <thead>
          <tr className="">
            <th className="py-2 px-4">No.</th>
            <th className="py-2 px-4">Item</th>
          </tr>
        </thead>

        {recentKotOrderList?.map((k: any) => (
          <tbody className="overflow-y-auto">
            {k?.detail?.map((d: any) => (
              // <tr className="bg-[#75BC8F] text-white">
              <tr
                className={`${getOrderStatusColor(d?.order_status, d?.is_paid)} text-white`}
              >
                <td className="py-2 px-4">
                  {k?.order_type}- {d?.kot_no}
                </td>
                <td className="py-2 px-4">{d?.total_items}</td>
              </tr>
            ))}
          </tbody>
        ))}

        {/* <tbody>
          <tr className="bg-[#75BC8F] text-white">
            <td className="py-2 px-4">Dine In - 02</td>
            <td className="py-2 px-4"></td>
          </tr>
          <tr className="bg-gray-100 text-gray-800">
            <td className="py-2 px-4">18</td>
            <td className="py-2 px-4">05</td>
          </tr>
          <tr className="bg-gray-100 text-gray-800">
            <td className="py-2 px-4">20</td>
            <td className="py-2 px-4">02</td>
          </tr>

          <tr className="bg-[#75BC8F] text-white">
            <td className="py-2 px-4">Delivery</td>
            <td className="py-2 px-4"></td>
          </tr>

          <tr className="bg-[#75BC8F] text-white">
            <td className="py-2 px-4">Pick Up</td>
            <td className="py-2 px-4"></td>
          </tr>
        </tbody> */}
      </table>
    </div>
  );
};

export default KotTab;
