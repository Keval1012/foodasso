import React from "react";
import OrderWiselisting from "./OrderWiselisting";
import { OrderWiselistingData } from "./OrderWiselistingData";

const OrderWise = () => {
  return (
    <div>
      <OrderWiselisting OrderWiselistingData={OrderWiselistingData} />
    </div>
  );
};

export default OrderWise;
