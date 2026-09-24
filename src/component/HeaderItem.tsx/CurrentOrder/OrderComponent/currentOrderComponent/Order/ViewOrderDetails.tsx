import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface ViewOrderDetailsProps {
  order: Order | null;
  onClose: () => void;
}

interface Order {
  orderNo: string;
  orderType: string;
  customerName: string;
  paymentType: string;
  myAmount: string;
  tax: string;
  discount: string;
  grandTotal: string;
  created: string;
  backgroundColor: string;
}

const ViewOrderDetails: React.FC<ViewOrderDetailsProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="p-6">
      {/* Order Details Header */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className=" flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className=" text-base">Back</button>
          </div>
        </div>
        <table className="w-full text-sm border mt-5">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-xs text-center">Order No.</th>
              <th className="border p-2 text-xs text-center">Billing User</th>
              <th className="border p-2 text-xs text-center">Customer Name/Phone No.</th>
              <th className="border p-2 text-xs text-center">Customer Address</th>
              <th className="border p-2 text-xs text-center">Customer Locality</th>
              <th className="border p-2 text-xs text-center">No. Of Persons</th>
              <th className="border p-2 text-xs text-center">Order Type</th>
              <th className="border p-2 text-xs text-center">Payment Type</th>
              <th className="border p-2 text-xs text-center">Total Tax</th>
              <th className="border p-2 text-xs text-center">Total Discount</th>
              <th className="border p-2 text-xs text-center">Grand Total</th>
              <th className="border p-2 text-xs text-center">Settlement Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-xs text-center">01</td>
              <td className="border p-2 text-xs text-center">Biller</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">DineIn (04)</td>
              <td className="border p-2 text-xs text-center">Cash</td>
              <td className="border p-2 text-xs text-center">(0.00)</td>
              <td className="border p-2 text-xs text-center">(0.00)</td>
              <td className="border p-2 text-xs text-center">150</td>
              <td className="border p-2 text-xs text-center">--</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <table className="w-full text-sm border">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-xs text-center">Order Status</th>
              <th className="border p-2 text-xs text-center">Printed</th>
              <th className="border p-2 text-xs text-center">Assign To</th>
              <th className="border p-2 text-xs text-center">Coupon Code</th>
              <th className="border p-2 text-xs text-center">Paid</th>
              <th className="border p-2 text-xs text-center">Tip</th>
              <th className="border p-2 text-xs text-center">Sub Order Type</th>
              <th className="border p-2 text-xs text-center">Sequence Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-xs text-center">Printed</td>
              <td className="border p-2 text-xs text-center">yes</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">Yes</td>
              <td className="border p-2 text-xs text-center">(0.00)</td>
              <td className="border p-2 text-xs text-center">AC</td>
              <td className="border p-2 text-xs text-center">
                counter : billing station by : biller (biller)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Items */}
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>

        <table className="w-full text-sm border">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-xs text-center">Order Items</th>
              <th className="border p-2 text-xs text-center">Special Note</th>
              <th className="border p-2 text-xs text-center">Quantity</th>
              <th className="border p-2 text-xs text-center">Unit Price</th>
              <th className="border p-2 text-xs text-center">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-xs text-center">Seafood Noodles</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">1</td>
              <td className="border p-2 text-xs text-center">150</td>
              <td className="border p-2 text-xs text-center">150</td>
            </tr>
            <tr>
              <td className="border p-2 text-xs text-center">Tax</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">0.00</td>
              <td className="border p-2 text-xs text-center">0.00</td>
            </tr>
            <tr>
              <td className="border p-2 text-xs text-center">Round Off</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">0</td>
              <td className="border p-2 text-xs text-center">0</td>
            </tr>
            <tr>
              <td colSpan={4} className="text-right p-2 font-semibold border">
                Grand Total (₹)
              </td>
              <td className="border p-2 text-xs text-center">150.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
