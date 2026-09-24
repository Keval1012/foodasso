import React from "react";
import { MdClose } from "react-icons/md";

interface CustomerDailogProps {
  onClose: () => void;
}

const CustomerDailog: React.FC<CustomerDailogProps> = ({ onClose }) => {

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Alert
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <MdClose />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4">
            <p className="text-base">All good. User 7795625254 Is Able To Receive A Message.</p>
          </div>
          <div className="flex justify-end gap-4 border-t bg-gray-100 py-4 px-3">
            <button
              type="button"
              onClick={onClose}
              className="w-[155px]h-[136px] text-white text-base rounded-full  bg-[rgba(52,199,89,1)]  hover:text-white px-7 py-2"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDailog;
