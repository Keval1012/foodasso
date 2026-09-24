import React from "react";
import foodaLogo from "../../Styles/assets/img/foodasso.svg";
import BillingSetup from "./BillingSetup ";
import Footer from "../layout/Footer";
function MainDataSync() {
  return (
    <div className="">
      <div className=" p-4 border-b border-gray-200">
        <img className="h-12" src={foodaLogo} alt="Foodasso Logo" />
      </div>
      <BillingSetup />
      <Footer />
    </div>
  );
}

export default MainDataSync;
