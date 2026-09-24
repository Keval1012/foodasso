import React, { useState } from "react";
import { RiH3 } from "react-icons/ri";
import { deleteDeliveryBoy, getDeliveryBoys } from "../../../Api/Operation/Api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

interface DeleteUserProps {
  onClose: () => void;
  deliveryBoyId: any;
  setDeleteDialogOpen: any;
  fetchDeliveryBoys: any;
  currentPage: any;
}

const DeleteUser: React.FC<DeleteUserProps> = ({
  onClose,
  deliveryBoyId,
  setDeleteDialogOpen,
  fetchDeliveryBoys,
  currentPage,
}) => {
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [cancelReason, setCancelReason] = useState("");

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Cancel order with reason:", cancelReason);
  };

  const handleNo = () => {
    // Handle "No" button click here
    console.log("No, do not cancel");
    onClose();
  };

  const handleSave = async () => {
    if (deliveryBoyId) {
      let data = {
        outlet: loginUserData?.outlet,
      };

      try {
        const res = await deleteDeliveryBoy(deliveryBoyId, data);
        if (res.status === 200) {
          setDeleteDialogOpen(false);
          fetchDeliveryBoys(currentPage);
          console.log(res);
          if (
            res.data?.message ===
            "Cannot delete this record because it is referenced by other records."
          ) {
            toast.error(
              "Cannot delete this record because it is referenced by other records"
            );
          } else {
            window.history.go(0);
          }
        }
      } catch (error) {}
    }
  };

  return (
    <div className="bg-white w-full  rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="p-4 text-lg font-semibold text-gray-800">
          Are You Sure You Want To Delete This?
        </h3>
      </div>
      <div className="flex justify-end gap-4 p-3 border-t border-gray-300">
        <button
          type="button"
          onClick={handleNo}
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

export default DeleteUser;
