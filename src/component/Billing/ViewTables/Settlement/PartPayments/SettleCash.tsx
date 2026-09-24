import React, { useState, useEffect } from "react";
import { getLiveOrders, getTables, settledPayment } from "../../../../../Api/Api";
import { toast } from "react-hot-toast"; // Import toast for notifications
import { setLiveOrder, setTableData } from "../../../../../redux/Features/BillingDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDuePaymentFilterOpeData, setDuePaymentOpeData } from "../../../../../redux/Features/OperationDataSlice";
import { getDuePayment } from "../../../../../Api/Operation/Api";
import { setCloseDialog } from "../../../../../redux/Features/BillingDataSlice";
import { useNavigate } from "react-router-dom";
interface SettleCashProps {
  paymentid?: string | null; // Adjust the type as necessary based on your usage
}

const SettleCash: React.FC<SettleCashProps> = ({ paymentid }) => {
  const navigate = useNavigate();
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);
  const [customerPaid, setCustomerPaid] = useState<string>("0");
  const [tip, setTip] = useState<string>("0");
  const [returnToCustomer, setReturnToCustomer] = useState<number>(0);
  const dispatch = useDispatch();
  const userdata: any = JSON.parse(localStorage.getItem("user_data") || '{}');
  const { outlet, kitchen } = userdata; // Destructure outlet and kitchen from userdata
  const partPaymentDetails: any = tablewiseorder?.part_payment_details;
  const multipleInstance = partPaymentDetails?.multiple_instance_with_cash_type;
  
  // Ensure that `partPaymentDetails` exists and has a `multiple_instance_with_cash_type` array with at least one element
  const cardname = (multipleInstance?.length > 0 && multipleInstance[0]) || null;
  useEffect(() => {
    // Update return to customer whenever customerPaid or tip changes
    const total: number = (() => {
      const settledData = localStorage.getItem("settleddata");
    
      // Check if settledData is available
      if (settledData) {
        const parsedData = JSON.parse(settledData);
    
        // Return grand_total if it exists, else return total_amount if it exists, or default to 0
        return parsedData.grand_total || parsedData.total_amount || 0;
      }
    
      // If no settledData is found, return 0
      return 0;
    })();
    

    const paid = Number(customerPaid) || 0;
    const calculatedReturn = paid - total - (Number(tip) || 0);
    setReturnToCustomer(calculatedReturn >= 0 ? calculatedReturn : 0); // Ensure it doesn't go negative
  }, [customerPaid]);
  const fetchLiveAllOrder = async () => {
    let data = {
      outlet:outlet,
    };

    try {
      const res = await getLiveOrders(data);
      if (res?.status === 200) {
        dispatch(setLiveOrder(res.data?.data))
      }
    } catch (error) {}
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log(multipleInstance,"cardnamecardnamecardname")
    const data: any = localStorage.getItem("settleddata");
    const parsedata = JSON.parse(data);
    const payload = {
      outlet: outlet, // Use the passed outlet value
      kitchen: kitchen, // Use the passed kitchen value
      grand_total: parsedata.total_amount,
      tip: tip || "0", // Use tip or default to 0
      settlement_amount: (Number(customerPaid) + Number(tip)).toFixed(2), // Total settled amount
      payment_type: 1,
      order_payment_id:parsedata.order_id || parsedata.id,
      id:parsedata.order_id ||  parsedata.id ,
      Order:parsedata.order_id 
    };

    try {
 
      const response = await settledPayment(payload);
      if (response.status === 200) {
        toast.success("Payment settled successfully!");
        // Optionally reset form fields
        fetchLiveAllOrder()
        fetchTableData();
        fetchDuePayment()
        setCustomerPaid("0");
        setTip("0");
        navigate("/refresh");
      } else {
        toast.error("Failed to settle payment.");
      }
    } catch (error) {
      toast.error("An error occurred while settling payment.");
    }

    console.log("Settling cash payment...", payload);
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
  const fetchTableData = async () => {
    const userTableData = {
      outlet: outlet,
      kitchen: kitchen
    };
    try {
      const res = await getTables(userTableData);
      if (res?.status === 201) {
        dispatch(setTableData(res?.data?.data));
      } else {
        toast.error("Failed to fetch table data.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching table data.");
    }
  };

  // Ensure the part payment details are available

  
const onClose=(e:any)=>{
e.preventDefault()
const payload={status:true}
dispatch(setCloseDialog(payload))
}

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="space-y-4">
        {/* Customer Paid */}
        {multipleInstance?.amount !== 0 ? (
          <div className="flex items-center gap-[6.5rem]">
            <label className="text-base mb-1">Customer Paid</label>
            <input
              type="number"
              placeholder="0"
              min={0}
              value={customerPaid}
              onChange={(e) => setCustomerPaid(e.target.value)}
              className="w-[304px] border border-gray-300 rounded p-2"
            />
          </div>
        ) : null}

        {/* Return to Customer */}
        {customerPaid && (
          <div className="flex items-center gap-16">
            <label className="text-base mb-1">Return To Customer</label>
            <p className="text-orange-400">{returnToCustomer.toFixed(2)}</p>
          </div>
        )}

        {/* Tip */}
        <div className="flex items-center gap-48">
          <label className="text-base mb-1">Tip</label>
          <input
            type="number"
            placeholder="0"
            min={0}
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="w-[304px] border border-gray-300 rounded p-2"
          />
        </div>

        {/* Settlement and Part Payment Details */}
        <div className="flex gap-2 ">
            <h1>Settlement Amount</h1>
            <p>{tablewiseorder?.grand_total}</p>
          </div>
        {multipleInstance?.amount>0 || multipleInstance?.amount  ?(<div>
          

          {/* Part Payment Details */}
          <div className="text-md      bg-gray-200 p-3">Part Payment Details</div>
          <div className="flex gap-2 justify-between">
            <div>
              <h1>
                Paid via  {cardname?.payment_type_name} Of ₹{" "}
                {cardname?.amount}
              </h1>
            </div>
            <div>
              <h1>
                Paid via Cash Of ₹ {Number(multipleInstance?.amount)}
              </h1>
            </div>
          </div>
        </div>):(null)}
        

        {/* Buttons */}
        <div className="flex justify-end gap-5 mt-6">
          <button
            // Uncomment this line if you want to handle cancellation
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600"
          >
            Cancel
          </button>
          <div
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-green-500 text-white cursor-pointer"
          >
            Settle & Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettleCash;
