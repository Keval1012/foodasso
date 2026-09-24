import React, { useState,useEffect } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import Delivary from "../../../Styles/assets/img/pick.svg";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoPrint,
  IoSearchOutline,
} from "react-icons/io5";
import { TbPaperBag } from "react-icons/tb";
import MoreInfoDialog from "./MoreInfoModel/MoreInfoDailog";
import { getLiveOrderDetails, getTableWiseOrder } from "../../../Api/Api";
import { Timer } from "../../../constants/Timer";
import { useNavigate } from "react-router-dom";
import LiverOrderform from "../UpperTabs/Tabscomponents/LiverOrderform";
import { paymentpopup, setTablewiseOrer } from "../../../redux/Features/BillingDataSlice";
import { useDispatch } from "react-redux";
import SettleDialog from "../../Billing/ViewTables/Settlement/SettleDialog";

interface ViewOrderProps {
  liveOrderList: any;
}

const PickUpCard: React.FC<ViewOrderProps> = ({ liveOrderList }) => {
  const navigate = useNavigate();
  const [isMoreInfoDialogOpen, setMoreInfoDialogOpen] = useState(false);
  const [pickUpOrderDetails, setPickUpOrderDetails] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [open,setopen]=useState(false)
const dispatch=useDispatch()
  const handleOpenMoreInfoDialog = () => setMoreInfoDialogOpen(true);
  const handleCloseMoreInfoDialog = () => setMoreInfoDialogOpen(false);
  useEffect(()=>{
    setopen(false)
  },[liveOrderList])
  const handleLiveAllOrderDetailId = async (id: any) => {
    if (id) {
      try {
        const res = await getLiveOrderDetails(id);
        if (res?.status === 200) {
          setPickUpOrderDetails(res.data?.data);
        }
      } catch (error) {}
    }
  };
  const handesavebill=(data:any)=>{
    fetchTableWiseOrder(data.id)
    localStorage.setItem("settleddata",JSON.stringify(data))
    setopen(true)
  }
  const fetchTableWiseOrder = async (order_id: any) => {
    let data = {
      order: order_id,
    };
  
    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        dispatch(setTablewiseOrer(res.data?.data))
        const payload={
          status:true
        }
        dispatch(paymentpopup(payload));
        navigate("/refresh");
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}))
    }
  };
  const closeDialog=()=>{
    setopen(false)
  }
  return (
    <div>
      <form className="w-full md:w-80">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchOutline />
          </div>
          <input
            type="search"
            id="default-search"
            className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="search"
            required
          />
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </div>
        </div>
      </form>

      {isExpanded && <LiverOrderform />}

      {/* Grid container for order cards */}
      <div className="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {liveOrderList?.map((order: any) => (
          <div
            className="w-full max-w-sm bg-white border rounded-lg shadow-md mt-10"
            key={order?.id}
          >
            <div className="border-t border-b border-gray-200">
              <div className="flex items-center justify-between mb-4 bg-[#D1DDEA] rounded-t-lg p-3">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-lg font-semibold">
                      {order?.outlet_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      KOT: {order?.kots[0]} | Bill: {order?.id}
                    </p>
                  </div>
                </div>
                <div className="flex pl-3 pt-6">
                  <MdOutlineWatchLater />
                  <Timer createTime={order?.create_time} />
                </div>
                <div className="relative">
                  <div className="absolute bottom-3 right-9 flex justify-center items-center bg-[#AECAEB] rounded-full w-14 h-14">
                    <img className="w-6 h-6" src={Delivary} alt="Dine" />
                  </div>
                </div>
                <div>
                  {order?.order_type_name === "Dine In" && (
                    <p className="text-sm font-semibold text-gray-600">
                      TABLE: {order?.table}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {order?.order_type_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <TbPaperBag
                    className="ml-3 text-gray-700 items-center"
                    size={20}
                  />
                  <p>{order?.biller_name}</p>
                </div>
                <p className="text-sm text-gray-500 px-2">
                  {/* (Order Note: No onion garlic) */}
                </p>
              </div>

              <div className="mb-4">
                <div className="p-2 px-4 bg-gray-100">
                  <p className="text-sm font-medium">
                    {order?.customer_fullname
                      ? order?.customer_fullname +
                        (order?.customer_phone !== "None"
                          ? " | " + order?.customer_phone
                          : "")
                      : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order?.customer_primary_locality}
                  </p>
                </div>
              </div>

              <div className="text-gray-600 px-4">
                <p className="font-semibold mb-2">Order Details:</p>
                <ul className="flex flex-col gap-2">
                  {order?.items?.map((item: any) => (
                    <li className="flex justify-between" key={item?.id}>
                      <span>
                        {item?.item_name} (x{item?.quantity})
                      </span>
                      <span>₹ {item?.total_price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 px-4">
                <div className="flex justify-between font-semibold text-lg">
                  <p>Total</p>
                  <p>₹ {order?.grand_total}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <button
                onClick={() => {
                  handleLiveAllOrderDetailId(order?.id);
                  handleOpenMoreInfoDialog();
                }}
                className="px-3 py-1 text-gray-600 border border-gray-300 rounded-full"
              >
                More Info
              </button>
              {order.order_status == "save" ? (
                <button className="px-3 py-1 text-white bg-green-500 rounded-full">
                  Save & Print
                </button>
              ) : (
                <button
                  className="px-3 py-1 text-white bg-green-500 rounded-full"
                  onClick={() => handesavebill(order)}
                >
                  Settle & Save
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isMoreInfoDialogOpen && (
        <MoreInfoDialog
          onClose={handleCloseMoreInfoDialog}
          viewOrderDetails={pickUpOrderDetails}
        />
      )}
      <SettleDialog isOpen={open} onClose={closeDialog} />
    </div>
  );
};

export default PickUpCard;
