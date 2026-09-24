import React, { useState } from "react";
import CashTopUp from "./CashTopUp";
import CashTopUpListing from "./CashTopUpListing";
import { CashTopUpListingData } from "./CashTopUpListingData";
import CashTopUPManagement from "./CashTopUPManagement";
import CashTopUPDetails from "./CashTopUPDetails";

function MainCashUp() {
  const [currentComponent, setCurrentComponent] = useState("listing");
  const [showDetails, setShowDetails] = useState(false);

  const handleNavigation = (component: string) => {
    setCurrentComponent(component);
  };

  const handleSearchClick = () => {
    setShowDetails(true);
  };

  const handleCashTopUp = () => {
    console.log("Cash Top Up added");
    handleNavigation("management");
  };

  return (
    <div className="w-full bg-white">
      {currentComponent === "listing" && (
        <>
          <CashTopUp onAddCashTopUp={handleCashTopUp} />
          <CashTopUpListing CashTopUpListingData={CashTopUpListingData} />
        </>
      )}
      <>
        {currentComponent === "management" && (
          <CashTopUPManagement onSearchClick={handleSearchClick} />
        )}
        {showDetails && <CashTopUPDetails />}
      </>
    </div>
  );
}

export default MainCashUp;
