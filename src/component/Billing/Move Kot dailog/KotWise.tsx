import React, { useEffect, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { getKotArea, moveKot_KotWise } from "../../../Api/Api";
import { useSelector,useDispatch } from "react-redux";
import { getTables } from "../../../Api/Api";
import { setTableData } from "../../../redux/Features/BillingDataSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

interface MainKotDataProps {
  selectedTab: any;
  setDialogOpen: any;
}

const KotWise: React.FC<MainKotDataProps> = ({ selectedTab, setDialogOpen }) => {
  const navigate = useNavigate();
  const [kotWiseList, setKotWiseList] = useState([]);
  const [id, setid] = useState("");
  const [isrunning, setisrunning] = useState(false);
  const [tableno, settableno] = useState("");
  const [input, setinput] = useState("");
  const [name, setname] = useState("");
  const [selectedItems, setSelectedItems] = useState<{ selected_items: {quantity:any, item_detail_id: string, menu_item_id: string }[] }>({ selected_items: [] });

  const tabledata = useSelector((state: any) => state.billingData.kotData);
const dispatch=useDispatch()
  useEffect(() => {
    if (selectedTab === "KOT Wise") fetchKotArea();
  }, [selectedTab]);

  const fetchKotArea = async () => {
    let getid: any = localStorage.getItem("tabledetail");
    let id = JSON.parse(getid);
    let payload = {
      order: id.order_id,
    };

    try {
      const res = await getKotArea(payload);
      if (res.status === 200) {
        setKotWiseList(res.data?.data);
      }
    } catch (error) {}
  };

  const handleMoveKot_Items = async () => {
    console.log(selectedItems,"selectedItems")
    const kotdetails: any = localStorage.getItem("tabledetail");
    console.log(JSON.parse(kotdetails))
    let data = {
      is_all: "false",
      order: JSON.parse(kotdetails).order_id,
      table_no: input,
      order_area_type:tableno,
      selected_items: selectedItems.selected_items
      ,
      kitchen: "1",
    };
    try {
      const res = await moveKot_KotWise(data);
      await fetchTableData()
      toast.success('success');
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
  const movetable = (val: any, name: any) => {

    console.log(val,"valval")
    setname(name);
    setinput(val.table_no);
    setid(val.id);
    setisrunning(val.is_running);
    settableno(name.id);
  };

  const handleCheckboxChange = (kot: any) => {
    console.log(kot,"kotkot")
    const newSelectedItems = [...selectedItems.selected_items];
  
    kot.items.forEach((item: any) => {
      const isSelected = newSelectedItems.some(
        (selectedItem) => selectedItem.item_detail_id === item.id
      );
  
      if (isSelected) {
        // If the item is already selected, remove it
        const index = newSelectedItems.findIndex(
          (selectedItem) => selectedItem.item_detail_id === item.id
        );
        newSelectedItems.splice(index, 1);
      } else {
     
        newSelectedItems.push({
          item_detail_id: item.id,
          menu_item_id: item.menu_item,
          quantity: item.quantity 
        });
      }
    });
    setSelectedItems({ selected_items: newSelectedItems });
  };
  return (
    <div className="container py-3">
      {/* Grid layout for two sections: KOT details and action buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Left Column: Table Input & KOT Card */}
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

          {/* KOT No. Card */}
          {kotWiseList?.map((kot: any) => (
            <table className="min-w-full border-collapse" key={kot?.id}>
              <thead>
                <tr className="bg-gray-600">
                  <th className="px-2 py-1 text-white text-left font-semibold">
                    <div className="p-2 rounded-md flex justify-between items-center">
                      <span className="text-white text-sm font-semibold">
                        KOT No. : {kot?.kot_no}
                      </span>
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-gray-600 border-gray-500"
                        checked={kot.items.every((item: { id: string; }) =>
                          selectedItems.selected_items.some(
                            (selectedItem) => selectedItem.item_detail_id === item.id
                          )
                        )}
                        onChange={() => handleCheckboxChange(kot)}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {kot?.items?.map((item: any) => (
                  <tr key={item?.id}>
                    <td>
                      <div className="bg-gray-100 rounded-md p-4">
                        <p className="text-gray-600 text-sm">{item?.item_name}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        {/* Right Column: Icons and Table List */}
        <div className="gap-4 mt-4">
          <div className="gap-10 ml-2 mb-6">
            {tabledata?.map((t: any) => (
              <div key={t?.id} className="gap-4 mt-4">
                <p className="text-xl text-[#DD312F] pl-2 md:pl-10 pt-5">{t?.area_name}</p>
                <div className="grid grid-cols-2 gap-10 ml-2 mb-6">
                  {t?.tables?.map((table: any) => (
                    <div
                      className="w-full relative flex items-center gap-3"
                      key={table?.table_no}
                      onClick={() => movetable(table, t)}
                    >
                      <span className="w-10 h-[5rem] pl-4 bg-gray-400 rounded-l-full -left-6 md:-left-12"></span>
                      <div className="w-24 h-18 md:w-32 md:h-24 border-l-8 border-gray-400 shadow-md rounded-lg flex justify-center items-center flex-col text-sm cursor-pointer">
                        <h1>{table?.table_no}</h1>
                      </div>
                      <span className="left-[100px] md:left-[137px] w-10 h-[5rem] pr-4 bg-gray-400 rounded-r-full"></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
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

export default KotWise;
