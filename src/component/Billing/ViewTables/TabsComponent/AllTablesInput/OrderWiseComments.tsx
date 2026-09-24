import React, { useEffect, useState } from "react";

interface OrderWiseCommentsDataProps {
  setOrderWiseCommentsModalOpen?: any;
  orderWiseComments?: any;
  setOrderWiseComments?: any;
  tableWiseOrderData?:any
}

const OrderWiseComments: React.FC<OrderWiseCommentsDataProps> = ({
  setOrderWiseCommentsModalOpen,
  orderWiseComments,
  setOrderWiseComments,
  tableWiseOrderData
}) => {

  const [comment, setComment] = useState('');

  useEffect(()=>{
    if(tableWiseOrderData?.comments){
      setOrderWiseComments(tableWiseOrderData.comments);
    }
console.log(tableWiseOrderData?.comments,"lllllllllllllllllllllllllll")
  },[tableWiseOrderData])
  const handleSave = () => {
    setOrderWiseComments(comment);
    setOrderWiseCommentsModalOpen(false);
  };
  
  return (
    <div className=" mt-8 p-3 bg-white">
      {/* Comment Input Section */}
      <div className="py-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Comment:
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
          placeholder="Enter your comment here"
          value={comment || orderWiseComments}
          defaultValue={comment || orderWiseComments}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Buttons Section */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
          onClick={() => setOrderWiseCommentsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default OrderWiseComments;
