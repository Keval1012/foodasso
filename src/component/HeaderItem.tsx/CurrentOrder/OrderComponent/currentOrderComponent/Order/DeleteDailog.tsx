import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cancelOperationOrder } from "../../../../../../Api/Operation/Api";
import toast from "react-hot-toast";

interface DeleteDailogProps {
  onClose: () => void;
  currentOrderId: any;
}

const DeleteDailog: React.FC<DeleteDailogProps> = ({ onClose, currentOrderId }) => {

  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [password, setPassword] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    onClose(); // Close the dialog after submission
  };

  const handleDelete = async () => {
    if (currentOrderId) {
      let data = {
        username: loginUserData?.username,
        password: password,
        cancel_resoan: cancelReason
      };

      try {
        let res = await cancelOperationOrder(currentOrderId, data);
        if (res.status === 200) {
          onClose();
          toast.success(res.data?.message);
        }
      } catch (error) {
        toast.error("Password doesn't match !!!");
      }
    }
  };

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            {/* <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Confirmation
            </h3> */}
            {/* <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button> */}
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  //   placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Cancel reason*
              </label>
              <textarea
                id="message"
                rows={1}
                className="block p-2.5 w-full text-base text-gray-400  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                // placeholder="Write your thoughts here..."
                onChange={(e) => setCancelReason(e.target.value)}
              ></textarea>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  onClick={onClose}
                  className="w-[155px]h-[136px] text-gray-400 rounded-full border border-gray-300 hover:bg-custom-orange hover:text-white px-7 py-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-[155px]h-[136px] text-gray-400 text-base rounded-full border border-gray-300 hover:bg-custom-orange  hover:text-white px-7 py-2"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteDailog;
