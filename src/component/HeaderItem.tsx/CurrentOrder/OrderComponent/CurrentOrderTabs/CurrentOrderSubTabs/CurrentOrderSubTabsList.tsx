import React from "react";
import { navConfig } from "../../../../../../routes/navData";
import Tabs from "../../../../../common/Tabs";


const CurrentOrderSubTabList: React.FC = () => {
  // Filter tabs that have isVisible set to false
  const tabsConfig = navConfig.seven_foodies.filter(
    (tab) =>
      (tab.path === "/orderItem/sub/currentorder/all" ||
        tab.path === "/orderItem/sub/currentorder/delivary" || "/orderItem/sub/currentorder/dinein" 
        || "/orderItem/sub/currentorder/pickup"  
    ) &&
      !tab.isVisible
  );

  const refreshAction = () => {
    // Implement your refresh logic here
    console.log("Refresh clicked");
  };

  return <Tabs tabsConfig={tabsConfig} refreshAction={refreshAction} />;
};

export default CurrentOrderSubTabList;

