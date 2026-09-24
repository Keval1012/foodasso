import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import Menu from "../../../Styles/assets/img/allmenu.svg";
import DineIn from "../../../Styles/assets/img/dine.svg";
import Delivery from "../../../Styles/assets/img/delivery.svg";
import PickUp from "../../../Styles/assets/img/pick.svg";
import { getOrderType } from "../../../Api/Api";
import ImageIcon from "../../common/ImageIcon";
import { Tabs, Tab } from "../../common/TabsCN";
// import Menu from "../../HeaderItem.tsx/Menu";
import OrderListing from "./OrderListing";
import { OrderListingData } from "./OrderListingData";
import DineInOrderList from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/DineInOrderList";
import { DineinOrderlistData } from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/DineinOrderlistData";
import DeliveryList from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/DeliveryList";
import { DelivryListData } from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/DelivryListData";
import PickList from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/PickList";
import { PickListData } from "../../HeaderItem.tsx/CurrentOrder/OrderComponent/currentOrderComponent/Order/PickListData";
import { getOperationOrderList } from "../../../Api/Operation/Api";

// import ViewOrder from "./ViewOrder";
interface OrderType {
  id: any;
  type: any;
}

const Order = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [operationOrderList, setOperationOrderList] = useState([]);

  useEffect(() => {
    fetchOrderTypeData();
  }, []);

  useEffect(() => {
    fetchOperationOrders();
    // }, [selectedTab]);
  }, []);

  const fetchOrderTypeData = async () => {
    const res = await getOrderType();
    if (res?.status === 200) {
      setOrderTypeList(res?.data?.data);
    }
  };

  const fetchOperationOrders = async () => {
    let orderId = orderTypeList.find(
      (o: OrderType) => o?.type === selectedTab
    )?.id;

    let data = {
      start: 0,
      limit: 20,
      outlet_id: 1,
      search: {
        // "customer_fullname": "",
        // "customer_phone": "",
        // "table_no__table_no":""
      },
      filter: {
        // "id": 2,
        // "payment_type": 1
        // "order_status": ["completed"],
        // "order_type": 13,
        // "sub_order_type":1,
        // "delivery_status":"foodready"  you can also pass null
        // "is_advance_order": true
      },
      ordering: "-grand_total",
    };

    try {
      const res = await getOperationOrderList(data);
      if (res?.status === 200) {
        setOperationOrderList(res.data?.data);
      }
    } catch (error) {}
  };

  const handleChangeTab = (order: any) => {
    setSelectedTab(order);
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 justify-between gap-4 bg-white border-b border-gray-200 py-4 px-2">
        {/* Left Section */}
        <div className="flex ">
          <button className="px-4 py-2 text-base bg-orange-500 text-white rounded-md  focus:outline-none border border-gray-200">
            Current Orders
          </button>
          <button className="px-4 py-2 text-base bg-white hover:text-white rounded-md hover:bg-orange-500 focus:outline-none border border-gray-200">
            Advance Order
          </button>
        </div>
        <div className=" flex justify-end gap-4">
          <input
            type="text"
            placeholder="Enter Order No."
            className="px-4 py-2 border rounded-md focus:outline-none"
          />
          <button className="px-4 py-2 text-base bg-orange-500 text-white rounded-md  focus:outline-none">
            MRF
          </button>
          <div className=" border rounded p-2">
            <button
              className="text-base flex items-center gap-2
             btn "
            >
              <FaChevronLeft />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="gap-2 px-2 border-b border-gray-200">
        <div className="">
          <Tabs
            activeTabClassName="px-4 py-2 text-base border-l-[2.5px]  rounded-md hover:bg-gray-300  focus:outline-none text-orange-500 border-b border-orange-500"
            tabClassName="px-4 py-2 text-base border-l-[2.5px]  rounded-md hover:bg-gray-300  focus:outline-none"
            contentClassName="mt-14"
          >
            <Tab label="All" icon={<ImageIcon src={Menu} />} className="">
               <OrderListing OrderListingData={OrderListingData} />
            </Tab>
            <Tab
              label="Dine In"
              icon={<ImageIcon src={DineIn} />}
              className=""
              onClick={() => handleChangeTab("Dine In")}
            >
              <DineInOrderList selectedTab={undefined} />
            </Tab>
            <Tab
              label="Delivery"
              icon={<ImageIcon src={Delivery} />}
              className=""
              onClick={() => handleChangeTab("Delivery")}
            >
              <DeliveryList selectedTab={undefined} />
            </Tab>
            <Tab
              label="Pick Up"
              icon={<ImageIcon src={PickUp} />}
              className=""
              onClick={() => handleChangeTab("Pick Up")}
            >
              <PickList selectedTab={undefined} />
            </Tab>
          </Tabs>
        </div>

        {/* Right Section */}
        <div className="flex justify-end items-center gap-3  rounded-md">
          <div className="border rounded-md">
            <button className="px-4 py-2 text-base  border-r border-gray-custom text-gray-800  focus:outline-none">
              <span className="text-base">get past orderss</span>
            </button>
          </div>
        </div>
      </div>
      {/* <ViewOrder /> */}
    </div>
  );
};

export default Order;
