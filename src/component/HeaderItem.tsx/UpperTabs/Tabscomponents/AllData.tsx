import React, { useEffect, useState } from "react";
import PickUpCard from "../../OrdersCard/PickUpCard";
import DelivaryCard from "../../OrdersCard/DelivaryCard";
import DineInCard from "../../OrdersCard/DineInCard";
import { MdOutlineWatchLater } from "react-icons/md";
import Dine from "../../../../Styles/assets/img/dine.svg";
import delivery from "../../../../Styles/assets/img/delivery.svg";
import pick from "../../../../Styles/assets/img/pick.svg";

import { CgUser } from "react-icons/cg";
import {
  getLiveOrderDetails,
  getLiveOrders,
  getTableWiseOrder,
} from "../../../../Api/Api";
import MoreInfoDialog from "../../OrdersCard/MoreInfoModel/MoreInfoDailog";
import { Timer } from "../../../../constants/Timer";
import {
  IoSearchOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import KotOrderFilterForm from "../../../Operations/Kot/KotOrderFilterForm";
import {
  setLiveOrder,
  setTablewiseOrer,
  paymentpopup,
} from "../../../../redux/Features/BillingDataSlice";
import SettleDialog from "../../../Billing/ViewTables/Settlement/SettleDialog";
import { useDispatch, useSelector } from "react-redux";
import LiverOrderform from "./LiverOrderform";
const AllData = () => {
  const navigate = useNavigate();
  const [liveAllOrderList, setLiveAllOrderList] = useState([]);
  const [liveAllOrderDetails, setLiveAllOrderDetails] = useState([]);
  const [isMoreInfoDialogOpen, setMoreInfoDialogOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const userdata: any = JSON.parse(localStorage.getItem("user_data") || "{}");
  const { outlet, kitchen } = userdata; // Destructure outlet and kitchen from userdata
  const handleOpenMoreInfoDialog = () => setMoreInfoDialogOpen(true);
  const handleCloseMoreInfoDialog = () => setMoreInfoDialogOpen(false);
  const liveordersata = useSelector(
    (state: any) => state.billingData.liveOrder
  );
  const pstatus = useSelector((state: any) => state.billingData.paymentstatus);

  useEffect(() => {
    setopen(false);
  }, [liveordersata]);
  useEffect(() => {
    fetchLiveAllOrder();
  }, []);

  const fetchLiveAllOrder = async () => {
    let data = {
      outlet: outlet,
    };

    try {
      const res = await getLiveOrders(data);
      if (res?.status === 200) {
        setLiveAllOrderList(res.data?.data);
        dispatch(setLiveOrder(res.data?.data));
      }
    } catch (error) {}
  };

  const handleLiveAllOrderDetailId = async (id: any) => {
    if (id) {
      try {
        const res = await getLiveOrderDetails(id);
        if (res?.status === 200) {
          setLiveAllOrderDetails(res.data?.data);
        }
      } catch (error) {}
    }
  };
  const handesavebill = (data: any) => {
    fetchTableWiseOrder(data.id);
    localStorage.setItem("settleddata", JSON.stringify(data));
    setopen(true);
  };
  const fetchTableWiseOrder = async (order_id: any) => {
    let data = {
      order: order_id,
    };
    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        dispatch(setTablewiseOrer(res.data?.data));
        const payload = {
          status: true,
        };
        dispatch(paymentpopup(payload));
        navigate("/refresh");
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}));
    }
  };
  const closeDialog = () => {
    setopen(false);
  };

  const getOrderStatusColor = (orderStatusColor: String) => {
    switch (orderStatusColor) {
      case "Dine In":
        return "bg-[#DAE4D0]";
      case "Delivery":
        return "bg-[#C9BBE7]";
      case "Pick Up":
        return "bg-[#D1DDEA]";
    }
  };

  console.log(liveordersata, "liveordersataliveordersata");
  return (
    <>
      <form className="w-full md:w-80">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearchOutline />
          </div>

          {/* Input Field */}
          <input
            type="search"
            id="default-search"
            className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="search"
            required
          />

          {/* Up/Down Icons */}
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </div>
        </div>
      </form>

      {isExpanded && <LiverOrderform />}

      <div className="mt-12 w-full grid lg:grid-cols-4 grid-cols-3 justify-between gap-10">
        {liveordersata &&
          liveordersata.length > 0 &&
          liveordersata?.map((order: any) => (
            <div
              className="w-full max-w-sm bg-white border rounded-lg"
              key={order?.id}
            >
              {/* Order Card */}
              <div className=" border-t border-b border-gray-200">
                {/* <div className="flex items-center justify-between mb-4 bg-[#DAE4D0] rounded-t-lg  p-3"> */}
                <div
                  className={`flex items-center justify-between mb-4 ${getOrderStatusColor(order?.order_type_name)} rounded-t-lg  p-3`}
                >
                  <div className="  flex items-center space-x-2 ">
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
                    {/* <img className=" w-6 h-6" src={Dine} alt="Dine" />{" "} */}
                    <MdOutlineWatchLater className="" />
                    {/* <p className="text-sm font-medium text-gray-600">10:25</p> */}
                    <Timer createTime={order?.create_time} />
                  </div>
                  <div className="relative">
                    <div className=" absolute bottom-3 right-9 flex justify-center items-center bg-green-500 rounded-full w-14 h-14">
                      {order?.order_type_name === "Dine In" ? (
                        <img className="w-6 h-6" src={Dine} alt="Order Type" />
                      ) : null}
                      {order?.order_type_name === "Delivery" ? (
                        <img
                          className="w-6 h-6"
                          src={delivery}
                          alt="Order Type"
                        />
                      ) : null}
                      {order?.order_type_name === "Pick Up" ? (
                        <img className="w-6 h-6" src={pick} alt="Order Type" />
                      ) : null}
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

                {/* Order Time */}
                <div className="flex items-center justify-between mb-4">
                  {/* <div className="flex items-center space-x-2">
                    <img className=" w-6 h-6" src={Dine} alt="Dine" />{" "}
                    <p className="text-sm font-medium text-gray-600">10:25</p>
                  </div> */}
                  <div className="flex gap-2 ">
                    <CgUser
                      className=" ml-3 text-gray-700 items-center"
                      size={20}
                    />
                    <p>{order?.biller_name}</p>
                  </div>
                  <p className="text-sm text-gray-500 px-2">
                    {/* (Order Note: No onion garlic) */}
                  </p>
                </div>

                {/* Biller Info */}
                <div className="mb-4">
                  <div className="p-2 px-4 bg-gray-100">
                    <p className="text-sm font-medium">
                      {order?.customer_fullname
                        ? order?.customer_fullname +
                          (order?.customer_phone !== 'None' ? (" | " + order?.customer_phone) : '')
                        : ""}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order?.customer_primary_locality}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="text-gray-600 px-4">
                  <p className="font-semibold mb-2">Order Details:</p>
                  <div className="space-y-2 flex flex-col gap-2">
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
                </div>

                {/* Total */}
                <div className="mt-4 px-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>₹ {order?.grand_total}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t  border-gray-200 rounded-b-lg">
                <button
                  className="px-3 py-1 text-gray-600 border border-gray-300  rounded-full"
                  onClick={() => {
                    handleLiveAllOrderDetailId(order?.id);
                    handleOpenMoreInfoDialog();
                  }}
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

        {isMoreInfoDialogOpen && (
          <MoreInfoDialog
            onClose={handleCloseMoreInfoDialog}
            viewOrderDetails={liveAllOrderDetails}
          />
        )}
      </div>
      <SettleDialog isOpen={open} onClose={closeDialog} />
    </>
  );
};

export default AllData;
