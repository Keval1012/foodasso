import React, { useEffect, useState } from "react";
import { getCustomerHistory } from "../../../../../Api/Api";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// Define interfaces for customer and orders
interface Customer {
  maxOrdered: string;
  averageBill: number;
  comingSince: string;
  visits: number;
}

interface Order {
  orderNo: string;
  orderDate: string;
  orderType: string;
  paymentType: string;
  itemsOrdered: string;
  restaurantName: string;
  amount: string;
}

interface CustomerHistoryProps {
  customer: Customer;
  orders: Order[];
  customerData: any;
  defaultTable: any;
}

const CustomerHistoryData: React.FC<CustomerHistoryProps> = ({
  customer,
  orders,
  customerData,
  defaultTable,
}) => {
  const { orderType } = useSelector((state: any) => state.billingData) ?? {};
  const [customerHistoryList, setCustomerHistoryList] = useState<any>({});

  useEffect(() => {
    if (customerData || defaultTable) fetchCustomerHistory();
  }, [customerData, defaultTable]);

  const fetchCustomerHistory = async () => {
    let data;
    if (customerData) {
      data = { customer_id: customerData?.id };
    } else {
      data = { customer_id: defaultTable?.customer_details?.id };
    }

    try {
      const res = await getCustomerHistory(data);
      if (res.status === 200) {
        setCustomerHistoryList(res?.data);
      }
    } catch (error) {}
  };

  console.log("customerHistoryList", customerHistoryList);

  return (
    <div className="">
      <div className=" ">
        {/* Header */}

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 p-5">
          {/* <div className="col-span-1">
            <h3 className="text-md font-medium">Max Ordered:</h3>
            <p>{customer.maxOrdered}</p>
          </div> */}
          <div className="col-span-1">
            <h3 className="text-md font-medium">Average Bill:</h3>
            <p>{customerHistoryList?.avg_bill?.toFixed(2)} (₹)</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-md font-medium">Coming Since:</h3>
            <p>
              {dayjs(new Date(customerHistoryList?.coming_since)).format(
                "DD-MM-YYYY"
              )}
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-md font-medium">Visits:</h3>
            <p>{customerHistoryList?.total_visite}</p>
          </div>
        </div>

        {/* Orders Table */}
        {/* <div className="">
          <table className="mt-4  overflow-y-auto border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Order No</th>
                <th className="px-4 py-2 text-left">Order Date</th>
                <th className="px-4 py-2 text-left">Order Type</th>
                <th className="px-4 py-2 text-left">Payment Type</th>
                <th className="px-4 py-2 text-left">Items Ordered</th>
                <th className="px-4 py-2 text-left">Restaurant Name</th>
                <th className="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {customerHistoryList?.data?.map((customer: any) => (
                <tr key={customer?.id} className="border-b">
                  <td className="px-4 py-2">{customer?.id}</td>
                  <td className="px-4 py-2">
                    {dayjs(new Date(customer?.create_time)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {
                      orderType?.find(
                        (t: any) => t?.id === customer?.order_type
                      )?.type
                    }{" "}
                    ({customer?.biller_name})
                  </td>
                  <td className="px-4 py-2">{customer?.payment}</td>
                  <td className="px-4 py-2">{customer?.items[0]?.item_name}</td>
                  <td className="px-4 py-2">{customer?.outlet_name}</td>
                  <td className="px-4 py-2">
                    {customer?.items[0]?.total_price?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div className="mt-4 border border-gray-200">
          <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2 text-left">Order No</th>
                  <th className="px-4 py-2 text-left">Order Date</th>
                  <th className="px-4 py-2 text-left">Order Type</th>
                  <th className="px-4 py-2 text-left">Payment Type</th>
                  <th className="px-4 py-2 text-left">Items Ordered</th>
                  <th className="px-4 py-2 text-left">Restaurant Name</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {customerHistoryList?.data?.map((customer: any) => (
                  <tr key={customer?.id} className="border-b">
                    <td className="px-4 py-2">{customer?.id}</td>
                    <td className="px-4 py-2">
                      {dayjs(new Date(customer?.create_time)).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {
                        orderType?.find(
                          (t: any) => t?.id === customer?.order_type
                        )?.type
                      }{" "}
                      ({customer?.biller_name})
                    </td>
                    <td className="px-4 py-2">{customer?.payment}</td>
                    <td className="px-4 py-2">
                      {customer?.items[0]?.item_name}
                    </td>
                    <td className="px-4 py-2">{customer?.outlet_name}</td>
                    <td className="px-4 py-2">
                      {customer?.items[0]?.total_price?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryData;
