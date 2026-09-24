import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import Menu from "../../../../../../Styles/assets/img/allmenu.svg";
import DineIn from "../../../../../../Styles/assets/img/dine.svg";
import Delivery from "../../../../../../Styles/assets/img/delivery.svg";
import PickUp from "../../../../../../Styles/assets/img/pick.svg";
import ImageIcon from "../../../../../common/ImageIcon";
import { Tab,Tabs } from "../../../../../common/TabsCN";
import DeliveryList from "./DeliveryList";
import { DelivryListData } from "./DelivryListData";
import DineInOrderList from "./DineInOrderList";
import { DineinOrderlistData } from "./DineinOrderlistData";
import OrderListing from "./OrderListing";
import { OrderListingData } from "./OrderListingData";
import PickList from "./PickList";
import { PickListData } from "./PickListData";
import { getOrderType } from "../../../../../../Api/Api";
import { getOperationOrderList } from "../../../../../../Api/Operation/Api";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrderAllOpeData } from "../../../../../../redux/Features/OperationDataSlice";

// import ViewOrder from "./ViewOrder";

interface OrderType {
  id: any;
  type: any;
}

const Order = () => {

  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [operationOrderList, setOperationOrderList] = useState([]);
  // const { loginUserData } =
  //   useSelector((state: any) => state.billingData) ?? {};
  // const { currentOrderAllOpeData } =
  //   useSelector((state: any) => state.operationData) ?? {};

  useEffect(() => {
    fetchOrderTypeData();
  }, []);

  // useEffect(() => {
  //   fetchOperationOrders();
  //   // }, [selectedTab]);
  // }, []);

  const fetchOrderTypeData = async () => {
    const res = await getOrderType();
    if (res?.status === 200) {
      setOrderTypeList(res?.data?.data);
    }
  };

  // const itemsPerPage = 20;
  // // const totalItems = kotTotalLength;
  // const totalItems = currentOrderAllOpeData?.total_count;
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  // useEffect(() => {
  //   fetchAllCurrentOrders(currentPage);
  // }, [currentPage]);

  // useEffect(() => {
  //   if (performance?.navigation?.type === 1) {
  //     const fetchAllCurrentOrders = async () => {
  //       let data = {
  //         outlet_id: loginUserData?.outlet,
  //       };
  //       const res = await getOperationOrderList(data);
  //       if (res?.status === 200) {
  //         dispatch(setCurrentOrderAllOpeData(res.data));
  //         // dispatch(setKotFilterOpeData(null));
  //       }
  //     };
  //     fetchAllCurrentOrders();
  //   }
  // }, [dispatch]);

  // const fetchAllCurrentOrders = async (page: number) => {
  //   let orderId = orderTypeList.find(
  //     (o: OrderType) => o?.type === selectedTab
  //   )?.id;

  //   let data = {
  //     start: (page - 1) * itemsPerPage,
  //     limit: itemsPerPage,
  //     outlet_id: loginUserData?.outlet,
  //     search: {
  //       // "customer_fullname": "",
  //       // "customer_phone": "",
  //       // "table_no__table_no":""
  //     },
  //     filter: {
  //       // "id": 2,
  //       // "payment_type": 1
  //       // "order_status": ["completed"],
  //       // "order_type": 13,
  //       // "sub_order_type":1,
  //       // "delivery_status":"foodready"  you can also pass null
  //       // "is_advance_order": true
  //     },
  //     // ordering: "-grand_total",
  //   };

  //   try {
  //     // debugger
  //     const res = await getOperationOrderList(data);
  //     if (res?.status === 200) {
  //       // setOperationOrderList(res.data?.data);
  //       dispatch(setCurrentOrderAllOpeData(res.data));
  //     }
  //   } catch (error) {}
  // };

  // console.log("currentOrderAllOpeData", currentOrderAllOpeData);

  const handleChangeTab = (order: any) => {
    const orderType = orderTypeList.find((o: OrderType) => o?.type === order);
    setSelectedTab(orderType?.id);
  };
  
  return (
    <div className="">
      {/* Middle Section */}

      <div className="  gap-2 items-center px-2 border-b border-gray-200">
        <div className="">
          <Tabs
            activeTabClassName="px-4 py-2 text-base border-l-[2.5px]  rounded-md hover:bg-gray-300  focus:outline-none text-orange-500 border-b border-orange-500"
            tabClassName="px-4 py-2 text-base border-l-[2.5px]  rounded-md hover:bg-gray-300  focus:outline-none"
            contentClassName="mt-14"
          >
            <Tab label="All" icon={<ImageIcon src={Menu} />} className="">
              <OrderListing />
            </Tab>
            <Tab
              label="Dine In"
              icon={<ImageIcon src={DineIn} />}
              className=""
              onClick={() => handleChangeTab("Dine In")}
            >
              <DineInOrderList selectedTab={selectedTab} />
            </Tab>
            <Tab
              label="Delivery"
              icon={<ImageIcon src={Delivery} />}
              className=""
              onClick={() => handleChangeTab("Delivery")}
            >
              <DeliveryList selectedTab={selectedTab} />
            </Tab>
            <Tab
              label="Pick Up"
              icon={<ImageIcon src={PickUp} />}
              className=""
              onClick={() => handleChangeTab("Pick Up")}
            >
              <PickList selectedTab={selectedTab} />
            </Tab>
          </Tabs>
        </div>

        {/* Right Section */}
        {/* <div className="flex justify-end items-center gap-3  rounded-md">
          <div className="border rounded-md">
            <button className="px-4 py-2 text-base  border-r border-gray-custom text-gray-800  focus:outline-none">
              <span className="text-base">get past orders</span>
            </button>
          </div>
        </div> */}
      </div>
      {/* <ViewOrder /> */}
    </div>
  );
};

export default Order;
