import React from "react";
import foodaLogo from "../../Styles/assets/img/foodasso.svg";
import Footer from "../layout/Footer";
import ConfigureSystem from "./ConfigureSystem";
function MainConfigureSystem() {
  return (
    <div className="">
      <div className=" p-4 border-b border-gray-200">
        <img className="h-12" src={foodaLogo} alt="Foodasso Logo" />
      </div>
      <ConfigureSystem />
      <Footer />
    </div>
  );
}

export default MainConfigureSystem;
