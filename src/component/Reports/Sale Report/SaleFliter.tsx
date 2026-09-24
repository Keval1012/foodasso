import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { seSelsReport } from "../../../redux/Features/BillingDataSlice";
import { useSelector,useDispatch } from "react-redux";
import { getSalesReport } from "../../../Api/Api";
import toast, { Toaster } from 'react-hot-toast';
interface ChildProps{
  getDates:any
}
const ItemFliter: React.FC<ChildProps> = ({getDates}) => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // This gets the date part (YYYY-MM-DD)
  };
  const [loading,setLoading]=useState(false)
  const [startdate,setstartdate]=useState(getCurrentDate())
  const [enddata,setEndDate]=useState("")
  const dispatch=useDispatch()
  const {  loginUserData } =
  useSelector((state: any) => state.billingData) ?? {};
  const handleSearch = async () => {
    try {
      const payload = {
        start: 0,
        limit: 20,
        outlet_id:loginUserData.outlet,
        start_date:startdate,
        end_date:enddata,
      };
      if(startdate)
        Object.assign(payload,{start_date:startdate})
      if(enddata)
        Object.assign(payload,{enddata:enddata})
      getDates(payload)
      let response: any = await getSalesReport(payload);
      if (response.status==200) {
        console.log(response,"responseresponse")
        const payload={
          records:response.data.data,
          count:response.data.total_count
        }
        dispatch(seSelsReport(payload))
      }
    } catch (error:any) {
      console.log(error,"errorerror")
      toast.error(error?.response?.data?.errors)
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handlereset=()=>{
    setstartdate(getCurrentDate())
    setEndDate("")
    handleSearch()
  }
  useEffect(()=>{
    handleSearch()
  },[startdate,enddata])
  return (
    <div className="p-4 border rounded-md">
            <div className="flex gap-4">
    <div className="flex items-center gap-2">
        <input type="radio" name="frequency" />
        <label htmlFor="">Custom</label>
    </div>
    <div className="flex items-center gap-2">
        <input type="radio" name="frequency" />
        <label htmlFor="">Daily</label>
    </div>
</div>
      <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {/* KOT No. */}
    

        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="date"
            value={startdate}
            onChange={(e)=>setstartdate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter KOT No."
          />
        </div>

        {/* Table No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            value={enddata}
            onChange={(e)=>setEndDate(e.target.value)}

            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter Table No."
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Type
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div> */}
{/* 
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order Type
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div> */}

        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Print Order
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sub Total
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biller
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Order Status
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Show Total Row
          </label>
          <select className="w-full mt-1 p-3 border border-gray-300 rounded-md">
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div> */}
        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
          onClick={handlereset}
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
          >
            Reset
          </button>
          <button
        onClick={handleSearch}
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none "
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFliter;
function fetchReportData() {
  throw new Error("Function not implemented.");
}

