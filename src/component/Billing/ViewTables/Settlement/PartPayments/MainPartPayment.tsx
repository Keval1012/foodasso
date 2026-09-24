// MainPartPayment.tsx
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../../../../common/TabsCN";  // Import Tabs and Tab
import CardPayment from "./CardPayment";
import DuePayment from "./DuePayment";
import OthersPayment from "./OthersPayment";
import ImageIcon from "../../../../common/ImageIcon";
import card from "../../../../../Styles/assets/img/card.svg";
import coins from "../../../../../Styles/assets/img/coin-Icons.svg";
import duepayment from "../../../../../Styles/assets/img/traced.svg";
import { addPartPayment } from "../../../../../Api/Api";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PartPaymentF from "./PartPaymentF";
interface MainPartPaymentDataProps {
  setPartPaymentDialogOpen?: any;
}

interface PartPaymentDatarops {
  orderId?: string;
  paymentType?: string;
}

const MainPartPayment: React.FC<MainPartPaymentDataProps> = ({
  setPartPaymentDialogOpen,
}) => {
  const location = useLocation();
  const { orderId, paymentType } =
    (location.state as PartPaymentDatarops) || {};

  const [amount, setAmount] = useState("0");
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);

  // Get the recent orders total amount
  const getRecentOrders = () => {
    const subtotals = tablewiseorder?.order_items_details?.map((item: any) => 
      Number(item.quantity) * Number(item.unit_price)
    );
    const totalAmount = subtotals?.length ? subtotals.reduce((a: number, b: number) => a + b, 0) : 0;
    setAmount(tablewiseorder?.grand_total?.toString());
  };

  // Add part payment function
  const addToPartPayment = async () => {
    if (!orderId) {
      alert('Please add the order!!!');
      return;
    }

    const data = {
      order: orderId,
      payment_type: paymentType,
    };

    try {
      const res = await addPartPayment(data);
      if (res?.status === 200) {
        console.log(res?.data?.data);
      }
    } catch (error) {
      console.error('Error adding part payment:', error);
    }
  };

  // Disable "Due Payment" tab if amount is 0
  const isDuePaymentDisabled = tablewiseorder?.part_payment_details?.multiple_instance_with_cash_type?.amount === 0;

  useEffect(() => {
    getRecentOrders();
  }, [tablewiseorder]);

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <h2 className="text-xl font-semibold">Part Payment</h2>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-base">Bill No : <span className="text-orange-500">51</span></h2>
          <span className="text-lg">Payable Amount: (₹{amount})</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeTabClassName="border-b-4 border-orange-500">
        {/* Card Payment Tab */}
        <Tab
          label="Card"
          icon={<ImageIcon src={card} alt="Card Logo" className="cursor-pointer" />}
          disabled={isDuePaymentDisabled}
        >
              {isDuePaymentDisabled?(null):(  <CardPayment />)}
              <PartPaymentF/>
        </Tab>

        {/* Others Payment Tab */}
        <Tab
          label="Others"
          icon={<ImageIcon src={coins} alt="Coins Logo" className="cursor-pointer" />}
          disabled={isDuePaymentDisabled}
        >
              {isDuePaymentDisabled?(null):(       <OthersPayment />)}
              <PartPaymentF/>
        </Tab>

        {/* Due Payment Tab */}
        <Tab
          label="Due Payment"
          icon={<ImageIcon src={duepayment} alt="Due Payment Logo" className="cursor-pointer" />}
          disabled={isDuePaymentDisabled}  // Pass the disabled prop based on the amount
        >
          {isDuePaymentDisabled?(null):(   <DuePayment />)}
          <PartPaymentF/>
        </Tab>
        
      </Tabs>
    </div>
  );
};

export default MainPartPayment;
