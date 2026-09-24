import React from "react";

const OrderDetails = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-6 text-xs ">
      <div className="flex justify-between items-center ">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        </div>
        <div className="mb-4">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded">
            &larr; Back
          </button>
        </div>
      </div>
      <div className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Order No.</th>
                <th className="border p-2">Billing User</th>
                <th className="border p-2">Customer Name/Phone No.</th>
                <th className="border p-2">Customer Address</th>
                <th className="border p-2">Customer Locality</th>
                <th className="border p-2">No. Of Persons</th>
                <th className="border p-2">Order Type</th>
                <th className="border p-2">Payment Type</th>
                <th className="border p-2">Total Tax</th>
                <th className="border p-2">Total Discount</th>
                <th className="border p-2">Grand Total</th>
                <th className="border p-2">Settlement Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">01</td>
                <td className="border p-2">Biller</td>
                <td className="border p-2">--</td>
                <td className="border p-2">--</td>
                <td className="border p-2">--</td>
                <td className="border p-2">--</td>
                <td className="border p-2">Dine In(04)</td>
                <td className="border p-2">Cash</td>
                <td className="border p-2">(0.00)</td>
                <td className="border p-2">(0.00)</td>
                <td className="border p-2">150</td>
                <td className="border p-2">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Order Status</th>
                <th className="border p-2">Printed</th>
                <th className="border p-2">Assign To</th>
                <th className="border p-2">Coupon Code</th>
                <th className="border p-2">Paid</th>
                <th className="border p-2">Tip</th>
                <th className="border p-2">Sub Order Type</th>
                <th className="border p-2">Payment Type</th>
                <th className="border p-2">Sequence Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Printed</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">--</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">(0.00)</td>
                <td className="border p-2">AC</td>
                <td className="border p-2">
                  Counter : Billing Station By : Biller (Biller)
                </td>
                <td className="border p-2">--</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6 mt-5">
        <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Order Items</th>
                <th className="border p-2">Special Note</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Unit Price</th>
                <th className="border p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Seafood Noodles</td>
                <td className="border p-2">--</td>
                <td className="border p-2">1</td>
                <td className="border p-2">150</td>
                <td className="border p-2">150</td>
              </tr>
              <tr>
                <td className="border p-2">Tax</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2">0.00</td>
                <td className="border p-2">0.00</td>
              </tr>
              <tr>
                <td className="border p-2">Round Off</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
              </tr>
              <tr className="font-bold">
                <td className="border p-2">Grand Total (₹)</td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
                <td className="border p-2">150.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
