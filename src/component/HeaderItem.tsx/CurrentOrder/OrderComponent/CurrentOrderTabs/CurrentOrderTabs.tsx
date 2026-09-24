import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

import { FaChevronLeft } from "react-icons/fa";
import { useTabContext } from "../../../../../contexts/TabContext";
import { NavItem } from "../../../../../routes/navData";

interface TabsProps {
  tabsConfig: NavItem[];
  refreshAction: () => void;
}

const CurrentOrderMainTab: React.FC<TabsProps> = ({
  tabsConfig,
  refreshAction,
}) => {
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
    refreshAction();
  };

  return (
    <div className="w-full h-full">
      {/* Tabs and Refresh Section */}
      <div className="flex justify-between w-full ">
        <div className="flex space-x-2 md:space-x-4 mr-10">
          {tabsConfig.map((tab) => (
            <div
              key={tab.title}
              className={`cursor-pointer relative pb-2 whitespace-nowrap ${
                activeTab === tab.title
                  ? " bg-orange-500 text-white rounded-md "
                  : "border border-gray-500 rounded-md "
              }`}
              onClick={() => handleTabClick(tab.title)}
            >
              <div className="flex justify-center items-center px-2 py-2 mt-1">
                {tab.title}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center gap-3 mt-2 md:mt-0">
          <div className="flex items-center border rounded-md">
            <button className="border-r border-gray-custom text-gray-500 px-2 py-1 md:p-3 flex justify-center items-center gap-2">
              <FaChevronLeft className="text-gray-500" />
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4 w-full h-full">
        {tabsConfig.map((tab) =>
          activeTab === tab.title ? (
            <React.Fragment key={tab.title}>
              {/* Total Orders */}
              {/* Grid Layout for Orders */}
              <div className="">
                {tab.component}
              </div>
            </React.Fragment>
          ) : null
        )}
      </div>
    </div>
  );
};

export default CurrentOrderMainTab;
