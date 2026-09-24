import React, { useEffect, useState } from "react";
import {
  setOrderItem
} from "../../../../../redux/Features/BillingDataSlice";
import { useDispatch, useSelector } from "react-redux";
interface SelectTableComponentsProps {
  setIsPriceModalOpen: any;
  cardItemData: any;
  allMenuPriceData: any;
  setAllMenuPriceData: any;
  selectedTab: any;
}
const PriceDialog: React.FC<SelectTableComponentsProps> = ({
  setIsPriceModalOpen,
  cardItemData,
  allMenuPriceData,
  setAllMenuPriceData,
  selectedTab,
}) => {
  const [addPrice, setAddPrice] = useState<number>();
  const dispatch=useDispatch()
  const getTaxPrice = () => {
    return (cardItemData?.backward_taxes)?.reduce((total: number, item: any) => {
      const itemPrice = Number(addPrice);
      const taxAmount =
        item?.tax_value === "percentage"
          ? ((itemPrice * Number(item?.amount)) / 100)
          : Number(item?.amount);
      return Number(total) - Number(taxAmount);
    }, 0);
  };

  const handleItemSave = () => {
    // debugger
    setAllMenuPriceData((prevItems: any) => {
      if (!Array.isArray(prevItems)) {
        return [{ ...cardItemData, price: addPrice ? Number(addPrice) : Number(0) + getTaxPrice() }];
      }
      const isItemAlreadyAdded = prevItems.some(
        (item: any) => item.id === cardItemData.id
      );
      if (isItemAlreadyAdded) {
        return prevItems.map((item: any) => {
          if (item.id === cardItemData.id) {
            return {
              ...item,
              price: addPrice ? Number(addPrice) : Number(0) + getTaxPrice(),
            };
          }
          return item;
        });
      } else {
        return [...prevItems, { ...cardItemData, price: addPrice ? Number(addPrice) : Number(0) + getTaxPrice() }];
      }
    });
let items={...cardItemData,price: addPrice ? Number(addPrice) : Number(0) + getTaxPrice()}

dispatch(setOrderItem(items))
    setIsPriceModalOpen(false);
  };


  return (
    <div className="p-4 mx-auto rounded-lg ">
      {" "}
      <div className="mb-4 flex items-center gap-12">
        {" "}
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Price
        </label>{" "}
        <input
          type="text"
          // value={price}
          // value={0}
          defaultValue={addPrice ?? Number(0)}
          onChange={(e) => setAddPrice(Number(e.target.value))}
          // onChange={(val) => priceValue(val)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />{" "}
      </div>
      <div className="flex justify-end items-center border-t pt-4 gap-3">
        <button
          className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
          onClick={() => setIsPriceModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-full transition-colors"
          onClick={handleItemSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PriceDialog;