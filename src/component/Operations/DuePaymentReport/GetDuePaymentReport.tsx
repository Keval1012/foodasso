import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import KotOrderFilterForm from "../Kot/KotOrderFilterForm";
import DuepaymentFliter from "./DuepaymentFliter";
import { getDuePayment } from "../../../Api/Operation/Api";
import { useDispatch, useSelector } from "react-redux";
import { setDuePaymentFilterOpeData, setDuePaymentOpeData } from "../../../redux/Features/OperationDataSlice";
import dayjs from "dayjs";
import Pagination from "../../common/Pagination";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getTableWiseOrder } from "../../../Api/Api";
import { setTablewiseOrer, paymentpopup } from "../../../redux/Features/BillingDataSlice";
import SettleDialog from "../../Billing/ViewTables/Settlement/SettleDialog";
interface PaymentData {
  create_time: string;
  customer: number;
  grand_total: number;
  id: number;
  name: string;
  order_id: string;
  payment_type: number;
  phone: string;
  settlement_amount: number | null;
}
const GetDuePaymentReport = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
const [open,setopen]=useState(false)
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const { duePaymentOpeData, duePaymentFilterOpeData } =
    useSelector((state: any) => state.operationData) ?? {};
  const [duePaymentList, setDuePaymentList] = useState([]);

  const itemsPerPage = 20;
  const totalItems = duePaymentOpeData?.total_count;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchDuePayment(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (performance?.navigation?.type === 1) {
      const fetchDuePayment = async () => {
        let data = {
          outlet_id: loginUserData?.outlet,
        };
        const res = await getDuePayment(data);
        if (res?.status === 200) {
          dispatch(setDuePaymentOpeData(res.data));
          dispatch(setDuePaymentFilterOpeData(null));
        }
        localStorage.removeItem("tabValue");
      };
      fetchDuePayment();
      localStorage.removeItem("tabValue");
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem("tabValue");
  }, []);

  const fetchDuePayment = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet_id: loginUserData?.outlet,
      // "name": "demo"
      // "phone": "2222222222"
    };

    if (duePaymentOpeData?.length > 0) {
      data = duePaymentOpeData;
    }

    try {
      // debugger
      const res = await getDuePayment(data);
      if (res.status === 200) {
        // setDuePaymentList(res.data?.data);
        dispatch(setDuePaymentOpeData(res.data));
      }
    } catch (error) {}
  };


  const totalPayment = (duePaymentOpeData?.data)?.reduce((total: any, pay: any) => {
    return total + pay.grand_total;
  }, 0);
  
  const handlepayment = (data: PaymentData): void => {
    const clonedData:any = { ...data };
     clonedData.order_id=clonedData.id
    setopen(true);
    fetchTableWiseOrder(clonedData.id);
    localStorage.setItem("settleddata", JSON.stringify(clonedData));
  };
useEffect(()=>{
setopen(false)
},[duePaymentOpeData])
const fetchTableWiseOrder = async (order_id: any) => {
  let data = {
    order: order_id,
  };

  try {
    const res = await getTableWiseOrder(data);
    if (res.status === 200) {
      dispatch(setTablewiseOrer(res.data?.data))
    }
  } catch (error) {
    dispatch(setTablewiseOrer({}))
  }
};
const closeDialog=()=>{
  setopen(false)
}

  return (
    <>
      <div className="p-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Due Payment Report</h1>
          <div className="flex space-x-2">
            <Link to="/operations/DuePaymentReport/order">
              <button className=" border border-gray-300 rounded px-4 py-2">
                Get Due Payment Report
              </button>
            </Link>

            {/* <button className="border border-gray-300 rounded px-4 py-2">
              Back
            </button> */}
            <div
              className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <MdKeyboardArrowLeft className="text-base" />
              <button className="text-base">Back</button>
            </div>
          </div>
        </div>

        {/* Search and Note */}
        <div className="flex justify-between items-center mb-2">
          <div className="relative">
            {/* Search Icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline />
            </div>

            {/* Input Field */}
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

          <div>
            <p className="text-xs text-gray-500">
              Note: To View The Most Up-To-Date Due Payments, Please Initiate A
              Manual Sync.
            </p>
          </div>
        </div>
        {isExpanded && <DuepaymentFliter />}

        {/* Table Header */}
        <div className="border border-gray-300  rounded-t-lg p-2 flex justify-between items-center">
          <p>Total Payment: {totalPayment}</p>
          {/* <button className="rounded px-4 py-2 border border-gray-300  ">
          Settle All
        </button> */}
        </div>

        {/* Table */}
        <table className="w-full text-left bg-white border-collapse">
          <thead className="bg-gray-100 ">
            <tr className="border-b">
              {/* <th className="px-4 py-2">
              <input type="checkbox" />
            </th> */}
              <th className="px-4 py-2">Bill No.</th>
              <th className="px-4 py-2">Bill Date</th>
              <th className="px-4 py-2">Customer Details</th>
              <th className="px-4 py-2">Total Bill Amount (₹)</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Repeat the row for each bill */}
            {duePaymentOpeData?.data?.length > 0
              ? duePaymentOpeData?.data?.map((due: any) => (
                  <tr className="border-b" key={due?.id}>
                    {/* <td className="px-4 py-2">
                  <input type="checkbox" />
                </td> */}
                    <td className="px-4 py-2">{due?.id}</td>
                    <td className="px-4 py-2">
                      {dayjs(new Date(due?.create_time)).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {due?.name} {due?.phone !== "None" ? (due?.phone) : ''}
                    </td>
                    <td className="px-4 py-2">{due?.grand_total}</td>
                    <td className="px-4 py-2">
                      <button
                        className="border border-gray-300 rounded px-4 py-2"
                        onClick={() => handlepayment(due)}
                      >
                        Settlement
                      </button>
                    </td>
                  </tr>
                ))
              : "No data found"}

            {/* <tr className="border-b">
            <td className="px-4 py-2">
              <input type="checkbox" />
            </td>
            <td className="px-4 py-2">20</td>
            <td className="px-4 py-2">2024-06-27 17:51:24</td>
            <td className="px-4 py-2">Heta Patel (+91 2535262859)</td>
            <td className="px-4 py-2">150.00</td>
            <td className="px-4 py-2">
              <button className="border border-gray-300 rounded px-4 py-2">
                Settlement
              </button>
            </td>
          </tr>

          <tr className="border-b">
            <td className="px-4 py-2">
              <input type="checkbox" />
            </td>
            <td className="px-4 py-2">25</td>
            <td className="px-4 py-2">2024-06-27 17:51:24</td>
            <td className="px-4 py-2">Heta Patel (+91 2535262859)</td>
            <td className="px-4 py-2">450.00</td>
            <td className="px-4 py-2">
              <button className="border border-gray-300 rounded px-4 py-2">
                Settlement
              </button>
            </td>
          </tr> */}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between my-4">
        <div className="w-full flex justify-end items-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
      <SettleDialog isOpen={open} onClose={closeDialog} />
    </>
  );
};

export default GetDuePaymentReport;
