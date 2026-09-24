import React, { useState, useEffect } from "react";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import CategoryFliter from "./CategoryFliter";
import { PiPrinterDuotone } from "react-icons/pi";
import Sheet from "../../common/Sheet";
import CategoryReportList from "./CategoryReportList";
import { setCategoryReport } from "../../../redux/Features/BillingDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Define types for report data
interface ReportDataItem {
  menu_item__category__name: string;
  order_count: number;
  item_count: number;
  net_amount: number;
  total_tax: number;
  total_discount: number;
  grand_total: number;
}

const CategoryReport: React.FC = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Gets the date part (YYYY-MM-DD)
  };

  const [isReportSheetOpen, setIsReportSheetOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [reportData, setReportData] = useState<ReportDataItem[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    startDate: getCurrentDate(),
    endDate: "",
    nameFilter: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(false); // New state to track search action

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catdata = useSelector((state: any) => state.billingData.categoryReport);

  const openReportSheet = () => setIsReportSheetOpen(true);
  const closeReportSheet = () => setIsReportSheetOpen(false);

  // Fetch report data when the search button is clicked
  useEffect(() => {
    if (search) {
      const fetchReportData = async () => {
        setIsLoading(true);
        try {
          const payload = {
            start_date: filterOptions.startDate,
            end_date: filterOptions.endDate,
            menu_item__category__name: filterOptions.nameFilter,
          };

          const response = await getCategory(payload);
          if (response.data.success === "True") {
            setReportData(response.data.data);
            dispatch(setCategoryReport(response.data.data));
          } else {
            console.error("Failed to fetch data:", response.data.message);
          }
        } catch (error: any) {
          console.error("Error fetching report data:", error);
          toast.error(error?.response?.data?.errors || "An error occurred");
        } finally {
          setIsLoading(false);
          setSearch(false); // Reset search state after fetching
        }
      };

      fetchReportData();
    }
  }, [search, filterOptions, dispatch]);

  const handleFilter = (startDate: string, endDate: string, nameFilter: string) => {
    setFilterOptions({ startDate, endDate, nameFilter });
  };

  const handleSearch = () => {
    setSearch(true); // Trigger the fetch when the search button is clicked
  };

  const getDateString = (dateString: any) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
  };

  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold p-3">Category Report</h1>
        <div
          className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base">Back</button>
        </div>
      </div>

      {/* Search and Configure Buttons */}
      <div className="flex items-center justify-between mt-4 p-2">
        <div className="flex space-x-2">
          <form className="w-full md:w-80">
            <div className="relative">
              {/* Search Icon */}
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoSearchOutline />
              </div>
              {/* Input Field */}
              <input
                type="search"
                id="default-search"
                className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search"
                required
              />
              {/* Up/Down Icons */}
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
              </div>
            </div>
          </form>
        </div>
        <div className="flex gap-3 p-4 border rounded text-gray-700">
          <PiPrinterDuotone size={20} />
          <button onClick={openReportSheet}>Print Configuration</button>
        </div>
      </div>

      {/* Filter Component */}
      {isExpanded && <CategoryFliter onFilter={handleFilter} />}

      {/* Table */}
      <div className="border border-gray-300 rounded-lg m-4">
        <div className="flex justify-between p-4">
          {filterOptions.startDate && (
            <p className="text-[#3D3D3D] text-base font-semibold">
              Category Reports: from {getDateString(filterOptions.startDate)}
            </p>
          )}

          <div className="flex items-center space-x-2">
            <div className="flex gap-3 px-4 py-2 border rounded text-gray-700">
              <TiExport size={20} />
              <button>Export Excel</button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto mt-4 py-2 px-4">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-[#E7E7E7]">
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Category</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Orders</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Items</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Net Amount (₹)</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Total Discounts (₹)</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Total Tax (₹)</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Total Sales (₹)</th>
                </tr>
              </thead>
              <tbody>
                {catdata &&
                  catdata.map((data: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{data.menu_item__category__name}</td>
                      <td className="px-4 py-2 border-b">{data.order_count}</td>
                      <td className="px-4 py-2 border-b">{data.item_count.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b">{data.net_amount.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b">{data.total_discount.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b">{data.total_tax.toFixed(2)}</td>
                      <td className="px-4 py-2 border-b">{data.grand_total.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Print Configuration Sheet */}
      <Sheet isOpen={isReportSheetOpen} onClose={closeReportSheet} title="Print Configuration">
        <div>
          <CategoryReportList />
        </div>
      </Sheet>
    </div>
  );
};

export default CategoryReport;
