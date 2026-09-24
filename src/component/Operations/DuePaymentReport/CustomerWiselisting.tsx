import React, { useEffect, useState } from "react";
import { CustomerWiselistingdata } from "./CustomerWiselistingdata";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerWiseDuePayment } from "../../../Api/Operation/Api";
import { setCustomerWiseFilterOpeData, setCustomerWiseOpeData } from "../../../redux/Features/OperationDataSlice";

interface DuePayment {
  billNo: number;
  customer: string;
  totalBill: number;
  remainingAmount: number;
  billDate: string;
}

// interface CustomerWiselistingProps {
//   CustomerWiselistingdata: DuePayment[];
// }

const CustomerWiselisting = () => {

  const dispatch = useDispatch();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const { customerWiseOpeData, customerWiseFilterOpeData } =
    useSelector((state: any) => state.operationData) ?? {};
  const [customerWiseDuePayment, setCustomerWiseDuePayment] = useState([]);

  const itemsPerPage = 20;
  const totalItems = customerWiseOpeData?.total_count;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCustomerWiseDuePayment(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (performance?.navigation?.type === 1) {
      const fetchOrderWiseDuePayment = async () => {
        let data = {
          outlet_id: loginUserData?.outlet,
        };
        const res = await getCustomerWiseDuePayment(data);
        if (res?.status === 200) {
          dispatch(setCustomerWiseOpeData(res.data));
          dispatch(setCustomerWiseFilterOpeData(null));
        }
      };
      fetchOrderWiseDuePayment();
    }
  }, [dispatch]);

  const fetchCustomerWiseDuePayment = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet_id: loginUserData?.outlet,
    };

    if (customerWiseOpeData?.length > 0) {
      data = customerWiseOpeData;
    }

    try {
      const res = await getCustomerWiseDuePayment(data);
      if (res.status === 200) {
        // setCustomerWiseDuePayment(res.data?.data);
        dispatch(setCustomerWiseOpeData(res.data));
      }
    } catch (error) {}
  };

  console.log('customerWiseDuePayment', customerWiseDuePayment);

  return (
    <div className="table-container overflow-x-auto max-h-96">
      <table className="min-w-full bg-white text-sm border border-gray-200">
        <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
          <tr>
            <th className="py-3 px-4 text-xs text-center">
              Customer Information
            </th>

            <th className="py-3 px-4 text-xs text-center">
              Total Remaining Amount (₹)
            </th>
          </tr>
        </thead>
        <tbody>
          {customerWiseOpeData?.data?.length > 0
            ? customerWiseOpeData?.data?.map((customer: any) => (
            <tr key={customer?.id}>
              <td className="py-3 px-4 text-xs text-center">
                {customer?.customer__fullname} {customer?.customer__phone !== "None" ? (customer?.customer__phone) : ''}
              </td>
              <td className="py-3 px-4 text-xs text-center">
                {customer?.total_remaining_amount}
              </td>
            </tr>
          ))
          : "No data found"}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerWiselisting;
