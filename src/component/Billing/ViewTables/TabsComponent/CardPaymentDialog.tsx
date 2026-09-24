import React, { useEffect, useState } from "react";
import Select from "react-select";
import { addPartPayment, getPartPaymentType } from "../../../../Api/Api";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface MainPartPaymentDataProps {
 setcardpayment: (open: boolean) => void;
  paymentType?: string;
}

const CardPaymentDialog: React.FC<MainPartPaymentDataProps> = ({
  setcardpayment,
  paymentType,
}) => {
  const [otherPaymentTypeList, setOtherPaymentTypeList] = useState<any[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount,setamount]=useState("")
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);

  const getRecentOrders = () => {
    console.log(tablewiseorder, "tablewiseorder");
    const subtotals = tablewiseorder?.order_items_details?.map((val: any) => {
      return Number(val.quantity) * Number(val.unit_price);
    });
    
    // If there are any subtotals, set the first one as the amount; otherwise, reset it
    const totalAmount = subtotals?.length > 0 ? subtotals.reduce((a:any, b:any) => a + b, 0) : 0;
    setamount(totalAmount?.toString());
  };
  useEffect(() => {
    getRecentOrders()
    fetchOtherPaymentType();
  }, []);

  const fetchOtherPaymentType = async () => {
    setLoading(true);
    const data = { outlet: "1" };
    try {
      const res = await getPartPaymentType(data);
      if (res?.status === 200) {
        setOtherPaymentTypeList(res?.data?.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch payment types");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if(Object.keys(tablewiseorder).length==0){
      setcardpayment(false)
      return
    }
    if (!selectedPaymentType || !comments) {
      toast.error("Please select a payment type and enter comments.");
      return;
    }

    const payload = {
      other_payment_type: selectedPaymentType?.value || "",
      other_payment_type_comment: comments,
      payment_type: "1",
      amount:amount,
      order:tablewiseorder.id
    };

    try {
      const response = await addPartPayment(payload);
      if (response.status === 201) {
        toast.success("Payment saved successfully!");
        setcardpayment(false); // Close dialog on success
      }
    } catch (error) {
      toast.error("An error occurred while saving payment.");
    }
  };
  const selectOptions = otherPaymentTypeList.map((item: any) => ({
    value: item.id,
    label: item.option,
  }));
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Card Payment Type
      </label>
      <div className="border-dashed">
        <Select
          className="w-full shadow-sm sm:text-sm"
          options={selectOptions}
          onChange={(selectedOption) => setSelectedPaymentType(selectedOption)}
          isLoading={loading} // Indicate loading state
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
          onClick={() => setcardpayment(false)}
        >
          No
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-full"
          onClick={handleSave}
          // disabled={!selectedPaymentType || !comments || loading} // Disable if required fields are missing or loading
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default CardPaymentDialog;
