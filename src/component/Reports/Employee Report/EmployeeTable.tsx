

import React from "react";

const BillingReport = () => {
  const billingData = {
    orders: [
      { label: "Orders Punched", value: 182 },
      { label: "Orders Success", value: 179 },
      { label: "Orders Cancelled", value: 1 },
      { label: "Orders Discounted", value: 32 },
      { label: "Orders Modified", value: 5 },
      { label: "Orders Reprinted", value: 0 },
    ],
    payments: [
      { type: "Cash", amount: 46858.0 },
      { type: "Card", amount: 2854.0 },
      { type: "Due Payment", amount: 22558.0 },
      { type: "Other (UPI)", amount: 3539.0 },
      { type: "Wallet", amount: 0.0 },
      { type: "Online Paid", amount: 0.0 },
      { type: "Online COD", amount: 0.0 },
    ],
  };

  const totalAmount = billingData.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );


  const data = [
    {
      name: "Ramesh",
      records: [
        {
          invoiceNo: 600,
          date: "25-09-24",
          amount: 9.57,
          discount: 0,
          deliveryCharge: 50,
          total: 63,
          collectedPrice: 63,
          amountTaken: "Yes",
        },
        {
          invoiceNo: 602,
          date: "25-09-24",
          amount: 12.44,
          discount: 0,
          deliveryCharge: 50,
          total: 67,
          collectedPrice: 67,
          amountTaken: "Yes",
        },
        {
          invoiceNo: 604,
          date: "25-09-24",
          amount: 16.27,
          discount: 0,
          deliveryCharge: 50,
          total: 71,
          collectedPrice: 0,
          amountTaken: "No",
        },
        {
          invoiceNo: 605,
          date: "25-09-24",
          amount: 11.48,
          discount: 0,
          deliveryCharge: 50,
          total: 66,
          collectedPrice: 66,
          amountTaken: "Yes",
        },
        {
          invoiceNo: 606,
          date: "25-09-24",
          amount: 0,
          discount: 0,
          deliveryCharge: 50,
          total: 53,
          collectedPrice: 53,
          amountTaken: "Yes",
        },
        {
          invoiceNo: 608,
          date: "25-09-24",
          amount: 51.67,
          discount: 51.67,
          deliveryCharge: 50,
          total: 53,
          collectedPrice: 0,
          amountTaken: "No",
        },
        {
          invoiceNo: 610,
          date: "25-09-24",
          amount: 92.82,
          discount: 92.82,
          deliveryCharge: 50,
          total: 53,
          collectedPrice: 0,
          amountTaken: "No",
        },
        {
          invoiceNo: 662,
          date: "02-10-24",
          amount: 96.68,
          discount: 0,
          deliveryCharge: 50,
          total: 154,
          collectedPrice: 0,
          amountTaken: "No",
        },
      ],
    },
    {
      name: "Harsh",
      records: [
        {
          invoiceNo: 633,
          date: "26-09-24",
          amount: 33.49,
          discount: 0,
          deliveryCharge: 50,
          total: 91,
          collectedPrice: 0,
          amountTaken: "No",
        },
      ],
    },
    {
      name: "Aditya",
      records: [
        {
          invoiceNo: 630,
          date: "26-09-24",
          amount: 131.1,
          discount: 0,
          deliveryCharge: 50,
          total: 203,
          collectedPrice: 0,
          amountTaken: "Yes",
        },
        {
          invoiceNo: 632,
          date: "26-09-24",
          amount: 33.49,
          discount: 0,
          deliveryCharge: 50,
          total: 91,
          collectedPrice: 0,
          amountTaken: "No",
        },
      ],
    },
  ];
  return (
    <div className="w-full border border-gray-300 ">
      <table className="w-full border-collapse p-4">
        <thead>
          <tr className="bg-gray-300 border border-gray-500 p-3">
            <th className="border-r border-[#3d3d3d36]p-2 text-left text-[#3d3d3d] text-base font-semibold ">
              Billing User
            </th>
            <th className="border-r border-[#3d3d3d36]p-2 text-left text-[#3d3d3d] text-base font-semibold ">
              Payment Type
            </th>
            <th className="-r border-[#3d3d3d36]p-2 text-right text-[#3d3d3d] text-base font-semibold ">
              Total (₹)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="birder">
            <td className="border border-gray-300 align-top w-[239px] p-4">
              <div className="p-2 text-[#3d3d3d] font-semibold">Biller</div>
              <div className="border border-gray-300 p-3 w-[239px]">
                {billingData.orders.map((order, index) => (
                  <div
                    key={index}
                    className="p-2 text-center border-b border-gray-100"
                  >
                    {order.label}: {order.value}
                  </div>
                ))}
              </div>
            </td>
            <td className="border border-gray-300 align-top w-3/5">
              <div className="h-10"></div>
              {billingData.payments.map((payment, index) => (
                <div key={index} className="p-2 border-t border-gray-100">
                  {payment.type}
                </div>
              ))}
            </td>
            <td className=" border border-gray-300 align-top">
              <div className="h-10"></div>
              {billingData.payments.map((payment, index) => (
                <div
                  key={index}
                  className="p-2 border-t border-gray-100 text-right"
                >
                  {payment.amount.toFixed(2)}
                </div>
              ))}
            </td>
          </tr>
          <tr className="bg-gray-300">
            <td colSpan={2} className="border border-gray-300 p-2">
              Sub Total
            </td>
            <td className="border border-gray-300 p-2 text-right">
              {totalAmount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="overflow-x-auto ">
        <h2 className="text-red-500 font-bold mb-2">
          Waiter/Delivery Boy Report
        </h2>
        <table className="w-full text-sm text-left  border-[#3d3d3d36] text-[#3d3d3d]">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Waiter/Delivery Boy
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Invoice No.
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Date
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                My Amount (₹)
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Discount (₹)
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Delivery Charge (₹)
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Total (₹)
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Collected Price (₹)
              </th>
              <th className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Amount Taken
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Total row */}
            <tr className="bg-gray-100 font-bold">
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                Total
              </td>
              <td
                className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]"
                colSpan={2}
              >
                --
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                946.44
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                495.71
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                900.00
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                1456.00
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                414.00
              </td>
              <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                --
              </td>
            </tr>
            {/* Data rows */}
            {data.map((person, index) => (
              <>
                <tr key={`person-${index}`} className=" font-semibold">
                  <td
                    className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]"
                    colSpan={9}
                  >
                    {person.name}
                  </td>
                </tr>
                {person.records.map((record, idx) => (
                  <tr
                    key={`record-${index}-${idx}`}
                    className="border border-[#3d3d3d36] text-[#3d3d3d]-b"
                  >
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]"></td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.invoiceNo}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.date}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.discount.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.deliveryCharge.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.collectedPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                      {record.amountTaken}
                    </td>
                  </tr>
                ))}
                {/* Subtotal row */}
                <tr className="font-bold bg-gray-100">
                  <td
                    className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]"
                    colSpan={3}
                  >
                    Sub Total
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                    {person.records
                      .reduce((sum, r) => sum + r.amount, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                    {person.records
                      .reduce((sum, r) => sum + r.discount, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                    {person.records
                      .reduce((sum, r) => sum + r.deliveryCharge, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                    {person.records
                      .reduce((sum, r) => sum + r.total, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]">
                    {person.records
                      .reduce((sum, r) => sum + r.collectedPrice, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border border-[#3d3d3d36] text-[#3d3d3d]"></td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingReport;