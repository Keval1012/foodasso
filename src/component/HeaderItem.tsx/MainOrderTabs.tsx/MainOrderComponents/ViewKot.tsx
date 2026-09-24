import React, { useEffect, useState } from 'react';
import OrderStatus from './OrderStatus';
import OrderCard from './OrderCard';
import { getLiveKotView } from '../../../../Api/Api';
import { setLiveKot ,setOrderType} from '../../../../redux/Features/BillingDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderType } from '../../../../Api/Api';
interface ViewKotDataProps {
  selectedTab: any;
}

interface OrderItem {
  name: string;
  qty: number;
  note?: string;
  variation?: string;
  addons?: string[];
}

interface Order {
  type: string;
  kot: string;
  time: string;
  customer: string;
  location: string;
  note: string;
  items: OrderItem[];
  statusColor: string;
}

const ViewKot: React.FC<ViewKotDataProps> = ({ selectedTab }) => {
  const dispatch = useDispatch();
  const liveKot = useSelector((state: any) => state.billingData.liveKot);
  const liveKotss = useSelector((state: any) => state.billingData.orderType);
  const [liveKotViewList, setLiveKotViewList] = useState<Order[]>([]);

  useEffect(() => {
    fetchLiveKotView();
    getOrderTypes()
  }, [selectedTab]);

  const fetchLiveKotView = async () => {
    const data = {
      outlet_id: 1,
      kot_status: "not_prepared",
      // "order_type":1  // for filtering if needed
    };

    try {
      const res = await getLiveKotView(data);
      if (res?.status === 200) {
        setLiveKotViewList(res.data?.data || []);
        dispatch(setLiveKot(res.data?.data || []));
      }
    } catch (error) {
      console.error("Failed to fetch live KOT view:", error);
    }
  };
const getOrderTypes=async()=>{
  const payload={}
 let responce:any = await getOrderType()

 if (responce?.status === 200) {
  dispatch(setOrderType(responce?.data?.data));
  
}
}
 
  return (
    <div className="w-full mt-10">
      <div className="my-5">
        <OrderStatus />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {liveKot && liveKot.length > 0 ? (
          liveKot.map((kot: Order, index: number) => (
            <OrderCard key={index} kot={kot} fetchLiveKotView={fetchLiveKotView} />
          ))
        ) : (
          <p>No live orders available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewKot;
