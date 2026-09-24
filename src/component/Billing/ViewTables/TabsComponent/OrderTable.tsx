import { useEffect, useMemo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import BlankOrderSelect from "./BlankOrderSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderItemData,
  setSubTotalPrice,
  setTotalItemData,
  setExistsItems,
  updateOrder
} from "../../../../redux/Features/BillingDataSlice";
import toast from "react-hot-toast";
import { isArray } from "chart.js/dist/helpers/helpers.core";

interface TableDataProps {
  areaType?: string;
  tableId?: number;
  tableDetails?: any;
  allMenuData?: any;
  setAllMenuData?: any;
  allMenuPriceData?: any;
  setAllMenuPriceData?: any;
  allMenuAddOnData?: any;
  setAllMenuAddOnData?: any;
  allMenuVariatioData?: any;
  setAllMenuVariationData?: any;
  tableWiseOrderData?: any;
}

const OrderTable: React.FC<TableDataProps> = ({
  allMenuData,
  setAllMenuData,
  allMenuPriceData,
  setAllMenuPriceData,
  allMenuAddOnData,
  setAllMenuAddOnData,
  allMenuVariatioData,
  setAllMenuVariationData,
  tableWiseOrderData,
}) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState<number | undefined>();
  const [mergeItemData, setMergeItemData] = useState<any>([]);
  const [itemDetails, setItemDetails] = useState<any>([]);
  const [editOrderitm, setEditOrderItem] = useState<any>([]);
  const allSelectedData: any = useSelector(
    (state: any) => state.billingData.groupData
  );
  const existsOrderItem: any = useSelector(
    (state: any) => state.billingData.existsOrderItem
  );
  let data4=useSelector((state:any)=>state.billingData.orderItems)
  let checkMessage=useSelector((state:any)=>state.billingData.itemsAlert)

  // useEffect(()=>{
  //   if(checkMessage===true){
  //     toast.error("Selected Item(s) not available in this area");
  //   }
  // },[checkMessage])
  useEffect(() => {
    console.log(data4,"data4data4data4data4data4data4data4data4")
    if (data4 && Array.isArray(data4)) {
      mergeArrayData();
      // Iterate over the array of order items
      setItems((prevItems:any) => {
        const newItems = { ...prevItems };
        data4.forEach(({ name, quantity }) => {
          // Update the quantity for each menu item
          newItems[name] = parseInt(quantity);
        });
        return newItems;
      });
    }
  }, [data4]);

  // useEffect(() => {
  //   mergeArrayData();
  // }, [
  //   allMenuData,
  //   allMenuPriceData,
  //   allMenuAddOnData,
  //   allMenuVariatioData,
  //   tableWiseOrderData,
  // ]);
  useEffect(() => {
    if (
      tableWiseOrderData &&
      tableWiseOrderData.order_items_details &&
      tableWiseOrderData.order_items_details.length > 0
    ) {
      const mergeArrays = [...tableWiseOrderData.order_items_details];
      let newarr = mergeArrays
        ? mergeArrays.map((item: any) => ({
            ...item,
            name: item.menu_item_name, // Rename menu_item_name to name
            price: item.unit_price,
            selected_items: [],
          }))
        : [];
      setEditOrderItem(newarr);
      setMergeItemData(newarr);
      dispatch(setExistsItems(newarr));
    }
  }, [
    tableWiseOrderData &&
      tableWiseOrderData.order_items_details &&
      tableWiseOrderData.order_items_details.length > 0,
  ]);
  useEffect(() => {
    dispatch(setTotalItemData(itemDetails));
  }, [itemDetails]);
  useEffect(() => {
    dispatch(setOrderItemData(mergeItemData));
  }, [mergeItemData]);

  // useEffect(() => {
  //   subTotalPriceFun();
  // }, []);
  const data = useSelector((state: any) => state.billingData.orderData);
  const mergeArrayData = () => {
    let mergeArrays = [
      ...(allMenuData || []),
      ...(allMenuPriceData || []),
      ...(allMenuAddOnData || []),
      ...(allMenuVariatioData || []),
     
    ];
    let newarr=[...data4]
    console.log(newarr,"newarrnewarrnewarrnewarrnewarr")
    setMergeItemData(newarr);
    // dispatch(setOrderItemData(mergeArrays));
  };
  const removeItem = (id: number, itemName: string) => {
    const payload={
      id:id,
      operation:"delete"
    }
    dispatch(updateOrder(payload))
    setAllMenuData(allMenuData.filter((item: any) => item.id !== id));
    setAllMenuPriceData(allMenuPriceData.filter((item: any) => item.id !== id));
    setAllMenuAddOnData(allMenuAddOnData.filter((item: any) => item.id !== id));
    setAllMenuVariationData(
      allMenuVariatioData.filter((item: any) => item.id !== id)
    );
    setMergeItemData(mergeItemData.filter((item: any) => item.id !== id));
    setItemDetails(itemDetails.filter((item: any) => item.id !== id));
    setItems((prevItems: any) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[itemName];
      return updatedItems;
    });
  };
  const handleItemsChange = (
    item: string,
    operation: "increment" | "decrement",
    price: number,
    id: number
  ) => {

    const payload={
      item: item,
      operation:operation,
      price: price,
      id: id
    }
    dispatch(updateOrder(payload))


    // First, calculate the new count based on the operation
    let newCount:any;
    setItems((prevItems: any) => {
      const currentCount = prevItems[item] || 1;
  
       newCount = currentCount;
      if (operation === "increment") {
        newCount = currentCount + 1;
      } else if (operation === "decrement" && currentCount > 1) {
        newCount = currentCount - 1;
      }
  
      // Update total price for the item
      setTotalPrice((prevTotal: any) => prevTotal + (newCount - currentCount) * price);
  
      // Update the items state (to update quantity)
      return { ...prevItems, [item]: newCount };
    });
  
    // Now update the merge item data
    setMergeItemData((prevData: any) => {
      return prevData.map((menu: any) => {
        if (menu.id === id && menu.name === item) {
          const updatedSelectedItems = menu.selected_items.map((selected: any) => {
            if (selected.id === id) {
              // Here, 'newCount' is accessible as it was defined earlier
              return {
                ...selected,
                quantity: newCount,
                totalPrice: newCount * price, // Update total price for the item
              };
            }
            return selected;
          });
  
          // If the item doesn't exist in selected_items, add it
          if (!menu.selected_items.some((selected: any) => selected.id === id)) {
            updatedSelectedItems.push({
              id,
              name: item,
              quantity: newCount,
              price,
              totalPrice: newCount * price,
            });
          }
  
          return {
            ...menu,
            selected_items: updatedSelectedItems,
          };
        }
        return menu;
      });
    });
  };
  
  
  const priceFunc = (menu: any) => {
    if (menu?.variationDetails?.totalAddOnPrice) {
      return menu?.variationDetails?.totalAddOnPrice * (items[menu?.name] || 1);
    } else if (menu?.addOnDetails?.totalAddOnPrice) {
      return menu?.addOnDetails?.totalAddOnPrice * (items[menu?.name] || 1);
    } else if (menu?.totalPrice) {
      return menu?.totalPrice * (items[menu?.name] || 1);
    } else {
      return menu?.price * (items[menu?.name] || 1);
    }
  };
  const subTotalPriceVal = useMemo(() => {
    return mergeItemData.reduce(
      (total: any, menu: any) => total + priceFunc(menu),
      0
    );
  }, [mergeItemData, items]);
  useEffect(() => {
    dispatch(setSubTotalPrice(subTotalPriceVal));
  }, [subTotalPriceVal]);
  const [toastShown, setToastShown] = useState(false);
  //   useEffect(() => {
  //     if (mergeItemData && allSelectedData?.groups?.[0]?.categories?.[0]?.menu_items) {
  //       const updatedMergeItemData = mergeItemData.filter((item: any) => {
  //         // Check if the item's ID is not in the menu items
  //         const isIdInMenuItems = allSelectedData.groups[0].categories[0].menu_items.some(
  //           (menuItem: any) => menuItem.id=== item.id
  //         );
  //         return !isIdInMenuItems; // Keep the items that are not in the menu
  //       });
  //       handledeletefunc(updatedMergeItemData)
  //       if ( updatedMergeItemData && updatedMergeItemData.length>0  && mergeItemData.length>0 ) {
  //         toast.error("Selected Item(s) not available in this area");
  //       }
  //     }
  //       setToastShown(false);
  //   }, [allSelectedData]);
  // const handledeletefunc=async(updatedMergeItemData:any)=>{
  //   updatedMergeItemData.forEach((val: any) => {
  //    let resss= removeItem(val.id, val.name);
  //   });
  // }

  return (
    <div className="mt-5">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-800 text-white text-left">
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Qty</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {mergeItemData?.length === 0 || mergeItemData === undefined ? (
              <tr>
                <td colSpan={4} className="text-center">
                  <BlankOrderSelect />
                </td>
              </tr>
            ) : (
              mergeItemData?.map((menu: any) => (
                <tr
                  key={menu?.id}
                  className="border-b border-gray-200 bg-orange-200"
                >
                  <td className="py-2 px-3 text-sm">{menu?.name}</td>
                  <td className="py-3 px-3 flex items-center">
                    <button
                      // onClick={() => decreaseQuantity(menu?.id)}
                      onClick={() =>
                        handleItemsChange(
                          menu?.name,
                          "decrement",
                          menu?.price,
                          menu?.id
                        )
                      }
                      className="bg-gray-200 text-gray-800 font-bold text-sm py-1 px-2 rounded-r"
                    >
                      -
                    </button>
                    {/* || menu.quantity || */}
                    {/* <span className="px-4">{menu?.quantity}</span> */}
                    <span className="px-4">{items[menu?.name] || 1}</span>  
                    <button
                      // onClick={() => increaseQuantity(menu?.id)}
                      onClick={() =>
                        handleItemsChange(
                          menu?.name,
                          "increment",
                          menu?.price,
                          menu?.id
                        )
                      }
                      className="bg-gray-200 text-gray-800 font-bold text-sm py-1 px-2 rounded-l"
                    >
                      +
                    </button>
                  </td>
                  {/* <td className="py-3 px-4 text-sm">₹ {totalPrice || menu?.price}</td> */}
                  {/* <td className="py-3 px-4 text-sm">₹ {menu?.price * (items[menu?.name] || 1)}</td> */}
                  <td className="py-3 px-4 text-sm">
                    ₹ {priceFunc(menu).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => removeItem(menu?.id, menu?.name)}>
                      <FaTrashAlt className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
