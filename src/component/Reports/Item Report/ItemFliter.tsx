import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryItemReport } from "../../../redux/Features/BillingDataSlice";
import { getItemsDetail } from "../../../Api/Api";
import toast, { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from "react-icons/io5";
interface ChildProps {
  sendDataToParent:any  // Callback function type
}
const ItemFilter: React.FC<ChildProps> = ({sendDataToParent}) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
  };
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<string>(getCurrentDate());
  const [endDate, setEndDate] = useState<string>("");

  const {  loginUserData } =
  useSelector((state: any) => state.billingData) ?? {};
  const onApplyFilter = async () => {
    try {
      const payload = {
        outlet: loginUserData?.outlet,
        kitchen: loginUserData?.kitchen,
        start_date: startDate,
        end_date: endDate,
      };
      sendDataToParent(payload)
      const response: any = await getItemsDetail(payload);
      if (response.status === "200") {
        dispatch(setCategoryItemReport(response.data.data));
      } else {
        console.error("Failed to fetch report data:", response.data.message);
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.errors)
      console.error("Error fetching report data:", error);
    }
  };
const handleReset=()=>{
  setStartDate(getCurrentDate())
  setEndDate("")
  
  onApplyFilter()
}
useEffect(()=>{
onApplyFilter()
},[endDate,startDate])
  return (
    <div className="p-4 border rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        
        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>
        
        {/* Apply Filter Button */}
        {/* <div className="flex items-end">
          <button
            onClick={onApplyFilter}
            className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Apply Filter
          </button>
        </div> */}
        <div className="col-span-2 md:col-span-4 flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={onApplyFilter}
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFilter;
