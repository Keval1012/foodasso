import React, { useState } from "react";
import { Tab, Tabs } from "../common/TabsCN";
import AllData from "./UpperTabs/Tabscomponents/AllData";
import ViewKot from "./MainOrderTabs.tsx/MainOrderComponents/ViewKot";
import ViewOrder from "./UpperTabs/ViewOrder";

const Menu = () => {

  const [selectedTab, setSelectedTab] = useState(null);

  const handleChangeTab = (tab: any) => {
    setSelectedTab(tab);
  };

  return (
    <div className="">
      <div className="gap-4 bg-white  py-4 px-2">
        {/* Left Section */}
        <div className="flex ">
          <Tabs
            containerClassName="w-full flex flex-col "
            activeTabClassName="bg-orange-500 text-white border border-gray-500 rounded-md"
            tabClassName="border border-gray-500 rounded-md"
          >
            <Tab
              label="View Order"
              className="px-2 py-1 border border-gray-300"
              onClick={() => handleChangeTab("View Order")}
            >
              <ViewOrder />
            </Tab>
            <Tab
              label="View KOT"
              className="px-2 py-1 border border-gray-300 w-full"
              onClick={() => handleChangeTab("View KOT")}
            >
              <ViewKot selectedTab={selectedTab} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Menu;
