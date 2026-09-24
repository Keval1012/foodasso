import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import ImageIcon from "../../../common/ImageIcon";
import dines from "../../../../Styles/assets/img/dine-white.svg";
import { LuUser } from "react-icons/lu";

interface MoreInfoDialogProps {
  onClose: () => void;
  // moreorderDetails: {
  //   biller: string;
  //   billNumber: string;
  //   tableNumber: string;
  //   items: {
  //     name: string;
  //     quantity: number;
  //     price: number;
  //     special?: string;
  //   }[];
  //   total: number;
  // };
  viewOrderDetails: any;
}

const MoreInfoDialog: React.FC<MoreInfoDialogProps> = ({
  onClose,
  // moreorderDetails,
  viewOrderDetails,
}) => {

  console.log("viewOrderDetails", viewOrderDetails);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      key={viewOrderDetails?.id}
    >
      <div className="bg-white rounded-lg w-full max-w-lg flex flex-col">
        {/* Main Content */}
        <div className="flex">
          {/* Vertical Progress Bar */}
          <div className="w-5 flex flex-col items-center bg-green-600 border-[0.5rem] rounded-full border-gray-300 relative ml-5">
            <div className="absolute  w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
              <ImageIcon src={dines} className="w-6 h-6" />
            </div>
            <div className="absolute top-[75px]  w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <LuUser size={24} className="text-white " />
            </div>
            <div className="absolute top-[144px]  w-8 h-8 rounded-full bg-green-600 flex items-center justify-center"></div>
            <div className="absolute bottom-0  w-6 h-6 rounded-full bg-green-600 flex items-center justify-center"></div>
          </div>

          {/* Dialog Content */}
          <div className="flex-grow ml-9 rounded-md">
            <div className="flex justify-between items-center p-4 border-b bg-gray-200 rounded-t">
              {/* Left Side - Foodies & Dine In */}
              <div>
                <p className="font-semibold">{viewOrderDetails?.outlet_name}</p>
                <p className="text-sm text-gray-500">
                  {viewOrderDetails?.order_type_name}
                </p>
              </div>

              {/* Right Side - Biller, Bill, Table */}
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MdOutlinePersonOutline size={18} />
                  <p>{viewOrderDetails?.biller_name}</p>
                </div>

                <span className="text-gray-300">|</span>

                <div className="flex items-center space-x-1">
                  <p>Bill:</p>
                  <p className="font-medium">{viewOrderDetails?.id}</p>
                </div>

                {viewOrderDetails?.order_type_name === "Dine In" && (
                  <>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center space-x-1">
                      <p>Table:</p>
                      <p className="font-medium">{viewOrderDetails?.table}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {/* Assigned Section */}
              <div className="mb-4">
                {viewOrderDetails?.assign_name && (
                  <p className="text-sm font-medium pt-[53px]">
                    Assigned:{" "}
                    <span className="font-semibold">
                      {viewOrderDetails?.assign_name}
                    </span>
                  </p>
                )}
              </div>

              {/* Item Details Table */}
              <div className="mb-4">
                <p className="font-semibold text-gray-700 pt-4">
                  Item Details:
                </p>
                <table className="w-full border-collapse">
                  <tbody>
                    {viewOrderDetails?.items?.map((item: any) => (
                      <tr key={item?.id} className="border-b">
                        <td className="flex items-center px-4 py-2">
                          <TbPointFilled />
                          <span className="ml-2">
                            {item?.item_name} (x{item?.quantity})
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right">
                          ₹ {item?.total_price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between font-semibold text-lg border-t pt-2 px-6">
          <p>Total Amount:</p>
          <p>₹ {viewOrderDetails?.grand_total}</p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoDialog;
