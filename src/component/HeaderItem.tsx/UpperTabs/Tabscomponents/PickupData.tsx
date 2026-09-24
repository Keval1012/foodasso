import React from 'react'
import PickUpCard from '../../OrdersCard/PickUpCard'

interface ViewOrderProps {
  liveOrderList: any;
}

const PickupData: React.FC<ViewOrderProps> = ({
  liveOrderList
}) => {
  return (
    <div>
      <PickUpCard liveOrderList={liveOrderList} />
    </div>
  );
};

export default PickupData
