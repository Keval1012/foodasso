import React from "react";
import CurrentOrderMainTabList from "./CurrentOrderTabs/CurrentOrderTabList";
import { OrderListingData } from "./currentOrderComponent/Order/OrderListingData";
import OrderListing from "./currentOrderComponent/Order/OrderListing";
import Order from "./currentOrderComponent/Order/Order";

const CurrentOrderTab = () => {
  return (
    <div className="w-full bg-white">
    <Order />
    {/* <OrderListing OrderListingData={OrderListingData} /> */}
  </div>
  );
};

export default CurrentOrderTab;
