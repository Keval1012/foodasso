import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOperationKot } from "../../Api/Operation/Api";
import toast from "react-hot-toast";

interface cancelOrderProps {
  setCancleDialogOpen: any;
  cancelOrderId: any;
  cancelOrderItems: any;
  fetchKots: any;
  currentPage: any;
}

const CancelOrder: React.FC<cancelOrderProps> = ({
  setCancleDialogOpen,
  cancelOrderId,
  cancelOrderItems,
  fetchKots,
  currentPage,
}) => {
  const dispatch = useDispatch();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [password, setPassword] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Cancel order with reason:", cancelReason);
  };

  const handleNo = () => {
    // Handle "No" button click here
    console.log("No, do not cancel");
  };

  const handleSubmit = async () => {
    if (cancelOrderId || cancelOrderItems) {
      let data = {
        username: loginUserData?.username,
        password: password,
        cancel_resoan: cancelReason,
        item_ids: cancelOrderItems,
      };

      try {
        let res = await cancelOperationKot(cancelOrderId, data);
        if (res.status === 200) {
          setCancleDialogOpen(false);
          fetchKots(currentPage);
          toast.success(res.data?.message);
        }
      } catch (error) {
        toast.error("Password doesn't match !!!");
      }
    }
  };

  return (
    <div className=" ">
      <div className="bg-white w-full max-w-md ">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Are You Sure You Want To Cancel This Order?
          </h2>
          <button className="text-gray-400 hover:text-gray-600">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg> */}
          </button>
        </div>

        <div className=" p-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className=" p-4">
          <label className="block text-gray-700 text-sm font-medium mb-2 ">
            Cancel Reason<span className="text-red-500">*</span>
          </label>
          <textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter cancel reason"
            required
          />
        </div>

        <div className="flex justify-center gap-4 p-3">
          <button
            type="submit"
            className="w-[155px]h-[136px] text-gray-400 rounded-full border border-gray-300 hover:bg-custom-orange hover:text-white px-7 py-2"
            onClick={() => setCancleDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[155px]h-[136px] text-gray-400 text-base rounded-full border border-gray-300 hover:bg-custom-orange  hover:text-white px-7 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
