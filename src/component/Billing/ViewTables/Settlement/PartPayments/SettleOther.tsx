import React, { useEffect, useState } from "react";
import { getOtherPaymentType, addPartPayment, getTables, settledPayment } from "../../../../../Api/Api";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCloseDialog, setTableData } from "../../../../../redux/Features/BillingDataSlice";
import { getDuePayment } from "../../../../../Api/Operation/Api";
import { setDuePaymentOpeData, setDuePaymentFilterOpeData } from "../../../../../redux/Features/OperationDataSlice";
import { useNavigate } from "react-router-dom";

interface SettleOtherProps {
  paymentid?: any; // Define the type according to your needs
}

const SettleOther: React.FC<SettleOtherProps> = ({ paymentid }) => {
  const navigate = useNavigate();
  const [partOtherTypeList, setPartOtherTypeList] = useState<{ id: string; type: string }[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [tip, setTip] = useState<string>("0");
  const [settlementAmount, setSettlementAmount] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userdata: any = JSON.parse(localStorage.getItem("user_data") || '{}');
  useEffect(() => {
    fetchPartOtherType();
  }, []);

  // Fetch payment types from API
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

  // Map payment types to options for the Select component
  const selectOptions = partOtherTypeList.map((item) => ({
    value: item.id,
    label: item.type,
  }));

  // Fetch table data after payment is settled
  const fetchTableData = async () => {
    const userdata: any = JSON.parse(localStorage.getItem("user_data") || '{}');
    const userTableData = {
      outlet: userdata.outlet,
      kitchen: userdata.kitchen,
    };

    try {
      const res = await getTables(userTableData);
      if (res?.status === 201) {
        dispatch(setTableData(res?.data?.data)); // Update Redux store with the new table data
      }
    } catch (error) {
      toast.error("Failed to fetch table data.");
    }
  };

  // Handle form submission for payment
  const handleSubmit = async () => {
    // Validate inputs
    const parsedTip = Number(tip);
    const parsedSettlementAmount = Number(settlementAmount);
    
    if (selectedPaymentType === null || parsedTip < 0 || parsedSettlementAmount < 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    
    const data: any = localStorage.getItem("settleddata");
    const parsedata = JSON.parse(data);

    const payload = {
      order:parsedata.order_id,
      payment_type: selectedPaymentType,
      tip: parsedTip,
      settlement_amount: parsedSettlementAmount,
      amount:parsedSettlementAmount,
      payment_id: 1, // Include payment ID if needed
      order_payment_id:  parsedata.order_id,
      id: parsedata.order_id,
    };

    try {
      const response = await settledPayment(payload);
      if (response.status === 200) {
        toast.success("Payment settled successfully!");
        
        // Reset fields after success
        setSelectedPaymentType(null);
        setTip("0");
        setSettlementAmount("0");
        fetchDuePayment()
        
        // Fetch updated table data after payment
        fetchTableData();
        navigate("/refresh");
      } else {
        toast.error("Failed to settle payment.");
      }
    } catch (error:any) {
      toast.error(error.response.data.errors);
    }
  };

  // Handle cancel action
  const handleCancel = (e:any) => {
    e.preventDefault()
    // Reset fields or handle navigation
    setSelectedPaymentType(null);
    setTip("0");
    setSettlementAmount("0");
    const payload={
      status:true
    }
    dispatch(setCloseDialog(payload))
  };
  const fetchDuePayment = async () => {
    let data = {
      outlet_id:userdata.outlet
    };
    const res = await getDuePayment(data);
    if (res?.status === 200) {
      dispatch(setDuePaymentOpeData(res.data));
      dispatch(setDuePaymentFilterOpeData(null));
    }
    localStorage.removeItem("tabValue");
  };
  
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="space-y-4">
        {/* Payment Method Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">
            Payment Method
          </label>
          <Select
            className="w-full md:w-2/3 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            options={selectOptions}
            onChange={(selectedOption) => setSelectedPaymentType(selectedOption?.value || null)}
            isLoading={loading}
            isDisabled={loading} // Disable when loading
          />
        </div>

        {/* Tip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">Tip</label>
          <input
            type="number"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="0"
            min={0}
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
            value={settlementAmount}
            onChange={(e) => setSettlementAmount(e.target.value)}
            placeholder="0"
            min={0}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <div
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 cursor-pointer"
          >
            Settle & Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleOther;
