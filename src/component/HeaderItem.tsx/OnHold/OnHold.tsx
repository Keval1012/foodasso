import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { deleteHoldOrder, getTableWiseOrder } from "../../../Api/Api";
import { setExistsItems, setTablewiseOrer } from "../../../redux/Features/BillingDataSlice";

import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface HoldOrderDataProps {
  holdOrderList: any;
  fetchHoldOrders: any;
}

const OnHold: React.FC<HoldOrderDataProps> = ({ holdOrderList, fetchHoldOrders }) => {
const dispatch=useDispatch() 
const navigate=useNavigate() 
  const handleDiscard = async (id: any) => {
    if (id) {
      try {
        const res = await deleteHoldOrder(id);
        if (res?.status === 200) {
          fetchHoldOrders();
          console.log(res);
        }
      } catch (error) {}
    }
  };
const handleditOrder=async(h?: any)=>{
  console.log(h,"hhhhhhhhhhhhh")
try{
 
  let data = {
    order: h.id,
  };
  const res = await getTableWiseOrder(data);
  // if (res.status === 200) {
  //   dispatch(setTablewiseOrer(res.data?.data));
  // }
  console.log(res,"true")
  
  navigate("/selectTable", {
    state: {
      areaType: res.data.data.order_area_type,
      tableId: res.data.data.table_no,
      tableOrderId: res.data.data.id,
      tableDetails: h,
      areaTypeId: res.data.data.order_area_type,
    },
  }); 
}catch(err){
  console.log(err)
}
  
}
  return (
    <>
      {holdOrderList?.map((h: any, index: any) => (
        <div className=" border border-gray-200 my-3 mx-2 rounded-md text-xs flex flex-col" onClick={()=>handleditOrder(h)}>
          <div className="flex flex-col justify-between gap-3 p-3 cursor-pointer">
            <div className="flex justify-between">
              <p>Hold no : {index + 1}</p>
              <div className="flex gap-1">
                <p className="flex justify-center items-center gap-1">
                  <IoCalendarOutline />
                  {/* 2024-05-25 */}
                  {dayjs(new Date(h?.create_time)).format("DD-MM-YYYY")}
                </p>
                {/* <p>18:35:56</p> */}
                <p>{dayjs(new Date(h?.create_time)).format("HH:mm:ss")}</p>
              </div>
            </div>
            <div className=" flex justify-between ">
              <p>table no : {h?.table}</p>
              <p className="font-bold">₹ {h?.grand_total}</p>
            </div>
            <div className="">
              <p>----|----</p>
            </div>
          </div>
          <div className="">
            <div className="bg-gray-200 rounded-b-md p-3 flex justify-between">
              <div className="">
                <p>Kept on hold by</p>
                <p>{h?.biller_name}</p>
              </div>
              <div className="">
                <button
                  className="px-2 py-1 bg-white rounded-full"
                  onClick={() => handleDiscard(h?.id)}
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div className=" border border-gray-200 my-3 mx-2 rounded-md text-xs flex flex-col">
        <div className="flex flex-col justify-between gap-3 p-3">
          <div className="flex justify-between">
            <p>Hold no : 4</p>
            <div className="flex gap-1">
              <p className="flex justify-center items-center gap-1">
                <IoCalendarOutline />
                2024-05-25
              </p>
              <p>18:35:56</p>
            </div>
          </div>
          <div className=" flex justify-between ">
            <p>table no : 01</p>
            <p className="font-bold">₹300.00</p>
          </div>
          <div className="">
            <p>----|----</p>
          </div>
        </div>
        <div className="">
          <div className="bg-gray-200 rounded-b-md p-3 flex justify-between">
            <div className="">
              <p>Kept on hold by</p>
              <p>Billar</p>
            </div>
            <div className="">
              <button
                className="px-2 py-1 bg-white rounded-full"
                onClick={() => handleDiscard(1)}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OnHold;
