import React, { useState, useEffect } from "react";
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { PiPrinterDuotone } from "react-icons/pi";
import { HiOutlinePrinter } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Sheet from "../../common/Sheet";
import CategoryReportList from "../Category Summary/CategoryReportList";
import ItemFliter from "./ItemFliter";
import ItemReportSidebar from "./ItemReportSidebar";
import apiClient from "../../../Api/ApiClient";
import { getItemsDetail } from "../../../Api/Api";
import { setCategoryItemReport } from "../../../redux/Features/BillingDataSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Define types for report data and API response
interface Item {
  menu_item_name: string;
  total_quantity_sold: number;
  total_sales_price: number;
}

interface ReportItemData {
  [section: string]: Item[];
}

const ItemReport: React.FC = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReportItemSheetOpen, setIsReportItemSheetOpen] = useState(false);
  const [reportData, setReportData] = useState<any>({});
  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState("");
  const reportitemdata = useSelector(
    (state: any) => state?.billingData?.categoryItem
  ) as ReportItemData;
  const openReportItemSheet = () => {
    setIsReportItemSheetOpen(true);
  };
  const closeReportItemSheet = () => {
    setIsReportItemSheetOpen(false);
  };
  const dispatch = useDispatch();
  // Fetch Report Data
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const payload = {
          outlet: 1,
          kitchen: 1,
          start_date: startDate,
          end_date: endDate,
        };
        let response: any = await getItemsDetail(payload);
        if (response.status == "200") {
          setReportData(response.data.data);
          dispatch(setCategoryItemReport(response.data.data));
        }
      } catch (error) {
        console.error("Failed to fetch report data:", error);
      }
    };

    fetchReportData();
  }, [dispatch]);
  const fetchReportData = async () => {
    try {
      const payload={
        outlet: 1,
        kitchen: 1,
        start_date: startDate,
        end_date: endDate,
      }
      let response:any= await getItemsDetail(payload)
      if (response.status=="200") {
        setReportData(response.data.data);
        dispatch(setCategoryItemReport(response.data.data))
      }
    } catch (error) {
      console.error("Failed to fetch report data:", error);
    }
  };
  const handleGetDate=(data:any)=>{
    setStartDate(data.start_date)
    setEndDate(data.end_date)
  }
  const navigate=useNavigate()
  const getMyDate=(mydate:any)=>{
    let dateObj = new Date(mydate);
let day = String(dateObj.getDate()).padStart(2, '0'); // Ensures the day is 2 digits
let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
let year = dateObj.getFullYear();
let formattedDate = `${month}-${day}-${year}`;
return formattedDate
  }
  return (
    <div className="py-6">
      <div className="flex justify-between items-center border-b border-gray-300 p-3">
        <h1 className="text-2xl font-semibold p-3">Item Report</h1>
        <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400" onClick={()=>navigate(-1)}>
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base" >Back</button>

        </div>
      </div>

      {/* Header and Buttons */}
      <div className="flex items-center justify-start mb-4 mt-3">
        <div className="flex space-x-2">
          <form className="w-full md:w-44 px-3">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoSearchOutline />
              </div>
              <input
                type="search"
                className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                placeholder="search"
              />
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
              </div>
            </div>
          </form>
          <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
            <PiPrinterDuotone size={20} />
            <button onClick={openReportItemSheet}>Print Configuration</button>
          </div>
        </div>
      </div>

      {/* Filter Component */}
      {isExpanded && (
        <ItemFliter
        sendDataToParent={handleGetDate}
        />
      )}

      {/* Table */}
      <div className="border border-gray-300 rounded-lg m-4">
        <div className="flex justify-between p-4">
          <p className="text-[#3D3D3D] text-base font-semibold">
            Item Reports: from {getMyDate(startDate)} {endDate?`to ${getMyDate(endDate)}`:""}
          </p>
          <div className="flex items-center space-x-2">
            {/* <div className="flex gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
              <HiOutlinePrinter size={20} />
              <button>Print</button>
            </div> */}
            <div className="flex gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
              <TiExport size={20} />
              <button>Export Excel</button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg p-4">
            <thead className="bg-gray-200 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600 border-r border-gray-300">
                  Category
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 border-r border-gray-300">
                  Item
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600 border-r border-gray-300">
                  Qty.
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Total (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {reportitemdata &&
                Object?.entries(reportitemdata && reportitemdata).map(
                  ([section, items]) => (
                    <React.Fragment key={section}>
                      {/* Section Row */}
                      <tr className="border-b border-gray-300">
                        <td
                          className="px-4 py-2 font-semibold border-r border-gray-300"
                          colSpan={4}
                        >
                          {section}
                        </td>
                      </tr>
                      {/* Items Rows */}
                      {items?.map((item: any, index: any) => (
                        <tr key={index} className="border-b border-gray-300">
                          <td className="px-4 py-2 border-r border-gray-300"></td>
                          <td className="px-4 py-2 border-r border-gray-300">
                            {item.menu_item_name}
                          </td>
                          <td className="px-4 py-2 text-right border-r border-gray-300">
                            {item.total_quantity_sold}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {item.total_sales_price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  )
                )}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet
        isOpen={isReportItemSheetOpen}
        onClose={closeReportItemSheet}
        title="Print Configuration"
      >
        <ItemReportSidebar />
      </Sheet>
    </div>
  );
};

export default ItemReport;
