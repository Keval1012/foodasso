import React, { useEffect, useState } from "react";
import { PiNotepadLight } from "react-icons/pi";
import { TbFileDescription } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdvanceOrderDailog from "../../../Billing/ViewTables/TabsComponent/AdvanceOrderDailog";
import DialogBox from "../../../common/Dilog-Box";
import DescriptionDailog from "../Purchase Management/DescriptionDailog";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getKitchen,
  getRowMaterial,
  getSupplier,
  getUnit,
  postRequestForPurchase,
} from "../../../../Api/Operation/Api";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function RequestPurchaseAdd() {
  const navigate = useNavigate();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [isDescriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
  const [rowDescription, setRowDescription] = useState("");
  const [paymentType, setPaymentType] = useState("unpaid");
  const [paymentMode, setPaymentMode] = useState("");
  const [isPurchaseSheetOpen, setIsPurchaseSheetOpen] = useState(false);

  const [supplierList, setSupplierList] = useState([]);
  const [kitchenList, setKitchenList] = useState([]);
  const [rowMaterialList, setRowMaterialList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [requestForPurchaseData, setRequestForPurchaseData] = useState({
    to_choice: "kitchen",
    to_id_s: "",
    to_id_k: "",
    purchase_request_number: 2,
    mrn_no: 2,
    date_s: dayjs(new Date()).format("YYYY-MM-DD"),
    date_k: dayjs(new Date()).format("YYYY-MM-DD"),

    termsOfPurchase: false,
    terms_payment: "",
    terms_delivery: "",

    grand_total: 100,
    payment_type: "unpaid",
    payment_date: "",
    paid_amount: "",
    payment_mode: "",
    payment_ref_no: "",
  });

  const paymentModeList = [
    { id: 1, value: "cash", label: "Cash" },
    { id: 2, value: "card", label: "Card" },
    { id: 3, value: "cheque", label: "Cheque" },
    { id: 4, value: "other", label: "Other" },
  ];

  // const handleOpenDescriptionDialog = () => setDescriptionDialogOpen(true);
  const handleOpenDescriptionDialog = (r: any) => {
    setDescriptionDialogOpen(true);
    setRowDescription(r);
  };

  const handleCloseDescriptionDialog = () => setDescriptionDialogOpen(false);
  const openPurchaseSheet = () => {
    setIsPurchaseSheetOpen(true);
  };
  const closePurchaseSheet = () => {
    setIsPurchaseSheetOpen(false);
  };

  // const [rows, setRows] = useState([
  //   { name: "", quantity: "", unit: "", price: "", amount: "", tax: "" },
  // ]);

  // const addRow = () => {
  //   setRows([
  //     ...rows,
  //     { name: "", quantity: "", unit: "", price: "", amount: "", tax: "" },
  //   ]);
  // };

  // const handleRowChange = (index: any, field: any, value: any) => {
  //   const newRows = rows.map((row, i) =>
  //     i === index ? { ...row, [field]: value } : row
  //   );
  //   setRows(newRows);
  // };

  const [rows, setRows] = useState<any>([
    {
      id: 0,
      raw_material: "",
      quantity: 1,
      unit: "",
      price: 0,
      amount: 0,
      description: "",
    },
  ]);

  console.log("rows-data", rows);

  const addRow = () => {
    setRows((prevRows: any = []) => [
      ...prevRows,
      ...Array(1)
        .fill(0)
        .map(() => ({
          id: Date.now() + Math.random(),
          raw_material: "",
          quantity: 1,
          unit: "",
          price: 0,
          amount: 0,
          description: "",
        })),
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prevRows: any) => prevRows.filter((row: any) => row.id !== id));
  };

  const handleRowChange = (index: any, field: any, value: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row?.id === index ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    fetchSupplier();
    fetchKitchen();
    fetchRowMaterial();
    fetchUnit();
  }, []);

  const fetchSupplier = async () => {
    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
    };

    try {
      const res = await getSupplier(data);
      if (res.status === 200) {
        setSupplierList(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchKitchen = async () => {
    let data = {
      filters: {
        outlet: loginUserData?.outlet,
      },
    };

    try {
      const res = await getKitchen(data);
      if (res.status === 200) {
        setKitchenList(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchRowMaterial = async () => {
    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
    };

    try {
      const res = await getRowMaterial(data);
      if (res.status === 200) {
        setRowMaterialList(res.data?.data);
      }
    } catch (error) {}
  };

  const fetchUnit = async () => {
    let data = {};

    try {
      const res = await getUnit(data);
      if (res.status === 200) {
        setUnitList(res.data?.data);
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    const requestForPurchaseRowData = rows?.map((row: any) => {
      const rowItem = {
        raw_material: row?.raw_material,
        quantity: Number(row?.quantity),
        unit: row?.unit,
        price: Number(row?.price),
        amount: Number(row?.amount),
        description: row?.description,
      };
      return rowItem;
    });

    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
      to_choice: requestForPurchaseData?.to_choice,
      grand_total: requestForPurchaseData?.grand_total,
      payment_type: requestForPurchaseData?.payment_type,
      // grand_total: "100",
      request_purchase_order_item_detail: requestForPurchaseRowData,
      // request_purchase_order_item_detail: [
      //   {
      //     raw_material: "15",
      //     quantity: "10.0",
      //     unit: "22",
      //     price: "100.00",
      //     amount: "1000.00",
      //     description: "High-quality raw material",
      //   },
      // ],
    };

    if (requestForPurchaseData?.to_choice === "supplier") {
      Object.assign(data, { to_id: Number(requestForPurchaseData?.to_id_s) });
      Object.assign(data, { purchase_request_number: Number(requestForPurchaseData?.purchase_request_number) });
      Object.assign(data, { date: requestForPurchaseData?.date_s });
    }
    if (requestForPurchaseData?.to_choice === "kitchen") {
      Object.assign(data, { to_id: Number(requestForPurchaseData?.to_id_k) });
      Object.assign(data, { mrn_no: Number(requestForPurchaseData?.mrn_no) });
      Object.assign(data, { date: requestForPurchaseData?.date_k });
    }
    if (requestForPurchaseData?.termsOfPurchase === true) {
      Object.assign(data, { terms_payment: requestForPurchaseData?.terms_payment });
      Object.assign(data, { terms_delivery: requestForPurchaseData?.terms_delivery });
    }
    if (requestForPurchaseData?.payment_type === "paid") {
      Object.assign(data, { payment_date: requestForPurchaseData?.payment_date });
      Object.assign(data, { paid_amount: Number(requestForPurchaseData?.paid_amount) });
      Object.assign(data, { payment_mode: requestForPurchaseData?.payment_mode });
    }
    if (requestForPurchaseData?.payment_type === "paid" && requestForPurchaseData?.payment_mode !== "cash") {
      Object.assign(data, { payment_ref_no: requestForPurchaseData?.payment_ref_no });
    }

    try {
      const res = await postRequestForPurchase(data);
      if (res.status === 201) {
        toast.success(res.data?.message);
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error.response.data?.errors);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;
    setRequestForPurchaseData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  console.log("requestForPurchase-Data", requestForPurchaseData);
  // console.log("supplierList", supplierList);
  // console.log("kitchenList", kitchenList);
  // console.log("rowMaterialList", rowMaterialList);
  // console.log("unitList", unitList);

  return (
    <div className=" rounded-md space-y-6 border border-gray-300 ">
      <div className="flex justify-between items-center mb-6 mt-3">
        <h2 className="text-xl font-semibold">Add Request Purchase</h2>
        <div className="flex gap-2">
          <div
            className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className=" text-base">Back</button>
          </div>
        </div>
      </div>
      {/* New Purchase Details Section */}
      <div className="border border-gray-300  rounded-md">
        <h2 className="text-xl font-semibold mb-4 p-4">
          New Request Purchase Details
        </h2>

        {/* From */}
        <div className="flex items-center mb-4 p-4">
          <label className="block text-gray-700 font-medium w-1/3">To</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="to_choice"
                className="mr-2"
                id="to_choice"
                value="supplier"
                onChange={handleChange}
              />
              Supplier
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="to_choice"
                className="mr-2"
                id="to_choice"
                value="kitchen"
                onChange={handleChange}
                defaultChecked
              />
              Kitchen
            </label>
          </div>
        </div>

        {requestForPurchaseData?.to_choice === "supplier" && (
          <>
            <div className="flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Supplier <span className="text-red-500">*</span>
              </label>

              <div className=" items-center space-x-4 w-2/3">
                {/* Select Box */}
                <select
                  className="w-[748px] mt-2 block px-3 py-2 border rounded-md focus:outline-none focus:ring"
                  name="to_id_s"
                  value={requestForPurchaseData?.to_id_s}
                  onChange={handleChange}
                >
                  <option value="">Select Supplier</option>
                  {supplierList?.map((supplier: any) => (
                    <option key={supplier?.id} value={supplier?.id}>
                      {supplier?.name}
                    </option>
                  ))}
                </select>

                {/* Link for "Open purchase orders" */}
                {/* <div className=" flex items-center gap-3 py-2 ">
                  <PiNotepadLight size={20} />
                  <a
                    href="#"
                    className="text-[#3D3D3D] text-sm mt-1 underline"
                    onClick={openPurchaseSheet}
                  >
                    Open purchase orders
                  </a>
                </div> */}
              </div>
            </div>

            <div className=" flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Purchase Order Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-2 block w-[748px] px-3 py-2 border rounded-md"
                defaultValue="2"
                name="purchase_request_number"
                value={requestForPurchaseData?.purchase_request_number}
                onChange={handleChange}
              />
            </div>

            {/* GST No. */}
            {/* Supplier */}
            <div className=" flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Date
              </label>
              <input
                type="date"
                className="mt-2 block w-[748px] px-3 py-2 border rounded-md"
                name="date_s"
                value={requestForPurchaseData?.date_s}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {requestForPurchaseData?.to_choice === "kitchen" && (
          <>
            <div className="flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Kitchen <span className="text-red-500">*</span>
              </label>

              <div className=" items-center space-x-4 w-2/3">
                <select
                  className="w-[748px] mt-2 block px-3 py-2 border rounded-md focus:outline-none focus:ring"
                  name="to_id_k"
                  value={requestForPurchaseData?.to_id_k}
                  onChange={handleChange}
                >
                  <option value="">Select Kitchen</option>
                  {kitchenList?.map((kitchen: any) => (
                    <option key={kitchen?.id} value={kitchen?.id}>
                      {kitchen?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className=" flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                MRN Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-2 block w-[748px] px-3 py-2 border rounded-md"
                defaultValue="2"
                name="mrn_no"
                value={requestForPurchaseData?.mrn_no}
                onChange={handleChange}
              />
            </div>

            <div className=" flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Date
              </label>
              <input
                type="date"
                className="mt-2 block w-[748px] px-3 py-2 border rounded-md"
                name="date_k"
                value={requestForPurchaseData?.date_k}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="flex justify-start items-center mt-2 p-4">
          <input
            type="checkbox"
            className="mr-2"
            name="termsOfPurchase"
            checked={requestForPurchaseData?.termsOfPurchase}
            onChange={handleChange}
          />
          <label className="text-gray-700">Terms of purchase</label>
        </div>

        {/* Invoice Details */}
        {requestForPurchaseData?.termsOfPurchase === true && (
          <>
            <div className=" flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Term of Payment:
              </label>
              <textarea
                className="mt-2 block w-[748px] px-3 py-2 border rounded-md"
                name="terms_payment"
                value={requestForPurchaseData?.terms_payment}
                onChange={handleChange}
              />
            </div>
            <div className=" flex items-center mb-4 p-4">
              <label className="block text-gray-700 font-medium w-1/3">
                Term of Delivery:
              </label>
              <textarea
                className="mt-2 block w-[748px] px-3 py-2 border rounded-md"
                name="terms_delivery"
                value={requestForPurchaseData?.terms_delivery}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* Update Inventory Stock Checkbox */}
      </div>
      {/* Add New Button */}
      <button
        onClick={addRow}
        className="p-4 bg-[#FF9E1B] text-white font-semibold rounded-md"
      >
        Add New Row
      </button>
      {/* Table Section */}
      <div className="overflow-x-auto border border-gray-300 rounded p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className=" text-sm py-2 text-[#3D3D3D] text-left">
                <input type="checkbox" />
              </th> */}

              <th className=" text-sm py-2 text-[#3D3D3D] text-left">Name</th>
              <th className=" text-sm py-2 text-[#3D3D3D] text-left">
                Quantity
              </th>
              <th className=" text-sm py-2 text-[#3D3D3D] text-left">Unit</th>
              <th className=" text-sm py-2 text-[#3D3D3D] text-left">
                Price (₹)
              </th>
              <th className=" text-sm py-2 text-[#3D3D3D] text-left">
                Amount (₹)
              </th>

              <th className=" text-sm py-2 text-[#3D3D3D] text-left">
                Description & Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((r: any) => (
              <tr key={r?.id}>
                {/* <td>
                  <input type="checkbox" />
                </td> */}
                <td className="px-3 py-2 border-t">
                  <select
                    className="w-full px-2 py-1 border rounded-md"
                    value={r?.raw_material}
                    onChange={(e) =>
                      handleRowChange(r?.id, "raw_material", e.target.value)
                    }
                  >
                    <option value="">Select Raw Material</option>
                    {rowMaterialList?.map((rowMaterial: any) => (
                      <option key={rowMaterial?.id} value={rowMaterial?.id}>
                        {rowMaterial?.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2 border-t">
                  <input
                    type="number"
                    className="w-full px-2 py-1 border rounded-md"
                    value={r?.quantity}
                    onChange={(e) =>
                      handleRowChange(r?.id, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="px-3 py-2 border-t">
                  <select
                    className="w-full px-2 py-1 border rounded-md"
                    value={r?.unit}
                    onChange={(e) =>
                      handleRowChange(r?.id, "unit", e.target.value)
                    }
                  >
                    <option value="">Unit</option>
                    {unitList?.map((unit: any) => (
                      <option key={unit?.id} value={unit?.id}>
                        {unit?.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2 border-t">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md"
                    value={r?.price}
                    onChange={(e) =>
                      handleRowChange(r?.id, "price", e.target.value)
                    }
                  />
                </td>
                <td className="px-3 py-2 border-t">
                  <input
                    type="text"
                    className="w-full px-2 py-1 border rounded-md"
                    value={r?.amount}
                    onChange={(e) =>
                      handleRowChange(r?.id, "amount", e.target.value)
                    }
                  />
                </td>

                <td className="flex gap-3 px-3 py-2 border-t text-center">
                  <button
                    className="text-gray-400 hover:text-gray-400"
                    // onClick={handleOpenDescriptionDialog}
                    onClick={() => handleOpenDescriptionDialog(r)}
                  >
                    <TbFileDescription size={25} />
                  </button>
                  <button
                    // onClick={() => setRows(rows.filter((_, i) => i !== r?.id))}
                    onClick={() => removeRow(r?.id)}
                    className="text-gray-400 hover:text-gray-400"
                  >
                    <RiDeleteBin6Line size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end flex-col w-[67%] bg-gray-50 border border-gray-300">
        <div className="mb-4 flex justify-between border-b border-gray-300">
          <label className="text-gray-700 font-semibold p-4">
            Grand Total:
          </label>
          <span className="ml-2 text-gray-800 font-bold p-4">0.00</span>
        </div>

        {/* Payment Section */}
        <div className="flex flex-col gap-4">
          {/* Payment Type Toggle and Conditional Form in One Row */}
          <div className="flex  items-center gap-4 px-4">
            <p className="text-[#3D3D3D]">Payment Type:</p>

            {/* Payment Type Toggle */}
            <div className="flex items-center gap-4 bg-[#3D3D3DE5] rounded-full px-3 py-2 mb-4">
              <button
                className={`px-4 py-2 text-sm rounded-full ${
                  requestForPurchaseData?.payment_type === "unpaid"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
                // onClick={() => setPaymentType("unpaid")}
                onClick={() =>
                  setRequestForPurchaseData((prev) => ({
                    ...prev,
                    payment_type: "unpaid",
                  }))
                }
                value={requestForPurchaseData?.payment_type}
              >
                Unpaid
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-full ${
                  requestForPurchaseData?.payment_type === "paid"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
                // onClick={() => setPaymentType("paid")}
                onClick={() =>
                  setRequestForPurchaseData((prev) => ({
                    ...prev,
                    payment_type: "paid",
                  }))
                }
                value={requestForPurchaseData?.payment_type}
              >
                Paid
              </button>
            </div>

            {/* Conditional Form Display */}
            {/* {paymentType === "paid" && ( */}
            {requestForPurchaseData?.payment_type === "paid" && (
              <>
                <form className="flex gap-4 p-4">
                  {/* Date Picker */}
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none"
                    placeholder="Payment Date"
                    name="payment_date"
                    value={requestForPurchaseData?.payment_date}
                    onChange={handleChange}
                  />

                  {/* Paid Amount Input */}
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 text-gray-700 w-32 focus:outline-none"
                    placeholder="Paid Amount"
                    name="paid_amount"
                    value={requestForPurchaseData?.paid_amount}
                    onChange={handleChange}
                  />

                  {/* Payment Mode Dropdown */}
                  <select
                    className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none"
                    // value={paymentMode}
                    // onChange={(e) => setPaymentMode(e.target.value)}
                    name="payment_mode"
                    value={requestForPurchaseData?.payment_mode}
                    onChange={handleChange}
                  >
                    {/* <option value="">Payment Mode</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option> */}
                    <option value="">Payment Mode</option>
                    {paymentModeList?.map((paymentMode: any) => (
                      <option key={paymentMode?.id} value={paymentMode?.value}>
                        {paymentMode?.label}
                      </option>
                    ))}
                  </select>
                </form>
              </>
            )}
          </div>
          {requestForPurchaseData?.payment_type === "paid" && (
            <div className="flex justify-end">
              {(requestForPurchaseData?.payment_mode === "card" ||
                requestForPurchaseData?.payment_mode === "cheque" ||
                requestForPurchaseData?.payment_mode === "other") && (
                <>
                  <label className="text-gray-700 font-semibold p-4">
                    Payment Ref. No.:
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 text-gray-700 w-32 focus:outline-none"
                    placeholder="Enter Here"
                    name="payment_ref_no"
                    value={requestForPurchaseData?.payment_ref_no}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Footer Buttons */}
      <div className="flex justify-end space-x-4 mt-6 bg-gray-200 p-4">
        <button
          className="px-6 py-2 bg-white text-gray-700 rounded-full"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-orange-500 text-white rounded-full"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <DialogBox
        isOpen={isDescriptionDialogOpen}
        onClose={handleCloseDescriptionDialog}
        title="Description"
      >
        <DescriptionDailog
          onClose={handleCloseDescriptionDialog}
          rowDescription={rowDescription}
          setRows={setRows}
        />
      </DialogBox>{" "}
    </div>
  );
}

export default RequestPurchaseAdd;
