import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "../../common/TabsCN";
import DineIn from "./TabsComponent/DineIn";
import Delivary from "./TabsComponent/Delivary";
import PickUp from "./TabsComponent/Pickup";
import toast, { Toaster } from 'react-hot-toast';
import {
  addOrder,
  getOrderType,
  getPaymentType,
  getWaiter,
} from "../../../Api/Api";
import { setPaymenttype } from "../../../redux/Features/BillingDataSlice";
import { useDispatch, useSelector } from "react-redux";

interface TableDataProps {
  areaType?: string;
  tableId?: number;
  tableDetails?: any;
  allMenuData?: any;
  setAllMenuData?: any;
  allMenuPriceData?: any;
  setAllMenuPriceData?: any;
  allMenuAddOnData?: any;
  setAllMenuAddOnData?: any;
  allMenuVariatioData?: any;
  setAllMenuVariationData?: any;
  areaTypeId?: any;
  setSelectedTab?: any;
  tableWiseOrderData?: any;
}

interface OrderType {
  id: any;
  type: any;
}
const TableSidebar: React.FC<TableDataProps> = ({
  tableId,
  tableDetails,
  areaType,
  allMenuData,
  setAllMenuData,
  allMenuPriceData,
  setAllMenuPriceData,
  allMenuAddOnData,
  setAllMenuAddOnData,
  allMenuVariatioData,
  setAllMenuVariationData,
  areaTypeId,
  setSelectedTab,
  tableWiseOrderData,
}) => {
  const waiterData = {
    filters: {
      user__user_type__type__iexact: "waiter",
    },
  };

  const { totalItemData, orderItemData, subTotalPrice } =
    useSelector((state: any) => state.billingData) ?? {};
  const [waiterList, setWaiterList] = useState([]);
  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [paymentTypeList, setPaymentTypeList] = useState([]);

  console.log("order-Type-List", orderTypeList);
  console.log("table-Wise-Order-Data", tableWiseOrderData);

  useEffect(() => {
    fetchWaiterData(waiterData);
    fetchOrderTypeData();
    fetchPaymentTypeData();
  }, []);

  useEffect(() => {
    // debugger
    const dineInOrder = orderTypeList.find(
      (o: OrderType) => o?.type === "Dine In"
    );
    if (dineInOrder?.id) {
      setSelectedTab(dineInOrder.id);
    }
  }, [orderTypeList]);

  const fetchWaiterData = async (data: any) => {
    const res = await getWaiter(waiterData);
    if (res?.status === 200) {
      setWaiterList(res?.data?.data);
    }
  };

  const fetchOrderTypeData = async () => {
    const res = await getOrderType();
    if (res?.status === 200) {
      setOrderTypeList(res?.data?.data);
    }
  };
const dispatch=useDispatch()
  const fetchPaymentTypeData = async () => {
    const res = await getPaymentType();
    if (res?.status === 200) {
      setPaymentTypeList(res?.data?.data);
      dispatch(setPaymenttype(res?.data?.data))
    }
  };

  const handleChangeTab = (tab: any) => {
    setSelectedTab(tab);
  };

  console.log("finalTableDetails", tableDetails);
  // console.log('countItems', totalItemData);
  console.log("final-post-order-Itemsss", orderItemData);

  // useEffect(() => {
  // const fetchMergeData = () => {
  //   const mergedArray = orderItemData.map((item1: any) => {
  //     const item2 = totalItemData.find((item: any) => item.id === item1.id);
  //     return item2 ? { ...item1, ...item2 } : item1;
  //   });
  //   console.log(mergedArray);
  // };
  // fetchMergeData();
  // }, [totalItemData, orderItemData]);

  return (
    <div className="w-full">
  
      <Tabs
        tabListClassName="flex  items-center mb-5"
        activeTabClassName="text-orange-500 border-b-2 border-orange-500"
        tabClassName="flex"
        contentClassName="p-4"
      >
        {orderTypeList.map((o: any) => (
          <Tab
            label={o?.type}
            onClick={() => handleChangeTab(o?.id)}
            key={o?.id}
          >
            {o?.type === "Dine In" && (
              
              <DineIn
                areaType={areaType}
                tableId={tableId}
                tableDetails={tableDetails}
                allMenuData={allMenuData}
                setAllMenuData={setAllMenuData}
                allMenuPriceData={allMenuPriceData}
                setAllMenuPriceData={setAllMenuPriceData}
                allMenuAddOnData={allMenuAddOnData}
                setAllMenuAddOnData={setAllMenuAddOnData}
                allMenuVariatioData={allMenuVariatioData}
                setAllMenuVariationData={setAllMenuVariationData}
                waiterList={waiterList}
                paymentTypeList={paymentTypeList}
                orderType={o?.id}
                areaTypeId={areaTypeId}
                tableWiseOrderData={tableWiseOrderData}
                // handleOrderValues={handleOrderValues}
              />
            )}
            {o?.type === "Delivery" && (
              <Delivary
                areaType={areaType}
                tableId={tableId}
                tableDetails={tableDetails}
                allMenuData={allMenuData}
                setAllMenuData={setAllMenuData}
                allMenuPriceData={allMenuPriceData}
                setAllMenuPriceData={setAllMenuPriceData}
                allMenuAddOnData={allMenuAddOnData}
                setAllMenuAddOnData={setAllMenuAddOnData}
                allMenuVariatioData={allMenuVariatioData}
                setAllMenuVariationData={setAllMenuVariationData}
                waiterList={waiterList}
                paymentTypeList={paymentTypeList}
                orderType={o?.id}
                areaTypeId={areaTypeId}
                tableWiseOrderData={tableWiseOrderData}
              />
            )}
            {o?.type === "Pick Up" && (
              <PickUp
                areaType={areaType}
                tableId={tableId}
                tableDetails={tableDetails}
                allMenuData={allMenuData}
                setAllMenuData={setAllMenuData}
                allMenuPriceData={allMenuPriceData}
                setAllMenuPriceData={setAllMenuPriceData}
                allMenuAddOnData={allMenuAddOnData}
                setAllMenuAddOnData={setAllMenuAddOnData}
                allMenuVariatioData={allMenuVariatioData}
                setAllMenuVariationData={setAllMenuVariationData}
                waiterList={waiterList}
                paymentTypeList={paymentTypeList}
                orderType={o?.id}
                areaTypeId={areaTypeId}
                tableWiseOrderData={tableWiseOrderData}
              />
            )}
          </Tab>
        ))}
        {/* <Tab label="Dine in">
          <DineIn
            areaType={areaType}
            tableId={tableId}
            tableDetails={tableDetails}
            allMenuData={allMenuData}
            setAllMenuData={setAllMenuData}
            allMenuPriceData={allMenuPriceData}
            setAllMenuPriceData={setAllMenuPriceData}
            allMenuAddOnData={allMenuAddOnData}
            setAllMenuAddOnData={setAllMenuAddOnData}
            allMenuVariatioData={allMenuVariatioData}
            setAllMenuVariationData={setAllMenuVariationData}
            waiterList={waiterList}
          />
        </Tab> */}
        {/* <Tab label="Delivary">
          <Delivary tableId={tableId} />
        </Tab>
        <Tab label="Pick up">
          <PickUp tableId={tableId} />
        </Tab> */}
      </Tabs>
    </div>
  );
};

export default TableSidebar;
