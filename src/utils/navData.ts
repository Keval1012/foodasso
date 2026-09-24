// import {
//   FaUtensils,
//   FaTable,
//   FaClipboardList,
//   FaChartLine,
//   FaBox,
//   FaFileAlt,
//   FaUser,
//   FaTrashAlt,
//   FaStore,
//   FaBriefcase,
//   FaUserLock,
//   FaPinterestP,
//   FaQuestionCircle,
// } from "react-icons/fa";
// import { IoHomeSharp } from "react-icons/io5";
// import { IconType } from "react-icons";
// import { MdOutlineAddHomeWork } from "react-icons/md";
// import { FaKitchenSet } from "react-icons/fa6";
// import { SiHeadphonezone } from "react-icons/si";

// interface NavItem {
//   title: string;
//   icon: IconType;
// }

// export const navData: NavItem[] = [
//   { title: "Dashboard", icon: IoHomeSharp },
//   { title: "Orders And Billing", icon: FaClipboardList },
//   { title: "Tables", icon: FaTable },
//   { title: "Menu Trigger & Store On / Off", icon: FaUtensils },
//   { title: "Item out-of-stock tracking", icon: FaClipboardList },
//   { title: "Store status tracking dashboard", icon: FaChartLine },
//   { title: "Inventory", icon: FaBox },
//   { title: "Reports", icon: FaFileAlt },
//   { title: "User Management", icon: FaUser },
//   { title: "Delete Outlets", icon: FaTrashAlt },
//   { title: "Franchisee Management", icon: FaStore },
//   { title: "Briefcase Documents", icon: FaBriefcase },
//   { title: "User Logs", icon: FaUserLock },
//   { title: "Add New HO", icon: MdOutlineAddHomeWork },
//   { title: "Add Kitchen", icon: FaKitchenSet },
//   { title: "Create Zone", icon: SiHeadphonezone },
//   { title: "Foodasso APPs", icon: FaPinterestP },
//   { title: "Help Manual", icon: FaQuestionCircle },
// ];

// import {
//   FaUtensils,
//   FaTable,
//   FaClipboardList,
//   FaChartLine,
//   FaBox,
//   FaFileAlt,
//   FaUser,
//   FaTrashAlt,
//   FaStore,
//   FaBriefcase,
//   FaBook,
// } from "react-icons/fa";
// import { IoHomeSharp } from "react-icons/io5";
// import { IconType } from "react-icons";
// import { FC } from "react";

// // Import your components here
// import Dashboard from "../component/Dashboard/Dashboard";
// import OrdersAndBilling from "../component/OrdersAndBilling/OrdersAndBilling";

// // Import other components...

// interface NavItem {
//   title: string;
//   icon: IconType;
//   path: string;
//   component: FC;
// }

// export const navData: NavItem[] = [
//   { title: "Dashboard", icon: IoHomeSharp, path: "/", component: Dashboard },
//   {
//     title: "Orders And Billing",
//     icon: FaClipboardList,
//     path: "/orders-billing",
//     component: OrdersAndBilling,
//   },
//   { title: "Tables", icon: FaTable, path: "/tables", component: OrdersAndBilling },
//   {
//     title: "Menu Trigger & Store On / Off",
//     icon: FaUtensils,
//     path: "/menu-trigger",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Item out-of-stock tracking",
//     icon: FaClipboardList,
//     path: "/out-of-stock",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Store status tracking dashboard",
//     icon: FaChartLine,
//     path: "/status-tracking",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Inventory",
//     icon: FaBox,
//     path: "/inventory",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Reports",
//     icon: FaFileAlt,
//     path: "/reports",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "User Management",
//     icon: FaUser,
//     path: "/user-management",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Delete Outlets",
//     icon: FaTrashAlt,
//     path: "/delete-outlets",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Franchisee Management",
//     icon: FaStore,
//     path: "/franchisee-management",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Briefcase Documents",
//     icon: FaBriefcase,
//     path: "/briefcase-documents",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "User Logs",
//     icon: FaBook,
//     path: "/user-logs",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Add New HO",
//     icon: FaBook,
//     path: "/add-new-ho",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Add Kitchen",
//     icon: FaBook,
//     path: "/add-kitchen",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Create Zone",
//     icon: FaBook,
//     path: "/create-zone",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Petpooja APPs",
//     icon: FaBook,
//     path: "/petpooja-apps",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Help Manual",
//     icon: FaBook,
//     path: "/help-manual",
//     component: OrdersAndBilling,
//   },
// ];

// import {
//   FaUtensils,
//   FaTable,
//   FaClipboardList,
//   FaChartLine,
//   FaBox,
//   FaFileAlt,
//   FaUser,
//   FaTrashAlt,
//   FaStore,
//   FaBriefcase,
//   FaBook,
//   FaQuestionCircle,
//   FaPinterestP,
// } from "react-icons/fa";
// import { IoHomeSharp } from "react-icons/io5";
// import { IconType } from "react-icons";
// import { FC } from "react";

// // Import your components here
// import Dashboard from "../component/Dashboard/Dashboard";
// import OrdersAndBilling from "../component/OrdersAndBilling/OrdersAndBilling";

// import subNav2 from "../component/OrdersAndBilling/subNav2";
// import { MdOutlineAddHomeWork } from "react-icons/md";
// import { FaKitchenSet } from "react-icons/fa6";
// import { SiHeadphonezone } from "react-icons/si";
// // import Tabel from "../component/Tables/Tabel";

// // Import other components...

// export interface NavItem {
//   title: string;
//   icon: IconType;
//   path: string;
//   component?: FC;
//   subNav?: SubNavItem[];
// }

// export interface SubNavItem {
//   title: string;
//   icon: IconType;
//   path: string;
//   component?: FC;
// }

// export const navData: NavItem[] = [
//   { title: "Dashboard", icon: IoHomeSharp, path: "/", component: Dashboard },
//   {
//     title: "Orders And Billing",
//     icon: FaClipboardList,
//     path: "/orders-billing",
//     component: OrdersAndBilling,

//     subNav: [
//       {
//         title: "Sub Item 1",
//         icon: FaBook,
//         path: "/orders-billing/sub1",
//         component: subNav2,
//       },
//       {
//         title: "Sub Item 2",
//         icon: FaBook,
//         path: "/orders-billing/sub2",
//         component: subNav2,
//       },
//     ],
//   },
//   {
//     title: "Tables",
//     icon: FaTable,
//     path: "/tables",
//     // component: Tabel,
//   },
//   {
//     title: "Menu Trigger & Store On / Off",
//     icon: FaUtensils,
//     path: "/menu-trigger",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Item out-of-stock tracking",
//     icon: FaClipboardList,
//     path: "/out-of-stock",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Store status tracking dashboard",
//     icon: FaChartLine,
//     path: "/status-tracking",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Inventory",
//     icon: FaBox,
//     path: "/inventory",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Reports",
//     icon: FaFileAlt,
//     path: "/reports",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "User Management",
//     icon: FaUser,
//     path: "/user-management",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Delete Outlets",
//     icon: FaTrashAlt,
//     path: "/delete-outlets",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Franchisee Management",
//     icon: FaStore,
//     path: "/franchisee-management",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Briefcase Documents",
//     icon: FaBriefcase,
//     path: "/briefcase-documents",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "User Logs",
//     icon: FaBook,
//     path: "/user-logs",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Add New HO",
//     icon: MdOutlineAddHomeWork,
//     path: "/add-new-ho",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Add Kitchen",
//     icon: FaKitchenSet,
//     path: "/add-kitchen",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Create Zone",
//     icon: SiHeadphonezone,
//     path: "/create-zone",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Foodasso APPs",
//     icon: FaPinterestP,
//     path: "/foodasso-apps",
//     component: OrdersAndBilling,
//   },
//   {
//     title: "Help Manual",
//     icon: FaQuestionCircle,
//     path: "/help-manual",
//     component: OrdersAndBilling,
//   },
// ];
export {};
