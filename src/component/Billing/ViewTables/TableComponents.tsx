import React, { useEffect, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoSaveOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import SettleDialog from "./Settlement/SettleDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExistsTable,
  getPaymentType,
  getTables,
  getTableWiseOrder,
} from "../../../Api/Api";
import MainKotDialog from ".././Move Kot dailog/MainKotDialog";
import DialogBox from "../../common/Dilog-Box";
import {
  setExistsItems,
  setOpenKot,
  setOrderItem,
  setTablewiseOrer,
} from "../../../redux/Features/BillingDataSlice";
import { setPaymenttype } from "../../../redux/Features/BillingDataSlice";
import { MinuteTimer } from "../../../constants/MinuteTimer";

interface TableComponentsProps {
  TableNumber?: number;
  TableTime?: number;
  Amount?: number;
  EyeIcon?: boolean;
  PrinterIcon?: boolean;
  PrintIcon?: boolean;
  statusColor?: string;
  orderStatus?: String;
  table?: any;
  tableId?: number;
  tableOrderId?: number;
  areaType?: string;
  areaTypeId?: string;
  tabletype: any;
}

const TableComponents: React.FC<TableComponentsProps> = ({
  TableTime,
  Amount,
  EyeIcon,
  PrinterIcon,
  PrintIcon,
  TableNumber,
  statusColor,
  orderStatus,
  table,
  tableId,
  tableOrderId,
  areaType,
  areaTypeId,
  tabletype,
}) => {
  const exisTtableData = {
    table: table?.table_no,
    outlet: 1,
    kitchen: 1,
  };
  const dispatch = useDispatch();
  const { tableData, orderStatusData, loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};

  const fetchPaymentTypeData = async () => {
    const res = await getPaymentType();
    if (res?.status === 200) {
      dispatch(setPaymenttype(res?.data?.data));
    }
  };
  useEffect(() => {
    fetchPaymentTypeData();
  }, []);

  const [showDialog, setShowDialog] = useState(false); // State to show/hide dialog
  const navigate = useNavigate(); // Corrected the typo
  const [childData, setChildData] = useState<string>("");
  const { ActiveKot } = useSelector((state: any) => state.billingData);
  const pstatus = useSelector((state: any) => state.billingData.paymentstatus);
  const [tableStatusColor, setTableStatusColor] = useState<any>("");

  const handleSaveClick = (e: React.MouseEvent, data: any) => {
    fetchTableWiseOrder(data.order_id);

    localStorage.setItem("settleddata", JSON.stringify(data));
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevents the click from triggering the Link
    setShowDialog(true); // Open the modal
  };

  const [isMoveKotDialogOpen, setDialogOpen] = useState(false);
  const handleCloseMoveKotDialog = () => {
    const payload = {
      status: false,
    };
    dispatch(setOpenKot(payload));
    setDialogOpen(false);
  };
  const [checkTable, setCheckTable] = useState<string>("");

  useEffect(() => {
    fetchExistTable(exisTtableData);
    setDialogOpen(false);
    setShowDialog(false);
  }, [table]);
  const fetchTableWiseOrder = async (order_id: any) => {
    let data = {
      order: order_id,
    };
    const payload = {
      blank: true,
    };
    dispatch(setOrderItem(payload));
    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        dispatch(setTablewiseOrer(res.data?.data));
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}));
      dispatch(setExistsItems([]));
    }
  };
  const fetchExistTable = async (data: any) => {
    const res = await checkExistsTable(exisTtableData);
    if (res?.status === 201) {
      setCheckTable(res?.data?.message);
    }
  };

  const handleClick = async (val: any) => {
    await fetchTableWiseOrder(val.id);
    console.log(val, "valval");
    localStorage.setItem("tabledetail", JSON.stringify(val, tabletype));
    if (tableOrderId === null && checkTable !== "Table is empty") {
      alert("Table is not empty");
    } else {
      if (ActiveKot == true) {
        if (val.order_status === "kot" || val.order_status === "kot-print") {
          setDialogOpen(true);
        }
      } else {
        navigate("/selectTable", {
          state: {
            areaType: areaType,
            tableId: tableId,
            tableOrderId: tableOrderId,
            tableDetails: val,
            areaTypeId: areaTypeId,
          },
        }); 
      }
    }
  };

  const handleDataFromChild = (data: string) => {
    setChildData(data); // Set the data received from child
  };

  const closeDialog = () => {
    setShowDialog(false); // Close the modal
  };

  const getDateToMinute = (d: any) => {
    let date = new Date(d);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let totalMinutes = hours * 60 + minutes;
    if (totalMinutes === 0) {
      return null;
    } else {
      let getTime = `${totalMinutes} Min`;
      return getTime;
    }
  };

  const getStatusIcon = (orderStatusData: any) => {
    switch (orderStatusData) {
      case "save":
        return { icon: EyeIcon, color: "bg-blue-300" };
      case "save_and_print":
        return;
      case "save_and_eBill":
        return;
      case "is_paid":
        return;
      case "kot":
        return !EyeIcon;
      case "kot_and_print":
        return !EyeIcon;
      default:
        return null;
    }
  };

  const getStausColor1 = (statusColor: String) => {
    // debugger
    switch (statusColor) {
      case "save":
        return "blue-200"; // #AECAEB
      case "save_and_print":
        return "teal-300"; // #80BBBD
      case "save_and_eBill":
        return "blue-200"; // #AECAEB (same as "save")
      case "is_paid":
        return "green-300"; // #98CC98
      case "kot":
        return "red-300"; // #FFD871
      case "kot_and_print":
        return "yellow-300"; // #FFD871 (same as "kot")
      default:
        return "gray-300";
    }
  };

  useEffect(() => {
    if (table?.order_status || table?.is_paid) {
      const color = getStausColor(table.order_status, table.is_paid);
      setTableStatusColor(color);
    }
  }, [table?.order_status, table?.is_paid]);

  const getStausColor = (statusColor: String, isPaidColor: boolean) => {
    if (
      isPaidColor === true &&
      (statusColor === "kot" || statusColor === "kot_and_print")
    ) {
      switch (statusColor) {
        default:
          return "#FFD871";
      }
    } else if (
      isPaidColor === true &&
      (statusColor !== "kot" || statusColor !== "kot_and_print")
    ) {
      switch (statusColor) {
        default:
          return "#98CC98";
      }
    } else {
      switch (statusColor) {
        case "save":
          return "#AECAEB"; // #AECAEB
        case "save_and_print":
          return "#80BBBD"; // #80BBBD
        case "save_and_eBill":
          return "#80BBBD"; // #AECAEB (same as "save")
        // case "is_paid":
        //   return "#98CC98"; // #98CC98
        case "kot":
          return "#FFD871"; // #FFD871
        case "kot_and_print":
          return "#FFD871"; // #FFD871 (same as "kot")
        default:
          return "gray-300";
      }
    }
  };

  console.log("table-time", TableTime);

  return (
    <>
      <div
        className="w-full relative flex items-center"
        onClick={() => handleClick(table)}
      >
        <span
          className={`absolute w-10 h-[5rem] pl-4 bg-${statusColor} rounded-l-full -left-12`}
          // className={`absolute w-10 h-[5rem] pl-4 bg-${getStausColor(
          //   table?.order_status
          // )} rounded-l-full -left-12`}
          style={{
            background: getStausColor(table?.order_status, table?.is_paid),
            // background: tableStatusColor,
          }}
        ></span>
        {/* style={{background:getStausColor(table?.order_status)}} */}
        <div
          className={`w-32 h-24 border-l-8 border-${statusColor} shadow-md rounded-lg flex justify-center items-center flex-col text-sm`}
          // className={`w-32 h-24 border-l-8
          //   border-${getStausColor1(table?.order_status)}
          // shadow-md rounded-lg flex justify-center items-center flex-col text-sm cursor-pointer`}
          style={{
            borderColor: getStausColor(table?.order_status, table?.is_paid),
          }}
        >
          {/* <p>{TableTime} Min</p> */}
          {/* <p>{getDateToMinute(TableTime)}</p> */}
          {TableTime && (
            <p>
              <MinuteTimer createTime={TableTime} />
            </p>
          )}
          <h1>{TableNumber}</h1>
          <p>{Amount ? `₹ ${Amount}.00` : null}</p>
          <div className="flex justify-center items-center gap-1">
            {/* Eye Icon */}
            {/* {EyeIcon && ( */}
            {(table?.order_status === "kot" ||
              table?.order_status === "kot_and_print") && (
              <LuEye
                size={25}
                onClick={() => handleClick(table)}
                className=" cursor-pointer text-black bg-white border border-gray-300 p-1"
              />
            )}
            {/* Printer Icon */}
            {(table?.order_status === "save" ||
              table?.order_status === "save_and_print" ||
              table?.order_status === "save_and_eBill" ||
              table?.order_status === "kot" ||
              table?.order_status === "kot_and_print") && (
              <FiPrinter
                size={25}
                className=" cursor-pointer bg-white border border-gray-300 p-1"
              />
            )}
            {/* Print Icon Button */}
            {table?.order_status === "save_and_eBill" && (
              <button
                onClick={(e) => handleSaveClick(e, table)}
                className=" cursor-pointer  bg-white border border-gray-300 p-1"
              >
                <IoSaveOutline size={16} />
              </button>
            )}
          </div>
        </div>
        <span
          className={`absolute left-[137px] w-10 h-[5rem] pr-4 bg-${statusColor} rounded-r-full`}
          // className={`absolute left-[137px] w-10 h-[5rem] pr-4 bg-${getStausColor(
          //   table?.order_status
          // )} rounded-r-full`}
          style={{
            background: getStausColor(table?.order_status, table?.is_paid),
          }}
        ></span>
      </div>

      {/* Render SettleDialog when showDialog is true */}
      <SettleDialog isOpen={showDialog} onClose={closeDialog} />
      <DialogBox
        isOpen={isMoveKotDialogOpen}
        onClose={handleCloseMoveKotDialog}
        title="Move KOT/Item for - #01"
        moveKot="moveKot"
        // Optional: dynamic title, e.g., title={`Move KOT/Item for Order #${selectedKot?.table_no}`}
      >
        <MainKotDialog setDialogOpen={setDialogOpen} />
      </DialogBox>
    </>
  );
};

export default TableComponents;
