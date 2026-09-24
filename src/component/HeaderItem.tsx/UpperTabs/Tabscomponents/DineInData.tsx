import React from "react";
import DineInCard from "../../OrdersCard/DineInCard";

interface ViewOrderProps {
  liveOrderList: any;
}

const DineInData: React.FC<ViewOrderProps> = ({ liveOrderList }) => {
  return (
    <div>
      <DineInCard liveOrderList={liveOrderList} />
    </div>
  );
};

export default DineInData;
