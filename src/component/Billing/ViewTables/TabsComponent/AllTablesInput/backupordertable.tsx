// import { useEffect, useMemo, useState } from "react";
// import { FaTrashAlt } from "react-icons/fa";
// import BlankOrderSelect from "./BlankOrderSelect";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setOrderItemData,
//   setSubTotalPrice,
//   setTotalItemData,
// } from "../../../../redux/Features/BillingDataSlice";
// interface TableDataProps {
//   areaType?: string;
//   tableId?: number;
//   tableDetails?: any;
//   allMenuData?: any;
//   setAllMenuData?: any;
//   allMenuPriceData?: any;
//   setAllMenuPriceData?: any;
//   allMenuAddOnData?: any;
//   setAllMenuAddOnData?: any;
//   allMenuVariatioData?: any;
//   setAllMenuVariationData?: any;
//   tableWiseOrderData?: any;
// }

// const OrderTable: React.FC<TableDataProps> = ({
//   allMenuData,
//   setAllMenuData,
//   allMenuPriceData,
//   setAllMenuPriceData,
//   allMenuAddOnData,
//   setAllMenuAddOnData,
//   allMenuVariatioData,
//   setAllMenuVariationData,
//   tableWiseOrderData,
// }) => {
//   const dispatch = useDispatch();
//   const [items, setItems] = useState<any>({});
//   const [totalPrice, setTotalPrice] = useState<number | undefined>();
//   const [mergeItemData, setMergeItemData] = useState<any>([]);
//   const [itemDetails, setItemDetails] = useState<any>([]);
//   const [editOrderitm, setEditOrderItem] = useState<any>([]);
//   useEffect(() => {
//     // const mergeArrayData = [...allMenuData||[],, ...allMenuPriceData||[], ...allMenuAddOnData||[], ...allMenuVariatioData||[]];
//     // console.log('merge', mergeArrayData);
//     mergeArrayData();
//   }, [
//     allMenuData,
//     allMenuPriceData,
//     allMenuAddOnData,
//     allMenuVariatioData,
//     tableWiseOrderData,
//   ]);
//   useEffect(() => {
//     if (
//       tableWiseOrderData &&
//       tableWiseOrderData.order_items_details &&
//       tableWiseOrderData.order_items_details.length > 0
//     ) {
//       const mergeArrays = [...tableWiseOrderData.order_items_details];
//       let newarr = mergeArrays
//         ? mergeArrays.map((item: any) => ({
//             ...item,
//             name: item.menu_item_name, // Rename menu_item_name to name
//             price: item.unit_price,
//             selected_items: [],
//           }))
//         : [];

//       setEditOrderItem(newarr);
//       setMergeItemData(newarr);
//     }
//     // mergeArrayData();
//   }, [
//     tableWiseOrderData &&
//       tableWiseOrderData.order_items_details &&
//       tableWiseOrderData.order_items_details.length > 0,
//   ]);
//   useEffect(() => {
//     dispatch(setTotalItemData(itemDetails));
//   }, [itemDetails]);

//   useEffect(() => {
//     dispatch(setOrderItemData(mergeItemData));
//   }, [mergeItemData]);

//   // useEffect(() => {
//   //   subTotalPriceFun();
//   // }, []);
//   const data = useSelector((state: any) => state.billingData.orderData);
//   const mergeArrayData = () => {
//     const mergeArrays = [
//       ...(allMenuData || []),
//       ...(allMenuPriceData || []),
//       ...(allMenuAddOnData || []),
//       ...(allMenuVariatioData || []),
//       ...editOrderitm,
//     ];
//     setMergeItemData(mergeArrays);
//     // dispatch(setOrderItemData(mergeArrays));
//   };
//   console.log("merge", mergeItemData);

//   // State to manage the items and their quantities
//   // const [items, setItems] = useState<OrderItem[]>([
//   //   { id: 1, name: "Fried Egg Noodles", quantity: 2, price: 300 },
//   //   { id: 2, name: "Seafood Noodles", quantity: 2, price: 300 },
//   //   { id: 3, name: "Veggies Noodle", quantity: 2, price: 300 },
//   //   { id: 3, name: "Veggies Noodle", quantity: 2, price: 300 },
//   // ]);

//   // const increaseQuantity = (id: number) => {
//   //   setItems(
//   //     items.map((item) =>
//   //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//   //     )
//   //   );
//   // };

//   // const decreaseQuantity = (id: number) => {
//   //   setItems(
//   //     items.map((item) =>
//   //       item.id === id && item.quantity > 1
//   //         ? { ...item, quantity: item.quantity - 1 }
//   //         : item
//   //     )
//   //   );
//   // };

//   // const ordersArray = [
//   //   { id: 1, name: "Fried Egg Noodles", quantity: 2, price: 300, selected_items: [] },
//   //   { id: 1, name: "Fried Egg Noodles", quantity: 2, price: 300, selected_items: [] },
//   //   { id: 1, name: "Fried Egg Noodles", quantity: 2, price: 300, selected_items: [] }
//   // ];

//   const removeItem = (id: number, itemName: string) => {
//     setEditOrderItem(editOrderitm.filter((item: any) => item.id !== id));

//     setAllMenuData(allMenuData.filter((item: any) => item.id !== id));
//     setAllMenuPriceData(allMenuPriceData.filter((item: any) => item.id !== id));
//     setAllMenuAddOnData(allMenuAddOnData.filter((item: any) => item.id !== id));
//     setAllMenuVariationData(
//       allMenuVariatioData.filter((item: any) => item.id !== id)
//     );
//     setMergeItemData(mergeItemData.filter((item: any) => item.id !== id));
//     setItemDetails(itemDetails.filter((item: any) => item.id !== id));

//     setItems((prevItems: any) => {
//       const updatedItems = { ...prevItems };
//       delete updatedItems[itemName];
//       return updatedItems;
//     });
//   };

//   const handleItemsChange = (
//     item: string,
//     operation: "increment" | "decrement",
//     price: number,
//     id: number
//   ) => {
//     // setItems((prevItems: any) => {
//     //   const currentCount = prevItems[item] || 1;
//     //   if (operation === 'increment') {
//     //     const newCount = currentCount + 1;
//     //     setTotalPrice((prevTotal: any) => prevTotal + price);
//     //     return { ...prevItems, [item]: newCount };
//     //   } else if (operation === 'decrement' && currentCount > 1) {
//     //     const newCount = currentCount - 1;
//     //     setTotalPrice((prevTotal: any) => prevTotal - price);
//     //     return { ...prevItems, [item]: newCount };
//     //   }
//     //   return prevItems;
//     // });

//     // setItems((prevItems: any) => {
//     //   const currentCount = prevItems[item] || 1;
//     //   // debugger
//     //   if (operation === 'increment') {
//     //     const newCount = currentCount + 1;
//     //     setTotalPrice((prevTotal: any) => prevTotal + price);

//     //     setItemDetails((prevDetails: any) => {
//     //       const updatedDetails = prevDetails.filter((detail: any) => detail.name !== item);
//     //       return [...updatedDetails, { id: id, name: item, count: newCount, price: price, totalPrice: newCount * price }];
//     //     });

//     //     return { ...prevItems, [item]: newCount };
//     //   } else if (operation === 'decrement' && currentCount > 1) {
//     //     const newCount = currentCount - 1;
//     //     setTotalPrice((prevTotal: any) => prevTotal - price);

//     //     setItemDetails((prevDetails: any) => {
//     //       const updatedDetails = prevDetails.filter((detail: any) => detail.name !== item);
//     //       return [...updatedDetails, { id: id, name: item, count: newCount, price: price, totalPrice: newCount * price }];
//     //     });

//     //     return { ...prevItems, [item]: newCount };
//     //   }

//     //   return prevItems;
//     // });

//     setItems((prevItems: any) => {
//       const currentCount = prevItems[item] || 1;

//       setMergeItemData((prevData: any) => {
//         const updatedData =
//           prevData &&
//           prevData.map((menu: any) => {
//             if (menu.id === id && menu.name === item) {
//               if (operation === "increment") {
//                 const newCount = currentCount + 1;
//                 setTotalPrice((prevTotal: any) => prevTotal + price);

//                 const updatedSelectedItems = menu.selected_items.map(
//                   (selected: any) => {
//                     if (selected.id === id) {
//                       return {
//                         ...selected,
//                         quantity: newCount,
//                         totalPrice: newCount * price,
//                       };
//                     }
//                     return selected;
//                   }
//                 );

//                 const itemExists = menu.selected_items.some(
//                   (selected: any) => selected.id === id
//                 );
//                 if (!itemExists) {
//                   updatedSelectedItems.push({
//                     id,
//                     name: item,
//                     quantity: newCount,
//                     price,
//                     totalPrice: newCount * price,
//                   });
//                 }

//                 return {
//                   ...menu,
//                   // quantity: newCount,
//                   selected_items: updatedSelectedItems,
//                 };
//               } else if (operation === "decrement" && currentCount > 1) {
//                 const newCount = currentCount - 1;
//                 setTotalPrice((prevTotal: any) => prevTotal - price);

//                 const updatedSelectedItems = menu.selected_items.map(
//                   (selected: any) => {
//                     if (selected.id === id) {
//                       return {
//                         ...selected,
//                         quantity: newCount,
//                         totalPrice: newCount * price,
//                       };
//                     }
//                     return selected;
//                   }
//                 );

//                 return {
//                   ...menu,
//                   // quantity: newCount,
//                   selected_items: updatedSelectedItems,
//                 };
//               }
//             }
//             return menu;
//           });

//         return updatedData;
//       });

//       if (operation === "increment") {
//         return { ...prevItems, [item]: currentCount + 1 };
//       } else if (operation === "decrement" && currentCount > 1) {
//         return { ...prevItems, [item]: currentCount - 1 };
//       }

//       return prevItems;
//     });
//   };

//   const priceFunc = (menu: any) => {
//     if (menu?.variationDetails?.totalAddOnPrice) {
//       return menu?.variationDetails?.totalAddOnPrice * (items[menu?.name] || 1);
//     } else if (menu?.addOnDetails?.totalAddOnPrice) {
//       return menu?.addOnDetails?.totalAddOnPrice * (items[menu?.name] || 1);
//     } else if (menu?.totalPrice) {
//       return menu?.totalPrice * (items[menu?.name] || 1);
//     } else {
//       return menu?.price * (items[menu?.name] || 1);
//     }
//   };

//   const subTotalPriceVal = useMemo(() => {
//     return mergeItemData.reduce(
//       (total: any, menu: any) => total + priceFunc(menu),
//       0
//     );
//   }, [mergeItemData, items]);

//   useEffect(() => {
//     dispatch(setSubTotalPrice(subTotalPriceVal));
//   }, [subTotalPriceVal]);

//   return (
//     <div className="mt-5">
//       <div className="overflow-x-auto rounded-md border">
//         <table className="w-full bg-white">
//           <thead>
//             <tr className="bg-gray-800 text-white text-left">
//               <th className="py-3 px-4">Items</th>
//               <th className="py-3 px-4">Qty</th>
//               <th className="py-3 px-4">Price</th>
//               <th className="py-3 px-4"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {mergeItemData?.length === 0 || mergeItemData === undefined ? (
//               <BlankOrderSelect />
//             ) : (
//               mergeItemData?.map((menu: any) => (
//                 <tr
//                   key={menu?.id}
//                   className="border-b border-gray-200 bg-orange-200"
//                 >
//                   <td className="py-2 px-3 text-sm">{menu?.name}</td>
//                   <td className="py-3 px-3 flex items-center">
//                     <button
//                       // onClick={() => decreaseQuantity(menu?.id)}
//                       onClick={() =>
//                         handleItemsChange(
//                           menu?.name,
//                           "decrement",
//                           menu?.price,
//                           menu?.id
//                         )
//                       }
//                       className="bg-gray-200 text-gray-800 font-bold text-sm py-1 px-2 rounded-r"
//                     >
//                       -
//                     </button>
                 
//                     {/* <span className="px-4">{menu?.quantity}</span> */}
//                     <span className="px-4">{items[menu?.name] || 1}</span>
//                     <button
//                       // onClick={() => increaseQuantity(menu?.id)}
//                       onClick={() =>
//                         handleItemsChange(
//                           menu?.name,
//                           "increment",
//                           menu?.price,
//                           menu?.id
//                         )
//                       }
//                       className="bg-gray-200 text-gray-800 font-bold text-sm py-1 px-2 rounded-l"
//                     >
//                       +
//                     </button>
//                   </td>
//                   {/* <td className="py-3 px-4 text-sm">₹ {totalPrice || menu?.price}</td> */}
//                   {/* <td className="py-3 px-4 text-sm">₹ {menu?.price * (items[menu?.name] || 1)}</td> */}
//                   <td className="py-3 px-4 text-sm">
//                     ₹ {priceFunc(menu).toFixed(2)}
//                   </td>
//                   <td className="py-3 px-4">
//                     <button onClick={() => removeItem(menu?.id, menu?.name)}>
//                       <FaTrashAlt className="text-red-500" />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//             {/* {items.map((item) => (
//               <tr key={item.id} className="border-b border-gray-200 bg-orange-200">
//                 <td className="py-2 px-3 text-sm">{item.name}</td>
//                 <td className="py-3 px-3 flex items-center">
//                   <button
//                     onClick={() => increaseQuantity(item.id)}
//                     className="bg-gray-200 text-gray-800 font-bold text-sm py-1 px-2 rounded-l"
//                   >
//                     +
//                   </button>
//                   <span className="px-4">{item.quantity}</span>
//                   <button
//                     onClick={() => decreaseQuantity(item.id)}
//                     className="bg-gray-200 text-gray-800 font-bold text-sm py-1 px-2 rounded-r"
//                   >
//                     -
//                   </button>
//                 </td>
//                 <td className="py-3 px-4 text-sm">₹{item.price}</td>
//                 <td className="py-3 px-4">
//                   <button onClick={() => removeItem(item.id)}>
//                     <FaTrashAlt className="text-red-500" />
//                   </button>
//                 </td>
//               </tr>
//             ))} */}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderTable;
