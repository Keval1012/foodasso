import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { useTabContext } from "../../../contexts/TabContext";
import { NavItem } from "../../../routes/navData";
import fliter from "../../../Styles/assets/img/fliter.svg";

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
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabClick(tab.title)}
            >
              <div className="flex flex-col justify-center items-center px-6 py-6 border-r rounded-md">
              <tab.icon className="" size={25}/>
              {tab.title}
              </div>
            </div>
          ))}
        </div>
       
      </div>

      {/* Content Section */}
      <div className="mt-4 w-full h-full">
        {tabsConfig.map((tab) =>
          activeTab === tab.title ? (
            <React.Fragment key={tab.title}>
             
              {/* Grid Layout for Orders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
              {tab.component}
              </div>
            </React.Fragment>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Tabs;


        