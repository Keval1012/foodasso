import React from 'react';
import OrderCard from './OrderCard';
import OrderStatus from './OrderStatus';


const OrdersGrid = () => {
  

  return (
    <div className="p-4">
      <OrderStatus/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        
      </div>
    </div>
  );
};

export default OrdersGrid;
