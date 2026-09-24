import React, { useEffect, useState } from "react";
import MainPartPayment from "./PartPayments/MainPartPayment";
import SettleCard from "./PartPayments/SettleCard";
import SettleCash from "./PartPayments/SettleCash";
import SettleDue from "./PartPayments/SettleDue";
import SettleOther from "./PartPayments/SettleOther";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

interface PaymentType {
  type: string;
  id: string;
}

interface SettleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettleDialog: React.FC<SettleDialogProps> = ({ isOpen, onClose }) => {
  const paymenttype = useSelector((state: any) => state.billingData.paymenttype);
  const closeDialogs=useSelector((state: any) => state.billingData.closeDialog);
  const [id, setId] = useState<any>(1);
  const [total, setTotal] = useState<number>(0); // Set to 0 initially for better handling
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card");
  const navigate = useNavigate();
  const [amount, setAmount] = useState<any>(0);
  const [settled,setsettled]=useState(0)
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);
  // Fetch the subtotal based on order items details
  const getRecentOrders = () => {
    const subtotals = tablewiseorder?.order_items_details?.map((val: any) => {
      return Number(val.quantity) * Number(val.unit_price);
    });

    // If there are any subtotals, set the first one as the amount; otherwise, reset it
    const totalAmount = subtotals?.length > 0 ? subtotals.reduce((a:any, b:any) => a + b, 0) : 0;
    setAmount(tablewiseorder?.grand_total?.toFixed(2));
  };
  useEffect(()=>{
    onClose()
  },[closeDialogs])
  useEffect(()=>{
    getRecentOrders();
  if(tablewiseorder?.part_payment_details!=null){
    setsettled(amount-tablewiseorder?.part_payment_details?.
    multiple_instance_with_cash_type?.amount)
    setSelectedPaymentMethod('cash');
 }

  },[tablewiseorder])

  // Don't render if the dialog is not open
  if (!isOpen) return null;

  // Function to handle radio button change
  const handlePaymentMethodChange = (value: string, paymentId: string) => {
    setSelectedPaymentMethod(value);
    setId(paymentId);
    if (value === "Part") {
      navigate("/mainPartPayment");
    }
  };

  // Function to render the selected payment component
  const   renderPaymentComponent = () => {
    switch (selectedPaymentMethod) {
      case "cash":
        return <SettleCash paymentid={id}  />;
      case "card":
        return <SettleCard paymentid={id} />;
      case "Due":
        return <SettleDue paymentid={id} />;
      case "Other":
        return <SettleOther paymentid={id} />;
      default:
        return null;
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-400">
          <h2 className="text-xl font-semibold">
          Settle & Save For - {JSON.parse(localStorage.getItem("settleddata") || '{}').table_no} (₹{amount})
          </h2>
          <button onClick={onClose} className="text-gray-600">
            &times;
          </button>
        </div>

        <form className="space-y-4">
          {/* Payment Type */}
          <div className="space-y-4">
            <label className="font-semibold text-base">Payment Type:</label>
            <div className="flex space-x-4">
              {paymenttype.map((val: PaymentType, i: number) => (
                <label key={i} className="flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value={val.type}
                    className="mr-2"
                    disabled={JSON.parse(localStorage.getItem("settleddata") ||'{}').part_payment_details!=null}
                    checked={selectedPaymentMethod === val.type}
                    onChange={() => handlePaymentMethodChange(val.type, val.id)}
                    aria-label={`Payment method: ${val.type}`}
                  />
                  {val.type}
                </label>
              ))}
            </div>
          </div>

          {/* Render the selected payment method's form */}
          {renderPaymentComponent()}

          {/* Additional content (e.g., Tip, Settlement Amount, Buttons) */}
          {/* ... */}
        </form>
      </div>
    </div>
  );
};

export default SettleDialog;
