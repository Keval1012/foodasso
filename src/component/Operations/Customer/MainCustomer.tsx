import React from "react";
import Customer from "./Customer";
import CustomerListing from "./CustomerListing";
import { CustomerListingData } from "./CustomerListingData";

function MainCustomer() {
  return (
    <div className="w-full bg-white">
      <Customer />
      <CustomerListing CustomerListingData={CustomerListingData} />
    </div>
  );
}

export default MainCustomer;
