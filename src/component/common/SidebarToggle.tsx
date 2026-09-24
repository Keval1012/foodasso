import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 z-50`}
    >
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          &times;
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Sidebar;
