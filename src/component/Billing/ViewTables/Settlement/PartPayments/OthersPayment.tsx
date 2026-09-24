import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import Select from "react-select";
import { getPartPaymentType, addPartPayment, getTableWiseOrder } from "../../../../../Api/Api";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setTablewiseOrer } from "../../../../../redux/Features/BillingDataSlice";
const OthersPayment = () => {
  const [partOtherTypeList, setPartOtherTypeList] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState("");  const [amounta, setAmounta] = useState("");
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);
  // Fetch the subtotal based on order items details
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

  const savepayment = async () => {
    const payload = {
      other_payment_type: selectedPaymentType?.value || "",
      other_payment_type_comment: comments,
      payment_card_option:2,
      order:tablewiseorder.id,
      payment_type :2,
      amount:amount
    };
    try {
      const response = await addPartPayment(payload);
      if (response.status === 201) {
        fetchTableWiseOrder(tablewiseorder.id,)
        toast.success("Payment saved successfully!");
      } else {
        toast.error("Failed to save payment.");
      }
    } catch (error) {
      toast.error("An error occurred while saving payment.");
    }
  };
  const selectOptions = partOtherTypeList.map((item: any) => ({
    value: item.id,
    label: item.option,
  }));
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
    <div className=" p-6">
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm mb-2">Other:</label>
            <Select
              className="w-full shadow-sm sm:text-sm"
              options={selectOptions}
              onChange={(option: any) => setSelectedPaymentType(option)}
              // defaultValue={{ value: "credit card", label: "credit card" }}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-2">Comments:</label>
            <input
              type="text"
              placeholder="Enter your comments"
              className="p-2 border rounded w-full"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Captured Amount:</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Enter Amount:</label>
              <input
                type="number"
                placeholder="596"
                className="w-24 p-2 border rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded"
              onClick={savepayment}
            >
              Save
            </button>
          </div>
        </div>
      </div>

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
      </div>

      <div className="flex justify-end mt-6 gap-4">
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

export default OthersPayment;
