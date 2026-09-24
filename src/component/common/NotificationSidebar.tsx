// NotificationSidebar.tsx
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import foodassoLogo from "../../Styles/assets/img/foodasso.svg";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSidebar: React.FC<NotificationSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out w-80`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">Notifications</h2>
        <button onClick={onClose} className="text-gray-600 hover:bg-custom-gray hover:rounded-full p-2">
          <MdOutlineClose className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={foodassoLogo} alt="Logo" className="h-20 mb-4" />
        <p className="text-gray-600">Currently you have no notifications</p>
      </div>
    </div>
  );
};

export default NotificationSidebar;
