import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { setOrderItem } from "../../../../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";
interface ToppingEntry {
  idx: number;
  [key: string]: number; // Allows for dynamic keys (like 'egg' or 'Non Veg')
}

// Type for the overall toppings structure
interface Toppings {
  [key: string]: ToppingEntry[]; // Keys are topping names, values are arrays of ToppingEntry
  index?: any; // Optional, since it's not always present
  idx?: any; // Optional, since it's not always present
}
// Type definitions for props and data structures
interface Tax {
  tax_value: string;
  amount: number;
}

interface AddOnDetail {
  id: string;
  attribute_name: string;
  price: number;
}

interface AddOn {
  department_name: string;
  add_on_details: AddOnDetail[];
}

interface MenuItemVariation {
  id: string;
  variation_name: string;
  price: number;
  add_on?: AddOn[];
}

interface CardItemData {
  id: string;
  backward_taxes?: Tax[];
}

interface SelectTableComponentsProps {
  setIsVariationModalOpen: (isOpen: boolean) => void;
  cardItemData: CardItemData;
  menuItemsVariationData: MenuItemVariation[];
  allMenuVariatioData: any;
  setAllMenuVariationData: (data: any) => void;
}

const VariationDialog: React.FC<SelectTableComponentsProps> = ({
  setIsVariationModalOpen,
  cardItemData,
  menuItemsVariationData,
  allMenuVariatioData,
  setAllMenuVariationData,
}) => {
  const [toppings, setToppings] = useState<Toppings>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const handleVariationChange = (price: number, addOn: AddOn[] | undefined) => {
    setTotalPrice(Number(price)); // Ensure price is treated as a number
    setSelectedAddOns(addOn || []);
  };

  const handleToppingChange = (
    topping: string,
    operation: "increment" | "decrement",
    price: number,
    index: number,
    idx: number,
    virectionid:any
  ) => {
    setToppings((prevToppings: any) => {
      const updatedCount = operation === "increment" ? 1 : -1;
      const updatedToppingEntry = {
        ['virectionid']:virectionid,
        idx,
        [topping]:
          (prevToppings[topping]?.find((entry: any) => entry.idx === idx)?.[
            topping
          ] || 0) + updatedCount,
      };

      return {
        ...prevToppings,
        [topping]: [
          ...(prevToppings[topping]?.filter(
            (entry: any) => entry.idx !== idx
          ) || []), // Preserve existing entries except the one we update
          updatedToppingEntry,
        ],
        index,
        idx,
      };
    });

    setTotalPrice(
      (prevPrice) =>
        Number(prevPrice) + (operation === "increment" ? price : -price)
    );
    console.log(toppings,"toppingtopping")
  };
const dispatch=useDispatch()
  const getTaxPrice = () => {
    return (
      cardItemData?.backward_taxes?.reduce((total: number, tax: Tax) => {
        const taxAmount =
          tax.tax_value === "percentage"
            ? (totalPrice * tax.amount) / 100
            : Number(tax.amount);
        return Number(total) - Number(taxAmount);
      }, 0) || 0
    );
  };

  const handleItemSave = () => {
    setAllMenuVariationData((prevItems: any) => {
      const isItemAlreadyAdded =
        Array.isArray(prevItems) &&
        prevItems.some((item: any) => item.id === cardItemData.id);

      const updatedItem = {
        ...cardItemData,
        variationDetails: {
          menuItemsVariationData,
          variationToppings:convertToVariationAddOnDetails(toppings),
          // totalAddOnPrice: totalPrice + getTaxPrice(),
          totalAddOnPrice: totalPrice,
        },
      };

      return isItemAlreadyAdded
        ? prevItems.map((item: any) =>
            item.id === cardItemData.id ? updatedItem : item
          )
        : [...(Array.isArray(prevItems) ? prevItems : []), updatedItem];
    });
    let items={   ...cardItemData,
      variationDetails: {
        menuItemsVariationData,
        variationToppings:convertToVariationAddOnDetails(toppings),
        // totalAddOnPrice: totalPrice + getTaxPrice(),
        totalAddOnPrice: totalPrice,
      }, }

    dispatch(setOrderItem(items))
    setIsVariationModalOpen(false);
  };
  // console.log(
  //   menuItemsVariationData,
  //   "menuItemsVariationDatamenuItemsVariationData"
  // );

  
  const convertToVariationAddOnDetails = (data:any) => {
    const variationAddOnDetails:any = [];
  
    // Iterate through each key in the data object
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item: { [x: string]: any; virectionid: undefined; idx: number; }) => {
          // Check if item has required properties
          if (item.virectionid !== undefined && item[key] !== undefined) {
            variationAddOnDetails.push({
              detail_id:  item[key],// or any unique identifier you need
              addon_item: item.virectionid,
              quantity: item.idx + 1 // Adjust based on your needs
            });
          }
        });
      }
    });
  
    return variationAddOnDetails;
  };



  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md ">
      <div className="variation-options mb-4 flex gap-6">
        {menuItemsVariationData.map((variation, idx) => (
          <button
            key={idx}
            className={`py-2 px-5 rounded-md border ${
              variation.variation_name === "Small"
                ? "bg-orange-500 text-white"
                : "border-gray-300 text-gray-900"
            }`}
            onClick={() =>
              handleVariationChange(variation.price, variation.add_on)
            }
          >
            {variation.variation_name} - ₹ {variation.price}
          </button>
        ))}
      </div>

      <div className="add-on-options mb-4">
        {selectedAddOns.map((addOn, idx) => (
          <div key={idx}>
            <h2 className="text-lg font-semibold mb-2">
              {addOn.department_name}
            </h2>
            <div className="space-y-2  justify-center items-center">
              {addOn.add_on_details.map((detail, index) => (
                <div
                  key={detail.id}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                >
                  <span>
                    {detail.attribute_name} (₹ {detail.price})
                  </span>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-white text-red-500 rounded-l-md"
                      onClick={() =>
                        handleToppingChange(
                          detail.attribute_name,
                          "decrement",
                          Number(detail.price),
                          index,
                          idx,
                          detail.id
                        )
                      }
                    >
                      <FiMinus />
                    </button>

                    <span>
                      {toppings[detail.attribute_name]?.[idx]?.[
                        detail.attribute_name
                      ] !== undefined
                        ? toppings[detail.attribute_name][idx][
                            detail.attribute_name
                          ]
                        : "0"}
                    </span>

                    {/* <span>{toppings?.attribute_name[idx]?.attribute_name}</span> */}

                    <button
                      className="px-2 py-1 bg-white text-green-500 rounded-r-md"
                      onClick={() =>
                        handleToppingChange(
                          detail.attribute_name,
                          "increment",
                          Number(detail.price),
                          index,
                          idx,
                          detail.id

                        )
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center border-t pt-4">
        <span className="text-lg font-semibold mr-2">
          ₹ {totalPrice + getTaxPrice()}
        </span>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsVariationModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={handleItemSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariationDialog;
