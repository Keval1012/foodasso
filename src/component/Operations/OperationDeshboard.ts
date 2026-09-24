import { IconType } from "react-icons"; // Add this import
import { CiBoxes, CiDeliveryTruck } from "react-icons/ci";
import {
  FaUtensils,
  FaPercentage,
  FaCashRegister,
  FaCog,
  FaRedo,
  FaBox,
} from "react-icons/fa";

import { FiFileText, FiPrinter } from "react-icons/fi";
import { GiTabletopPlayers } from "react-icons/gi";
import { LuBadgeHelp, LuRefreshCcw, LuUsers, LuWallet } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { RiPagesLine, RiUserSettingsLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbMoneybag } from "react-icons/tb";

// Define a type for the items
interface DashboardItem {
  name: string;
  icon: IconType;
  path?: string;
}

export const topSectionItems: DashboardItem[] = [
  { name: "Orders", icon: FiFileText, path: "/operations/order" },
  // { name: "Online Orders", icon: FaShoppingCart },

  // { name: "KOTs", icon: FaClipboardList, path: "/operations/Kot" },
  // { name: "Customers", icon: FaUsers, path: "/operations/Customer" },
  // // { name: "Cash Flow", icon: FaDollarSign, path: "/operations/cashflow" },//
  // { name: "Expense", icon: FaWallet, path: "/operations/expense" },
  // { name: "Withdrawal", icon: FaMoneyBillAlt, path: "/operations/withdrawal" },

  { name: "KOTs", icon: RiPagesLine, path: "/operations/Kot" },
  { name: "Customers", icon: LuUsers, path: "/operations/Customer" },
  // { name: "Cash Flow", icon: FaDollarSign, path: "/operations/cashflow" },
  { name: "Expense", icon: LuWallet, path: "/operations/expense" },
  { name: "Withdrawal", icon: TbMoneybag, path: "/operations/withdrawal" },

  // { name: "Cash Top-Up", icon: FaSyncAlt, path: "/operations/Cashtopup" },
  // { name: "Inventory", icon: FaBox },
  // { name: "Notification", icon: FaBell },
  { name: "Table", icon: GiTabletopPlayers, path: "/operations/tables" },
  // { name: "Cash Top-Up", icon: FaSyncAlt, },

  // { name: "Inventory", icon: FaBox, path: "/operations/inventory" },
  // { name: "Notification", icon: FaBell },
  // { name: "Table", icon: FaTable },
  // { name: "Manual Sync", icon: FaSyncAlt },
  // { name: "Help", icon: FaLifeRing, path: "/operations/help" },
  // { name: "Live View", icon: FaEye, path: "/menuItem/menu" },

  // { name: "Inventory", icon: CiBoxes, path: "/operations/inventory" }, //
  // { name: "Notification", icon: FaBell },
  // { name: "Table", icon: FaTable },
  { name: "Manual Sync", icon: LuRefreshCcw, path: "/refresh" },
  { name: "Help", icon: LuBadgeHelp, path: "/operations/help" },
  { name: "Live View", icon: RxDashboard, path: "/menuItem/menu" },

  {
    name: "Due Payment",
    icon: MdOutlinePayments,
    path: "/operations/DuePaymentReport",
  },
  // { name: "Language Profiles", icon: FaLanguage },
  {
    name: "Billing User Profile",
    icon: RiUserSettingsLine,
    path: "/operations/billerprofiles",
  },
  // { name: "Currency Conversion", icon: FaCoins },
  // { name: "Feedback", icon: FaCommentDots },
  {
    name: "Delivery Boys",
    icon: CiDeliveryTruck,
    path: "/operations/DeliveryBoyListing",
  },
];

export const bottomSectionItems: DashboardItem[] = [
  // { name: "Menu", icon: FaUtensils, path: "/operations/menu" },//
  // { name: "Bill / KOT Print", icon: FaFileInvoice, path: "/operations/bill_print" },
  {
    name: "Bill/KOT Print",
    icon: FiPrinter,
    path: "/operations/mainBillKotPrint/print",
  },
  // { name: "Tax", icon: FaPercentage, path: "/operations/tax" },//
  // { name: "Discount", icon: FaPercentage },//

  // { name: "Billing Screen", icon: FaCashRegister },
  // { name: "Settings", icon: FaCog },
  // { name: "Service Renewal", icon: FaRedo },
];
