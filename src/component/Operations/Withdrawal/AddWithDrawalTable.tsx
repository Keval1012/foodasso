import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getWithdrawlDate,
  getWithdrawlReason,
  postWithdrawl,
} from "../../../Api/Operation/Api";
import Select from "react-select";
import toast from "react-hot-toast";

interface WithdrawalDateProps {
    withdrawalDate: any;
}

const AddWithdrawalTable = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { withdrawalDate } = (location.state as WithdrawalDateProps) || {};
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [withdrawlReasonList, setWithdrawlReasonList] = useState([]);
  const [withdrawlRowData, setWithdrawlRowData] = useState<any>([]);

  // const [rows, setRows] = useState([{}]);

  // const addRows = (count: number) => {
  //     setRows([...rows, ...Array(count).fill({})]);
  // };

  // const removeRow = (index: number) => {
  //     setRows(rows.filter((_, i) => i !== index));
  // };

  const [rows, setRows] = useState<any>([{ id: 0, withdrawal_date_reason: "", amount: 0, explanation: "" }]);

  const addRows = () => {
    setRows((prevRows: any = []) => [
      ...prevRows,
      ...Array(10).fill(0).map(() => ({
        id: Date.now() + Math.random(),
        withdrawal_date_reason: "",
        amount: 0,
        explanation: ""
      })),
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prevRows: any) => prevRows.filter((row: any) => row.id !== id));
  };

  const handleRowChange = (index: any, field: any, value: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) => (row?.id === index ? { ...row, [field]: value } : row))
    );
  };

  useEffect(() => {
    fetchWithdrawlReason();
  }, []);

  useEffect(() => {
    fetchWithdrawlDateDetails();
  }, [withdrawalDate]);

  useEffect(() => {
    setRows(withdrawlRowData);
  }, [withdrawlRowData]);

  const fetchWithdrawlReason = async () => {
    try {
      const res = await getWithdrawlReason();
      if (res.status === 200) {
        setWithdrawlReasonList(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchWithdrawlDateDetails = async () => {
    if (withdrawalDate) {
      let data = {
        date: withdrawalDate,
        outlet: loginUserData?.outlet,
      };

      const res = await getWithdrawlDate(data);
      if (res?.status === 200) {
        setWithdrawlRowData(res.data?.data?.withdrawal_data);
      }
    }
  };

  console.log("rows", rows);

  const handleSave = async () => {
    const withdrawalRowData = rows?.map((row: any) => {
      const rowItem = {
        withdrawal_date_reason: row?.withdrawal_date_reason,
        amount: Number(row?.amount),
        explanation: row?.explanation
      };

      if (row?.detail_id !== undefined) {
        Object.assign(rowItem, { detail_id: Number(row?.detail_id) })
      }

      return rowItem;
    });

    let data = {
      withdrawal_date: withdrawalDate,
      outlet_id: loginUserData?.outlet,
      withdrawal_data: withdrawalRowData
    };

    try {
      const res = await postWithdrawl(data);
      if (res.status === 200) {
        console.log(res);
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error.response.data?.errors);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b px-4 py-3">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Details</h2>
        <div className="flex gap-3">
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
      <div className="m-4 border">
        {/* Header section showing the date and a note */}

        <div className="mb-4 p-2">
          <p className="text-xl">Date: {withdrawalDate}</p>
          <p className="text-sm text-red-500">
            Note: Only Rows With Reason & Amount Will Get Saved.
          </p>
        </div>

        {/* Table to manage expense details */}
        <div className="overflow-x-auto p-3">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {/* Table headers */}
                <th className="px-4 py-2 border-b">Reason</th>
                <th className="px-4 py-2 border-b">Amount</th>
                <th className="px-4 py-2 border-b">Explanation</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through rows state and render each row with inputs */}
              {rows?.map((r: any) => (
                <tr key={r?.id} className="hover:bg-gray-50">
                  {/* Reason dropdown */}
                  <td className="px-4 py-2 border-b">
                    {/* <select className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option>Select Reason</option>
                            </select> */}
                    <Select
                        className="w-full shadow-sm sm:text-sm"
                        options={withdrawlReasonList?.map((item: any) => ({
                        value: item?.id,
                        label: item?.name,
                        }))}
                        placeholder="Select Reason"
                        defaultValue={
                        withdrawlReasonList
                            ?.map((item: any) => ({ value: item.id, label: item.name }))
                            ?.find((option) => option.value === r?.withdrawal_date_reason)
                        }
                        onChange={(selectedOption) => handleRowChange(r?.id, "withdrawal_date_reason", selectedOption?.value)}
                    />
                  </td>
                  {/* Amount input field */}
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Amount"
                      defaultValue={r?.amount || ""}
                      onChange={(e) => handleRowChange(r?.id, "amount", e.target.value)}
                    />
                  </td>
                  {/* Explanation input field */}
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter Explanation"
                      defaultValue={r?.explanation || ""}
                      onChange={(e) => handleRowChange(r?.id, "explanation", e.target.value)}
                    />
                  </td>
                  {/* Action button to delete the row */}
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => removeRow(r?.id)}
                      className="text-gray-500 hover:text-gray-700 bg-[#FAFAFA]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer section with buttons to add rows, cancel, or save */}
        <div className="flex justify-between bg-gray-100 py-4 px-2">
          {/* Button to add 10 rows */}
          <button
            // onClick={() => addRows(10)}
            onClick={addRows}
            className="bg-red-100 hover:bg-red-700 text-red-700 hover:text-white py-2 px-4 rounded-full border border-red-700"
          >
            + Add 10 Rows
          </button>

          {/* Buttons to cancel or save */}
          <div className="flex justify-end">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-full mr-2"
              onClick={() => navigate(-2)}
            >
              Cancel
            </button>
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-5 rounded-full"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWithdrawalTable;
