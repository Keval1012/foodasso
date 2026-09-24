import React from "react";
import billingview from "../../Styles/assets/img/View-Menu.png";

const BillingScreenView = () => {
  return (
    <div className="p-6 w-full bg-white rounded-xl border">
      <h2 className="text-xl font-bold text-gray-800">Billing Screen View</h2>
      <p className="text-gray-700">
        Choose the type of display between Touch or Keyboard
      </p>
      <img className="" src={billingview} alt="Foodasso Logo" />
    </div>
  );
};

export default BillingScreenView;
