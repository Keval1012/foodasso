import React, { useEffect, useState } from "react";
import { setOrderItem } from "../../../../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";

interface SelectTableComponentsProps {
  setIsSimpleModalOpen: any;
  cardItemData: any;
  addOnData: any;
  allMenuAddOnData: any;
  setAllMenuAddOnData: any;
}

const SimpleDialog: React.FC<SelectTableComponentsProps> = ({ setIsSimpleModalOpen, cardItemData, addOnData, allMenuAddOnData, setAllMenuAddOnData }) => {

  console.log('addFinal', addOnData);
  // console.log('simpleMenuADDON', allMenuAddOnData);

  // const departments = [
  //   { id: 1, department_name: 'fdg', add_on_details: [{ id: 1, name: 'a', price: '250.00' }, { id: 2, name: 'asd', price: '2250.00' }] },
  //   { id: 2, department_name: 'gd', add_on_details: [{ id: 1, name: 'sf', price: '50.00' }, { id: 2, name: 'fsasd', price: '2650.00' }] }
  // ];

  // const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]); // State to store selected add-ons

  // const handleAddOnSelect = (addOn: any) => {
  //   setSelectedAddOns((prevSelected: any) => {
  //     if (prevSelected.some((item: any) => item.id === addOn.id)) {
  //       return prevSelected.filter((item: any) => item.id !== addOn.id);
  //     }
  //     return [...prevSelected, addOn];
  //   });
  // };


  const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]);
  // const [saveAddOnItem, setSaveAddOnItem] = useState<any>();
  const [totalAddOnPrice, setTotalAddOnPrice] = useState<any>();
const dispatch =useDispatch()
  const handleAddOnSelect = (addOn: any) => {
    // const isSelected = selectedAddOns.some((item) => item.id === addOn.id);
    // if (!isSelected) {
    //   setSelectedAddOns([...selectedAddOns, addOn]);
    // }

    setSelectedAddOns([addOn]);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedAddOns, allMenuAddOnData]); 

  const calculateTotalPrice = () => {
    const cardItem = [cardItemData];
    
    const menuPrice = cardItem.reduce((total: number, o: any) => {
      return total + parseFloat(o?.price || 0);
    }, 0);

    const selectedAddOnsPrice = selectedAddOns.reduce((total: number, addOn: any) => {
      return total + parseFloat(addOn?.price || 0);
    }, 0);

    setTotalAddOnPrice(menuPrice + selectedAddOnsPrice);
  };

  // const totalPrice = addOnData.reduce((total: any, department: any) => {
  //   const departmentTotal = department?.add_on_details.reduce((deptTotal: any, addOn: any) => {
  //     return deptTotal + parseFloat(addOn.price);
  //   }, 0);
  //   return total + departmentTotal;
  // }, 0);

  const getTaxPrice = () => {
    return cardItemData?.backward_taxes?.reduce((total: number, item: any) => {
      const itemPrice = Number(totalAddOnPrice);
      const taxAmount =
        item?.tax_value === "percentage"
          ? (itemPrice * Number(item?.amount)) / 100
          : Number(item?.amount);
      return Number(total) - Number(taxAmount);
    }, 0);
  };

  const handleItemSave = () => {
    // setAllMenuAddOnData({ ...allMenuAddOnData, addOnDetails: { selectedAddOns, totalAddOnPrice: totalAddOnPrice } });
    // setAllMenuAddOnData((prevItems: any) => {
    //   return prevItems.map((item: any) => {
    //     return {
    //       ...item,
    //       addOnDetails: { selectedAddOns, totalAddOnPrice: totalAddOnPrice }
    //     };
    //   });
    // });

    setAllMenuAddOnData((prevCardItemData: any) => {
      if (!Array.isArray(prevCardItemData)) {
        // return [{ ...cardItemData, price: totalAddOnPrice, addOnDetails: { selectedAddOns, totalAddOnPrice } }];
        return [{ ...cardItemData, price: totalAddOnPrice, addOnDetails: { selectedAddOns, totalAddOnPrice: totalAddOnPrice + getTaxPrice() } }];
      }
      const isItemAlreadyAdded = prevCardItemData.some((item: any) => item.id === cardItemData.id);
      if (isItemAlreadyAdded) {
        return prevCardItemData.map((item: any) => {
          if (item.id === cardItemData.id) {
            return {
              ...item,
              price: totalAddOnPrice,
              // addOnDetails: { selectedAddOns, totalAddOnPrice },
              addOnDetails: { selectedAddOns, totalAddOnPrice: totalAddOnPrice + getTaxPrice() },
            };
          }
          return item;
        });
      } else {
        // return [...prevCardItemData, { ...cardItemData, price: totalAddOnPrice + getTaxPrice(), addOnDetails: { selectedAddOns, totalAddOnPrice } }];
        return [...prevCardItemData, { ...cardItemData, price: totalAddOnPrice, addOnDetails: { selectedAddOns, totalAddOnPrice: totalAddOnPrice + getTaxPrice() } }];
      }
 
    });
    let items={ ...cardItemData, price: totalAddOnPrice, addOnDetails: { selectedAddOns, totalAddOnPrice: totalAddOnPrice + getTaxPrice() } }

    dispatch(setOrderItem(items))
    setIsSimpleModalOpen(false);
  };

  return (
    <div>
      <div className="max-w-lg mx-auto">
        {/* Search Input */}
        {/* Scrollable Item Category */}
        <div className="overflow-y-auto h-52">
          {/* Set the height and enable vertical scroll */}
          {/* Item List */}
          {addOnData.map((department: any) => (
            <>
              <div className="p-4">
                <h2 className="font-semibold text-lg">{department?.department_name}</h2>
              </div>
              {(department?.add_on_details).map((addOn: any) => (
                <div
                  className="flex items-center mb-3 p-4"
                  key={addOn?.id}
                  // className={`flex items-center mb-3 p-4 ${selectedAddOns.some((item) => item.id === addOn.id) ? 'bg-gray-200' : ''}`}
                  // onClick={() => handleAddOnSelect(addOn)}
                  >
                  <div className=" p-4 border-2 border-gray-300  rounded-lg flex flex-col items-center cursor-pointer transition-shadow w-40" onClick={() => handleAddOnSelect(addOn)}>
                    <span className="text-sm font-semibold text-gray-700">
                      {addOn?.attribute_name}
                    </span>
                    <span className="text-sm mt-2 text-black font-bold">₹ {addOn?.price}</span>
                  </div>
                </div>
              ))}
            </>
          ))}
          
        </div>

        {/* Footer with Total and Buttons */}
        <div className="flex justify-end items-center border-t p-4">
          {/* <span className="text-lg font-semibold mr-2">₹ {totalPrice.toFixed(2)}</span> */}
          {/* <span className="text-lg font-semibold mr-2">₹ {calculateTotalPrice().toFixed(2)}</span> */}
          <span className="text-lg font-semibold mr-2">₹ {totalAddOnPrice ? totalAddOnPrice.toFixed(2) : '0.00'}</span>
          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100" onClick={() => setIsSimpleModalOpen(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-full transition-colors" onClick={handleItemSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDialog;
