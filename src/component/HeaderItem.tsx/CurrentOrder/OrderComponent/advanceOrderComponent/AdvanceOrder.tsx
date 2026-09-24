import React, { useEffect, useState } from "react";
import { FaEye, FaPrint, FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import HeaderAdvanceOrder from "./HeaderAdvanceOrder";
import { FiPrinter } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { RxCircleBackslash } from "react-icons/rx";
import { IoSaveOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import DeleteDailog from "../currentOrderComponent/Order/DeleteDailog";
import { getOperationAdvanceOrderList } from "../../../../../Api/Operation/Api";
import { setAdvanceOrderAllOpeData } from "../../../../../redux/Features/OperationDataSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Pagination from "../../../../common/Pagination";

const data = [
  
  {
    id: 1,
    deliveryDate: "2024-05-22 20:20:51",
    type: "PICK UP",
    customerName: "Keshav Joshi",
    mobile: "+91 9878567898",
    note: "Less Spicy",
    total: "300.00",
    created: "2024-05-22 20:20:51",
    action: "",
  },
  {
    id: 2,
    deliveryDate: "2024-05-22 20:20:51",
    type: "PICK UP",
    customerName: "",
    mobile: "",
    note: "",
    total: "1500.00",
    created: "2024-05-22 20:20:51",
    action: "",
  },
  {
    id: 3,
    deliveryDate: "2024-05-22 20:20:51",
    type: "Delivery",
    customerName: "Keshav Joshi",
    mobile: "+91 9878567898",
    note: "Less Oily",
    total: "4500.00",
    created: "2024-05-22 15:20:51",
    action: "",
    highlighted: true,
  },
  {
    id: 4,
    deliveryDate: "2024-05-22 20:20:51",
    type: "Delivery",
    customerName: "Keshav Joshi",
    mobile: "+91 9878567898",
    note: "Mild Spicy",
    total: "1500.00",
    created: "2024-05-22 21:20:51",
    action: "",
  },
  {
    id: 5,
    deliveryDate: "2024-05-22 20:20:51",
    type: "Delivery",
    customerName: "",
    mobile: "",
    note: "",
    total: "150.00",
    created: "2024-05-22 21:20:51",
    action: "",
    highlighted: true,
  },
  {
    id: 6,
    deliveryDate: "2024-05-22 20:20:51",
    type: "Delivery",
    customerName: "",
    mobile: "",
    note: "",
    total: "650.00",
    created: "2024-05-22 18:20:51",
    action: "",
  },
  {
    id: 7,
    deliveryDate: "2024-05-22 20:20:51",
    type: "Delivery",
    customerName: "",
    mobile: "",
    note: "",
    total: "650.00",
    created: "2024-05-22 18:20:51",
    action: "",
  },
  {
    id: 8,
    deliveryDate: "2024-05-22 20:20:51",
    type: "Delivery",
    customerName: "Keshav Joshi",
    mobile: "+91 9878567898",
    note: "No Onion Garlic",
    total: "650.00",
    created: "2024-05-22 18:20:51",
    action: "",
  },
];

const AdvanceOrder = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [advanceOrderId, setAdvanceOrderId] = useState(null);
  
  const handleOpenDeleteDialog = (id: any) => {
    setIsDeleteDialogOpen(true);
    setAdvanceOrderId(id);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const { advanceOrderAllOpeData } =
    useSelector((state: any) => state.operationData) ?? {};

  const itemsPerPage = 20;
  const totalItems = advanceOrderAllOpeData?.total_count;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAllCurrentOrders(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (performance?.navigation?.type === 1) {
      const fetchAllCurrentOrders = async () => {
        let data = {
          outlet_id: loginUserData?.outlet,
        };
        const res = await getOperationAdvanceOrderList(data);
        if (res?.status === 200) {
          dispatch(setAdvanceOrderAllOpeData(res.data));
          // dispatch(setKotFilterOpeData(null));
        }
      };
      fetchAllCurrentOrders();
    }
  }, [dispatch]);

  const fetchAllCurrentOrders = async (page: number) => {
    // let orderId = orderTypeList.find(
    //   (o: OrderType) => o?.type === selectedTab
    // )?.id;

    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet_id: loginUserData?.outlet,
      // search: {
      //   // "customer_fullname": "",
      //   // "customer_phone": "",
      //   // "table_no__table_no":""
      // },
      // filter: {
      //   // "id": 2,
      //   // "payment_type": 1
      //   // "order_status": ["completed"],
      //   // "order_type": 13,
      //   // "sub_order_type":1,
      //   // "delivery_status":"foodready"  you can also pass null
      //   // "is_advance_order": true
      // },
      // ordering: "-grand_total",
    };

    try {
      // debugger
      const res = await getOperationAdvanceOrderList(data);
      if (res?.status === 200) {
        // setOperationOrderList(res.data?.data);
        dispatch(setAdvanceOrderAllOpeData(res.data));
      }
    } catch (error) {}
  };

  console.log("advanceOrderAllOpeData", advanceOrderAllOpeData);

  const handleAdvanceOrderDetails = async (advanceOrderDetails: any) => {
    navigate("/orderItem/sub/advanceorder/view", {
      state: {
        advanceOrderDetails: advanceOrderDetails,
      },
    });
  };

  return (
    <>
      <HeaderAdvanceOrder />
      <div className="overflow-x-auto  ">
        <table className="min-w-full bg-white border border-gray-300 rounded-md text-xs">
          <thead className="bg-gray-800 text-white text-left text-xs sm:text-xs md:text-base">
            <tr className="text-xs">
              {/* <th className="py-2 px-4">
                <input type="checkbox" className="form-checkbox h-3 w-3" />
              </th> */}
              <th className="py-2 px-4">Delivery Date</th>
              <th className="py-2 px-4">Customer Name/Mobile No.</th>
              <th className="py-2 px-4">Customer Note</th>
              <th className="py-2 px-4">Grand Total (₹)</th>
              <th className="py-2 px-4">Created</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
          {advanceOrderAllOpeData?.data.map((a: any) => (
              <tr
                key={a?.id}
                className={`${a?.id ? "bg-green-200" : "bg-white"} border-t`}
              >
                {/* <td className="py-2 px-4">
                  <input type="checkbox" className="form-checkbox h-3 w-3" />
                </td> */}
                <td className="py-2 px-4 text-xs sm:text-xs md:text-xs">
                  {dayjs(new Date(a?.create_time)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  <br />({a?.order_type_name})
                </td>
                <td className="py-2 px-4 text-xs sm:text-xs md:text-xs">
                  {a?.customer_fullname ? (
                    <>
                      {a?.customer_fullname} <br />
                      {a?.customer_phone !== 'None' ? a?.customer_phone : ''}
                    </>
                  ) : !a?.customerName && "-"}
                </td>
                <td className="py-2 px-4 text-xs sm:text-xs md:text-xs">
                  {a?.note || "-"}
                </td>
                <td className="py-2 px-4 font-semibold text-xs sm:text-xs md:text-xs">
                  {a?.grand_total}
                </td>
                <td className="py-2 px-4 text-xs sm:text-xs md:text-xs">
                  {dayjs(new Date(a?.create_time)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </td>
                <td className="py-2  text-xs sm:text-xs md:text-xs flex gap-3 px-4">
                  <IoSaveOutline className="text-black h-4 w-4 cursor-pointer" />
                  {/* <Link to="/orderItem/sub/advanceorder/view"> */}
                  <LuEye
                    className="text-black h-4 w-4 cursor-pointer"
                    onClick={() => handleAdvanceOrderDetails(a)}
                  />
                  {/* </Link> */}

                  <FiPrinter className="text-black h-4 w-4 cursor-pointer" />
                  <RxCircleBackslash
                    className="text-black h-4 w-4 cursor-pointer"
                    onClick={() => handleOpenDeleteDialog(a?.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
         {isDeleteDialogOpen && <DeleteDailog onClose={handleCloseDeleteDialog} currentOrderId={advanceOrderId} />}
      </div>
    
    </>
  );
};

export default AdvanceOrder;
