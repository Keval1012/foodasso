import { FaUtensils, FaFileAlt } from "react-icons/fa";

import { IoGridOutline, IoHomeSharp, IoNewspaperOutline } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { IconType } from "react-icons";

import Login from "../component/common/Login";
import SubNav2 from "../component/OrdersAndBilling/subNav2";
import Passcode from "../component/common/Passcode";
import Sync from "../component/DataSync/Sync";
import MainDataSync from "../component/DataSyncSetup/MainDataSync";
import MainConfigureSystem from "../component/DataSyncConfigureSystem/MainConfigureSystem";
import MainBillingDashboard from "../component/Billing/MainBillingDashboard";
import Menu from "../component/HeaderItem.tsx/Menu";
import MainAllOperations from "../component/Operations/MainAllOperations";
import MainOrder from "../component/Operations/Order/MainOrder";
import MainKot from "../component/Operations/Kot/MainKot";
import MainCustomer from "../component/Operations/Customer/MainCustomer";
import Mainexpense from "../component/Operations/Expense/Mainexpense";
import SelectTable from "../component/Billing/ViewTables/SelectTable";
import DineIn from "../component/Billing/ViewTables/TabsComponent/DineIn";
import Delivary from "../component/Billing/ViewTables/TabsComponent/Delivary";
import Pickup from "../component/Billing/ViewTables/TabsComponent/Pickup";
import HelpTips from "../component/HeaderItem.tsx/HelpTips/HelpTips";
import Tables from "../component/Billing/Tables";
import { MdDeliveryDining, MdFormatLineSpacing } from "react-icons/md";
import { GiTabletopPlayers } from "react-icons/gi";
import { TbMilk, TbReportSearch } from "react-icons/tb";

import MainCashFlow from "../component/Operations/Cash Flow/MainCashFlow";
import MainWithdrawal from "../component/Operations/Withdrawal/MainWithdrawal";
import MainCashUp from "../component/Operations/CashTopUP/MainCashUp";
import MainDuepaymentReport from "../component/Operations/DuePaymentReport/MainDuepaymentReport";
import OrderWise from "../component/Operations/DuePaymentReport/OrderWise";
import OrderWiseDate from "../component/Operations/DuePaymentReport/DuePaymentReport tab/OrderWiseDate";
import CustomerWise from "../component/Operations/DuePaymentReport/DuePaymentReport tab/CustomerWise";
import CurrentOrder from "../component/HeaderItem.tsx/CurrentOrder/CurrentOrder";
import CurrentOrderTab from "../component/HeaderItem.tsx/CurrentOrder/OrderComponent/CurrentOrderTab";
import AdvanceOrderTab from "../component/HeaderItem.tsx/CurrentOrder/OrderComponent/AdvanceOrderTab";
import DelivaryOrder from "../component/HeaderItem.tsx/CurrentOrder/OrderComponent/CurrentOrderTabs/CurrentOrderSubTabs/CurrentOrderSubComponents/DelivaryOrder";
import DineInOrder from "../component/HeaderItem.tsx/CurrentOrder/OrderComponent/CurrentOrderTabs/CurrentOrderSubTabs/CurrentOrderSubComponents/DineInOrder";
import PickupOrder from "../component/HeaderItem.tsx/CurrentOrder/OrderComponent/CurrentOrderTabs/CurrentOrderSubTabs/CurrentOrderSubComponents/PickupOrder";
import OrderDetails from "../component/HeaderItem.tsx/Details/OrderDetails";

import MainBillerProfile from "../component/Operations/BillerProfile/MainBillerProfile";
import DelivaryData from "../component/HeaderItem.tsx/UpperTabs/Tabscomponents/DelivaryData";
import PickupData from "../component/HeaderItem.tsx/UpperTabs/Tabscomponents/PickupData";
import DineInData from "../component/HeaderItem.tsx/UpperTabs/Tabscomponents/DineInData";
import AllData from "../component/HeaderItem.tsx/UpperTabs/Tabscomponents/AllData";
import MainInventory from "../component/Operations/Inventory/MainInventory";
import MainPartPayment from "../component/Billing/ViewTables/Settlement/PartPayments/MainPartPayment";
import CustomerEdit from "../component/Operations/Customer/CustomerEdit";
import KotDetails from "../component/Operations/Kot/KotDetails ";
import ExpenseDatelis from "../component/Operations/Expense/ExpenseDatelis";
import ExpenseDatelisListing from "../component/Operations/Expense/ExpenseDatelisListing";
import ExpenseMangment from "../component/Operations/Expense/ExpenseMangment";
import ViewWithdrawalListing from "../component/Operations/Withdrawal/ViewWithdrawalListing";
import EditWithdrawalDetailsListingeDatelis from "../component/Operations/Withdrawal/EditWithdrawalDetailsListingeDatelis";
import Help from "../component/Operations/Help/Help";
import GetDuePaymentReport from "../component/Operations/DuePaymentReport/GetDuePaymentReport";
import DeliveryBoyListing from "../component/Operations/Delivery Boys/DeliveryBoyListing";
import EditDelivery from "../component/Operations/Delivery Boys/EditDelivery";
import AddDeliveryBoy from "../component/Operations/Delivery Boys/AddDeliveryBoy";
import MenuConfiguration from "../component/Operations/menu/MenuConfiguration";
import ItemListing from "../component/Operations/menu/ItemListing";
import EditItemForm from "../component/Operations/menu/EditItemForm";
import Addmenuform from "../component/Operations/menu/Addmenuform";
import SpecialNoteListing from "../component/Operations/menu/special note management/SpecialNoteListing";
import AddSpecialNote from "../component/Operations/menu/special note management/AddSpecialNote";
import EditSpecialNote from "../component/Operations/menu/special note management/EditSpecialNote";
import AreaManagementList from "../component/Operations/menu/Area Management/AreaManagementList";
import TaxListing from "../component/Operations/Tax/TaxListing";
import MainBillKotPrint from "../component/Operations/Bill&KotPrint/Multipleprintersetting/MainBillKotPrint";
import PrinterList from "../component/Operations/Bill&KotPrint/Multipleprintersetting/PrinterList";
import AddAsign from "../component/Operations/Bill&KotPrint/Multipleprintersetting/AddAsign";
import BillPrintSetting from "../component/Operations/Bill&KotPrint/Multipleprintersetting/BillPrintSetting";
import KotSetting from "../component/Operations/Bill&KotPrint/Multipleprintersetting/KotSetting";
import MainAsignBill from "../component/Operations/Bill&KotPrint/AsignPrinter/MainAsignBill";
import AsignBill from "../component/Operations/Bill&KotPrint/AsignPrinter/AsignBill";
import EditAsign from "../component/Operations/Bill&KotPrint/Multipleprintersetting/EditAsign";
import EditBillSetting from "../component/Operations/Bill&KotPrint/Multipleprintersetting/EditBillSetting";
import KotBillSetting from "../component/Operations/Bill&KotPrint/Multipleprintersetting/KotBillSetting";
import Kotconfiguration from "../component/Operations/Bill&KotPrint/Bill&KOTconfiguration/Kotconfiguration";
import Reports from "../component/Reports/Reports";
import CategoryReport from "../component/Reports/Category Summary/CategoryReport";
import ReportItem from "../component/Reports/Item Report/ReportItem";
import SaleReport from "../component/Reports/Sale Report/SaleReport";
import OrderReport from "../component/Reports/OrderReport/OrderReport";
import AddExpenseTable from "../component/Operations/Expense/AddExpenseTable";
import ViewAdvanceOrderList from "../component/HeaderItem.tsx/CurrentOrder/OrderComponent/advanceOrderComponent/ViewAdvanceOrderList";
import ViewOrdersDetails from "../component/Operations/Order/ViewOrdersDetails";
import { FiPrinter } from "react-icons/fi";
import AddWithdrawalTable from "../component/Operations/Withdrawal/AddWithDrawalTable";
import WithdrawalManagement from "../component/Operations/Withdrawal/WithdrawalManagement";
import ManualSync from "../component/Operations/Manual Sync/ManualSync";
import KotAsign from "../component/Operations/Bill&KotPrint/AsignPrinter/KotAsign";
import PurchaseManagementlist from "../component/Operations/Inventory/Purchase Management/PurchaseManagementlist";
import PurchaseAdd from "../component/Operations/Inventory/Purchase Management/PurchaseAdd";
import RequestPurchaselist from "../component/Operations/Inventory/RequestForPurchase/RequestPurchaselist";
import RequestPurchaseAdd from "../component/Operations/Inventory/RequestForPurchase/RequestPurchaseAdd";
import Wastagelist from "../component/Operations/Inventory/wastage/Wastagelist";
import WastageAdd from "../component/Operations/Inventory/wastage/WastageAdd";
import ConvertRawMaterial from "../component/Operations/Inventory/ConvertRawMaterial/ConvertRawMaterial";
import CurrentStocklist from "../component/Operations/Inventory/Current Stock/CurrentStocklist";
import OpeningClosingReport from "../component/Operations/Inventory/opening-closingreport/OpeningClosingReport";
import ExecutiveSalesReportlist from "../component/Reports/Executive Sales Report/ExecutiveSalesReportlist";
import EmployeeReportlist from "../component/Reports/Employee Report/EmployeeReportlist";
import GroupReport from "../component/Reports/GroupReport/GroupReport";
import VariationReport from "../component/Reports/variation  Report/VariationReport";
import CoverSizeReport from "../component/Reports/Cover Size Report/CoverSizeReport";
import TipSummary from "../component/Reports/TipSummary/TipSummary";
import LocalityWiseSummary from "../component/Reports/Locality Wise Summary/LocalityWiseSummary";

// Define the interface for navigation items
export interface NavItem {
  title: string;
  icon: IconType;
  path?: string;
  component?: JSX.Element;
  subNav?: SubNavItem[];
  isVisible?: boolean;
}

// Define the interface for sub-navigation items
export interface SubNavItem {
  title: string;
  icon: IconType;
  path?: string;
  component?: JSX.Element;
  isVisible?: boolean;
}

// export const LogoutComponent = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.reload();
//     navigate("/login");
//   };

//   return <div onClick={handleLogout}></div>;
// };

// Define the common routes that will be used by all users
export const commonRoutes: NavItem[] = [
  {
    title: "DataSync ",
    icon: BsFillPersonFill,
    path: "/sync",
    component: <Sync />,
    isVisible: true,
  },
  {
    title: "BillingSetup  ",
    icon: BsFillPersonFill,
    path: "/sync/billing_setup",
    component: <MainDataSync />,
    isVisible: true,
  },
  {
    title: "BillingSetup  ",
    icon: BsFillPersonFill,
    path: "/sync/billing_setup/configure_system",
    component: <MainConfigureSystem />,
    isVisible: true,
  },
  {
    title: "Login",
    icon: BsFillPersonFill,
    path: "/login",
    component: <Login />,
    isVisible: true,
  },
  // {
  //   title: "Passcode",
  //   icon: BsFillPersonFill,
  //   path: "/login/passcode",
  //   component: <Passcode />,
  //   isVisible: true,
  // },
];

//7FOODIES Routes

export const sevenFoodiesRoutes: NavItem[] = [
  {
    title: "Menu",
    icon: IoHomeSharp,
    path: "/menuItem/menu",
    component: <Menu />,
    isVisible: false,
  },
  {
    title: "Menu",
    icon: IoHomeSharp,
    path: "/menuItem/currentOrder",
    component: <CurrentOrder />,
    isVisible: false,
  },
  {
    title: "Menu",
    icon: IoHomeSharp,
    path: "/menuItem/helptips",
    component: <HelpTips />,
    isVisible: false,
  },
  {
    title: "Billing",
    icon: IoNewspaperOutline,
    path: "/billing",
    component: <MainBillingDashboard />,
    isVisible: true,
  },

  {
    title: "On HoldSider",
    icon: IoHomeSharp,
    path: "/menuItem/onhold",
    // component: <OnHoldNotificationSidebar isOpen={false} onClose={function (): void {
    //   throw new Error("Function not implemented.");
    // } }/>,
    component: <OrderDetails />,
    isVisible: false,
  },
  {
    title: "PartPayment",
    icon: IoHomeSharp,
    path: "/Billing/MainPartPayment",
    component: <MainBillingDashboard />,
    isVisible: false,
  },
  {
    title: "View Table",
    icon: IoHomeSharp,
    path: "/selectTable",
    component: <SelectTable />,
    isVisible: false,
  },
  {
    title: "Edit Table",
    icon: IoHomeSharp,
    path: " /edit/:id",
    component: <SelectTable />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: MdFormatLineSpacing,
    path: "/operations",
    component: <MainAllOperations />,
    isVisible: true,
  },

  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/order",
    component: <CurrentOrder />,
    isVisible: false,
  },

  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/Kot",
    component: <MainKot />,
    isVisible: false,
  },
  {
    title: "Operations kot",
    icon: FaFileAlt,
    path: "/operations/Kot/kotview/:id",
    component: <KotDetails />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/customer",
    component: <MainCustomer />,
    isVisible: false,
  },
  {
    title: "Operations customerEdit",
    icon: FaFileAlt,
    path: "/operations/customer/customerEdit/:id",
    component: <CustomerEdit />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/expense",
    component: <Mainexpense />,
    isVisible: false,
  },
  {
    title: "Operations expense edit",
    icon: FaFileAlt,
    path: "/operations/expense/edit",
    component: <ExpenseDatelis />,
    isVisible: false,
  },
  {
    title: "Operations expense view",
    icon: FaFileAlt,
    path: "/operations/expense/view",
    component: <ExpenseDatelisListing />,
    isVisible: false,
  },
  {
    title: "Operations expense data add",
    icon: FaFileAlt,
    path: "/operations/expense/expensemangment/add",
    component: <AddExpenseTable />,
    isVisible: false,
  },

  {
    title: "Operations expense add",
    icon: FaFileAlt,
    path: "/operations/expense/expensemangment",
    component: <ExpenseMangment />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/cashflow",
    component: <MainCashFlow />,
    isVisible: false,
  },

  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/withdrawal",
    component: <MainWithdrawal />,
    isVisible: false,
  },

  {
    title: "Operations withdrawal edit",
    icon: FaFileAlt,
    path: "/operations/withdrawal/edit",
    component: <EditWithdrawalDetailsListingeDatelis />,
    isVisible: false,
  },

  {
    title: "Operations withdrawal view",
    icon: FaFileAlt,
    path: "/operations/withdrawal/view",
    component: <ViewWithdrawalListing />,
    isVisible: false,
  },
  {
    title: "Operations withdrawal add",
    icon: FaFileAlt,
    path: "/operations/withdrawal/withdrawalmangment",
    component: <WithdrawalManagement />,
    isVisible: false,
  },
  {
    title: "Operations withdrawal data add",
    icon: FaFileAlt,
    path: "/operations/withdrawal/withdrawalmangment/add",
    component: <AddWithdrawalTable />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/Cashtopup",
    component: <MainCashUp />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/DuePaymentReport",
    component: <GetDuePaymentReport />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/DuePaymentReport/order",
    component: <MainDuepaymentReport />,
    isVisible: false,
  },
  {
    title: "order wise",
    icon: FaFileAlt,
    path: "/operations/DuePaymentReport/Order_Wise",
    component: <OrderWise />,
    isVisible: false,
  },
  {
    title: "customer wise",
    icon: FaFileAlt,
    path: "/operations/DuePaymentReport/Customer_wise",
    component: <CustomerWise />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/tables",
    component: <Tables />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/refresh",
    component: <ManualSync />,
    isVisible: false,
  },
  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/help",
    component: <Help />,
    isVisible: false,
  },

  {
    title: "Operations",
    icon: FaFileAlt,
    path: "/operations/billerprofiles",
    component: <MainBillerProfile />,
    isVisible: false,
  },
  {
    title: "DeliveryBoy",
    icon: FaFileAlt,
    path: "/operations/DeliveryBoyListing",
    component: <DeliveryBoyListing />,
    isVisible: false,
  },
  {
    title: "DeliveryBoy add",
    icon: FaFileAlt,
    path: "/operations/DeliveryBoyListing/Add",
    component: <AddDeliveryBoy />,
    isVisible: false,
  },

  {
    title: "DeliveryBoy edit",
    icon: FaFileAlt,
    path: "/operations/DeliveryBoyListing/edit",
    component: <EditDelivery />,
    isVisible: false,
  },
  {
    title: "inventory",
    icon: FaFileAlt,
    path: "/operations/inventory",
    component: <MainInventory />,
    isVisible: false,
  },

  {
    title: "PurchaseManagement",
    icon: FaFileAlt,
    path: "/operations/inventory/PurchaseManagement",
    component: <PurchaseManagementlist />,
    isVisible: false,
  },
  {
    title: "AddPurchaseManagement",
    icon: FaFileAlt,
    path: "/operations/inventory/AddPurchaseManagement",
    component: <PurchaseAdd />,
    isVisible: false,
  },
  {
    title: "RequestPurchaselist",
    icon: FaFileAlt,
    path: "/operations/inventory/RequestPurchaselist",
    component: <RequestPurchaselist />,
    isVisible: false,
  },
  {
    title: "RequestPurchaseAdd",
    icon: FaFileAlt,
    path: "/operations/inventory/RequestPurchaseAdd",
    component: <RequestPurchaseAdd />,
    isVisible: false,
  },

  {
    title: "Wastage",
    icon: FaFileAlt,
    path: "/operations/inventory/Wastagelist",
    component: <Wastagelist />,
    isVisible: false,
  },

  {
    title: "Wastage add",
    icon: FaFileAlt,
    path: "/operations/inventory/Wastageadd",
    component: <WastageAdd />,
    isVisible: false,
  },
  {
    title: "Conversion Table",
    icon: FaFileAlt,
    path: "/operations/inventory/ConversionTable",
    component: <ConvertRawMaterial />,
    isVisible: false,
  },

  {
    title: "Current Stock",
    icon: FaFileAlt,
    path: "/operations/inventory/CurrentStock",
    component: <CurrentStocklist />,
    isVisible: false,
  },

  {
    title: "open close stock",
    icon: FaFileAlt,
    path: "/operations/inventory/OpeningCloseingTable",
    component: <OpeningClosingReport />,
    isVisible: false,
  },
  {
    title: "menu",
    icon: FaFileAlt,
    path: "/operations/menu",
    component: <MenuConfiguration />,
    isVisible: false,
  },
  {
    title: "menu item",
    icon: FaFileAlt,
    path: "/operations/menu/item",
    component: <ItemListing />,
    isVisible: false,
  },

  {
    title: "menu item add",
    icon: FaFileAlt,
    path: "/operations/menu/item/add",
    component: <EditItemForm />,
    isVisible: false,
  },
  {
    title: "Special Note Listing",
    icon: FaFileAlt,
    path: "/operations/SpecialNoteListing",
    component: <SpecialNoteListing />,
    isVisible: false,
  },
  {
    title: "Special Note Listing add",
    icon: FaFileAlt,
    path: "/operations/SpecialNoteListing/add",
    component: <AddSpecialNote />,
    isVisible: false,
  },
  {
    title: "Special Note Listing Edit",
    icon: FaFileAlt,
    path: "/operations/SpecialNoteListing/edit",
    component: <EditSpecialNote />,
    isVisible: false,
  },
  {
    title: "menu item edit",
    icon: FaFileAlt,
    path: "/operations/menu/item/edit",
    component: <Addmenuform />,
    isVisible: false,
  },
  {
    title: "Area Management List",
    icon: FaFileAlt,
    path: "/operations/AreaManagementList",
    component: <AreaManagementList />,
    isVisible: false,
  },
  {
    title: "Tax",
    icon: FaFileAlt,
    path: "/operations/tax",
    component: <TaxListing />,
    isVisible: false,
  },
  // {
  //   title: "KOT Printer",
  //   icon: FaFileAlt,
  //   path: "/operations/bill_Kot",
  //   component: <MainBillKotPrint />,
  //   isVisible: false,
  // },
  // {
  //   title: "Bill/KOT Print",
  //   icon: FaFileAlt,
  //   path: "/operations/bill_kot_peinter",
  //   component: <MainBillKotPrint />,
  //   isVisible: false,
  // },

  // {
  //   title: "Bill/KOT Print",
  //   icon: FaFileAlt,
  //   path: "/operations/bills_print",
  //   component: <MainBillKotPrint />,
  //   isVisible: false,
  // },

  {
    title: "Bill/KOT Print",
    icon: FiPrinter,
    path: "/operations/mainBillKotPrint/print",
    component: <MainBillKotPrint />,
    isVisible: false,
  },
  // {
  //   title: "Bill/KOT Print",
  //   icon: FaFileAlt,
  //   path: "/operations/billprint",
  //   component: <MainBillKotPrint />,
  //   isVisible: false,
  // },

  {
    title: "Bill/KOT Print asign",
    icon: FaFileAlt,
    path: "/operations/bill_print/add",
    component: <AddAsign />,
    isVisible: false,
  },
  {
    title: "Bill/KOT Print  setting",
    icon: FaFileAlt,
    path: "/operations/bill_print/add/BillPrintSetting",
    component: <BillPrintSetting />,
    isVisible: false,
  },

  {
    title: "Bill/KOT Print  setting",
    icon: FaFileAlt,
    path: "/operations/bill_print/add/KotSetting",
    component: <KotSetting />,
    isVisible: false,
  },

  {
    title: "Bill/KOT Print edit asign",
    icon: FaFileAlt,
    path: "/operations/bill_print/edit",
    component: <EditAsign />,
    isVisible: false,
  },
  {
    title: "Bill/KOT Print  setting",
    icon: FaFileAlt,
    path: "/operations/bill_print/add/edit/billPrintSetting",
    component: <EditBillSetting />,
    isVisible: false,
  },

  {
    title: "Bill/KOT Print  setting",
    icon: FaFileAlt,
    path: "/operations/bill_print/add/edit/KotSetting",
    component: <KotBillSetting />,
    isVisible: false,
  },

  {
    title: "Asign bill",
    icon: FaFileAlt,
    path: "/operations/bill_print/assign",
    component: <MainAsignBill />,
    isVisible: false,
  },

  {
    title: "Asign bill",
    icon: FaFileAlt,
    path: "/operations/bill_print/assign/printer/bill/:id",
    component: <AsignBill />,
    isVisible: false,
  },
  {
    title: "Asign kot",
    icon: FaFileAlt,
    path: "/operations/bill_print/assign/printer/kot/:id",
    component: <KotAsign />,
    isVisible: false,
  },

  {
    title: "Bill/KOT Print",
    icon: FaFileAlt,
    path: "/operations/printerlist",
    component: <PrinterList />,
    isVisible: false,
  },
  {
    title: "Bill/KOT configuration",
    icon: FaFileAlt,
    path: "/operations/bill_print/Kotconfiguration",
    component: <Kotconfiguration />,
    isVisible: false,
  },
  {
    title: "Reports",
    icon: TbReportSearch,
    path: "/reports",
    component: <Reports />,
    isVisible: true,
  },

  {
    title: "Reports Category Report",
    icon: IoHomeSharp,
    path: "/reports/CategoryReport",
    component: <CategoryReport />,
    isVisible: false,
  },

  {
    title: "Reports item Report",
    icon: IoHomeSharp,
    path: "/reports/itemReport",
    component: <ReportItem />,
    isVisible: false,
  },
  {
    title: "Reports sale Report",
    icon: IoHomeSharp,
    path: "/reports/saleReport",
    component: <SaleReport />,
    isVisible: false,
  },

  {
    title: "Reports Order Report",
    icon: IoHomeSharp,
    path: "/reports/orderReport",
    component: <OrderReport />,
    isVisible: false,
  },

  {
    title: "Executive Sales Report",
    icon: IoHomeSharp,
    path: "/reports/ExecutiveSalesReport",
    component: <ExecutiveSalesReportlist />,
    isVisible: false,
  },
  {
    title: "Employee  Report",
    icon: IoHomeSharp,
    path: "/reports/Employeelist",
    component: <EmployeeReportlist />,
    isVisible: false,
  },
  {
    title: "Group  Report",
    icon: IoHomeSharp,
    path: "/reports/Group",
    component: <GroupReport />,
    isVisible: false,
  },
  {
    title: "Variation Report",
    icon: IoHomeSharp,
    path: "/reports/VariationReport",
    component: <VariationReport />,
    isVisible: false,
  },

  {
    title: "CoverSize Report",
    icon: IoHomeSharp,
    path: "/reports/CoverSizeReport",
    component: <CoverSizeReport />,
    isVisible: false,
  },

  {
    title: "Tip Summary Report",
    icon: IoHomeSharp,
    path: "/reports/TipSummary",
    component: <TipSummary />,
    isVisible: false,
  },

  {
    title: "Locality Wise Summary Report",
    icon: IoHomeSharp,
    path: "/reports/LocalityWiseSummary",
    component: <LocalityWiseSummary />,
    isVisible: false,
  },

  // {
  //   title: "Settings",
  //   icon: FaUtensils,
  //   path: "/menu-trigger",
  //   component: <SubNav2 />,
  //   isVisible: true,
  // },
  // {
  //   title: "Check  Updates",
  //   icon: FaUtensils,
  //   path: "/check_updates",
  //   component: <SubNav2 />,
  //   isVisible: true,
  // },

  // {
  //   title: "logout",
  //   icon: FaFileAlt,
  //   // path: "/logout",
  //   // component: <SubNav2 />,
  //   component: <LogoutComponent />,
  //   isVisible: true,
  // },
  {
    title: "Dine In",
    icon: FaFileAlt,
    path: "/selectTable/dinein",
    component: <DineIn />,
    isVisible: false,
  },
  {
    title: "Delivary",
    icon: FaFileAlt,
    path: "/selectTable/delivary",
    component: <Delivary />,
    isVisible: false,
  },
  {
    title: "Pick up",
    icon: FaFileAlt,
    path: "/selectTable/pickup",
    component: <Pickup />,
    isVisible: false,
  },
  {
    title: "All",
    icon: IoGridOutline,
    path: "/menu/all",
    component: <AllData />,
    isVisible: false,
  },
  {
    title: "Dine In",
    icon: GiTabletopPlayers,
    path: "/menu/dinein",
    component: <DineInData liveOrderList={undefined} />,
    isVisible: false,
  },
  {
    title: "Delivary",
    icon: MdDeliveryDining,
    path: "/menu/delivary",
    component: <DelivaryData liveOrderList={undefined} />,
    isVisible: false,
  },
  {
    title: "Pick Up",
    icon: TbMilk,
    path: "/menu/pickup",
    component: <PickupData liveOrderList={undefined} />,
    isVisible: false,
  },
  // {
  //   title: "View Orders",
  //   icon: FaFileAlt,
  //   path: "/menu/order/viewOrders",
  //   component: <MenuTabList />,
  //   isVisible: false,
  // },

  {
    title: "Current Orders",
    icon: FaFileAlt,
    path: "/orderItem/currentorder",
    component: <CurrentOrderTab />,
    isVisible: false,
  },
  {
    title: "Advance Orders view",
    icon: FaFileAlt,
    path: "/orderItem/sub/current/view",
    component: <ViewOrdersDetails />,
    isVisible: false,
  },
  {
    title: "Advance Orders",
    icon: FaFileAlt,
    path: "/orderItem/advanceorder",
    component: <AdvanceOrderTab />,
    isVisible: false,
  },
  {
    title: "Advance Orders view",
    icon: FaFileAlt,
    path: "/orderItem/sub/advanceorder/view",
    component: <ViewAdvanceOrderList />,
    isVisible: false,
  },
  {
    title: "All Orders",
    icon: FaFileAlt,
    path: "/orderItem/sub/currentorder/all",
    component: <AdvanceOrderTab />,
    isVisible: false,
  },
  {
    title: "Advance Orders",
    icon: FaFileAlt,
    path: "/orderItem/sub/currentorder/dinein",
    component: <DineInOrder />,
    isVisible: false,
  },
  {
    title: "Advance Orders",
    icon: FaFileAlt,
    path: "/orderItem/sub/currentorder/delivary",
    component: <DelivaryOrder />,
    isVisible: false,
  },
  {
    title: "Advance Orders",
    icon: FaFileAlt,
    path: "/orderItem/sub/currentorder/pickup",
    component: <PickupOrder />,
    isVisible: false,
  },
  {
    title: "Main Part Payment",
    icon: FaFileAlt,
    path: "/mainPartPayment",
    component: <MainPartPayment />,
    isVisible: false,
  },

  {
    title: "Order Details",
    icon: FaFileAlt,
    path: "/menu/order/kots",
    component: <OrderDetails />,
    isVisible: false,
  },
];

// Define the navigation configuration type
export interface NavConfigType {
  [key: string]: NavItem[];
}

// Export the navigation configuration
export const navConfig: NavConfigType = {
  common: commonRoutes,
  // all_outlet: allOutletRoute,
  seven_foodies: sevenFoodiesRoutes,
};
