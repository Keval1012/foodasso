import React, { useEffect, useState } from "react";
import { settledPayment, getPartPaymentType, getTables } from "../../../../../Api/Api";
import Select from "react-select";
import { toast } from "react-hot-toast"; // Importing toast for notifications
import { setCloseDialog, setTableData } from "../../../../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";
import { getDuePayment } from "../../../../../Api/Operation/Api";
import { setDuePaymentOpeData, setDuePaymentFilterOpeData } from "../../../../../redux/Features/OperationDataSlice";
import { useNavigate } from "react-router-dom";

interface SettleCardProps {
  paymentid: string | null; // Adjust based on your application logic
}

const SettleCard: React.FC<SettleCardProps> = ({ paymentid }) => {

  const navigate = useNavigate();
  const userdata: any = JSON.parse(localStorage.getItem("user_data") || '{}');
  const { outlet, kitchen } = userdata
  const [cardOptions, setCardOptions] = useState<
    { id: string; option: string }[]
  >([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(
    null
  );
  const [customerPaid, setCustomerPaid] = useState<string>("");
  const [tip, setTip] = useState<string>("");
  const [settlementAmount, setSettlementAmount] = useState<string>("");
const dispatch=useDispatch()
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const payload = { outlet:outlet };
      const res = await getPartPaymentType(payload);
      setCardOptions(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching payment types:", err);
      toast.error("Failed to fetch payment types."); // Notify the user of the error
    }
  };

  const selectOptions = cardOptions.map((item) => ({
    value: item.id,
    label: item.option,
  }));
  const fetchTableData = async () => {
    const userTableData = {
      outlet: outlet, kitchen: kitchen
    };
    const res = await getTables(userTableData);
    if (res?.status === 201) {
      dispatch(setTableData(res?.data?.data));
    }
  };
  const handleSubmitData = async () => {
    const data: any = localStorage.getItem("settleddata");
    const parsedata = JSON.parse(data);
    // Validate inputs before submission
    const parsedCustomerPaid = Number(customerPaid);
    const parsedTip = Number(tip);
    const parsedSettlementAmount = Number(settlementAmount);

    if (
      !selectedPaymentType ||
      parsedCustomerPaid < 0 ||
      parsedTip < 0 ||
      parsedSettlementAmount < 0
    ) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    try {
      const payload = {
        outlet:outlet, // Assuming outlet is static for now, adjust as needed
        grand_total: (parsedCustomerPaid + parsedTip).toFixed(2), // Adjust as per your logic
        payment_type: selectedPaymentType, // Use the selected payment type
        settlement_amount: parsedSettlementAmount.toFixed(2), // Use the input value
        comments: "Your comments here", // Replace with actual comments if needed
        order_payment_id: 1, // Use the passed payment ID
        id:parsedata.order_id ||  parsedata.id
      };

      const response = await settledPayment(payload);

      if (response.status === 200) {
        toast.success("Payment settled successfully!");
        fetchTableData()
        fetchDuePayment()
        // Optionally reset form fields
        setSelectedPaymentType(null);
        setCustomerPaid("");
        setTip("");
        setSettlementAmount("");
        navigate("/refresh");
      } else {
        toast.error("Failed to settle payment.");
      }
    } catch (error) {
      toast.error("An error occurred while settling payment.");
    }
  };
  const fetchDuePayment = async () => {
    let data = {
      outlet_id:outlet
    };
    const res = await getDuePayment(data);
    if (res?.status === 200) {
      dispatch(setDuePaymentOpeData(res.data));
      dispatch(setDuePaymentFilterOpeData(null));
    }
    localStorage.removeItem("tabValue");
  };
  const handleCancel = (e:any) => {
    e.preventDefault()
    // Reset the form fields
    setSelectedPaymentType(null);
    setCustomerPaid("");
    setTip("");
    setSettlementAmount("");
    const payload={
      status:true
    }
    dispatch(setCloseDialog(payload))
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {" "}
      {/* Ensure this div tag is correctly set up */}
      <div className="space-y-4">
        {/* Payment Type Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">
            Payment Type
          </label>
          <Select
            className="w-full md:w-2/3 rounded-md p-2 focus:ring-green-500 focus:ring-2"
            options={selectOptions}
            onChange={(selectedOption) =>
              setSelectedPaymentType(selectedOption?.value || null)
            }
          />
        </div>

        {/* Customer Paid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">
            Customer Paid
          </label>
          <input
            type="number"
            placeholder="0"
            min={0}
            value={customerPaid}
            onChange={(e) => setCustomerPaid(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">Tip</label>
          <input
            type="number"
            placeholder="0"
            min={0}
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Settlement Amount */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">
            Settlement Amount
          </label>
          <input
            type="number"
            placeholder="0"
            min={0}
            value={settlementAmount}
            onChange={(e) => setSettlementAmount(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleCancel} // Implement cancel logic
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <div
            // Keep this as submit type for the div
            className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 cursor-pointer"
            onClick={handleSubmitData}
          >
            Settle & Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleCard;

