import React, { useState, FormEvent } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { setCategoryReport } from "../../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";
import { getCategory } from "../../../Api/Api";
import toast from 'react-hot-toast';

interface CategoryFilterProps {
  onFilter: (startDate: string, endDate: string, nameFilter: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onFilter }) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
  };
  
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<string>(getCurrentDate());
  const [endDate, setEndDate] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");

  const handleReset = () => {
    setStartDate(getCurrentDate());
    setEndDate("");
    setNameFilter("");
    onFilter("", "", ""); // Trigger filter reset
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Trigger the filter function passed in as a prop
    onFilter(startDate, endDate, nameFilter);
    await fetchReportData();
  };

  const fetchReportData = async () => {
    try {
      const payload: any = {
        start_date: startDate,
      };
      if (endDate) payload.end_date = endDate; // Include end date if it's provided
      if (nameFilter) Object.assign(payload, { menu_item__category__name: nameFilter });

      const response = await getCategory(payload);
      if (response.data.success === "True") {
        dispatch(setCategoryReport(response.data.data));
      } else {
        console.error("Failed to fetch data:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error fetching report data:", error);
      toast.error(error?.response?.data?.errors || "An error occurred");
    }
  };

  const isSearchDisabled = !startDate && !endDate && !nameFilter;

  return (
    <div className="p-4 border rounded-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Enter category name"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

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
            disabled={isSearchDisabled}
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryFilter;
