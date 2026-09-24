import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
import { useTabContext } from "../../../../contexts/TabContext";
import { NavItem } from "../../../../routes/navData";

interface TabsProps {
  tabsConfig: NavItem[];
  refreshAction: () => void;
}

const DueTabs: React.FC<TabsProps> = ({ tabsConfig, refreshAction }) => {
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
    // debugger
    localStorage.setItem("tabValue", tabTitle);
    setActiveTab(tabTitle);
  };
  const handleRefreshClick = () => {
    window.location.reload(); // Refresh the page
  };
  return (
    <div className="my-5 mx-2  ">
      <div className="flex flex-wrap items-center bg-white ">
        <div className="flex flex-grow space-x-4 overflow-x-auto">
          {tabsConfig.map((tab) => (
            <div
              key={tab.title}
              className={`cursor-pointer relative whitespace-nowrap border border-gray-400 text-black rounded px-4 py-3${
                activeTab === tab.title
                  ? "text-white border border-gray-400 rounded px-4 py-3 bg-orange-400"
                  : ""
              }`}
              onClick={() => handleTabClick(tab.title)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <button
          className="bg-white-200 flex px-2 py-1 md:px-3 md:py-2 shadow-custom-light border border-gray-300 rounded hover:bg-red-200 ml-2 md:ml-4"
          onClick={handleRefreshClick}
        >
          <SlRefresh className="mt-1 mr-1 md:mr-3" />
          <span className="hidden md:inline">Refresh</span>
        </button>
      </div>
      <div className="mt-4">
        {tabsConfig.map((tab) =>
          activeTab === tab.title ? (
            <React.Fragment key={tab.title}>{tab.component}</React.Fragment>
          ) : null
        )}
      </div>
    </div>
  );
};

export default DueTabs;
