import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../../common/TabsCN";
import DineInTab from "./ViewBillTabComponents/DineInTab";
import DelivaryTab from "./ViewBillTabComponents/DelivaryTab";
import PickUpTab from "./ViewBillTabComponents/PickUpTab";
import KotTab from "./ViewBillTabComponents/KotTab";
import { FiRefreshCcw } from "react-icons/fi";
import {
  getOrderType,
  getRecentKotOrders,
  getRecentOrders,
} from "../../../Api/Api";

interface OrderType {
  id: any;
  type: any;
}
interface ViewBillDataProps {
  recentDineInOrderList: any;
  setOrderStatusColor: any;
}

const ViewBill: React.FC<ViewBillDataProps> = ({
  recentDineInOrderList,
  setOrderStatusColor,
}) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [recentOrderList, setRecentOrderList] = useState([]);
  const [recentKotOrderList, setRecentKotOrderList] = useState([]);

  useEffect(() => {
    fetchOrderTypeData();
  }, []);

  useEffect(() => {
    if (selectedTab !== null) fetchRecentOrders();
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab !== null || selectedTab === "") fetchRecentKotOrders();
  }, [selectedTab === ""]);

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

  const fetchRecentOrders = async () => {
    let orderType = orderTypeList.find(
      (o: OrderType) => o?.type === selectedTab
    )?.type;

    let data = {
      outlet: 1,
      order_type: orderType,
    };

    try {
      const res = await getRecentOrders(data);
      if (res?.status === 200) {
        setRecentOrderList(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchRecentKotOrders = async () => {
    let data = {
      outlet_id: 1,
    };

    try {
      const res = await getRecentKotOrders(data);
      if (res?.status === 200) {
        setRecentKotOrderList(res.data?.data);
      }
    } catch (error) {}
  };

  const handleChangeTab = (order: any) => {
    setSelectedTab(order);
  };

  return (
    <div className="text-sm flex flex-col h-full">
      <Tabs activeTabClassName="border-b border-orange-500">
        <Tab label="Dine in" onClick={() => handleChangeTab("Dine In")}>
          <DineInTab
            recentDineInOrderList={recentDineInOrderList}
          />
        </Tab>
        <Tab label="Delivery" onClick={() => handleChangeTab("Delivery")}>
          <DelivaryTab
            recentOrderList={recentOrderList}
          />
        </Tab>
        <Tab label="Pick Up" onClick={() => handleChangeTab("Pick Up")}>
          <PickUpTab
            recentOrderList={recentOrderList}
          />
        </Tab>
        <Tab label="KOT" onClick={() => handleChangeTab("")}>
          <KotTab
            recentKotOrderList={recentKotOrderList}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ViewBill;
