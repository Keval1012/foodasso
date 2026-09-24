import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { addPartPayment, getPartPaymentType, getTableWiseOrder } from "../../../../../Api/Api";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Select from "react-select";
import { setTablewiseOrer } from "../../../../../redux/Features/BillingDataSlice";

const CardPayment: React.FC = () => {
  const [partOtherTypeList, setPartOtherTypeList] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState("");
  const [amounta, setAmounta] = useState("");
const dispatch=useDispatch()
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);
  // Fetch the subtotal based on order items details
  const getRecentOrders = () => {
   let amounts:any=tablewiseorder?.part_payment_details?.multiple_instance_with_cash_type?.amount 
    setAmount(amounts?amounts:tablewiseorder.grand_total?.toString() || 0);
    setAmounta(amounts?amounts:tablewiseorder.grand_total?.toString() || 0)
  };

  // Fetch recent orders whenever tablewiseorder updates
  useEffect(() => {
    getRecentOrders();
    fetchPartOtherType()
  }, [tablewiseorder]);

  // Fetch payment types from the API
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

  // Save payment to the API
  const savePayment = async () => {
    const payload = {
      other_payment_type: selectedPaymentType?.value || "",
      other_payment_type_comment: comments,
      payment_card_option:3,
      order: tablewiseorder.id,
      payment_type: 3,
      amount: amount,
    };
    try {
      const response = await addPartPayment(payload);
      if (response.status === 201) {
        await fetchTableWiseOrder(tablewiseorder.id)
        toast.success("Payment saved successfully!");
      } else {
        toast.error("Failed to save payment.");
      }
    } catch (error) {
      console.log(error,"errorerror")
      toast.error("An error occurred while saving payment.");
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
  // Map payment types to select options
  const selectOptions = partOtherTypeList.map((item: any) => ({
    value: item.id,
    label: item.option,
  }));

  return (
    <div className=" ">
      <main className="border">
        <div className="  p-6 rounded shadow bg-gray-50">
          {/* Captured Amount Input */}
          <p>Captured Amount:</p>
          <div className="mt-6  ">
            <div className=" grid grid-cols-[310px_289px_151px] gap-4 space-x-4 mt-4">
            <div className="flex flex-col">
            <label className="text-sm mb-2">Other:</label>
            <Select
              className="w-full shadow-sm sm:text-sm"
              options={selectOptions}
              onChange={(option: any) => setSelectedPaymentType(option)}
              // defaultValue={{ value: "credit card", label: "credit card" }}
            />
          </div>
              <div className="flex flex-col mt-auto">
              <label className="text-sm">Enter Amount:</label>
              <input
                type="number"
                value={amount}
                className="p-2 border rounded w-full"
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
              />
              </div>
              <div className="mt-auto">
              <button  
                onClick={savePayment}
                className="bg-green-500 w-full text-white px-6 py-2 rounded"
              >
                Save
              </button>
              </div>
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
          <span>₹{amounta}</span>
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

export default CardPayment;
