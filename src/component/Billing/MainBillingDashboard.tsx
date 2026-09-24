import React from "react";
import Footer from "../layout/Footer";
import Tables from "./Tables";

function MainBillingDashboard() {
  return (
    <div className="w-full bg-white">
      <div className="">
        {/* <img className="h-12" src={foodaLogo} alt="Foodasso Logo" /> */}
        < Tables />
      </div>
      <div></div>
      {/* <Footer /> */}
    </div>
  );
}

export default MainBillingDashboard;
