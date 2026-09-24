import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { HiOutlinePrinter } from "react-icons/hi2";
import { TiExport } from "react-icons/ti";
import ExecutiveSalesReportFliter from "./ExecutiveSalesReportFliter";

const ExecutiveSalesReportTable = () => {
    const billingSuccessData = [
      { label: "Count", value: 179 },
      { label: "Invoice No.", value: "486-671" },
      { label: "Sub Total", value: "₹56613.57" },
      { label: "Discount", value: "₹4052.47" },
      { label: "Delivery Charge", value: "₹1700.00" },
      { label: "Container Charge", value: "₹45.00" },
      { label: "Service Charge", value: "₹0.00" },
      { label: "Additional Charge", value: "₹0.00" },
      { label: "SGST", value: "₹1632.45" },
      { label: "CGST", value: "₹6017.43" },
      { label: "Round Off", value: "₹25.40" },
      { label: "Waived Off", value: "₹0.00" },
      { label: "Grand Total", value: "₹479456.00", isBold: true },
    ];

      const billingcancleData = [
       { label: "Waived Off", value: "₹0.00" },
        { label: " Total", value: "₹479456.00", isBold: true },
    ];  
   
       const ordertypeData = [
         { label: "Waived Off", value: "₹0.00" },
         { label: " Total", value: "₹479456.00", isBold: true },
    ];
       const paymentData = [
         { label: "card", value: "₹0.00" },
         { label: "cash", value: "₹479456.00", isBold: true },
       ];
       const ComplimentaryordersData = [
         { label: "Waived Off", value: "₹0.00" },
         { label: " Total", value: "₹479456.00", isBold: true },
    ];
       const saleordersData = [
         { label: "Waived Off", value: "₹0.00" },
         { label: " Total", value: "₹479456.00", isBold: true },
    ];
       const duepaymentsreceivedsummaryData = [
         { label: "card", value: "₹0.00" },
         { label: "Total", value: "₹479456.00", isBold: true },
       ];
        const VirtualsummaryData = [
          { label: "card", value: "₹0.00" },
          { label: "Total", value: "₹479456.00", isBold: true },
        ];
    


      const ExpensesSummaryData = [
        { label: "2024-10-01", value: "₹0.00" },
        { label: "Total", value: "₹479456.00" },
      ];
          const WithdrawalSummaryData = [
            { label: "2024-10-01", value: "₹0.00" },
            { label: "Total", value: "₹479456.00" },
          ];
          const CashTopupsummarySummaryData = [
            { label: "2024-10-01", value: "₹0.00" },
            { label: "Total", value: "₹479456.00" },
          ];
          const AdvancesordersData = [
            { label: "Count", value: "₹0.00" },
            { label: "Today Received Amount:", value: "₹0.00" },

            {
              label: "Total :",
              value: "₹479456.00",
              
            },
          ]; 

  const AdvancesotherordersData = [
    { label: "Count", value: "₹0.00" },
    { label: "card", value: "₹0.00" },
    {
      label: "Today Received Amount:",
      value: "₹479456.00",
      
    },
  ]; 


    return (
      <div className="">
        <div className="bg-white rounded-lg border border-gray-300">
          <section className="p-4">
            <div className="p-4  text-[#DD312F] font-semibold">
              Billing (Success)
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Order</th>
                  <th className="p-3 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {billingSuccessData.map((item, index) => (
                  <tr key={index} className="border-b ">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? "" : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Billing (Cancel)
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Order</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {billingcancleData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">Order Type</p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Order</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {ordertypeData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Payment Mode
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Payment Mode</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {paymentData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Complimentary Orders
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Order</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {ComplimentaryordersData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Sales Return Orders
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Order</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {saleordersData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Sales Return Orders
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Order</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {saleordersData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Due Payments Received Summary
                </p>
                <tr className="border-b bg-[#FF9E1B]">
                  <th className="p-3 w-2/3">payment type</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {duepaymentsreceivedsummaryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}

                <p className=" text-[#DD312F] font-semibold p-4">
                  Virtual Wallet Summary
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Payment type</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {VirtualsummaryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Expenses Summary
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Date</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {ExpensesSummaryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Withdrawal Summary
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Date</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {WithdrawalSummaryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Cash Top-Up Summary
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  <th className="p-3 w-2/3">Date</th>
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {CashTopupsummarySummaryData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <p className=" text-[#DD312F] font-semibold p-4">
                  Advance Orders
                </p>
                <tr className="border-b bg-[#E7E7E7]">
                  Advance Order (Success Orders){" "}
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {AdvancesordersData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
                <tr className="border-b bg-[#E7E7E7]">
                  Advance Order (other)
                  <th className="p-3 text-right ">Total (₹)</th>
                </tr>
                {AdvancesotherordersData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className={`p-3 ${item ? "" : ""}`}>{item.label}</td>
                    <td className={`p-3 text-right ${item ? " " : ""}`}>
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    );
};

export default ExecutiveSalesReportTable;
