import React, { useEffect, useState } from "react";
import { KotOrder } from "./kotListingData";
import { LuEye } from "react-icons/lu";
import { FiPrinter } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdOutlineNotInterested } from "react-icons/md";
import Pagination from "../../common/Pagination";
import { Link, useNavigate } from "react-router-dom";
import DialogBox from "../../common/Dilog-Box";
import CancelOrder from "../../common/CancleOrder";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getOperationKotList } from "../../../Api/Operation/Api";
import { setKotFilterOpeData, setKotListOpeData } from "../../../redux/Features/OperationDataSlice";
import KotOrderFilterForm from "./KotOrderFilterForm";
import { IoChevronDownOutline, IoChevronUpOutline, IoSearchOutline } from "react-icons/io5";

interface KotListingProps {
  KotListingData: KotOrder[];
}

const KotListing: React.FC<KotListingProps> = ({ KotListingData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const { kotListOpeData, kotFilterOpeData } =
    useSelector((state: any) => state.operationData) ?? {};
  const [isCancleDialogOpen, setCancleDialogOpen] = useState(false);
  // const [kotList, setKotList] = useState([]);
  // const [kotTotalLength, setKotTotalLength] = useState(0);
  const [cancelOrderId, setCancelOrderId] = useState(0);
  const [cancelOrderItems, setCancelOrderItems] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [kotFilterData, setKotFilterData] = useState<any>(null);

  // Handle dialog open and close
  const handleOpenCancleDialog = (kotId: any, items: any) => {
    setCancelOrderId(kotId);
    setCancelOrderItems(items);
    setCancleDialogOpen(true);
  };

  const handleCloseCancleDialog = () => setCancleDialogOpen(false);

  const itemsPerPage = 20;
  // const totalItems = kotTotalLength;
  const totalItems = kotListOpeData?.total_count;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchKots(currentPage);
  }, [currentPage, kotFilterData]);

  useEffect(() => {
    if (performance?.navigation?.type === 1) {
      const fetchKots = async () => {
        let data = {
          outlet_id: loginUserData?.outlet,
        };
        const res = await getOperationKotList(data);
        if (res?.status === 200) {
          dispatch(setKotListOpeData(res.data));
          dispatch(setKotFilterOpeData(null));
        }
      };
      fetchKots();
    }
  }, [dispatch]);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = kotList?.slice(startIndex, endIndex);

  const fetchKots = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet_id: loginUserData?.outlet,
      search: {
        // customer_fullname: filterData.customer_fullname,
        // customer_phone: filterData.customer_phone,
      },
      filter: {
        // kot_no: filterData.kot_no,
        // payment_type: filterData.payment_type,
        // kot_status: filterData.kot_status,
        // table_no: filterData.table_no,
        // order_type: filterData.order_type,
      },
    };

    // if (kotFilterOpeData?.length > 0) {
    //   data = kotFilterOpeData;
    // }

    if (kotFilterData !== null) {
      if (Object.keys(kotFilterData?.search).length > 0) {
        Object.assign(data.search, { customer_fullname: kotFilterData?.search?.customer_fullname });
        Object.assign(data.search, { customer_phone: kotFilterData?.search?.customer_phone });
      }
      if (Object.keys(kotFilterData?.filter).length > 0) {
        Object.assign(data.filter, { kot_no: kotFilterData?.filter?.kot_no });
        Object.assign(data.filter, { table_no: kotFilterData?.filter?.table_no });
        Object.assign(data.filter, { order_type: kotFilterData?.filter?.order_type });
        Object.assign(data.filter, { kot_status: kotFilterData?.filter?.kot_status });
      }
    }

    const res = await getOperationKotList(data);
    if (res?.status === 200) {
      dispatch(setKotListOpeData(res.data));
      // setKotList(res.data?.data);
      // setKotTotalLength(res.data?.total_count);
    }
  };

  // console.log("kotList", kotList);
  console.log("kotListOpeData", kotListOpeData);

  const kotStatusColor = (status: any) => {
    switch (status) {
      case "not_prepared":
        return "bg-yellow-100";
      case "active":
        return "bg-green-100";
      case "cancelled":
        return "bg-red-100";
      case "used_in_bill":
        return "bg-gray-100";
      case "preparing":
        return "bg-blue-100";
      default:
        return "";
    }
  };

  console.log(kotListOpeData);

  return (
    <div>
      <div className=" flex justify-between items-center border-b py-3">
        <h2 className="text-xl font-semibold mb-4">KOT Details</h2>
        <div
          className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdKeyboardArrowLeft className="text-base" />
          <button className=" text-base">Back</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
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
              className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              disabled
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
        <div className="flex flex-wrap justify-end md:col-span-2 gap-2">
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Used in Bill
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-green-200 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Active
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-red-200 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Cancelled
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-[#ffd8a4]/20 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Not Prepared
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-[#daf2ff] rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-2 md:px-4 py-2 text-sm md:text-base rounded-md">
              Preparing
            </p>
          </div>
        </div>
      </div>
      {isExpanded && (
        <KotOrderFilterForm
          // handleInputSearch={handleInputSearch}
          // handleSearch={handleSearch}
          // filterData={filterData}
          setKotFilterData={setKotFilterData}
        />
      )}

      <div className="overflow-auto max-w-full">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  KOT No.
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Order Type
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Customer Name
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Customer Mobile
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  No. Of Items
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Status
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Created
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Bill Print Date
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Complete Duration
                </th>
                <th className="px-2 md:px-4 py-2 text-xs text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {kotListOpeData?.data?.length > 0
                ? kotListOpeData?.data?.map((kot: any) => (
                    // <tr key={index} className={`${statusColor(order.status)}`}>
                    <tr
                      key={kot?.id}
                      className={`${kotStatusColor(kot?.kot_status)}`}
                    >
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {kot?.id}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-start">
                        {kot?.order?.order_type}{" "}
                        {kot?.order?.table ? kot?.order?.table : ""}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {kot?.order?.customer_name}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {kot?.order?.customer_phone}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {kot?.total_items > 1
                          ? `${kot?.total_items} items`
                          : `${kot?.total_items} item`}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        <button className="bg-white border border-gray-300 rounded-md px-4 py-1 inline-block">
                          {kot?.kot_status}
                        </button>
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {dayjs(new Date(kot?.create_time)).format("DD-MM-YYYY")}{" "}
                        <br />
                        {dayjs(new Date(kot?.create_time)).format("HH:mm:ss")}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {/* {kot.billPrintDate} */}
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs text-center">
                        {/* {kot.completeDuration} */}
                      </td>
                      <td className="py-2 px-3 text-xs text-center flex items-center gap-2">
                        <Link to={`/operations/Kot/kotview/${kot?.id}`}>
                          <LuEye className="cursor-pointer text-blue-500 w-4 h-4" />
                        </Link>
                        <FiPrinter className="cursor-pointer text-gray-500 w-4 h-4" />
                        <MdOutlineNotInterested
                          className="cursor-pointer text-red-500 w-4 h-4"
                          onClick={() =>
                            handleOpenCancleDialog(kot?.id, kot?.items)
                          } // Open dialog on click
                        />
                      </td>
                    </tr>
                  ))
                : "No data found"}
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

        <DialogBox
          isOpen={isCancleDialogOpen}
          onClose={handleCloseCancleDialog}
          title="Cancel Order"
        >
          <CancelOrder
            setCancleDialogOpen={setCancleDialogOpen}
            cancelOrderId={cancelOrderId}
            cancelOrderItems={cancelOrderItems}
            fetchKots={fetchKots}
            currentPage={currentPage}
          />
        </DialogBox>
      </div>
    </div>
  );
};

export default KotListing;
