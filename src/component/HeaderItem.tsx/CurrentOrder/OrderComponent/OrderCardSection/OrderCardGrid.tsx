import React from 'react'
import OrderCard from './OrderCard'

const orders = [
    {
      type: '01 Dine In',
      kot: '02',
      time: '10:25',
      customer: 'Neha Shah',
      location: 'Ahmedabad',
      note: 'No onion garlic',
      items: [
        { name: 'Seafood Noodles', qty: 1, note: '(Spicy)' },
        { name: 'Fried Egg Noodles', qty: 2 },
        {
          name: 'Shrimp Noodles',
          qty: 2,
          variation: 'Regular',
          addons: ['Extra Shrimp'],
        },
      ],
      statusColor: 'bg-yellow-500',
    },
    {
      type: 'Delivery',
      kot: '05',
      time: '10:25',
      customer: 'Keshav Joshi',
      location: 'Ahmedabad',
      note: 'No onion garlic',
      items: [
        { name: 'Seafood Noodles', qty: 1, note: '(Spicy)' },
        { name: 'Fried Egg Noodles', qty: 2 },
        {
          name: 'Shrimp Noodles',
          qty: 2,
          variation: 'Regular',
          addons: ['Extra Shrimp'],
        },
      ],
      statusColor: 'bg-purple-500',
    },
    {
      type: 'Pick Up',
      kot: '06',
      time: '10:30',
      customer: 'Not Assigned',
      location: '',
      note: 'No onion garlic',
      items: [
        { name: 'Seafood Noodles', qty: 1, note: '(Spicy)' },
        { name: 'Fried Egg Noodles', qty: 2 },
        {
          name: 'Shrimp Noodles',
          qty: 2,
          variation: 'Regular',
          addons: ['Extra Shrimp'],
        },
      ],
      statusColor: 'bg-green-500',
    },
  ];

const OrderCardGrid = () => {
  return (
    <div className="p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {orders.map((order, index) => (
        <OrderCard key={index} {...order} />
      ))}
    </div>
  </div>
  )
}

export default OrderCardGrid
