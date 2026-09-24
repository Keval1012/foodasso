import React, { useEffect, useState } from "react";
import { getTabelArea, moveKotTableWise } from "../../../Api/Api";
import { setKotData } from "../../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";
import { getTables } from "../../../Api/Api";
import { setTableData } from "../../../redux/Features/BillingDataSlice";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
interface MainKotDataProps {
  selectedTab: any;
  setDialogOpen: any;
}
const TableWise: React.FC<MainKotDataProps> = ({
  selectedTab,
  setDialogOpen,
}) => {
  const navigate = useNavigate();
  const [tableWiseList, setTableWiseList] = useState([]);
const [id,setid]=useState("")
const [isrunning,setisrunning]=useState(false)
const [tableno,settableno]=useState("")
const dispatch=useDispatch()
const [input,setinput]=useState("")
const movetable=(val:any,t:any)=>{

  setinput(val.table_no)
  setid(t.id)
  setisrunning(val.is_running)
  settableno(val.table_no)
}
  useEffect(() => {
    if (selectedTab === null || selectedTab === "Table Wise") fetchTableArea();
  }, [selectedTab]);

  const fetchTableArea = async () => {
    let data = {
      outlet_id: "1",
    };

    try {
      const res = await getTabelArea(data);
      if (res.status === 201) {
        setTableWiseList(res.data?.data);
        dispatch(setKotData(res.data?.data))
      }
    } catch (error) {}
  };


  const handleMoveKot_Items = async () => {
    const kotdetails:any=localStorage.getItem("tabledetail")
    let data:any = {
      new_table_no:tableno,
      order_id:JSON.parse(kotdetails).order_id,
      table_area_id:id,
    };
    try {
      const res = await moveKotTableWise(data);
      toast.success('success')
      await fetchTableData()
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
  return (
    <>
    <div className="p-4">
      {/* Responsive input field */}
      <div className="flex items-center mt-1 gap-7 flex-wrap">
        <label htmlFor="phone" className="text-gray-700">
          Table No:
        </label>
        <input
          id="phone"
          type="text"
          placeholder=""
          value={input}
          className="w-full md:w-[300px] p-2 border border-gray-300 rounded-md outline-none"
        />
      </div>

      {tableWiseList?.map((t: any) => (
        <div key={t?.id} className="gap-4 mt-4">
          <p className="text-xl text-[#DD312F] pl-2 md:pl-10 pt-5">
            {t?.area_name}
          </p>
          <div className="grid  grid-cols-3 gap-10 ml-2 mb-6">
            {t?.tables?.map((table: any) => (
              <div  onClick={()=>movetable(table,t)} className="w-full relative flex items-center gap-3" key={table?.table_no}>
                <span
                  className={` w-10 h-[5rem] pl-4 bg-gray-400 rounded-l-full -left-6 md:-left-12`}
                ></span>

                <div
                  className={`w-24 h-18 md:w-32 md:h-24 border-l-8 border-gray-400 shadow-md rounded-lg flex justify-center items-center flex-col text-sm cursor-pointer`}
                >
                  <h1>{table?.table_no}</h1>
                </div>
                <span
                  className={` left-[100px] md:left-[137px] w-10 h-[5rem] pr-4 bg-gray-400 rounded-r-full`}
                ></span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Responsive buttons */}
    </div>
      <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t  border-gray-200 rounded-b-lg">
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
      </>
  );
};

export default TableWise;
