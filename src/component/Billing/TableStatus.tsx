import React, { useEffect, useState } from "react";
import MainKotDialog from "./Move Kot dailog/MainKotDialog";
import DialogBox from "../common/Dilog-Box";
import Header2 from "../layout/Header2";
import { useDispatch, useSelector } from "react-redux";
import { setOpenKot } from "../../redux/Features/BillingDataSlice";
const TableStatus = () => {
  const dispatch=useDispatch()
  const { tableData } = useSelector((state: any) => state.billingData) ?? {};
  const {ActiveKot}=useSelector((state:any)=>state.billingData)
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isMoveKotDialogOpen, setDialogOpen] = useState(false);
  const [selectedKot, setSelectedKot] = useState(null);
  const [kotStatusData, setKotStatusData] = useState<any[]>([]);

  const handleOpenMoveKotDialog = () => {
    const payload = { status: !ActiveKot }; // Set status to the opposite of ActiveKot
  
    try {
      dispatch(setOpenKot(payload));
  
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleCloseMoveKotDialog = () => setDialogOpen(false);

  // const handleOpenMoveKotDialog = (order: any) => {
  //   setSelectedKot(order);
  //   // setDialogOpen(true);
  // };
  // const handleCloseMoveKotDialog = () => {
  //   setDialogOpen(false);
  //   setSelectedKot(null);
  // };
  const handleStatusChange = (event: any) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    getTableStatus();
  }, [tableData]);

  const getTableStatus = () => {
    // const table = tableData?.map((o: any) => o?.tables);
    // const kotStatus = table?.flat()?.filter((item: any) => item?.order_status === "kot");
    // const kotAndPrintStatus = table?.flat()?.filter((item: any) => item?.order_status === "kot_and_print");
    // const mergeKotStatusData = [...kotStatus, ...kotAndPrintStatus];
    // setKotStatusData(mergeKotStatusData);

    const table = Array.isArray(tableData)
      ? tableData.map((o: any) => o?.tables)
      : [];
    const flattenedTable = Array.isArray(table) ? table.flat() : [];
    const kotStatus = flattenedTable.filter(
      (item: any) => item?.order_status === "kot"
    );
    const kotAndPrintStatus = flattenedTable.filter(
      (item: any) => item?.order_status === "kot_and_print"
    );
    const mergeKotStatusData = [...kotStatus, ...kotAndPrintStatus];
    setKotStatusData(mergeKotStatusData);
  };

  return (
    <>
      <Header2 />
      <div className="flex flex-wrap justify-end space-x-2 sm:space-x-4 lg:space-x-6">
      <div
  style={{
    backgroundColor: ActiveKot === true ? "#B6E9C1" : "white",
    color: "white",
  }}
  className="relative bg-gray-100 hover:bg-[#B6E9C1]  bg-opacity-80 px-2 py-1 rounded flex items-center mb-2 sm:mb-0"
>
  <input
    type="radio"
    id="status"
    name="status"
    value={selectedStatus}
    checked={selectedStatus === "kot"}
    onChange={handleStatusChange}
    className="cursor-pointer"
  />
  <label
    htmlFor="status"
    onClick={handleOpenMoveKotDialog}
    className={`cursor-pointer inline-block ml-2 text-base rounded-md ${
      selectedStatus === "kot" ? "" : "text-gray-600"
    }`}
  >
    Move KOT / Items
  </label>

  {/* Map over kotStatusData if needed */}
  {/* {kotStatusData?.map((kot) => (
    <label
      key={kot?.id}
      htmlFor="status"
      onClick={() => handleOpenMoveKotDialog(kot)}
      className={`cursor-pointer inline-block ml-2 text-base rounded-md ${
        selectedKot?.order_id === kot?.order_id ? "" : "text-gray-600"
      }`}
    >
      Move KOT / Items for Order #{kot?.table_no}
    </label>
  ))} */}

  {/* Dialog Box */}
  <DialogBox
    isOpen={isMoveKotDialogOpen}
    onClose={handleCloseMoveKotDialog}
    title="Move KOT/Item for - #01"
    moveKot="moveKot"
    // Optional: dynamic title, e.g., title={`Move KOT/Item for Order #${selectedKot?.table_no}`}
  >
    <MainKotDialog setDialogOpen={setDialogOpen} />
  </DialogBox>
</div>


        <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded mb-2 sm:mb-0">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <p className="ml-2 text-sm sm:text-base">Blank Table</p>
        </div>

        <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded mb-2 sm:mb-0">
          <div className="h-5 w-5 bg-[#AECAEB] rounded-full"></div>
          <p className="ml-2 text-sm sm:text-base text-gray-600">
            Running Table
          </p>
        </div>

        <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded mb-2 sm:mb-0">
          <div className="h-5 w-5 bg-[#80BBBD] rounded-full"></div>
          <p className="ml-2 text-sm sm:text-base text-gray-600">
            Printed Table
          </p>
        </div>

        <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded mb-2 sm:mb-0">
          <div className="h-5 w-5 bg-[#98CC98] rounded-full"></div>
          <p className="ml-2 text-sm sm:text-base text-gray-600">Paid Table</p>
        </div>

        <div className="flex justify-center items-center hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded">
          <div className="h-5 w-5 bg-[#FFD871] rounded-full"></div>
          <p className="ml-2 text-sm sm:text-base text-gray-600">
            Running Kot Table
          </p>
        </div>
      </div>
    </>
  );
};

export default TableStatus;
