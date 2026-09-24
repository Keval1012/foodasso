import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NavItem } from "../../../routes/navData";
import { useTabContext } from "../../../contexts/TabContext";

interface TabsProps {
  tabsConfig: NavItem[];
  refreshAction: () => void;
}

const Tabs: React.FC<TabsProps> = ({ tabsConfig, refreshAction }) => {
  const location = useLocation();
  const { activeTab, setActiveTab } = useTabContext();

  useEffect(() => {
    const currentTab =
      tabsConfig.find((tab) => location.pathname.includes(tab.path ?? ""))
        ?.title || tabsConfig[0]?.title;

    setActiveTab(currentTab || "");

    // Reset the active tab when location changes
    return () => {
      setActiveTab("");
    };
  }, [location.pathname, tabsConfig, setActiveTab]);

  const handleTabClick = (tabTitle: string) => {
    setActiveTab(tabTitle);
  };
  const handleRefreshClick = () => {
    window.location.reload(); // Refresh the page
  };
  return (
    <div className="md:mx-3">
      <div className="flex flex-wrap items-center bg-white p-2 md:p-4">
        <div className="flex flex-grow space-x-4 ">
          {tabsConfig.map((tab) => (
            <div
              key={tab.title}
              className={`cursor-pointer relative pb-2 w-full text-center ${
                activeTab === tab.title
                  ? "text-[#ff9e1b] border-b-2 border-[#FF9E1B]"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabClick(tab.title)}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {tabsConfig.map((tab) =>
          activeTab === tab.title ? (
            <React.Fragment key={tab.title}>
              {tab.component}</React.Fragment>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;
