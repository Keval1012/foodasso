import React from "react";
import DataSync from "./DataSync";
import BillingScreenView from "./BillingScreenView";
import Footer from "../layout/Footer";
import foodaLogo from "../../Styles/assets/img/foodasso.svg";

function Sync() {
  return (
    <div className="w-full bg-white  p-6">
      <div className=" p-4 border-b border-gray-200">
        <img className="h-12" src={foodaLogo} alt="Foodasso Logo" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
        <DataSync />
        <BillingScreenView />
      </div>
      <Footer />
    </div>
  );
}

export default Sync;
