import React, { useState } from "react";
import { Tab, Tabs } from "../../common/TabsCN";
import TableWise from "./TableWise";
import KotWise from "./KotWise";
import ItemsWise from "./ItemsWise";

interface TableStatusDataProps {
  setDialogOpen: any;
};

const MainKotDialog: React.FC<TableStatusDataProps> = ({ setDialogOpen }) => {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleChangeTab = (order: any) => {
    setSelectedTab(order);
    console.log(order,"orderorderorder")
  };

  return (
    <div className="h-full">
      <div className="gap-4 bg-white py-4 px-2">
        <div className="flex flex-col h-[500px] overflow-y-auto overflow-x-hidden">
          <Tabs
            containerClassName="w-full border-t border-gray-300 flex flex-col"
            activeTabClassName="border-b-2 border-orange-500"
            tabClassName=""
          >
            <Tab
              label="Table Wise"
              className="px-2 py-1 border-r border-gray-300"
              onClick={() => handleChangeTab("Table Wise")}
            >
              <TableWise
                selectedTab={selectedTab}
                setDialogOpen={setDialogOpen}
              />
            </Tab>
            <Tab
              label="KOT Wise"
              className="px-2 py-1 w-full border-r border-gray-300"
              onClick={() => handleChangeTab("KOT Wise")}
            >
              <KotWise
                selectedTab={selectedTab}
                setDialogOpen={setDialogOpen}
              />
            </Tab>
            <Tab
              label="Item Wise"
              className="px-2 py-1 w-full"
              onClick={() => handleChangeTab("Item Wise")}
            >
              <ItemsWise
                selectedTab={selectedTab}
                setDialogOpen={setDialogOpen}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MainKotDialog;
