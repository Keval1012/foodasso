// import React, { useState } from "react";
// import foodassoLogo from "../../Styles/assets/img/foodasso.svg";
// import { IoReorderThreeOutline } from "react-icons/io5";
// import {
//   MdOutlineArrowDropDown,
//   MdOutlineNotificationsActive,
// } from "react-icons/md";
// import { IoMdSettings, IoMdSearch } from "react-icons/io";
// import CustomDialog from "../common/Dialog";
// import NotificationSidebar from "../common/NotificationSidebar";
// import menu from "../../Styles/assets/img/menu cons.svg";
// import bill from "../../Styles/assets/img/bill icon.svg";
// import viewbill from "../../Styles/assets/img/view.svg";
// import time from "../../Styles/assets/img/time-icon.svg";
// import noti from "../../Styles/assets/img/notifiaction.svg";
// import refreshing from "../../Styles/assets/img/refresh.svg";
// import question from "../../Styles/assets/img/question-icon.svg";
// import off from "../../Styles/assets/img/trunoff.svg";
// import admin from "../../Styles/assets/img/admin-user.png";

// interface HeaderProps {
//   toggleSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
//   // const [isDialogOpen, setIsDialogOpen] = useState(false);
//   // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   // const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

//   return (
//     <header className="bg-white  flex justify-between items-center p-4  border-b border-[#0000001C] ">
//       <div className="flex items-center justify-between space-x-4">
//         <div className="flex items-center space-x-4">
//           <button className="text-gray-600" onClick={toggleSidebar}>
//             <IoReorderThreeOutline className="h-10 w-9" />
//           </button>

//           <img src={foodassoLogo} alt="Logo" className="h-10" />
//           <div className="   bg-orange-400 text-white hover:bg-orange-500 rounded py-2 px-4">
//             <button className="text-base">New Order</button>
//           </div>

//           <form className="flex space-x-4">
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <IoMdSearch className="text-[#D4D4D4]" />
//               </div>
//               <input
//                 type="search"
//                 id="default-search"
//                 className="block w-28  py-3 px-4 ps-8 text-xs text-gray-900 border border-gray-300 rounded bg-white "
//                 placeholder="Bill No."
//                 required
//               />
//             </div>
//             <div className="relative">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <IoMdSearch className="text-[#D4D4D4]" />
//               </div>
//               <input
//                 type="search"
//                 id="default-search"
//                 className="block w-28  py-3 px-4 ps-8 text-xs text-gray-900 border border-gray-300 rounded bg-white "
//                 placeholder="KOT No."
//                 required
//               />
//             </div>
//           </form>
//         </div>

//         {/* <div
//           className="flex items-center bg-custom-gray cursor-pointer"
//           onClick={() => setIsDialogOpen(true)}
//         >
//           <span className="text-gray-600 pr-40 pl-5 pt-5 pb-5 text-sm md:text-sm sm:text-xl">
//             All Outlets
//           </span>
//           <MdOutlineArrowDropDown className="h-5 w-5 text-gray-600" />
//         </div> */}
//       </div>
//       <div className="flex items-center ">
//         <div className="flex gap-4">
//           <img src={menu} alt="Logo" className=" cursor-pointer" />
//           <img src={bill} alt="Logo" className="cursor-pointer" />
//           <img src={viewbill} alt="Logo" className="cursor-pointer" />
//           <img src={time} alt="Logo" className="cursor-pointer" />
//           <img src={noti} alt="Logo" className="cursor-pointer" />
//           <img src={refreshing} alt="Logo" className="cursor-pointer" />
//           <img src={question} alt="Logo" className="cursor-pointer" />
//           <img src={off} alt="Logo" className="cursor-pointer" />
//         </div>
//         <div className="flex items-center pl-3 gap-2">
//           <img src={admin} alt="Logo" className="" />
//           <div>
//             <div className="text-base">Krishna Patel</div>
//             <span className="text-xs px-2">Admin</span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import foodassoLogo from "../../Styles/assets/img/foodasso.svg";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import menu from "../../Styles/assets/img/menu cons.svg";
import bill from "../../Styles/assets/img/bill icon.svg";
import viewbill from "../../Styles/assets/img/view.svg";
import time from "../../Styles/assets/img/time-icon.svg";
import noti from "../../Styles/assets/img/notifiaction.svg";
import refreshing from "../../Styles/assets/img/refresh.svg";
import question from "../../Styles/assets/img/question-icon.svg";
import off from "../../Styles/assets/img/trunoff.svg";
import admin from "../../Styles/assets/img/admin-user.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sheet from "../common/Sheet";
import ViewBill from "../HeaderItem.tsx/ViewBill/ViewBill";
import OnHold from "../HeaderItem.tsx/OnHold/OnHold";
import InfoBill from "../HeaderItem.tsx/ViewBill/ViewBillTabComponents/InfoBill";
import { getHoldOrders, getOrderType, getRecentOrders } from "../../Api/Api";
import { useSelector } from "react-redux";
// Define the type for the props expected by the Header component
interface HeaderProps {
  toggleSidebar: () => void; // Function to toggle the sidebar
}

interface OrderType {
  id: any;
  type: any;
}

// Header component, accepts a prop to toggle the sidebar
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [isViewBillSheetOpen, setIsViewBillSheetOpen] = useState(false);
  const [isOnHoldSheetOpen, setIsOnHoldSheetOpen] = useState(false);
  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [recentDineInOrderList, setRecentDineInOrderList] = useState([]);
  const [holdOrderList, setHoldOrderList] = useState([]);
  const [orderStatusColor, setOrderStatusColor] = useState(null);
  const tablewiseorder = useSelector((state: any) => state.billingData.tablewiseorder);

  const openViewBillSheet = () => {
    fetchOrderTypeData();
    fetchRecentOrders();
    setIsViewBillSheetOpen(true);
  };

  const closeViewBillSheet = () => {
    setIsViewBillSheetOpen(false);
  };
  const openOnHoldSheet = () => {
    fetchHoldOrders();
    setIsOnHoldSheetOpen(true);
  };

  const closeOnHoldSheet = () => {
    setIsOnHoldSheetOpen(false);
  };

  useEffect(() => {
    fetchOrderTypeData();
  }, []);

  const fetchOrderTypeData = async () => {
    const res = await getOrderType();
    if (res?.status === 200) {
      setOrderTypeList(res?.data?.data);
    }
  };

  const fetchRecentOrders = async () => {
    let orderType = orderTypeList.find(
      (o: OrderType) => o?.type === "Dine In"
    )?.type;

    let data = {
      outlet: 1,
      order_type: orderType,
    };

    try {
      const res = await getRecentOrders(data);
      if (res?.status === 200) {
        setRecentDineInOrderList(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchHoldOrders = async () => {
    let data = {
      outlet: 1,
    };

    try {
      const res = await getHoldOrders(data);
      if (res?.status === 200) {
        setHoldOrderList(res.data?.data);
      }
    } catch (error) {}
  };

  const handleLogout = () => {
    localStorage.clear();
    // window.location.reload();
    window.location.href = "/billing";
    navigate("/login");
  };

 

  // The following states are commented out but can be used for dialog, sidebar, and dropdown states
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  useEffect(()=>{
    setIsOnHoldSheetOpen(false);
  },[tablewiseorder])
  return (
    <header className="bg-white  flex justify-between items-center p-4  border-b border-[#0000001C] ">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          {/* Button to toggle sidebar visibility */}
          <button className="text-gray-600" onClick={toggleSidebar}>
            <IoReorderThreeOutline className="h-10 w-9" />
          </button>

          {/* Logo image */}
          <img src={foodassoLogo} alt="Logo" className="h-10" />

          {/* Button to create a new order */}
          <Link to={"/billing"}>
            {" "}
            <div className="bg-orange-400 text-white hover:bg-orange-500 rounded py-2 px-4">
              <button className="text-base">New Order</button>
            </div>
          </Link>

          {/* Form for searching by Bill No. and KOT No. */}
          {/* <form className="flex space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoMdSearch className="text-[#D4D4D4]" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-28  py-3 px-4 ps-8 text-xs text-gray-900 border border-gray-300 rounded bg-white "
                placeholder="Bill No."
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoMdSearch className="text-[#D4D4D4]" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-28  py-3 px-4 ps-8 text-xs text-gray-900 border border-gray-300 rounded bg-white "
                placeholder="KOT No."
                required
              />
            </div>
          </form> */}
        </div>

        {/* The below commented-out code handles the opening of a dialog when clicking on "All Outlets" */}
        {/* 
        <div
          className="flex items-center bg-custom-gray cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="text-gray-600 pr-40 pl-5 pt-5 pb-5 text-sm md:text-sm sm:text-xl">
            All Outlets
          </span>
          <MdOutlineArrowDropDown className="h-5 w-5 text-gray-600" />
        </div> 
        */}
      </div>
      <div className="flex items-center ">
        <div className="flex gap-4">
          {/* Icons for various actions */}
          <Link to="/menuItem/menu">
            <img src={menu} alt="Logo" className="cursor-pointer" />
          </Link>
          {/* <Link to="/menuItem/currentOrder">
            <img src={bill} alt="Logo" className="cursor-pointer" />
          </Link> */}
          <img
            src={viewbill}
            onClick={openViewBillSheet}
            alt="Logo"
            className="cursor-pointer"
          />
          <img
            src={time}
            onClick={openOnHoldSheet}
            alt="Logo"
            className="cursor-pointer"
          />
          {/* <img src={noti} alt="Logo" className="cursor-pointer" />
          <img src={refreshing} alt="Logo" className="cursor-pointer" /> */}
          <Link to="/menuItem/helptips">
            <img src={question} alt="Logo" className="cursor-pointer" />
          </Link>
          <img
            src={off}
            alt="Logo"
            className="cursor-pointer"
            onClick={handleLogout}
          />
        </div>
        <div className="flex items-center pl-3 gap-2">
          {/* Admin profile icon and name */}
          {/* <img src={admin} alt="Admin Profile" className="" /> */}
          <div>
            <div className="text-base">{loginUserData?.fullname}</div>
            {/* <span className="text-xs px-2">Admin</span> */}
          </div>
        </div>
      </div>
      <Sheet
        isOpen={isViewBillSheetOpen}
        onClose={closeViewBillSheet}
        title="Recent"
      >
        <div className="flex flex-col justify-between h-screen">
          <ViewBill
            recentDineInOrderList={recentDineInOrderList}
            setOrderStatusColor={setOrderStatusColor}
          />
          <InfoBill />
        </div>
      </Sheet>
      <Sheet
        isOpen={isOnHoldSheetOpen}
        onClose={closeOnHoldSheet}
        title="On Hold"
      >
        <div>
          <OnHold
            holdOrderList={holdOrderList}
            fetchHoldOrders={fetchHoldOrders}
          />
        </div>
      </Sheet>
    </header>
  );
};

export default Header;
