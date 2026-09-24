import React, { useState } from "react";
import BillerProfile from "./BillerProfile";
import BillerProfileListing from "./BillerProfileListing";
import { BillerProfileListingData } from "./BillerProfileListingData";
import EditLanguageBiller from "./EditLanguageBiller";
// import Customer from "./Customer";
// import CustomerListing from "./CustomerListing";
// import { CustomerListingData } from "./CustomerListingData";

function MainBillerProfile() {
      const [page, setPage] = useState("listing");

     const handleEditClick = () => {
       setPage("edit");
     };
  return (
    <div className="w-full bg-white">
      <BillerProfile />
      {page === "listing" ? (
        <BillerProfileListing
          BillerProfileListingData={BillerProfileListingData}
          onEdit={handleEditClick} // Pass the handler to the child component
        />
      ) : (
        <EditLanguageBiller />
      )}
      {/* <Customer />
      <CustomerListing CustomerListingData={CustomerListingData} /> */}
    </div>
  );
}

export default MainBillerProfile;
