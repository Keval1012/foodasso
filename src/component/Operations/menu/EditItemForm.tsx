// import React from "react";

// const EditItemForm = () => {
//   return (
//     <div className="p-3 rounded-lg">
//       <form className="space-y-6">
//         {/* Name */}
//         <div>
//           <label className="block font-semibold mb-2">Name *</label>
//           <input
//             type="text"
//             placeholder="Item Name"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <p className="text-sm text-gray-500">
//             Note: Name will be shown in the bill.
//           </p>
//         </div>

//         {/* Short Code */}
//         <div>
//           <label className="block font-semibold mb-2">Short Code *</label>
//           <input
//             type="text"
//             placeholder="Item Code"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Order Type */}
//         <div>
//           <label className="block font-semibold mb-2">Order Type *</label>
//           <div className="flex space-x-4">
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" /> Dine In
//             </label>
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" /> Delivery
//             </label>
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" /> Pick Up
//             </label>
//           </div>
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block font-semibold mb-2">Price (₹)</label>
//           <input
//             type="text"
//             placeholder="0"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* HSN Code */}
//         <div>
//           <label className="block font-semibold mb-2">HSN Code</label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Unit */}
//         <div>
//           <label className="block font-semibold mb-2">Unit</label>
//           <input
//             type="text"
//             placeholder="Unit will be shown in bill, e.g., Kg, Litre, etc."
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <p className="text-sm text-gray-500">
//             Note: Unit will be shown in bill, e.g., Kg, Litre, etc.
//           </p>
//         </div>

//         {/* Ignore Tax / Discount */}
//         <div className="space-y-2">
//           <label className="block font-semibold mb-2">Options</label>
//           <div className="flex space-x-4">
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" /> Ignore Tax
//             </label>
//             <label className="flex items-center">
//               <input type="checkbox" className="mr-2" /> Ignore Discount
//             </label>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-semibold mb-2">Description</label>
//           <textarea
//             placeholder=""
//             className="w-full p-2 border border-gray-300 rounded-md"
//           ></textarea>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block font-semibold mb-2">Category *</label>
//           <select className="w-full p-2 border border-gray-300 rounded-md">
//             <option>Main Course</option>
//             <option>Appetizer</option>
//             <option>Dessert</option>
//           </select>
//         </div>

//         {/* Choice */}
//         <div>
//           <label className="block font-semibold mb-2">Choice *</label>
//           <div className="flex space-x-4">
//             <label className="flex items-center">
//               <input type="radio" name="choice" className="mr-2" /> Veg
//             </label>
//             <label className="flex items-center">
//               <input type="radio" name="choice" className="mr-2" /> Non-Veg
//             </label>
//             <label className="flex items-center">
//               <input type="radio" name="choice" className="mr-2" /> Egg
//             </label>
//           </div>
//         </div>
//         <div className="grid  grid-cols-2 gap-6">
//           {/* Area Wise Price */}
//           <div className="">
//             <div className="flex ">
//               <label className="block font-semibold mb-4">
//                 Area Wise Price
//               </label>
//               <div className="grid gap-6 ">
//                 {/* Each row with checkbox and price input */}
//                 <div className="flex items-center gap-8">
//                   <label className="flex items-center w-1/2 whitespace-nowrap">
//                     <input type="checkbox" className="mr-4" /> Home Delivery
//                   </label>
//                   <input
//                     type="text"
//                     value="0"
//                     className="w-full p-2 ml-10 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="flex items-center gap-8">
//                   <label className="flex items-center w-[76%] whitespace-nowrap">
//                     <input type="checkbox" className="mr-4" /> AC
//                   </label>
//                   <input
//                     type="text"
//                     value="0"
//                     className="w-full p-2 ml-10 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="flex items-center gap-8">
//                   <label className="flex items-center w-[76%] whitespace-nowrap">
//                     <input type="checkbox" className="mr-4" /> Non-AC
//                   </label>
//                   <input
//                     type="text"
//                     value="0"
//                     className="w-full p-2 ml-10 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="flex items-center gap-8">
//                   <label className="flex items-center w-[76%] whitespace-nowrap">
//                     <input type="checkbox" className="mr-4" /> Dine In
//                   </label>
//                   <input
//                     type="text"
//                     value="0"
//                     className="w-full p-2 ml-10 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="flex items-center gap-8">
//                   <label className="flex items-center w-[76%] whitespace-nowrap">
//                     <input type="checkbox" className="mr-4" /> Parcel
//                   </label>
//                   <input
//                     type="text"
//                     value="0"
//                     className="w-full p-2 ml-10 border border-gray-300 rounded-md"
//                   />
//                 </div>
//                 <div className="flex items-center gap-8">
//                   <label className="flex items-center w-[76%] whitespace-nowrap">
//                     <input type="checkbox" className="mr-4" /> Garden
//                   </label>
//                   <input
//                     type="text"
//                     value="0"
//                     className="w-full p-2 ml-10 border border-gray-300 rounded-md"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cancel and Save Buttons */}
//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             type="button"
//             className="px-4 py-2 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditItemForm;


import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const EditItemForm = () => {
  return (
    <div className="p-6 border ">
      <form className="space-y-6">
        <div className="flex justify-between items-center mb-6  border-b ">
          <h1 className="text-2xl font-semibold p-4">Edit Item </h1>
          <div className="flex justify-end items-center gap-4">
            <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
              <MdKeyboardArrowLeft className="text-base" />
              <button className="text-base">Back</button>
            </div>
          </div>
        </div>
        {/* Name */}
        <div className="space-y-4 border p-4 border-gray-300 rounded-lg">
          {/* Name */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Name *</label>
            <input
              type="text"
              value="Item Name" // Static value for demonstration
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Short Code */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Short Code *</label>
            <input
              type="text"
              value="Item Code" // Static value for demonstration
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Order Type */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Order Type *</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Dine In
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Delivery
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Pick Up
              </label>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Price (₹)</label>
            <input
              type="text"
              value="100" // Static value for demonstration
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* HSN Code */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">HSN Code</label>
            <input
              type="text"
              value="1234" // Static value for demonstration
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Unit */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Unit</label>
            <input
              type="text"
              value="Kg" // Static value for demonstration
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Options */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium"> Ignore Tax</label>
            <input type="checkbox" className="mr-2" />
            Yes
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium"> Ignore Discount</label>
            <input type="checkbox" className="mr-2" />
            Yes
          </div>
          {/* Description */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Description</label>
            <textarea
              value="Item description goes here." // Static value for demonstration
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Category */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Category *</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Main Course</option>
              <option>Appetizer</option>
              <option>Dessert</option>
            </select>
          </div>

          {/* Choice */}
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Choice *</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="choice" className="mr-2" /> Veg
              </label>
              <label className="flex items-center">
                <input type="radio" name="choice" className="mr-2" /> Non-Veg
              </label>
              <label className="flex items-center">
                <input type="radio" name="choice" className="mr-2" /> Egg
              </label>
            </div>
          </div>

          {/* Area Wise Price */}
          <div className="flex gap-48 items-start">
            {/* Label */}
            <label className="block  mb-4 whitespace-nowrap font-medium">
              Area Wise Price
            </label>

            {/* Grid Container */}
            <div className="grid gap-3 w-full">
              {[
                "Home Delivery",
                "AC",
                "Non-AC",
                "Dine In",
                "Parcel",
                "Garden",
              ].map((area, index) => (
                <div key={index} className="flex items-center gap-8">
                  {/* Checkbox Label */}
                  <label className="flex items-center w-1/2 whitespace-nowrap">
                    <input type="checkbox" className="mr-4" /> {area}
                  </label>

                  {/* Input Field */}
                  <input
                    type="text"
                    value="0" // Static value for demonstration
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cancel and Save Buttons */}
          <div className="mt-6  p-4  flex justify-end border-t space-x-4">
            <button
              type="button"
              className="px-4 py-2  text-gray-700  rounded-full bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" bg-orange-400 text-white   py-2 px-4 rounded-full "
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditItemForm;
