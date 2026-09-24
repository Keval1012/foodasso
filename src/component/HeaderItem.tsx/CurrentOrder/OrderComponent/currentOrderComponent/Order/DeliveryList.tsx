import React, { useEffect, useState } from "react";
import { IoChevronDownOutline, IoChevronUpOutline, IoSearchOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { FiPrinter } from "react-icons/fi";
import { RxCircleBackslash } from "react-icons/rx";
import DeleteDailog from "./DeleteDailog";
import Pagination from "../../../../../common/Pagination";
import ViewOrderDetails from "./ViewOrderDetails";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOperationOrderList } from "../../../../../../Api/Operation/Api";
import { setDeliveryOrderAllOpeData } from "../../../../../../redux/Features/OperationDataSlice";
import dayjs from "dayjs";
import CurrentOrderFilterForm from "../CurrentOrderFilterForm";

interface Order {
  orderNo: string;
  orderType: string;
  customerName: string;
  mobileNo: string; // Added this field
  paymentType: string;
  myAmount: string;
  tax: string;
  discount: string;
  grandTotal: string;
  created: string;
  backgroundColor: string;
}

interface OrderTypeDataProps {
  selectedTab: any;
};

const DeliveryList: React.FC<OrderTypeDataProps> = ({
  selectedTab,
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const { deliveryOrderAllOpeData } =
    useSelector((state: any) => state.operationData) ?? {};
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewOrderDetailsOpen, setIsViewOrderDetailsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentOrderFilterData, setCurrentOrderFilterData] = useState<any>(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  // const totalPages = Math.ceil(DelivryListData.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = DelivryListData.slice(startIndex, endIndex);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const handleOpenDeleteDialog = (id: any) => {
    setIsDeleteDialogOpen(true);
    setCurrentOrderId(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleOpenViewOrderDetails = (order: Order) => {
    // setSelectedOrder(order);
    // setIsViewOrderDetailsOpen(true);
    navigate("/orderItem/sub/current/view", {
      state: {
        currentOrderDetails: order,
      },
    });
  };

  const handleCloseViewOrderDetails = () => {
    setIsViewOrderDetailsOpen(false);
  };


  const itemsPerPage = 20;
  const totalItems = deliveryOrderAllOpeData?.total_count;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllCurrentOrders(currentPage);
  }, [currentPage, selectedTab, currentOrderFilterData]);

  // useEffect(() => {
  //   if (performance?.navigation?.type === 1) {
  //     const fetchAllCurrentOrders = async () => {
  //       let data = {
  //         outlet_id: loginUserData?.outlet,
  //       };
  //       const res = await getOperationOrderList(data);
  //       if (res?.status === 200) {
  //         dispatch(setDeliveryOrderAllOpeData(res.data));
  //         // dispatch(setKotFilterOpeData(null));
  //       }
  //     };
  //     fetchAllCurrentOrders();
  //   }
  // }, [dispatch]);

  const fetchAllCurrentOrders = async (page: number) => {
    // let orderId = orderTypeList.find(
    //   (o: OrderType) => o?.type === selectedTab
    // )?.id;

    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet_id: loginUserData?.outlet,
      search: {
        // "table_no": "",
        // "customer_fullname": "",
        // "customer_phone": ""
      },
      filter: {
        // "id": 2,
        // "payment_type": 1
        // "order_status": ["completed"],
        order_type: selectedTab,
        // "sub_order_type":1,
        // "delivery_status":"foodready"  you can also pass null
        // "is_advance_order": true
      },
      // ordering: "-grand_total",
    };

    if (currentOrderFilterData !== null) {
      if (Object.keys(currentOrderFilterData?.search).length > 0) {
        Object.assign(data.search, { table_no: currentOrderFilterData?.search?.table_no });
        Object.assign(data.search, { customer_fullname: currentOrderFilterData?.search?.customer_fullname });
        Object.assign(data.search, { customer_phone: currentOrderFilterData?.search?.customer_phone });
      }
      if (Object.keys(currentOrderFilterData?.filter).length > 0) {
        Object.assign(data.filter, { id: currentOrderFilterData?.filter?.id });
        Object.assign(data.filter, { payment_type: currentOrderFilterData?.filter?.payment_type });
        Object.assign(data.filter, { order_status: currentOrderFilterData?.filter?.order_status });
      }
    }

    try {
      // debugger
      const res = await getOperationOrderList(data);
      if (res?.status === 200) {
        // setOperationOrderList(res.data?.data);
        dispatch(setDeliveryOrderAllOpeData(res.data));
      }
    } catch (error) {}
  };

  console.log("deliveryOrderAllOpeData", deliveryOrderAllOpeData);

  return (
    <div>
      <div className="grid grid-cols-2 p-3">
        <form className="w-80">
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline />
            </div>
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              disabled
            />
            <div
              className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            </div>
          </div>
        </form>
        <div className="flex justify-end">{/* Your filter buttons here */}</div>
      </div>
      <div>
        {isExpanded && (
          <CurrentOrderFilterForm setCurrentOrderFilterData={setCurrentOrderFilterData} />
        )}
      </div>
      <div className="">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-700 text-white rounded-md">
              <tr>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Order No.
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Order Type
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Customer Name
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Mobile No.
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Payment Type
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Amount
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">Tax</th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Discount
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Grand Total
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Created
                </th>
                <th className="py-3 px-4 text-xs text-start md:text-xs">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveryOrderAllOpeData?.data?.map((order: any) => (
                <tr
                  key={order?.id}
                  className={`${order?.id % 2 === 0 ? "bg-gray-100" : ""} ${
                    order.backgroundColor
                  }`}
                >
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.id}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.order} {order?.table ? (order?.table) : ''}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.customer_fullname ? order?.customer_fullname : '-'}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.customer_phone !== 'None' ? order?.customer_phone : '-'}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.payment}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {/* {order.myAmount} */}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.total_tax}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.total_discount}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {order?.grand_total}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs">
                    {dayjs(new Date(order?.create_time)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </td>
                  <td className="py-3 px-4 text-xs text-start md:text-xs flex items-center gap-2">
                    {/* <Link to="/orderItem/sub/current/view"> */}
                    <LuEye
                      className="cursor-pointer text-black w-4 h-4"
                      onClick={() => handleOpenViewOrderDetails(order)}
                    />
                    {/* </Link> */}
                    <FiPrinter className="cursor-pointer text-black w-4 h-4" />
                    <RxCircleBackslash
                      className="cursor-pointer text-black w-4 h-4"
                      onClick={() => handleOpenDeleteDialog(order?.id)}
                    />
                  </td>
                </tr>
              ))}
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
      </div>
      {isDeleteDialogOpen && <DeleteDailog onClose={handleCloseDeleteDialog} currentOrderId={currentOrderId} />}
      {/* {isViewOrderDetailsOpen && (
        <ViewOrderDetails
          order={selectedOrder}
          onClose={handleCloseViewOrderDetails}
        />
      )} */}
    </div>
  );
};

export default DeliveryList;
