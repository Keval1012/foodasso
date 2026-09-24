import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getExpenseDate } from "../../../Api/Operation/Api";

interface ExpenseDateProps {
  expenseDate: any;
};

const ExpenseDatelisListing = () => {
  const location = useLocation();
  const { expenseDate } = (location.state as ExpenseDateProps) || {};
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [expenseDetails, setExpenseDetails] = useState<any>({});

  // console.log("expenseDate", expenseDate);

  useEffect(() => {
    fetchExpenseDateDetails();
  }, [expenseDate]);

  const fetchExpenseDateDetails = async () => {
    if (expenseDate) {
      let data = {
        date: expenseDate,
        outlet: loginUserData?.outlet,
      };

      const res = await getExpenseDate(data);
      if (res?.status === 200) {
        setExpenseDetails(res.data?.data);
      }
    }
  };

  console.log("expenseDetails", expenseDetails);

  return (
    <div className="p-4">
      <div className="border rounded-lg shadow-sm">
        <div className="p-4 text-lg font-semibold border-b">
          Date: <span className="font-normal">{expenseDetails?.date}</span>
          <span className="ml-4 text-gray-600">
            {" "}
            (Total - {expenseDetails?.total_amount})
          </span>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Explanation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase  border">
                  Paid From
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenseDetails?.expense_data?.map((expense: any) => (
                <tr>
                  <td className="px-6 py-4 border">{expense?.expense_reason}</td>
                  <td className="px-6 py-4 border">{expense?.amount}</td>
                  <td className="px-6 py-4 border">{expense?.explanation}</td>
                  <td className="px-6 py-4 border">{expense?.employee}</td>
                  <td className="px-6 py-4 border">{expense?.paid_from}</td>
                </tr>
              ))}
              {/* <tr>
                <td className="px-6 py-4 border">Internet</td>
                <td className="px-6 py-4 border">2000.00</td>
                <td className="px-6 py-4 border">--</td>
                <td className="px-6 py-4 border">Biller</td>
                <td className="px-6 py-4 border">From Cash</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border">Groceries</td>
                <td className="px-6 py-4 border">6000.00</td>
                <td className="px-6 py-4 border">For Kitchen</td>
                <td className="px-6 py-4 border">--</td>
                <td className="px-6 py-4 border">From Cash</td>
              </tr> */}
              <tr className="font-semibold bg-gray-100">
                <td className="px-6 py-4 ">Total</td>
                <td className="px-6 py-4 ">{expenseDetails?.total_amount}</td>
                <td className="px-6 py-4 "></td>
                <td className="px-6 py-4 "></td>
                <td className="px-6 py-4 "></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDatelisListing;
