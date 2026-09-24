import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getOperationAdvanceOrderDetails } from '../../../../../Api/Operation/Api';

interface AdvanceOrderDataProps {
  advanceOrderDetails: any;
};

const ViewAdvanceOrderList = () => {

  const location = useLocation();
  const { advanceOrderDetails } = (location.state as AdvanceOrderDataProps) || {};
  const [advanceOrderDetail, setAdvanceOrderDetail] = useState<any>({});

  console.log('advanceOrderDetail', advanceOrderDetail);

  useEffect(() => {
    if (advanceOrderDetails?.id) fetchAdvanceOrderDetails(advanceOrderDetails?.id);
  }, [advanceOrderDetails?.id]);

  const fetchAdvanceOrderDetails = async (id: any) => {
    try {
      const res = await getOperationAdvanceOrderDetails(id);
      if (res?.status === 200) {
        setAdvanceOrderDetail(res.data?.data);
      }
    } catch (error) {}
  };


  return (
    <div className=" p-4">
      {/* Order Header */}
      <div className=" p-4 rounded-lg ">
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-sm font-medium border border-gray-300 p-2">
                Order No.
              </th>
              <th className="border border-gray-300 p-2">Billing User</th>
              <th className="border border-gray-300 p-2">
                Customer Name/Phone No.
              </th>
              <th className="border border-gray-300 p-2">Customer Address</th>
              <th className="border border-gray-300 p-2">Customer Locality</th>
              <th className="border border-gray-300 p-2">No. of Persons</th>
              <th className="border border-gray-300 p-2">Order Type</th>
              <th className="border border-gray-300 p-2">Payment Type</th>
              <th className="border border-gray-300 p-2">Total Tax</th>
              <th className="border border-gray-300 p-2">Total Discount</th>
              <th className="border border-gray-300 p-2">Grand Total</th>
              <th className="border border-gray-300 p-2">Settlement Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">
                {advanceOrderDetail?.id}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.biller_name}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.customer_fullname} (
                {advanceOrderDetail?.customer_phone})
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.customere_primary_address}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.customer_primary_locality}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.no_of_person}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.order}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.payment_type_name}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.total_tax}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.total_discount}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.grand_total}
              </td>
              <td className="border border-gray-300">
                {advanceOrderDetail?.settlement_amount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Details */}
      <div className=" p-4 rounded-lg  mt-4">
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2">Order Status</th>
              <th className="border border-gray-300 p-2">Printed</th>
              <th className="border border-gray-300 p-2">Assign To</th>
              <th className="border border-gray-300 p-2">Coupon Code</th>
              <th className="border border-gray-300 p-2">Paid</th>
              <th className="border border-gray-300 p-2">Tip</th>
              <th className="border border-gray-300 p-2">Sub Order Type</th>
              <th className="border border-gray-300 p-2">Payment Type</th>
              {/* <th className="border border-gray-300 p-2">Sequence Name</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.order_status}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.is_printed === true ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.assign_to_name}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.coupon_code_name}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.is_paid === true ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.tip}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.sub_order_type_name}
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.payment_type_name}
              </td>
              {/* <td className="border border-gray-300 p-2">--</td> */}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Order Items */}
      <div className="p-4 rounded-lg  mt-4">
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2">Order Items</th>
              <th className="border border-gray-300 p-2">Special Note</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Unit Price</th>
              <th className="border border-gray-300 p-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {advanceOrderDetail?.items?.map((a: any) => (
              <tr>
                <td className="border border-gray-300 p-2">{a?.item_name}</td>
                <td className="border border-gray-300 p-2">
                  {a?.special_notes}
                </td>
                <td className="border border-gray-300 p-2">{a?.quantity}</td>
                <td className="border border-gray-300 p-2">{a?.unit_price}</td>
                <td className="border border-gray-300 p-2">{a?.total_price}</td>
              </tr>
            ))}
            {/* <tr>
              <td className="border border-gray-300 p-2">Veggies Noodle</td>
              <td className="border border-gray-300 p-2">--</td>
              <td className="border border-gray-300 p-2">1</td>
              <td className="border border-gray-300 p-2">146.2</td>
              <td className="border border-gray-300 p-2">146.2</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">SGST</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2">2.5%</td>
              <td className="border border-gray-300 p-2">7.46</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Round Off</td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2"></td>
              <td className="border border-gray-300 p-2">0.34</td>
            </tr> */}
            <tr>
              <td colSpan={4} className="text-left border border-gray-300 p-2">
                SGST
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.total_tax}
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-left border border-gray-300 p-2">
                Round Off
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.round_off}
              </td>
            </tr>
            <tr>
              <td
                colSpan={4}
                className="text-left font-semibold border border-gray-300 p-2"
              >
                Grand Total (₹)
              </td>
              <td className="border border-gray-300 p-2">
                {advanceOrderDetail?.grand_total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Part Payment Type */}
      {advanceOrderDetail?.part_payment !== null && (
        <div className=" p-4 rounded-lg  mt-4">
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-2">Payment Type</th>
                <th className="border border-gray-300 p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {(advanceOrderDetail?.part_payment?.types)?.map((type: any) => (
                <tr>
                  <td className="border border-gray-300 p-2">{type?.payment_type}</td>
                  <td className="border border-gray-300 p-2">{type?.amount}</td>
                </tr>
              ))}
              {/* <tr>
                <td className="border border-gray-300 p-2">Paid via Cash</td>
                <td className="border border-gray-300 p-2">140</td>
              </tr> */}
              <tr>
                <td className="font-semibold border border-gray-300 p-2">
                  Total (₹)
                </td>
                <td className="border border-gray-300 p-2">
                  {advanceOrderDetail?.part_payment?.total_pay}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewAdvanceOrderList;
