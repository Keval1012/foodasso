import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { getOperationOrderDetails } from "../../../Api/Operation/Api";

interface CurrentOrderDataProps {
  currentOrderDetails: any;
};

const ViewOrdersDetails: React.FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { currentOrderDetails } = (location.state as CurrentOrderDataProps) || {};
  const [currentOrderDetail, setCurrentOrderDetail] = useState<any>({});

  console.log('currentOrderDetail', currentOrderDetail);

  useEffect(() => {
    if (currentOrderDetails?.id) fetchCurrentOrderDetails(currentOrderDetails?.id);
  }, [currentOrderDetails?.id]);

  const fetchCurrentOrderDetails = async (id: any) => {
    try {
      const res = await getOperationOrderDetails(id);
      if (res?.status === 200) {
        setCurrentOrderDetail(res.data?.data);
      }
    } catch (error) {}
  };

  return (
    <div className="p-6">
      {/* Order Details Header */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
        <table className="w-full text-sm border mt-5">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-xs text-center">Order No.</th>
              <th className="border p-2 text-xs text-center">Billing User</th>
              <th className="border p-2 text-xs text-center">Customer Name/Phone No.</th>
              <th className="border p-2 text-xs text-center">Customer Address</th>
              <th className="border p-2 text-xs text-center">Customer Locality</th>
              <th className="border p-2 text-xs text-center">No. Of Persons</th>
              <th className="border p-2 text-xs text-center">Order Type</th>
              <th className="border p-2 text-xs text-center">Payment Type</th>
              <th className="border p-2 text-xs text-center">Total Tax</th>
              <th className="border p-2 text-xs text-center">Total Discount</th>
              <th className="border p-2 text-xs text-center">Grand Total</th>
              <th className="border p-2 text-xs text-center">Settlement Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.id}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.biller_name}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.customer_fullname} ({currentOrderDetail?.customer_phone})</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.customere_primary_address}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.customer_primary_locality}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.no_of_person}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.order}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.payment_type_name}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.total_tax}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.total_discount}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.grand_total}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.settlement_amount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Status Table */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <table className="w-full text-sm border">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-xs text-center">Order Status</th>
              <th className="border p-2 text-xs text-center">Printed</th>
              <th className="border p-2 text-xs text-center">Assign To</th>
              <th className="border p-2 text-xs text-center">Coupon Code</th>
              <th className="border p-2 text-xs text-center">Paid</th>
              <th className="border p-2 text-xs text-center">Tip</th>
              <th className="border p-2 text-xs text-center">Sub Order Type</th>
              <th className="border p-2 text-xs text-center">Payment Type</th>
              {/* <th className="border p-2 text-xs text-center">Sequence Name</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.order_status}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.is_printed === true ? 'Yes' : 'No'}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.assign_to_name}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.coupon_code_name}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.is_paid === true ? 'Yes' : 'No'}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.tip}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.sub_order_type_name}</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.payment_type_name}</td>
              {/* <td className="border p-2 text-xs text-center">counter : billing station by : biller (biller)</td> */}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Items */}
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <table className="w-full text-sm border">
          <thead className="bg-[#f2f2f2] border">
            <tr>
              <th className="border p-2 text-xs text-center">Order Items</th>
              <th className="border p-2 text-xs text-center">Special Note</th>
              <th className="border p-2 text-xs text-center">Quantity</th>
              <th className="border p-2 text-xs text-center">Unit Price</th>
              <th className="border p-2 text-xs text-center">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {(currentOrderDetail?.items)?.map((c: any) => (
              <tr>
                <td className="border p-2 text-xs text-center">{c?.item_name}</td>
                <td className="border p-2 text-xs text-center">{c?.special_notes}</td>
                <td className="border p-2 text-xs text-center">{c?.quantity}</td>
                <td className="border p-2 text-xs text-center">{c?.unit_price}</td>
                <td className="border p-2 text-xs text-center">{c?.total_price}</td>
              </tr>
            ))}
            {/* <tr>
              <td className="border p-2 text-xs text-center">Tax</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">0.00</td>
              <td className="border p-2 text-xs text-center">0.00</td>
            </tr>
            <tr>
              <td className="border p-2 text-xs text-center">Round Off</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">--</td>
              <td className="border p-2 text-xs text-center">0</td>
              <td className="border p-2 text-xs text-center">0</td>
            </tr> */}
            <tr>
              <td colSpan={4} className="p-2 border">Tax</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.total_tax}</td>
            </tr>
            <tr>
              <td colSpan={4} className="p-2 border">Round Off</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.round_off}</td>
            </tr>
            <tr>
              <td colSpan={4} className="p-2 font-semibold border">Grand Total (₹)</td>
              <td className="border p-2 text-xs text-center">{currentOrderDetail?.grand_total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrdersDetails;
