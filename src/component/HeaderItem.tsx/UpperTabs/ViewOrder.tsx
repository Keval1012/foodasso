import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../../common/TabsCN";
import { BsGrid } from "react-icons/bs";
import AllData from "./Tabscomponents/AllData";
import DineInData from "./Tabscomponents/DineInData";
import DelivaryData from "./Tabscomponents/DelivaryData";
import Menu from "../../../Styles/assets/img/allmenu.svg";
import DineIn from "../../../Styles/assets/img/dine.svg";
import Delivery from "../../../Styles/assets/img/delivery.svg";
import PickUp from "../../../Styles/assets/img/pick.svg";
import PickupData from "./Tabscomponents/PickupData";
import ImageIcon from "../../common/ImageIcon";
import { FiRefreshCw } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
// import SearchForm from "../OrdersCard/SearchForm";
import { getLiveOrders, getOrderType } from "../../../Api/Api";
import { setLiveOrder } from "../../../redux/Features/BillingDataSlice";
import { useDispatch,useSelector} from "react-redux";
interface OrderType {
  id: any;
  type: any;
}

const ViewOrder = () => {
  const dispatch=useDispatch()
  const [selectedTab, setSelectedTab] = useState(null);
  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [liveOrderList, setLiveOrderList] = useState([]);

  useEffect(() => {
    fetchOrderTypeData();
  }, []);

  useEffect(() => {
    if (selectedTab) fetchLiveOrders();
  }, [selectedTab]);

  // useEffect(() => {
  //   const dineInOrder = orderTypeList.find(
  //     (o: OrderType) => o?.type === "Dine In"
  //   );
  //   if (dineInOrder?.type) {
  //     setSelectedTab(dineInOrder?.type);
  //   }
  // }, [orderTypeList]);

  const fetchOrderTypeData = async () => {
    const res = await getOrderType();
    if (res?.status === 200) {
      setOrderTypeList(res?.data?.data);
    }
  };

  const fetchLiveOrders = async () => {

    let orderTypeId = orderTypeList.find((o: OrderType) => o?.type === selectedTab)?.id;
    localStorage.setItem("orderTypeId",orderTypeId)
    let data = {
      outlet: 1,
      order_type: orderTypeId,
    };
    console.log(orderTypeId,"orderTypeId")

    try {
      const res = await getLiveOrders(data);
      if (res?.status === 200) {
        setLiveOrderList(res.data?.data);
        dispatch(setLiveOrder(res.data?.data))
      }
    } catch (error) {}
  };

  const handleChangeTab = (order: any) => {
 
    setSelectedTab(order);
  };
  const liveordersata=useSelector((state:any)=>state.billingData.liveOrder)
  return (
    <div className="w-full">
      <div className="">
        <Tabs
          activeTabClassName="px-4 py-2 text-base border-l-[2.5px]  rounded-md hover:bg-gray-300  focus:outline-none text-orange-500 border-b border-orange-500"
          tabClassName="px-4 py-2 text-base border-l-[2.5px]  rounded-md hover:bg-gray-300  focus:outline-none"
          contentClassName="mt-10"
        >
          <Tab label="All" icon={<ImageIcon src={Menu} />} className="grid grid-cols-4"
              onClick={() => handleChangeTab("All")}
          >
            <AllData />
          </Tab>
          <Tab
            label="Dine In"
            icon={<ImageIcon src={DineIn} />}
            className=""
            onClick={() => handleChangeTab("Dine In")}
          >
            <DineInData liveOrderList={liveordersata} />
          </Tab>
          <Tab
            label="Delivery"
            icon={<ImageIcon src={Delivery} />}
            className=""
            onClick={() => handleChangeTab("Delivery")}
          >
            <DelivaryData liveOrderList={liveordersata} />
          </Tab>
          <Tab
            label="Pick Up"
            icon={<ImageIcon src={PickUp} />}
            className=""
            onClick={() => handleChangeTab("Pick Up")}
          >
            <PickupData liveOrderList={liveordersata} />
          </Tab>
        </Tabs>
        {/* <div className=" gap-3 mt-5 md:mt-5">
          <div className="flex items-center  rounded-md">
            <div>
              <button
                // onClick={handleRefreshClick}
                className="bg-orange-500 p-2 rounded-md md:p-3 mr-2"
              >
                <FiRefreshCw className="text-white" />
              </button>
            </div>
            <div className="border border-1 rounded-md">
              <button className="border-r border-gray-custom p-2 md:p-3">
                <CiFilter />
              </button>
              <button className="px-2 py-1 md:px-4 md:py-2 border-r border-gray-custom text-gray-800 focus:outline-none">
                <span>Food Ready</span>
                <span className="ml-2 text-xs md:text-base bg-gray-700/80 text-white rounded-full p-1 md:p-2">
                  0
                </span>
              </button>
              <button className="px-2 py-1 md:px-4 md:py-2 border-r border-gray-custom text-gray-800 focus:outline-none">
                <span>Dispatch</span>
                <span className="ml-2 text-xs md:text-base bg-gray-700/80 text-white rounded-full p-1 md:p-2">
                  0
                </span>
              </button>
              <button className="px-2 py-1 md:px-4 md:py-2 text-gray-800 focus:outline-none">
                <span>Deliver</span>
                <span className="ml-2 text-xs md:text-base bg-gray-700/80 text-white rounded-full p-1 md:p-2">
                  0
                </span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
      {/* <SearchForm /> */}
    </div>
  );
};

export default ViewOrder;
