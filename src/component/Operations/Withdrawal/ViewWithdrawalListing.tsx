import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getWithdrawlDate } from "../../../Api/Operation/Api";

interface WithdrawalDateProps {
  withdrawalDate: any;
};

const ViewWithdrawalListing = () => {

  const location = useLocation();
  const { withdrawalDate } = (location.state as WithdrawalDateProps) || {};
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [withdrawalDetails, setWithdrawalDetails] = useState<any>({});

  useEffect(() => {
    fetchWithdrawlDateDetails();
  }, [withdrawalDate]);

  const fetchWithdrawlDateDetails = async () => {
    if (withdrawalDate) {
      let data = {
        date: withdrawalDate,
        outlet: loginUserData?.outlet,
      };

      const res = await getWithdrawlDate(data);
      if (res?.status === 200) {
        setWithdrawalDetails(res.data?.data);
      }
    }
  };

  console.log("withdrawalDetails", withdrawalDetails);

  return (
    <div className="p-4">
      <div className="border rounded-lg shadow-sm">
        <div className="p-4 text-lg font-semibold border-b">
          Date: <span className="font-normal">{withdrawalDetails?.date}</span>
          <span className="ml-4 text-gray-600">
            {" "}
            (Total - {withdrawalDetails?.total_amount})
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawalDetails?.withdrawal_data?.map((withdrawal: any) => (
                <tr>
                  <td className="px-6 py-4 border">{withdrawal?.withdrawal_date_reason_name}</td>
                  <td className="px-6 py-4 border">{withdrawal?.amount}</td>
                  <td className="px-6 py-4 border">
                    {withdrawal?.explanation}
                  </td>
                </tr>
              ))}
              {/* <tr>
                <td className="px-6 py-4 border">Cheque given</td>
                <td className="px-6 py-4 border">2000.00</td>
                <td className="px-6 py-4 border">--</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border">Cheque given</td>
                <td className="px-6 py-4 border">6000.00</td>
                <td className="px-6 py-4 border">--</td>
              </tr> */}
              <tr className="font-semibold bg-gray-100">
                <td className="px-6 py-4 ">Total</td>
                <td className="px-6 py-4 ">
                  {withdrawalDetails?.total_amount}
                </td>
                <td className="px-6 py-4 "></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewWithdrawalListing;
