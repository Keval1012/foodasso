// import React from "react";

// // Sample data for the table
// const tableData = [
//   {
//     rawMaterial: "Rice",
//     category: "Grains",
//     dailyData: [
//       {
//         date: "22 June 2024",
//         opening: "45 Kg",
//         closing: "25 Kg",
//         avgPrice: "120/Kg",
//         total: "3000.00",
//       },
//       {
//         date: "23 June 2024",
//         opening: "45 Kg",
//         closing: "25 Kg",
//         avgPrice: "120/Kg",
//         total: "3000.00",
//       },
//       {
//         date: "24 June 2024",
//         opening: "45 Kg",
//         closing: "25 Kg",
//         avgPrice: "120/Kg",
//         total: "3000.00",
//       },
//     ],
//   },
//   {
//     rawMaterial: "Tomato Sauce",
//     category: "Tomato",
//     dailyData: [
//       {
//         date: "22 June 2024",
//         opening: "7 Ltr.",
//         closing: "5 Ltr.",
//         avgPrice: "70/Ltr.",
//         total: "350.00",
//       },
//       {
//         date: "23 June 2024",
//         opening: "7 Ltr.",
//         closing: "5 Ltr.",
//         avgPrice: "70/Ltr.",
//         total: "350.00",
//       },
//       {
//         date: "24 June 2024",
//         opening: "7 Ltr.",
//         closing: "5 Ltr.",
//         avgPrice: "70/Ltr.",
//         total: "350.00",
//       },
//     ],
//   },
//   {
//     rawMaterial: "Tomato",
//     category: "Vegetables",
//     dailyData: [
//       {
//         date: "22 June 2024",
//         opening: "25 Kg",
//         closing: "7 Kg",
//         avgPrice: "60/Kg",
//         total: "420.00",
//       },
//       {
//         date: "23 June 2024",
//         opening: "25 Kg",
//         closing: "7 Kg",
//         avgPrice: "60/Kg",
//         total: "420.00",
//       },
//       {
//         date: "24 June 2024",
//         opening: "25 Kg",
//         closing: "7 Kg",
//         avgPrice: "60/Kg",
//         total: "420.00",
//       },
//     ],
//   },
//   {
//     rawMaterial: "Tomato",
//     category: "Vegetables",
//     dailyData: [
//       {
//         date: "22 June 2024",
//         opening: "500 Gm",
//         closing: "0",
//         avgPrice: "30/Gm",
//         total: "0.00",
//       },
//       {
//         date: "23 June 2024",
//         opening: "500 Gm",
//         closing: "0",
//         avgPrice: "30/Gm",
//         total: "0.00",
//       },
//       {
//         date: "24 June 2024",
//         opening: "500 Gm",
//         closing: "0",
//         avgPrice: "30/Gm",
//         total: "0.00",
//       },
//     ],
//   },
// ];

// const OpenCloseTable = () => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Raw Material</th>
//             <th className="border border-gray-300 px-4 py-2">Category</th>
//             {tableData[0].dailyData.map((day, index) => (
//               <th
//                 key={index}
//                 colSpan={4}
//                 className="border border-gray-300 px-4 py-2 text-center"
//               >
//                 {day.date}
//               </th>
//             ))}
//           </tr>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2"></th>
//             <th className="border border-gray-300 px-4 py-2"></th>
//             {tableData[0].dailyData.map((_, index) => (
//               <>
//                 <th
//                   key={`opening-${index}`}
//                   className="border border-gray-300 px-4 py-2"
//                 >
//                   Opening
//                 </th>
//                 <th
//                   key={`closing-${index}`}
//                   className="border border-gray-300 px-4 py-2"
//                 >
//                   Closing
//                 </th>
//                 <th
//                   key={`avgPrice-${index}`}
//                   className="border border-gray-300 px-4 py-2"
//                 >
//                   Avg Price (₹)
//                 </th>
//                 <th
//                   key={`total-${index}`}
//                   className="border border-gray-300 px-4 py-2"
//                 >
//                   Total
//                 </th>
//               </>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((item, itemIndex) => (
//             <tr key={itemIndex}>
//               <td className="border border-gray-300 px-4 py-2">
//                 {item.rawMaterial}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {item.category}
//               </td>
//               {item.dailyData.map((dayData, dayIndex) => (
//                 <React.Fragment key={dayIndex}>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {dayData.opening}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {dayData.closing}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {dayData.avgPrice}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {dayData.total}
//                   </td>
//                 </React.Fragment>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OpenCloseTable;

import React from "react";

// Sample data for the table
const tableData = [
  {
    rawMaterial: "Rice",
    category: "Grains",
    dailyData: [
      {
        date: "22 June 2024",
        opening: "45 Kg",
        closing: "25 Kg",
        avgPrice: "120/Kg",
        total: "3000.00",
      },
      {
        date: "23 June 2024",
        opening: "45 Kg",
        closing: "25 Kg",
        avgPrice: "120/Kg",
        total: "3000.00",
      },
      {
        date: "24 June 2024",
        opening: "45 Kg",
        closing: "25 Kg",
        avgPrice: "120/Kg",
        total: "3000.00",
      },
      {
        date: "25 June 2024",
        opening: "45 Kg",
        closing: "25 Kg",
        avgPrice: "120/Kg",
        total: "3000.00",
      },
    ],
  },
  {
    rawMaterial: "Tomato Sauce",
    category: "Tomato",
    dailyData: [
      {
        date: "22 June 2024",
        opening: "7 Ltr.",
        closing: "5 Ltr.",
        avgPrice: "70/Ltr.",
        total: "350.00",
      },
      {
        date: "23 June 2024",
        opening: "7 Ltr.",
        closing: "5 Ltr.",
        avgPrice: "70/Ltr.",
        total: "350.00",
      },
      {
        date: "24 June 2024",
        opening: "7 Ltr.",
        closing: "5 Ltr.",
        avgPrice: "70/Ltr.",
        total: "350.00",
      },
      {
        date: "25 June 2024",
        opening: "7 Ltr.",
        closing: "5 Ltr.",
        avgPrice: "70/Ltr.",
        total: "350.00",
      },
    ],
  },
  {
    rawMaterial: "Tomato",
    category: "Vegetables",
    dailyData: [
      {
        date: "22 June 2024",
        opening: "25 Kg",
        closing: "7 Kg",
        avgPrice: "60/Kg",
        total: "420.00",
      },
      {
        date: "23 June 2024",
        opening: "25 Kg",
        closing: "7 Kg",
        avgPrice: "60/Kg",
        total: "420.00",
      },
      {
        date: "24 June 2024",
        opening: "25 Kg",
        closing: "7 Kg",
        avgPrice: "60/Kg",
        total: "420.00",
      },
      {
        date: "25 June 2024",
        opening: "25 Kg",
        closing: "7 Kg",
        avgPrice: "60/Kg",
        total: "420.00",
      },
    ],
  },
  {
    rawMaterial: "Tomato",
    category: "Vegetables",
    dailyData: [
      {
        date: "22 June 2024",
        opening: "500 Gm",
        closing: "0",
        avgPrice: "30/Gm",
        total: "0.00",
      },
      {
        date: "23 June 2024",
        opening: "500 Gm",
        closing: "0",
        avgPrice: "30/Gm",
        total: "0.00",
      },
      {
        date: "24 June 2024",
        opening: "500 Gm",
        closing: "0",
        avgPrice: "30/Gm",
        total: "0.00",
      },
      {
        date: "25 June 2024",
        opening: "500 Gm",
        closing: "0",
        avgPrice: "30/Gm",
        total: "0.00",
      },
    ],
  },
];

const OpenCloseTable = () => {
  return (
    <div className="overflow-x-auto ">
      <table className="mt-5 border min-w-full border-collapse">
        <thead className="bg-[#F2F2F2] p-4">
          <tr>
            <th className="px-4 py-2 border-r whitespace-nowrap">
              Raw Material
            </th>
            <th className="px-4 py-2 ">Category</th>
            {tableData[0].dailyData.map((day, index) => (
              <th colSpan={4}>
                <div
                  key={index}
                  className="px-4 py-2  text-center  border-b border-l bg-white"
                >
                  {day.date}
                </div>
              </th>
            ))}
          </tr>
          <tr className="bg-[#F2F2F2]">
            <th className="px-4 py-2 border-r"></th>
            <th className="px-4 py-2 "></th>
            {tableData[0].dailyData.map((_, index) => (
              <React.Fragment key={index}>
                <th className="px-4 py-2  text-sm text-[#3d3d3d]">
                  <div className="bg-white">Opening</div>
                </th>
                <th className="px-4 py-2  text-sm text-[#3d3d3d]">
                  <div className="bg-white">Closing</div>
                </th>
                <th className="px-4 py-2  text-sm text-[#3d3d3d] whitespace-nowrap">
                  <div className="bg-white">Avg Price (₹)</div>
                </th>

                <th className="px-4 py-2  text-sm text-[#3d3d3d]">
                  <div className="bg-white">Total</div>
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, itemIndex) => (
            <tr key={itemIndex}>
              <td className="px-4 py-2 border">{item.rawMaterial}</td>
              <td className="px-4 py-2 border">{item.category}</td>
              {item.dailyData.map((dayData, dayIndex) => (
                <React.Fragment key={dayIndex}>
                  <td className="px-4 py-2 border">{dayData.opening}</td>
                  <td className="px-4 py-2 border">{dayData.closing}</td>
                  <td className="px-4 py-2 border">{dayData.avgPrice}</td>
                  <td className="px-4 py-2 border">{dayData.total}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenCloseTable;
