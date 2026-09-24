import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  moveKot?: any;
}

const DialogBox: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  moveKot,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* <div className="bg-white rounded-lg shadow-lg max-w-xl w-full lg:w-ful"> */}
      <div className="bg-white rounded-lg shadow-lg max-w-fit w-full lg:w-full">
        <div className="border border-gray-300 flex justify-between items-center  px-3 py-3">
          <h2 className="text-xl font-semibold ">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default DialogBox;
