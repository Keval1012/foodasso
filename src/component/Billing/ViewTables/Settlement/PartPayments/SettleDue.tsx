import React, { useState } from "react";
import { toast } from "react-hot-toast"; // Import toast for notifications
import { settledPayment, getTables } from "../../../../../Api/Api"; // Adjust the import based on your API path
import { useDispatch } from "react-redux";
import { setCloseDialog, setTableData } from "../../../../../redux/Features/BillingDataSlice";
import { getDuePayment } from "../../../../../Api/Operation/Api";
import { setDuePaymentOpeData, setDuePaymentFilterOpeData } from "../../../../../redux/Features/OperationDataSlice";
import { useNavigate } from "react-router-dom";

interface SettleDueProps {
  paymentid?: any; // Define the type as per your requirements
}

const SettleDue: React.FC<SettleDueProps> = ({ paymentid }) => {
  const navigate = useNavigate();
  const userdata: any = JSON.parse(localStorage.getItem("user_data") || '{}');
  const [customerName, setCustomerName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [tip, setTip] = useState<string>("");
  const dispatch = useDispatch();

  // Function to fetch table data
  const fetchTableData = async () => {

    const userTableData = {
      outlet: userdata.outlet,
      kitchen: userdata.kitchen,
    };

    try {
      const res = await getTables(userTableData);
      if (res?.status === 201) {
        dispatch(setTableData(res?.data?.data)); // Dispatch to Redux store
      }
    } catch (error) {
      toast.error("Failed to fetch table data.");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate inputs
    if (!customerName || !phoneNo) {
      toast.error("Please fill in all fields."); // Use toast for user feedback
      return;
    }

    const data: any = localStorage.getItem("settleddata");
    const parsedata = JSON.parse(data);

    const payload = {
      customer_details: {
        phone: phoneNo,
        fullname: customerName,
      },
      tip: tip || "0", // Use tip or default to 0
      payment_id: 1,
      outlet:userdata.outlet,
      grand_total: parsedata.total_amount,
      order_payment_id: parsedata.order_id || parsedata.id  ,
      id:parsedata.order_id || parsedata.id,
      payment_type:1
    };

    try {
      const response = await settledPayment(payload);
      if (response.status === 200) {
        toast.success("Payment settled successfully!");
        // Reset form fields
        setCustomerName("");
        setPhoneNo("");
        setTip("");
        fetchDuePayment()
        // Fetch and update table data after payment is settled
        fetchTableData();
        navigate("/refresh");
      } else {
        toast.error("Failed to settle payment.");
      }
    } catch (error) {
      toast.error("An error occurred while settling payment.");
      console.error("Settlement error:", error);
    }
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
  const onClose=(e:any)=>{
    e.preventDefault()
    const payload={
      status:true
    }
    dispatch(setCloseDialog(payload))
    }
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="space-y-4">
        {/* Customer Name */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">Customer Name</label>
          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone No. */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">Phone No.</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Tip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <label className="mb-2 md:mb-0 md:w-1/3 text-gray-700">Tip</label>
          <input
            type="number"
            placeholder="0"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
            // Uncomment and implement your cancel logic
            onClick={onClose}
          >
            Cancel
          </button>
          <div
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            Settle & Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleDue;
