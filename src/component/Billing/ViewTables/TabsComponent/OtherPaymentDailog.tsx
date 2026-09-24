import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getOtherPaymentType, addPartPayment } from "../../../../Api/Api";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface MainPartPaymentDataProps {
  setOtherPaymentDialogOpen: (open: boolean) => void;
  paymentType?: string;
}

interface PaymentType {
  id: string;
  option: string;
}

const OtherPaymentDialog: React.FC<MainPartPaymentDataProps> = ({
  setOtherPaymentDialogOpen,
  paymentType,
}) => {
  const [partOtherTypeList, setPartOtherTypeList] = useState<PaymentType[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);

  // Calculate the subtotal from order items
  const calculateSubtotal = () => {
    const subtotals = tablewiseorder?.order_items_details?.map((item: any) => 
      Number(item.quantity) * Number(item.unit_price)
    );
    const totalAmount = subtotals?.reduce((acc: number, curr: number) => acc + curr, 0) || 0;
    setAmount(totalAmount?.toString());
  };

  useEffect(() => {
    calculateSubtotal();
    fetchPartOtherType();
  }, [tablewiseorder]);

  // Fetch payment types
  const fetchPartOtherType = async () => {
    setLoading(true);
    try {
      const res = await getOtherPaymentType({ outlet: "1" });
      if (res?.status === 200) {
        setPartOtherTypeList(res?.data?.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch payment types.");
    } finally {
      setLoading(false);
    }
  };

  // Save payment
  const savePayment = async () => {
    if(Object.keys(tablewiseorder).length==0){
      setOtherPaymentDialogOpen(false)
      return
    }
    if (!selectedPaymentType || !amount) {
      toast.error("Please select a payment type and enter a valid amount.");
      return;
    }

    const payload = {
      other_payment_type: selectedPaymentType?.value,
      other_payment_type_comment: comments,
      payment_card_option: "1",
      order: tablewiseorder.id,
      payment_type: 1,
      amount,
    };

    try {
      const response = await addPartPayment(payload);
      if (response.status === 201) {
        toast.success("Payment saved successfully!");
        setOtherPaymentDialogOpen(false);
      } else {
        toast.error("Failed to save payment.");
      }
    } catch (error) {
      toast.error("An error occurred while saving payment.");
    }
  };

  // Options for Select component
  const selectOptions = partOtherTypeList.map((item:any) => ({
    value: item.id,
    label: item.type,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Other Payment Type
      </label>
      <div className="border-dashed">
        <Select
          className="w-full shadow-sm sm:text-sm"
          options={selectOptions}
          onChange={(selectedOption) => setSelectedPaymentType(selectedOption)}
          isLoading={loading} // Show loading state
        />
      </div>

      <textarea
        className="mt-4 block w-full h-24 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Enter details here"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-100 text-gray-700 py-2 px-4 rounded-full mr-2"
          onClick={() => setOtherPaymentDialogOpen(false)}
        >
          No
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-full"
          onClick={savePayment}
          disabled={!selectedPaymentType || !amount || loading} // Disable if conditions not met
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default OtherPaymentDialog;
