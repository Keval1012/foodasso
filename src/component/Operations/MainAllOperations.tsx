// import React from "react";
// import { bottomSectionItems, topSectionItems } from "./OperationDeshboard";
// import { useNavigate } from "react-router-dom";

// const MainAllOperations = () => {
//   // Click handler function
//   const navigate = useNavigate();
//   const handleItemClick = (path: string) => {
//     // Perform an action when an item is clicked
//     console.log(path);

//     navigate(path);
//     // You can also navigate to different pages or show modals, etc.
//   };

//   return (
//     <div className="p-4">
//       {/* Top Section */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
//         {topSectionItems.map((item: any, index) => (
//           <div
//             key={index} // Add key prop
//             onClick={() => handleItemClick(item.path)} // Add onClick handler
//             className="bg-gray-100 w-[141px] h-[140px] p-4 flex flex-col items-center justify-center rounded-md shadow cursor-pointer hover:bg-gray-200 transition"
//           >
//             <div className="text-gray-600 text-3xl">
//               <item.icon /> {/* Render the icon component */}
//             </div>
//             <span className="mt-2 text-center text-base">{item.name}</span>
//           </div>
//         ))}
//       </div>

//       {/* Divider */}
//       <p className=" text-xl font-semibold text-gray-500">
//         set the configuration for your restaurant
//       </p>
//       <hr className="my-8" />

//       {/* Bottom Section */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
//       {bottomSectionItems.map((item, index) => (
//         <div
//           key={index}
//           onClick={() => handleItemClick(item.path)}
//           className="bg-gray-100 w-[141px] h-[140px] p-4 flex flex-col items-center justify-center rounded-md shadow cursor-pointer hover:bg-gray-200 transition"
//         >
//           <div className="text-gray-600 text-3xl">
//             {React.createElement(item.icon, { size: 30 })}
//           </div>
//           <span className="mt-2 text-center text-base">{item.name}</span>
//         </div>
//       ))}
//     </div> 
//     </div>
//   );
// };

// export default MainAllOperations;


import React from "react";
import { bottomSectionItems, topSectionItems } from "./OperationDeshboard";
import { useNavigate } from "react-router-dom";

const MainAllOperations = () => {
  const navigate = useNavigate();
  
  const handleItemClick = (path?: string) => {
    if (path) {
      console.log(path);
      navigate(path);
    }
  };

  return (
    <div className="p-4">
      {/* Top Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
        {topSectionItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.path)}
            className="bg-gray-100 w-[141px] h-[140px] p-4 flex flex-col items-center justify-center rounded-md shadow cursor-pointer hover:bg-gray-200 transition"
          >
            <div className="text-gray-600 text-3xl">
              <item.icon />
            </div>
            <span className="mt-2 text-center text-base">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <p className=" text-xl font-semibold text-gray-500">
        set the configuration for your restaurant
      </p>
      <hr className="my-8" />

      {/* Bottom Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {bottomSectionItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.path)}
            className="bg-gray-100 w-[141px] h-[140px] p-4 flex flex-col items-center justify-center rounded-md shadow cursor-pointer hover:bg-gray-200 transition"
          >
            <div className="text-gray-600 text-3xl">
              {React.createElement(item.icon, { size: 30 })}
            </div>
            <span className="mt-2 text-center text-base">{item.name}</span>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default MainAllOperations;

