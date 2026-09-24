import React from "react";
import DueTabs from "./DueTabs";
import { navConfig } from "../../../../routes/navData";
const DueTabManagement: React.FC = () => {
  // Filter tabs that have isVisible set to false
  const tabsConfig = navConfig.seven_foodies.filter(
    (tab) =>
      (tab.path === "/operations/DuePaymentReport/Order_Wise" ||
        tab.path === "/operations/DuePaymentReport/Customer_wise") &&
      !tab.isVisible
  );

  const refreshAction = () => {
    // Implement your refresh logic here
    console.log("Refresh clicked");
  };

  return <DueTabs tabsConfig={tabsConfig} refreshAction={refreshAction} />;
};
export default DueTabManagement;
