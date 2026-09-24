import React, { useState, useEffect } from "react";
import { CgNotes } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editOrder,
  getGroupWiseAllData,
  getTableWiseOrder,
} from "../../../../../Api/Api";
import {
  setGroupData,
  setTablewiseOrer,
} from "../../../../../redux/Features/BillingDataSlice";
import toast from "react-hot-toast";

function PartPaymentF() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [amounta, setAmounta] = useState("");
  const tablewiseorder = useSelector(
    (state: any) => state.billingData.tablewiseorder
  );
  const existsOrderData: any = useSelector(
    (state: any) => state.billingData.addOrder
  );

  // Fetch the subtotal based on order items details
  const getRecentOrders = () => {
    let amounts: any =
      tablewiseorder?.part_payment_details?.multiple_instance_with_cash_type
        ?.amount;
    setAmount(amounts ? amounts : tablewiseorder.grand_total?.toString() || 0);
    setAmounta(amounts ? amounts : tablewiseorder.grand_total?.toString() || 0);
  };
  useEffect(() => {
    getRecentOrders();
  }, [tablewiseorder]);
  const navigate = useNavigate();
  const backtoorder = async () => {
    await fetchTableWiseOrder(tablewiseorder.id);
    await fetchGroupWiseAllData();
    navigate("/selectTable");
  };
  const fetchGroupWiseAllData = async () => {
    const payload = {
      kitchen_id: tablewiseorder.kitchen,
      order_id: tablewiseorder.id,
      order_type: tablewiseorder.order_type,
    };
    const res = await getGroupWiseAllData(payload);
    if (res?.status === 200) {
      dispatch(setGroupData(res?.data?.data));
    }
  };
  const fetchTableWiseOrder = async (order_id: any) => {
    let data = {
      order: order_id,
    };

    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        dispatch(setTablewiseOrer(res.data?.data));
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}));
    }
  };
  const handleSaveandEbil = async () => {
    try {
      const payload = {
        ...existsOrderData,
        is_desktop: true,
        order_status: "save_and_eBill",
      };
      let responce = await editOrder(tablewiseorder?.id, payload);
      if (responce.status == 200) {
        toast.success("saved successfully!");
        navigate("/billing");
      }
    } catch (error: any) {
      toast.error(error?.response?.data.errors);
    }
  };
  return (
    <>
      {/* Payment Summary */}
      <div className="mt-8 bg-[#FFF4E44D] border border-gray-300 p-4 rounded">
        <div className="flex justify-between mt-2 border-b border-gray-300">
          <div className="flex gap-2">
            <CgNotes />
            <h3 className="text-base">Payment Summary</h3>
          </div>
          <span>₹{amounta}</span>
        </div>
        <div className="flex justify-between mt-3">
          <span>Pay Via Card</span>
          <span>₹{amounta}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 gap-4">
        <div className="space-x-4">
          <button
            className="border border-gray-300 px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Back To Order
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/billing")}
          >
            New Order
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Print
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={() => handleSaveandEbil()}
          >
            E-Bill
          </button>
        </div>
      </div>
    </>
  );
}

export default PartPaymentF;
