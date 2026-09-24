import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making API calls
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import { PiPrinterDuotone } from "react-icons/pi";
import Sheet from "../../common/Sheet";
import SaleFliter from "./SaleFliter";
import { HiOutlinePrinter } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import SaleReportSidebar from "./SaleReportSidebar";
import apiClient from "../../../Api/ApiClient";
import { getSalesReport } from "../../../Api/Api";
import { seSelsReport } from "../../../redux/Features/BillingDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common/Pagination";
// Define the type for each row in the report data
interface ReportData {
  id: number;
  orderNo: string;
  create_time: any[];
  payment_type_name: string;
  order_type_name: string;
  order_area_type_name: string;
  myAmount: number;
  total_discount: number;
  delivery_charge: number;
  container_charge: number;
  serviceCharge: number;
  additionalCharge: number;
  total_tax: number;
  cgstA: number;
  sgstI: number;
  cgstI: number;
  waivedOff: number;
  grand_total: number;
  assign_to_name: string;
  biller_name: string;
  reason: string;
  tip: number;
  is_advance_order: number;
}

const SaleReport: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isReportItemSheetOpen, setIsReportitemSheetOpen] =
    useState<boolean>(false);
  const [reportData, setReportData] = useState<ReportData[]>([]); // State for report data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const openReportItemSheet = () => {
    setIsReportitemSheetOpen(true);
  };
  const {  loginUserData } =
  useSelector((state: any) => state.billingData) ?? {};

    // Function to format the date as YYYY-MM-DD
    const getCurrentDate = () => {
      const today = new Date();
      return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
    };
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [staterdate, setStartDate] = useState(getCurrentDate());
  const [enddate, setEndDate] = useState("");
  const getHandleDates = (data: any) => {
    setStartDate(data.start_date);
    setEndDate(data.end_date);
  };
  const closeReportItemSheet = () => {
    setIsReportitemSheetOpen(false);
  };
  const dispatch = useDispatch();
  const selesdata = useSelector((state: any) => state.billingData.selsReport);

  const formatDate = (date: Date): string => {
    // Formats the date to a readable string format (e.g., 'YYYY-MM-DD')
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchReportData = async () => {
    const offset = (currentPage - 1) * itemsPerPage;
    try {
      const payload = {
        start: 0,
        limit: 20,
        outlet_id:loginUserData.outlet,
        start_date:staterdate
      };
      if(staterdate)
        Object.assign(payload,{start_date:staterdate})
      if(enddate)
        Object.assign(payload,{enddata:enddate})
if(offset)
Object.assign(payload,{start:offset})
      let response: any = await getSalesReport(payload);
      if (response.data.message === "Report generated successfully") {
        setReportData(response.data.data); // Set the report data
        const payload={
          records:response.data.data,
          count:response.data.total_count
        }
        dispatch(seSelsReport(payload));
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    fetchReportData();
  }, []); // Empty dependency array to run on mount only

  const itemsPerPage = 20;
   const totalItems = selesdata?.count || 0;
   const totalPages = Math.ceil(totalItems / itemsPerPage);
   console.log(totalPages,"totalPagestotalPages")
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
 
    setCurrentPage(page);
  };
  useEffect(()=>{
    fetchReportData();
  },[currentPage])
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
        <h1 className="text-2xl font-semibold p-3">Sales Report</h1>
        <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
          <MdKeyboardArrowLeft
            className="text-base"
            onClick={() => navigate(-1)}
          />
          <button className="text-base">Back</button>
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
                id="default-search"
                className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                placeholder="search"
                required
              />
              <div
                className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
              </div>
            </div>
          </form>
          {/* <div className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
            <PiPrinterDuotone size={20} />
            <button onClick={openReportItemSheet}>Print Configuration</button>
          </div> */}
        </div>
      </div>

      {isExpanded && <SaleFliter getDates={getHandleDates} />}

      {/* Table */}
      <div className="border border-gray-300 rounded-lg m-4">
        <div className="flex justify-between p-4">
          <p className="text-[#3D3D3D] text-base font-semibold">
            Sales Reports:{getMyDate(staterdate)}
            {enddate ? `To ${getMyDate(enddate)}` : ``}
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
          <table className="min-w-full border-collapse bg-gray-200 text-sm text-center border border-gray-400">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 border border-gray-400">Order No.</th>
                <th className="px-4 py-2 border border-gray-400">Date</th>
                <th className="px-4 py-2 border border-gray-400">
                  Payment Mode
                </th>
                <th className="px-4 py-2 border border-gray-400">Order Type</th>
                <th className="px-4 py-2 border border-gray-400">Area Type</th>
                <th className="px-4 py-2 border border-gray-400">
                  My Amount (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Discount (%)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Delivery Charge
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Container Charge (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Service Charge (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Additional Charge (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  SGST(A) (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  CGST(A) (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  SGST(I) (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  CGST(I) (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">
                  Waived off (₹)
                </th>
                <th className="px-4 py-2 border border-gray-400">Total (₹)</th>
                <th className="px-4 py-2 border border-gray-400">Assign To</th>
                <th className="px-4 py-2 border border-gray-400">
                  Biller Name
                </th>
                <th className="px-4 py-2 border border-gray-400">Reason</th>
                <th className="px-4 py-2 border border-gray-400">Tip (₹)</th>
                <th className="px-4 py-2 border border-gray-400">
                  Total + Tip (₹)
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan={22} className="px-4 py-2 border border-gray-400">
                    Loading data...
                  </td>
                </tr>
              ) : (
                selesdata &&
                selesdata?.records.map((row: any) => (
                  <tr key={row.id}>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      <div>
                        {row?.create_time
                          ? new Date(row.create_time).toLocaleDateString()
                          : "No date available"}
                      </div>
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.payment_type_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.order_type_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.order_area_type_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.myAmount}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.total_discount}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.delivery_charge}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.container_charge}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.serviceCharge}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.additionalCharge}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.total_tax.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.cgstA}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.sgstI}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.cgstI}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.waivedOff}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                    {parseInt(row.grand_total) +  parseInt(row.delivery_charge) + parseInt(row.container_charge)}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.assign_to_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.biller_name}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.reason}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                      {row.tip}
                    </td>
                    <td className="px-4 py-2 border border-gray-400">
                    {parseInt(row.grand_total) +  parseInt(row.delivery_charge) + parseInt(row.container_charge)  + parseInt(row.tip)  }
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
      </div>
      {isReportItemSheetOpen && (
        // <Sheet closeSheet={closeReportItemSheet} />
        <div className=""></div>
      )}
      {isReportItemSheetOpen && <SaleReportSidebar />}
    </div>
  );
};

export default SaleReport;
