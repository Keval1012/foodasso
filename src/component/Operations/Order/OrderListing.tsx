import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { FiPrinter } from "react-icons/fi";
import { MdOutlineNotInterested } from "react-icons/md";
import DeleteDailog from "./DeleteDailog";
import ViewOrderDetails from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/ViewOrderDetails";

interface Order {
  orderNo: string;
  orderType: string;
  customerName: string;
  paymentType: string;
  myAmount: string;
  tax: string;
  discount: string;
  grandTotal: string;
  created: string;
  backgroundColor: string;
}

const OrderListing: React.FC<{ OrderListingData: Order[] }> = ({
  OrderListingData,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewOrderDetailsOpen, setIsViewOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOrderDetailsOpen(true);
  };

  const handleCloseOrderDetails = () => {
    setIsViewOrderDetailsOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 p-3">
        <form className="w-80">
          {/* <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline />
            </div>
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div> */}
        </form>
        <div className="flex justify-end">
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded ml-1">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base rounded-md">
              Saved bill
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-[rgba(111,186,91,1)] rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base rounded-md">
              Printed bill
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-teal-300 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base rounded-md">
              Cancelled bill
            </p>
          </div>
          <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1">
            <div className="h-5 w-5 bg-red-300 rounded-full"></div>
            <p className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base rounded-md">
              Paid
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-700 text-white rounded-md">
              <tr>
                <th className="py-3 px-4 text-xs text-center">Order No.</th>
                <th className="py-3 px-4 text-xs text-center">Order Type</th>
                <th className="py-3 px-4 text-xs text-center">
                  Customer Name & Mobile No.
                </th>
                <th className="py-3 px-4 text-xs text-center">Payment Type</th>
                <th className="py-3 px-4 text-xs text-center">My Amount (₹)</th>
                <th className="py-3 px-4 text-xs text-center">Tax</th>
                <th className="py-3 px-4 text-xs text-center">Discount (₹)</th>
                <th className="py-3 px-4 text-xs text-center">
                  Grand Total (₹)
                </th>
                <th className="py-3 px-4 text-xs text-center">Created</th>
                <th className="py-3 px-4 text-xs text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {OrderListingData.map((order, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : ""} ${
                    order.backgroundColor
                  }`}
                >
                  <td className="py-3 px-4 text-xs text-center ">
                    {order.orderNo}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order.orderType}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order.customerName || "---"}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order.paymentType}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order.myAmount}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">{order.tax}</td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order.discount}
                  </td>
                  <td className="py-3 px-4 text-xs text-center font-bold">
                    {order.grandTotal}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {order.created}
                  </td>
                  <td className="py-3 px-4 text-xs text-center flex items-center gap-2">
                    <LuEye
                      className="cursor-pointer text-blue-500 w-4 h-4"
                      onClick={() => handleViewOrderDetails(order)}
                    />
                    <FiPrinter className="cursor-pointer text-gray-500 w-4 h-4" />
                    <MdOutlineNotInterested
                      className="cursor-pointer text-red-500 w-4 h-4"
                      onClick={handleOpenDeleteDialog}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center py-2">
          <span>Showing 1 to 15 of 92 Records</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-orange-500 text-white rounded-md">
              1
            </button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">2</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">3</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">4</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">5</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">6</button>
            <button className="px-3 py-1 bg-gray-100 rounded-md">7</button>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && <DeleteDailog onClose={handleCloseDeleteDialog} />}
      {isViewOrderDetailsOpen && (
        <ViewOrderDetails
          order={selectedOrder}
          onClose={handleCloseOrderDetails}
        />
      )}
    </div>
  );
};

export default OrderListing;
