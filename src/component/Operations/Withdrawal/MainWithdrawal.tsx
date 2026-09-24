import React, { useState } from "react";
import Withdrawal from "../Withdrawal/Withdrawal";
import WithdrawalListing from "../Withdrawal/WithdrawalListing";
import { WithdrawalListingData } from "../Withdrawal/WithdrawalListingData";
import WithdrawalManagement from "./WithdrawalManagement";
import WithdrawalDetailsListing from "./WithdrawalDetailsListing";
import ViewWithdrawalListing from "./ViewWithdrawalListing";

function MainWithdrawal() {
  const [currentComponent, setCurrentComponent] = useState("listing");

  const handleNavigation = (component: string) => {
    setCurrentComponent(component);
  };

  const handleWithdrawal = () => {
    console.log("Withdrawal added");
    // Add your logic for handling withdrawal here
    // For example, navigating to a different component or updating state
    handleNavigation("management"); // Example: Navigating to a Withdrawal Management component
  };

  return (
    <div className="w-full bg-white">
      {currentComponent === "listing" && (
        <Withdrawal onWithdrawal={handleWithdrawal} />
      )}
      {currentComponent === "listing" && (
        <WithdrawalListing WithdrawalListingData={WithdrawalListingData} />
      )}
      {currentComponent === "management" && <WithdrawalManagement />}
      
    </div>
  );
}

export default MainWithdrawal;
