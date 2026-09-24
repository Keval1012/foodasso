import React from 'react'
import DelivaryCard from '../../OrdersCard/DelivaryCard'

interface ViewOrderProps {
  liveOrderList: any;
}

const DelivaryData: React.FC<ViewOrderProps> = ({
  liveOrderList
}) => {
  return (
    <div>
      <DelivaryCard liveOrderList={liveOrderList} />
    </div>
  );
};

export default DelivaryData
