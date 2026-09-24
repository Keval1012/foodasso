import { FaTrashAlt, FaUtensils } from "react-icons/fa";

const BlankOrderSelect= () => {

  return (
    <div className="w-full">

  
    <div className="flex items-center justify-center bg-gray-100 w-full h-full">
      <div className="text-center">
        {/* Icon */}
        <FaUtensils className="text-gray-400 text-6xl mx-auto" />

        {/* Message */}
        <p className="text-gray-500 text-lg mt-4">No Item Selected</p>
        <p className="text-gray-400 text-sm">
            Please Select Item From Left Menu Item
        </p>
      </div>
    </div>
    </div>
  );
};

export default BlankOrderSelect;