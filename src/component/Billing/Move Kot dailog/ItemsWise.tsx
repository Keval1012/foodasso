import React, { useEffect, useState } from "react";

import { FiPrinter } from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { getItemArea, getKotArea, moveKotItemWise } from "../../../Api/Api";
import { useSelector,useDispatch } from "react-redux";
import { getTables } from "../../../Api/Api";
import { setTableData } from "../../../redux/Features/BillingDataSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

interface MainKotDataProps {
  selectedTab: any;
  setDialogOpen: any;
}
interface Item {
  id: string;
  item_name: string;
  quantity: string;
  menu_item: string;
}

interface KotItem {
  id: string;
  kot_no: string;
  items: Item[]; // Array of items for each KOT
} 
const ItemsWise: React.FC<MainKotDataProps> = ({
  selectedTab,
  setDialogOpen,
}) => {
  const navigate = useNavigate();
  const [itemWiseList, setItemWiseList] = useState<KotItem[]>([]);
  const tabledata = useSelector((state: any) => state.billingData.kotData);
  const dispatch=useDispatch()
  useEffect(() => {
    if (selectedTab === "Item Wise") fetchItemArea();
  }, [selectedTab]);

  const fetchItemArea = async () => {
    let getid: any = localStorage.getItem("tabledetail");
    let id = JSON.parse(getid);
    let payload = {
      order: id.order_id,
    };
    try {
      const res = await getItemArea(payload);
      if (res.status === 200) {
        setItemWiseList(res.data?.data);
      }
    } catch (error) {}
  };


  const [selectedItems, setSelectedItems] = useState<{ selected_items: { item_detail_id: string, menu_item_id: string }[] }>({ selected_items: [] });
  
  const handleMoveKot_Items = async () => {
    const kotdetails: any = localStorage.getItem("tabledetail");


// Iterate over the itemWiseList to match menu_item and update quantities
const updatedSelectedItems:any = [...selectedItems.selected_items];



itemWiseList.forEach((kot:any) => {
  kot.items.forEach((item:any) => {
    const existingItemIndex = updatedSelectedItems.findIndex(
      (selectedItem:any) => selectedItem.menu_item_id === item.menu_item
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      updatedSelectedItems[existingItemIndex] = {
        ...updatedSelectedItems[existingItemIndex],
        quantity: item.quantity, // Add the new quantity
      };
    }
  });
});
// Update the state with the new selected items
await setSelectedItems({ selected_items: updatedSelectedItems });


    let data = {
      is_all:false,
      order: JSON.parse(kotdetails).order_id,
      table_no: input,
      order_area_type:tableno,
      selected_items:updatedSelectedItems,
      kitchen: "1",
    };
    if(itemWiseList[0].items.length===selectedItems.selected_items.length){
      Object.assign(data,{is_all:true}) 
     }
     console.log(data,"datadatadata")

    try {
      const res = await moveKotItemWise(data);
      await fetchTableData()
      toast.success('success')
      console.log(res);
      navigate("/refresh");
    } catch (error) {}
  };
  const fetchTableData = async () => {
    const userTableData = {
      outlet: 1, kitchen: 1
    };
    const res = await getTables(userTableData);
    if (res?.status === 201) {
      dispatch(setTableData(res?.data?.data));
    }
  };
  const [id, setId] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [tableno, setTableno] = useState<any>("");
  const [input, setInput] = useState("");
const [name,setname]=useState()
  const moveTable = (val: any,name:any) => {
    setname(name);
    setInput(val.table_no);
    setId(val.id);
    setIsRunning(val.is_running);
    setTableno(name.id);
  };

  const handleCheckboxChange = (kot: any) => {
    const newSelectedItems = [...selectedItems.selected_items];
  
    // Check if the item is already selected
    const isSelected = newSelectedItems.some(
      (selectedItem) => selectedItem.item_detail_id === kot.id
    );
  
    if (isSelected) {
      // If the item is already selected, remove it
      const index = newSelectedItems.findIndex(
        (selectedItem) => selectedItem.item_detail_id === kot.id
      );
      newSelectedItems.splice(index, 1);
    } else {
      // If not selected, add it to the selected items
      newSelectedItems.push({
        item_detail_id: kot.id,
        menu_item_id: kot.menu_item
      });
    }
    setSelectedItems({ selected_items: newSelectedItems });
  };
  
    const handleIncrement = (kotId: string, itemId: string) => {
      setItemWiseList((prevList) =>
        prevList.map((kot) =>
          kot.id === itemId
            ? {
                ...kot,
                items: kot.items.map((item:any) =>
                  item.id === kotId
                    ? { ...item, quantity: parseInt(item.quantity) + 1 }
                    : item
                ),
              }
            : kot
        )
      );
    };
  
    const handleDecrement = (kotId: string, itemId: string) => {
      setItemWiseList((prevList) =>
        prevList.map((kot) =>
          kot.id === itemId
            ? {
                ...kot,
                items: kot.items.map((item:any) =>
                  item.id === kotId && item.quantity > 0
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              }
            : kot
        )
      );
    };
  return (
    <div className="container py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table No.
            </label>
            <input
              type="text"
              value={input}
              className="border border-gray-300 rounded p-2 outline-none"
            />
          </div>

          {itemWiseList?.map((item: any) => (
            <table className="min-w-full border-collapse" key={item?.id}>
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-2 py-2 text-white text-left font-semibold">
                    <div className="p-2 rounded-md flex justify-between items-center">
                      <span className="text-white text-sm font-semibold">
                        KOT No. : {item?.kot_no}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {item?.items?.map((i: any) => (
                  <tr key={i?.id}>
                    <td className="flex justify-between">
                      <div className="p-3 rounded-md flex justify-start items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-gray-600 border-gray-500"
                          checked={
                            i.items && i.items.every((item: { id: string }) =>
                              selectedItems.selected_items.some(
                                (selectedItem) => selectedItem.item_detail_id === item.id
                              )
                            )
                          }
                          onChange={() => handleCheckboxChange(i)}
                        />
                        <p className="text-gray-600 text-sm">{i?.item_name}</p>
                      </div>
               {/* <div className="flex justify-center gap-2 items-center">
               <button onClick={()=>handleIncrement(i.id, item.id)}>+</button>
                      <div className="">{parseInt(i.quantity)}</div>
                      <button onClick={()=>handleDecrement(i.id, item.id)}>-</button>
               </div> */}
               <div className="flex items-center space-x-2">
      {/* Decrement Button */}
      <button
     onClick={()=>handleDecrement(i.id, item.id)}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
      >
        -
      </button>

      {/* Counter Display */}
      <div className="w-12 h-8 flex items-center justify-center border border-gray-300 rounded text-lg font-medium text-gray-700">
      {parseInt(i.quantity)}
      </div>

      {/* Increment Button */}
      <button
     onClick={()=>handleIncrement(i.id, item.id)}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
      >
        +
      </button>
    </div>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        <div className="gap-4 mt-4">
          <div className="gap-10 ml-2 mb-6">
            {tabledata?.map((t: any) => (
              <div key={t?.id} className="gap-4 mt-4">
                <p className="text-xl text-[#DD312F] pl-2 md:pl-10 pt-5">
                  {t?.area_name}
                </p>
                <div className="grid grid-cols-2 gap-10 ml-2 mb-6">
                  {t?.tables?.map((table: any) => (
                    <div
                      onClick={() => moveTable(table,t)}
                      className="w-full relative flex items-center gap-3"
                      key={table?.table_no}
                    >
                      <span
                        className="w-10 h-[5rem] pl-4 bg-gray-400 rounded-l-full -left-6 md:-left-12"
                      ></span>
                      <div
                        className="w-24 h-18 md:w-32 md:h-24 border-l-8 border-gray-400 shadow-md rounded-lg flex justify-center items-center flex-col text-sm cursor-pointer"
                      >
                        <h1>{table?.table_no}</h1>
                      </div>
                      <span
                        className="left-[100px] md:left-[137px] w-10 h-[5rem] pr-4 bg-gray-400 rounded-r-full"
                      ></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-3 px-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
        <button
          className="px-3 py-1 text-gray-600 border border-gray-300 rounded-full"
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 text-white bg-green-500 rounded-full"
          onClick={handleMoveKot_Items}
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default ItemsWise;
