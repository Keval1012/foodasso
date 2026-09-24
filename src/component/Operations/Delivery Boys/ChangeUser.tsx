import React, { useEffect } from "react";
import { getDeliveryBoys, postDeliveryBoy } from "../../../Api/Operation/Api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface ChangeUserProps {
  onClose: () => void;
  deliveryBoyDetails: any;
  setActiveDialogOpen: any;
  fetchDeliveryBoys: any;
  currentPage: any;
}

const ChangeUser: React.FC<ChangeUserProps> = ({
  onClose,
  deliveryBoyDetails,
  setActiveDialogOpen,
  fetchDeliveryBoys,
  currentPage
}) => {
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const handleCancel = () => {
    console.log("No, do not cancel");
    onClose();
  };

  const handleSave = async () => {
    if (deliveryBoyDetails) {
      let data = {
        id: deliveryBoyDetails?.id,
        is_active: !deliveryBoyDetails?.is_active,
      };

      try {
        const res = await postDeliveryBoy(data);
        if (res.status === 200) {
          setActiveDialogOpen(false);
          fetchDeliveryBoys(currentPage);
          toast.success(res.data?.message);
          // window.history.go(0);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="bg-white w-full  rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="p-4 text-lg font-semibold text-gray-800">
          Are You Sure You Want To Change Status?
        </h3>
      </div>
      <div className="flex justify-end gap-4 p-3 border-t border-gray-300">
        <button
          type="button"
          onClick={handleCancel}
          className="w-[155px] h-[45px] text-gray-400 rounded-full bg-white border border-gray-300 hover:bg-gray-200 px-7 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSave}
          className="w-[155px] h-[45px] text-white text-base bg-[#34C759] rounded-full border border-gray-300 hover:bg-[#2ba148] px-7 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangeUser;
