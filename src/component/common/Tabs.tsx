import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
import { NavItem } from "../../routes/navData";
import { useTabContext } from "../../contexts/TabContext";

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

  return (
    <div className="shadow-lg my-5 mx-5 rounded-xl border border-gray-300">
      <div className="flex items-center bg-white p-4">
        <div className="flex flex-grow space-x-4">
          {tabsConfig.map((tab) => (
            <div
              key={tab.title}
              className={`cursor-pointer relative pb-2 ${
                activeTab === tab.title
                  ? "text-black border-b-2 border-red-600"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabClick(tab.title)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <button
          className="bg-white-200 flex px-3 py-2 shadow-custom-light border border-gray-300 rounded hover:bg-red-200"
          onClick={refreshAction}
        >
          <SlRefresh className="mt-1 mr-3" />
          Refresh
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

export default Tabs;
