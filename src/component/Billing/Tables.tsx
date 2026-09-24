import { Link } from "react-router-dom";
import TableStatus from "./TableStatus";
import YellowTable from "../../Styles/assets/img/table-yallow.svg";
import TableComponents from "./ViewTables/TableComponents";
import PartPayment from "./ViewTables/Settlement/PartPayments/CardPayment";
import MainPartPayment from "./ViewTables/Settlement/PartPayments/MainPartPayment";
import UserDetailsTable from "./ViewTables/TabsComponent/AllTablesInput/UserDetailsTable";
import CustomerTexInfo from "./ViewTables/TabsComponent/AllTablesInput/CustomerTexInfo";
import CustomerDetailsInput from "./ViewTables/TabsComponent/AllTablesInput/CustomerDetailsInput";
import OrderWiseComments from "./ViewTables/TabsComponent/AllTablesInput/OrderWiseComments";
import AssignInput from "./ViewTables/TabsComponent/AllTablesInput/AssignInput";
import CancleOrder from "../common/CancleOrder";
import { useEffect, useState } from "react";
import { getTables, getTableWiseOrder } from "../../Api/Api";
import { useTabContext } from "../../contexts/TabContext";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "../../redux/Features/BillingDataSlice";
import BlankOrderSelect from "./ViewTables/TabsComponent/BlankOrderSelect";

const Tables: React.FC = () => {


  // type TableDataType = {
  //   id: number;
  //   name: string;
  // };

  // const [tableData, setTableData] = useState<TableDataType[]>([]);

  // change: user login data
  const userTableData = {
    outlet: 1, kitchen: 1
  };

  // const { userData } = useTabContext();
  const dispatch = useDispatch();
  const { orderStatusData,tableData } = useSelector((state: any) => state.billingData) ?? {};
  const [tableList, setTableList] = useState([]);

  useEffect(() => {
    fetchTableData(userTableData);
  }, []);
  
  const fetchTableData = async (data: any) => {
    const res = await getTables(userTableData);
    if (res?.status === 201) {
      setTableList(res?.data?.data);
      dispatch(setTableData(res?.data?.data));
      console.log(tableData,"tableDatatableData")
    }
  };

  // const getOrderStatus = (orderStatusData: any) => {
  //   debugger
  //   if (tableList?.id === orderStatusData.map((o: any) => o?.tableId)) {
  //     switch (orderStatusData) {
  //       case 'save':
  //         return { icon: EyeIcon, color: 'bg-blue-300' };
  //       case 'save_and_print':
  //         return;
  //       case 'save_and_eBill':
  //         return;
  //       case 'is_paid':
  //         return;
  //       case 'kot':
  //         return !EyeIcon;
  //       case 'kot_and_print':
  //         return !EyeIcon;
  //       default:
  //         return null
  //     }
  //   }
  // };
  // getOrderStatus(orderStatusData);


  // const getOrderStatus = (orderStatusData: any) => {
  //   debugger
  //   const tables = tableList.map((o: any) => o?.tables);
  //   const tableArray = tables.map((o: any) => o?.tables)
  //   if (tables.map((o: any) => o?.tables)) {
  //   //   const tableStatus = orderStatusData.find((order: any) => tableList.includes(order.tableId));

  //   //   if (tableStatus) {
  //   //     switch (tableStatus.orderStatus) {
  //   //       // case 'save':
  //   //       //   return { icon: EyeIcon, color: 'bg-blue-300' };
  //   //       // case 'save_and_print':
  //   //       //   return { icon: PrintIcon, color: 'bg-green-300' };
  //   //       // case 'save_and_eBill':
  //   //       //   return { icon: EBillIcon, color: 'bg-purple-300' };
  //   //       // case 'is_paid':
  //   //       //   return { icon: PaidIcon, color: 'bg-red-300' };
  //   //       // case 'kot':
  //   //       //   return { icon: EyeIcon, color: 'bg-orange-300' };
  //   //       // case 'kot_and_print':
  //   //       //   return { icon: EyeIcon, color: 'bg-orange-300' };
  //   //       // default:
  //   //       //   return { icon: null, color: 'bg-gray-300' }; // Default case
  //   //     }
  //   //   }
  //   }
  //   return null; // If no tableId matches or no valid orderStatus is found
  // };
  // getOrderStatus(orderStatusData);

  // const arr = [
  //   { id: 1, area_type_name: 'our home', tables: [{ id: 1, name: 'AS', tables: [{ id: 2, name: 'AS' }] }] },
  //   { id: 2, area_type_name: 'Non Ac', tables: [{ id: 1, name: 'AS', tables: [{ id: 2, name: 'AS' }] }] },
  //   { id: 3, area_type_name: 'AC', tables: [{ id: 1, name: 'AS' }] }
  // ];

  return (
    <div className="p-2">
      {/* <BlankOrderSelect /> */}
      <TableStatus />
      {/* <MainPartPayment />
      <AssignInput />

      <UserDetailsTable />
      <CancleOrder /> */}
      {/* <p className="text-xl text-[#DD312F] pl-10 pt-5">AC</p> */}

      { tableData && tableData.map((o: any) => {
        return (
          <>
            {/* <p className="text-xl text-[#DD312F] pl-10 pt-5">AC</p> */}
            <p className="text-2xl text-[#DD312F] pl-10 py-5">
              {o?.area_type_name}
            </p>
            <div className="px-20 py-4 grid grid-cols-5 gap-[6rem]">
              {/* {[1, 1, 1, 1, 1, 1].map((Tab) => (
          // <Link to="/selectTable">
          <TableComponents
            TableNumber={22}
            TableTime={12}
            Amount={2233.0}
            EyeIcon={true}
            PrintIcon={true}
            PrinterIcon={false}
            statusColor="gray-300"
          />

          // </Link>
        ))} */}
              {(o?.tables).map((Tab: any) => (
                <TableComponents
                  TableNumber={Tab?.table_no}
                  TableTime={Tab?.order_table_time}
                  Amount={Tab?.total_amount}
                  EyeIcon={false}
                  PrintIcon={false}
                  PrinterIcon={false}
                  statusColor="gray-300"
                  orderStatus={Tab?.order_status}
                  table={Tab}
                  tableId={Tab?.id}
                  tableOrderId={Tab?.order_id}
                  areaType={o?.area_type_name}
                  areaTypeId={o?.area_type}
                  tabletype={o?.area_type_name}
                />
              ))}
            </div>
          </>
        );
      }

      )}
      
      {/* <MainPartPayment />
      <AssignInput />
      <UserDetailsTable />

      <CancleOrder cancelOrderId={undefined} cancelOrderItems={undefined} setCancleDialogOpen={undefined} /> */}
    </div>
  );
};

export default Tables;
