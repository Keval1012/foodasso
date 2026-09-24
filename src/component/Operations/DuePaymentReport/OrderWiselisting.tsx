import React, { useEffect, useState } from "react";
import { getOrderWiseDuePayment } from "../../../Api/Operation/Api";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { setOrderWiseFilterOpeData, setOrderWiseOpeData } from "../../../redux/Features/OperationDataSlice";

interface DuePayment {
  billNo: number;
  customer: string;
  totalBill: number;
  remainingAmount: number;
  billDate: string;
}

interface OrderWiselistingProps {
  OrderWiselistingData: DuePayment[];
}

const OrderWiselisting: React.FC<OrderWiselistingProps> = ({
  OrderWiselistingData,
}) => {

  const dispatch = useDispatch();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const { orderWiseOpeData, orderWiseFilterOpeData } =
    useSelector((state: any) => state.operationData) ?? {};
  const [orderWiseDuePayment, setOrderWiseDuePayment] = useState([]);

  const itemsPerPage = 20;
  const totalItems = orderWiseOpeData?.total_count;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchOrderWiseDuePayment(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (performance?.navigation?.type === 1) {
      const fetchOrderWiseDuePayment = async () => {
        let data = {
          outlet_id: loginUserData?.outlet,
        };
        const res = await getOrderWiseDuePayment(data);
        if (res?.status === 200) {
          dispatch(setOrderWiseOpeData(res.data));
          dispatch(setOrderWiseFilterOpeData(null));
        }
      };
      fetchOrderWiseDuePayment();
    }
    localStorage.setItem("tabValue", 'order wise');
  }, [dispatch]);

  const fetchOrderWiseDuePayment = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet_id: loginUserData?.outlet,
    };

    if (orderWiseOpeData?.length > 0) {
      data = orderWiseOpeData;
    }

    try {
      const res = await getOrderWiseDuePayment(data);
      if (res.status === 200) {
        // setOrderWiseDuePayment(res.data?.data);
        dispatch(setOrderWiseOpeData(res.data));
      }
    } catch (error) {}
  };

  console.log("orderWiseDuePayment", orderWiseDuePayment);

  return (
    <div className="table-container overflow-x-auto max-h-96">
      <table className="min-w-full bg-white text-sm border border-gray-200">
        <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
          <tr>
            <th className="py-3 px-4 text-xs text-center">Bill No.</th>
            <th className="py-3 px-4 text-xs text-center">Customer Details</th>
            <th className="py-3 px-4 text-xs text-center">
              Total Bill Amount (₹)
            </th>
            <th className="py-3 px-4 text-xs text-center">
              Total Remaining Amount (₹)
            </th>
            <th className="py-3 px-4 text-xs text-center">Bill Date</th>
          </tr>
        </thead>
        <tbody>
          {orderWiseOpeData?.data?.length > 0
            ? orderWiseOpeData?.data?.map((order: any) => (
                <tr key={order?.id}>
                  <td className="py-3 px-4 text-xs text-center">
                    {order?.id}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order?.name} {order?.phone !== "None" ? (order?.phone) : ''}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order?.grand_total.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {(
                      Number(order?.grand_total) -
                      Number(order?.settlement_amount)
                    ).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {dayjs(new Date(order?.create_time)).format(
                      "DD-MM-YYYY HH:mm:ss"
                    ) ?? "--"}
                  </td>
                </tr>
              ))
            : "No data found"}
        </tbody>
      </table>
    </div>
  );
};

export default OrderWiselisting;
