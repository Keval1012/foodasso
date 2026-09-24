import React from "react";
import Wise from "../../../../../Styles/assets/img/items_wise.svg";
import Percentage from "../../../../../Styles/assets/img/percentage.svg";
import Portion from "../../../../../Styles/assets/img/portion_wise.svg";
import { Tab, Tabs } from "../../../../common/TabsCN";
import PortionWise from "./PortionWise";
import PercentageWise from "./PercentageWise";
import ItemsWise from "./ItemsWise";
import ImageIcon from "../../../../common/ImageIcon";

const MainSplitTabs = () => {
  return (
    <div className="">
      <div></div>

      {/* Tabs */}
      <Tabs activeTabClassName="border-b border-orange-500">
        {/* Card Payment Tab */}
        <Tab
          label="Portion Wise"
          icon={
            <ImageIcon
              src={Portion}
              alt="Card Logo"
              className="cursor-pointer"
            />
          }
        >
          <PortionWise />
        </Tab>

        {/* Others Payment Tab */}
        <Tab
          label="Percentage Wise"
          icon={
            <ImageIcon
              src={Percentage}
              alt="Card Logo"
              className="cursor-pointer"
            />
          }
        >
          <PercentageWise />
        </Tab>

        {/* Due Payment Tab */}
        <Tab
          label="Items Wise"
          icon={
            <ImageIcon src={Wise} alt="Card Logo" className="cursor-pointer" />
          }
        >
          <ItemsWise />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MainSplitTabs;
