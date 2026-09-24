import React from "react";
import { navConfig } from "../../../../routes/navData";
import Tabs from "./CurrentOrderMainTab";


const CurrentOrderMainTabList: React.FC = () => {
  // Filter tabs that have isVisible set to false
  const tabsConfig = navConfig.seven_foodies.filter(
    (tab) =>
      (tab.path === "/orderItem/currentorder" ||
        tab.path === "/orderItem/advanceorder" 
    ) &&
      !tab.isVisible
  );

  const refreshAction = () => {
    // Implement your refresh logic here
    console.log("Refresh clicked");
  };

  return <Tabs tabsConfig={tabsConfig} refreshAction={refreshAction} />;
  
};

export default CurrentOrderMainTabList;

