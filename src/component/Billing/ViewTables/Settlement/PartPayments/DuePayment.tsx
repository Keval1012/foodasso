import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgNotes } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getPartPaymentType, addPartPayment, getTableWiseOrder } from "../../../../../Api/Api";
import { setTablewiseOrer } from "../../../../../redux/Features/BillingDataSlice";

const DuePayment = () => {
  const [partOtherTypeList, setPartOtherTypeList] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState("");
  const [amounta, setAmounta] = useState("");

  const [phone, setPhone] = useState(""); // State for customer phone
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);
const dispatch=useDispatch()
const getRecentOrders = () => {
  // If there are any subtotals, set the first one as the amount; otherwise, reset it
let amounts:any=tablewiseorder?.part_payment_details?.multiple_instance_with_cash_type?.amount 
  setAmount(amounts?amounts:tablewiseorder.grand_total?.toString() || 0);
  setAmounta(amounts?amounts:tablewiseorder.grand_total?.toString() || 0)
};
useEffect(()=>{
getRecentOrders()
},[tablewiseorder])

  useEffect(() => {
    fetchPartOtherType();
  }, []);

  const fetchPartOtherType = async () => {
    const data = { outlet: "1" };
    try {
      const res = await getPartPaymentType(data);
      if (res?.status === 200) {
        setPartOtherTypeList(res?.data?.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch payment types.");
    }
  };

  const savePayment = async () => {
    const payload = {
      payment_card_option:4,
      order: tablewiseorder.id,
      payment_type: 4,
      amount: amount,
      customer_phone:`+91${phone}`,
    };
    try {
      const response = await addPartPayment(payload);
      if (response.status === 201) {
        fetchTableWiseOrder(tablewiseorder.id)
        toast.success("Payment saved successfully!");
      } else {
        toast.error("Failed to save payment.");
      }
    } catch (error:any) {
      toast.error(error.response.data.errors);
    }
  };
  const fetchTableWiseOrder = async (order_id: any) => {
    let data = {
      order: order_id,
    };

    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        dispatch(setTablewiseOrer(res.data?.data))
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}))
    }
  };
  return (
    <div className=" flex flex-col">
      {/* Main Content */}
      <main className="border border-gray-300">
        <div className="p-6 rounded shadow bg-gray-50">
          {/* Captured Amount & Enter Amount in one row */}
          <div className="mt-6">
            <p>Captured Amount:</p>
            <div className="flex space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm">Customer phone: *</label>
                <input
                  type="text"
                  className="p-2 border rounded w-[150px]"
                  value={phone} // Controlled input
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm">Enter Amount: *</label>
                <input
                  type="text"
                  className="p-2 border rounded w-[150px]"
                  placeholder="Enter amount"
                  value={amount} // Controlled input
                  onChange={(e) => setAmount(e.target.value)} // Ensure input is controlled
                />
              </div>
              <button
                onClick={savePayment}
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Summary */}
      {/* <div className="mt-8 bg-[#FFF4E44D] border border-gray-300 p-4 rounded">
        <div className="flex justify-between mt-2 border-b border-gray-300">
          <div className="flex gap-2">
            <CgNotes />
            <h3 className="text-base">Payment Summary</h3>
          </div>
          <span>₹{amount}</span> 
        </div>
        <div className="flex justify-between mt-3">
          <span>Pay Via Card</span>
          <span>₹{amounta}</span> 
        </div>
      </div> */}

      {/* Action Buttons */}
      {/* <div className="flex justify-end mt-6 gap-4">
        <div className="space-x-4">
          <button className="border border-gray-300 px-4 py-2 rounded">
            Back To Order
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            New Order
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Print
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            E-Bill
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default DuePayment;
