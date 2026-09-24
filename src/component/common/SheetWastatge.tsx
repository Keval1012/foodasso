import React from "react";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const SheetWastatge: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative w-[40rem] bg-white h-full shadow-xl ">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-xl">
            &times;
          </button>
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default SheetWastatge;
