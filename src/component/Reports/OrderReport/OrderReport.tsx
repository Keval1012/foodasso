import React, { useEffect, useState } from "react";
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { TiExport } from "react-icons/ti";
import OrderFliter from "./OrderFliter";
import { PiPrinterDuotone } from "react-icons/pi";
import Sheet from "../../common/Sheet";
import CategoryReportList from "../Category Summary/CategoryReportList";
// import ItemFliter from "./ItemFliter";
import { HiOutlinePrinter } from "react-icons/hi2";
import { MdKeyboardArrowLeft } from "react-icons/md";
import ItemReportSidebar from "../Item Report/ItemReportSidebar";
import ItemFliter from "../Item Report/ItemFliter";
import SaleReportSidebar from "../Sale Report/SaleReportSidebar";
import SaleFliter from "../Sale Report/SaleFliter";
import OrderReportSidebar from "./OrderReportSidebar";
import apiClient from "../../../Api/ApiClient";
import { getOrderReport } from "../../../Api/Api";
import { setOrderReport } from "../../../redux/Features/BillingDataSlice";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import SaleFliter from "./SaleFliter";
// import SaleReportSidebar from "./SaleReportSidebar";
// import ItemReportSidebar from "./ItemReportSidebar";

interface TaxDetail {
  order_order_tax_detail__tax__title: string | null;
  total_tax_amount: number | null;
}

interface OrderSummary {
  order_status: string;
  my_amount: number;
  total_amount: number;
  total_orders: number;
  total_tax: number;
  total_delivery_charge: number;
  total_container_charge: number;
  additional_charges: number;
  tax_wise_details: TaxDetail[];
}

interface PaymentSummary {
  payment_type__type: string;
  total: number;
}

interface ReportData {
  order_summary: OrderSummary[];
  payment_summary: PaymentSummary[];
  total_my_amount: number;
  total_amount: number;
  total_orders: number;
}

const OrderReport = () => {
  const dispatch=useDispatch()
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
  };
  const orderdata=useSelector((state:any)=>state.billingData.orderReport)
  console.log(orderdata,"orderdataorderdata")
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReportOrderSheetOpen, setIsReportOrderSheetOpen] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate,setStartDate]=useState(getCurrentDate())
  const [endDate,setEndDate]=useState("")
  const openReportOrderSheet = () => {
    setIsReportOrderSheetOpen(true);
  };

  const closeReportOrderSheet = () => {
    setIsReportOrderSheetOpen(false);
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const payload= {
          start_date: "2024-10-01",
          end_date: "2024-10-31",
        }
      let response:any=await  getOrderReport(payload)
        if (response.data.success === "true") {
          setReportData(response.data.data);
          dispatch(setOrderReport(response.data.data))
        } else {
          throw new Error("Failed to fetch report data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  //  const reportData = [
  //     {
  //     orderNo: "Total",
  //     date: "10-28-2024",
  //     paymentMode: "Cash",
  //     orderType: "Dine In (b4)",
  //     areaType: "AC",
  //     myAmount: 56513.57,
  //     discount: 4052.47,
  //     deliveryCharge: 1700.00,
  //     containerCharge: 180.00,
  //     serviceCharge: 0.00,
  //     additionalCharge: 0.00,
  //     sgstA: 1018.26,
  //     cgstA: 1323.45,
  //     sgstI: 369.16,
  //     cgstI: 4899.43,
  //     waivedOff: 434561.00,
  //     total: 4975662.00,
  //     assignTo: "--",
  //     billerName: "Biller",
  //     reason: "--",
  //     tip: 46562.00,
  //     totalWithTip: 963865.00,
  //   },
  //   {
  //     orderNo: "1",
  //     date: "10-28-2024",
  //     paymentMode: "Cash",
  //     orderType: "Dine In (b4)",
  //     areaType: "AC",
  //     myAmount: 56513.57,
  //     discount: 4052.47,
  //     deliveryCharge: 1700.00,
  //     containerCharge: 180.00,
  //     serviceCharge: 0.00,
  //     additionalCharge: 0.00,
  //     sgstA: 1018.26,
  //     cgstA: 1323.45,
  //     sgstI: 369.16,
  //     cgstI: 4899.43,
  //     waivedOff: 434561.00,
  //     total: 4975662.00,
  //     assignTo: "--",
  //     billerName: "Biller",
  //     reason: "--",
  //     tip: 46562.00,
  //     totalWithTip: 963865.00,
  //   },
  //   // Add more rows as needed
  // ];
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
    <div className=" py-6">
      <div className="flex justify-between items-center border-b border-gray-300 p-3">
        <h1 className="text-2xl font-semibold p-3">Order Report</h1>
        <div className=" flex gap-3 items-center py-2 rounded px-4 border border-gray-400" onClick={()=>navigate(-1)}>
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base" >Back</button>

        </div>
      </div>
      {/* Header and Buttons */}
      <div className="flex items-center justify-start mb-4 mt-3">
        <div className="flex space-x-2">
          <form className="w-full md:w-44 px-3">
            <div className="relative">
              {/* Search Icon */}
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoSearchOutline />
              </div>

              {/* Input Field */}
              <input
                type="search"
                id="default-search"
                className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
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
          <div className=" flex items-center gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
            {/* <PiPrinterDuotone size={20} /> */}
            <button className="" onClick={openReportOrderSheet}>
              Print Configuration
            </button>
          </div>
        </div>
      </div>

      {isExpanded && <OrderFliter
         sendDataToParent={handleGetDate}
      />}

      {/* Table */}
      <div className="border border-gray-300 rounded-lg m-4">
        <div className=" flex justify-between p-4">
          <p className="text-[#3D3D3D]  text-base font-semibold">
            Order Repots : from {getMyDate(startDate)} {endDate?`tO ${endDate}`:''}
          </p>
          <div className="flex items-center space-x-2 ">
            {/* <div className="flex gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
              <HiOutlinePrinter size={20} />
              <button className="">Print</button>
            </div> */}
            <div className="flex gap-3 px-4 py-2 border border-gray-300 rounded text-gray-700">
              <TiExport size={20} />
              <button className="">Export Excel</button>
            </div>
          </div>
        </div>
        <div className="p-4 min-h-screen">
          {/* Order Status Section */}
          <div className="bg-white p-4 rounded-lg mb-6">
            <h2 className="text-red-600 font-semibold text-lg mb-3">
              Order Status
            </h2>
            <table className="w-full text-left text-gray-700">
              <thead className="bg-gray-200 text-gray-600 font-medium">
                <tr className="">
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    Order Status
                  </th>
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    My Amount (₹)
                  </th>
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    Total (₹)
                  </th>
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    Order
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderdata &&
                  orderdata?.order_summary.map((order: any, index: any) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-3 border border-gray-300">
                        {order.order_status}
                      </td>
                      <td className="py-2 px-3 border border-gray-300">
                        {order.my_amount}
                      </td>
                      <td className="py-2 px-3 border border-gray-300">
                        {order.total_amount}
                      </td>
                      <td className="py-2 px-3 border border-gray-300">
                        {order.total_orders}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Succeed Order Section */}
          <div className="text-red-600 font-semibold mb-3">
            Succeed Order (176)
          </div>

          {/* Payment Type Section */}
          <div className="bg-white p-4 rounded-lg mb-6">
            <h2 className="font-semibold text-lg mb-3 ">Payment Type</h2>
            <table className="w-full text-left text-gray-700">
              <thead className="border border-gray-300 bg-gray-200 text-gray-600 font-medium">
                <tr>
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    Payment Type
                  </th>
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    Total (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderdata &&
                  orderdata?.payment_summary.map((order: any, index: any) => (
                    <tr className="border-b">
                      <td className="py-2 px-3 border border-gray-300">
                        {" "}
                        {order.payment_type__type}
                      </td>
                      <td className="py-2 px-3 border border-gray-300">
                        {" "}
                        {order.total}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* Cancelled Orders Section */}
          <div className="text-red-600 font-semibold mb-3">
            Cancelled Orders (0)
          </div>
          <div className="bg-white p-4 rounded-lg mb-6">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-gray-200 text-gray-600 font-medium">
                <tr>
                  <th className="py-2 px-3 font-semibold">Order Status</th>
                  <th className="py-2 px-3 text-right font-semibold">
                    Total (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="py-2 px-3 border border-gray-300">
                  <td className="py-2 px-3 "></td>
                  <td className="text-right">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Due Payments Received Summary Section */}
          <div className="text-red-600 font-semibold mb-3">
            Due Payments Received Summary
          </div>
          <div className=" p-4 rounded-lg mb-6">
            <table className="w-full text-left text-gray-700">
              <thead className=" text-gray-700 font-medium">
                <tr className="bg-[#FF9E1B]">
                  <th className="py-2 px-3 border border-gray-300 text-white font-semibold">
                    Payment Type
                  </th>
                  <th className="py-2 px-3 text-right border border-gray-300 text-white font-semibold">
                    Total (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderdata &&
                  orderdata?.payment_summary.map((order: any, index: any) => (
                    <tr className="border border-gray-300">
                      <td className="py-2 px-3 border border-gray-300">
                        {order?.payment_type__type}
                      </td>
                      <td className="text-right border border-gray-300">
                        {order?.total}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Expense Summary Section */}
          <div className="text-red-600 font-semibold mb-3">Expense Summary</div>
          <div className="bg-white p-4 rounded-lg mb-6">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-gray-200 text-gray-600 font-medium">
                <tr>
                  <th className="py-2 px-3 border border-gray-300 font-semibold">
                    Total My Amount
                  </th>
                  <th className="py-2 px-3 text-right border border-gray-300 font-semibold">
                    Total (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="py-2 px-3">{reportData?.total_my_amount}</td>
                  <td className="text-right">{reportData?.total_amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Sheet
        isOpen={isReportOrderSheetOpen}
        onClose={closeReportOrderSheet}
        title="Print Configuration
"
      >
        <div>
          <OrderReportSidebar />
        </div>
      </Sheet>
    </div>
  );
};

export default OrderReport;
