import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getOrderReport } from "../../../Api/Api";
import { setOrderReport } from "../../../redux/Features/BillingDataSlice";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
interface ChildProps {
  sendDataToParent:any  // Callback function type
}
const OrderFliter: React.FC<ChildProps> = ({sendDataToParent}) => {
  const dispatch = useDispatch();
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
  };
  // State for start and end dates
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState("");

  const fetchReportData = async () => {
    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
      };
      sendDataToParent(payload)
      const response: any = await getOrderReport(payload);
      if (response.status==200) {
        dispatch(setOrderReport(response.data.data));
      } else {
        throw new Error("Failed to fetch report data");
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.errors)
      console.log("Error fetching report data:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReportData();
  };
const handlereset=()=>{
  setStartDate(getCurrentDate())
  setEndDate("")
  fetchReportData()
}
useEffect(()=>{
  fetchReportData()
},[endDate,startDate])
  return (
    <div className="p-4 border rounded-md">
      <form
        onSubmit={handleSubmit}
        className="pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
      >
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Order Status */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Order Status</label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div> */}

        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button onClick={handlereset}
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none"
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderFliter;
