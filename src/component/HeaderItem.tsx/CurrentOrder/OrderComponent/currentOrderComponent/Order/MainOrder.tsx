import React from "react";
import Order from "./Order";
import OrderListing from "./OrderListing";
import { OrderListingData } from "./OrderListingData";
function MainOrder() {
  return (
    <div className="w-full bg-white">
      <Order />
      {/* <OrderListing OrderListingData={OrderListingData} /> */}
    </div>
  );
}

export default MainOrder;
