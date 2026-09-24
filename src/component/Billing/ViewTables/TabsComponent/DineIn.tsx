import React, { useEffect, useState } from "react";
import { GiTabletopPlayers } from "react-icons/gi";
import { CgUser } from "react-icons/cg";
import { PiNoteDuotone } from "react-icons/pi";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import OrderTable from "./OrderTable";
import TableBack from "../../../../Styles/assets/img/Black.svg";
import Users from "../../../../Styles/assets/img/user-icon.svg";
import edituser from "../../../../Styles/assets/img/UIIconsedit1.svg";
import alluiUsers from "../../../../Styles/assets/img/UIIcons.svg";
import MainSplitTabs from "./SplitTabs/MainSplitTabs";
import DialogBox from "../../../common/Dilog-Box";
import TextMore from "./TexModel";
import DiscountModel from "./DiscountModel";
import OtherPaymentDailog from "./OtherPaymentDailog";
import CardPaymentDialog from "./CardPaymentDialog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  setAddOrder,
  setOrderStatusData,
  setOrderTypeId,
  setTablewiseOrer,
  setUserDetailsData,
} from "../../../../redux/Features/BillingDataSlice";
import UserDetailsTable from "./AllTablesInput/UserDetailsTable";
import AssignInput from "./AllTablesInput/AssignInput";
import { addOrder, editOrder, getTableWiseOrder } from "../../../../Api/Api";
import TableInputDine from "./AllTablesInput/TableInputDine";
import OrderWiseComments from "./AllTablesInput/OrderWiseComments";
import MainPartPayment from "../Settlement/PartPayments/MainPartPayment";
import { table } from "console";
const sidebarDataItem = [
  { icons: <GiTabletopPlayers />, title: "table" },
  { icons: <CgUser />, title: "user" },
  { icons: <PiNoteDuotone />, title: "note" },
  { icons: <FaRegNewspaper />, title: "paper" },
];

interface TableDataProps {
  areaType?: string;
  tableId?: number;
  tableDetails?: any;
  allMenuData?: any;
  setAllMenuData?: any;
  allMenuPriceData?: any;
  setAllMenuPriceData?: any;
  allMenuAddOnData?: any;
  setAllMenuAddOnData?: any;
  allMenuVariatioData?: any;
  setAllMenuVariationData?: any;
  waiterList?: any;
  paymentTypeList?: any;
  // handleOrderValues?: any;
  orderType?: any;
  areaTypeId?: any;
  tableWiseOrderData?: any;
}

const DineIn: React.FC<TableDataProps> = ({
  tableId,
  tableDetails,
  areaType,
  allMenuData,
  setAllMenuData,
  allMenuPriceData,
  setAllMenuPriceData,
  allMenuAddOnData,
  setAllMenuAddOnData,
  allMenuVariatioData,
  setAllMenuVariationData,
  waiterList,
  paymentTypeList,
  orderType,
  areaTypeId,
  tableWiseOrderData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tableData, orderItemData, subTotalPrice, userDetailsData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTextMoreOpen, setIsTextMoreOpen] = useState(false);
  const [isTaxOpen, setIsTaxOpen] = useState(false);
  const [isSplitDialogOpen, setSplitDialogOpen] = useState(false);
  const [partPaymentDialogOpen, setPartPaymentDialogOpen] = useState(false);
  const [isOtherPaymentDialogOpen, setOtherPaymentDialogOpen] = useState(false);
  const [cartpayment, setcardpayment] = useState<boolean>(false);

  const handleOpenSplitDialog = () => setSplitDialogOpen(true);
  const handleCloseSplitDialog = () => setSplitDialogOpen(false);
  const handleOpenOtherPaymentDialog = () => setOtherPaymentDialogOpen(true);
  const handleopencardpayment = () => setcardpayment(true);
  const handleCloseOtherPaymentDialog = () => setOtherPaymentDialogOpen(false);
  const handleOpenPartPaymentDialog = () => setPartPaymentDialogOpen(true);
  const handleClosePartPaymentDialog = () => setPartPaymentDialogOpen(false);
  const [orderStatus, setOrderStatus] = useState<object[]>(
    tableData?.order_status || []
  );

  const [showTableInputDine, setShowTableInputDine] = useState(false);
  const [showOrderTable, setShowOrderTable] = useState(true);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [orderWiseCommentsModalOpen, setOrderWiseCommentsModalOpen] =
    useState(false);
  const [isAssignInputModalOpen, setIsAssignInputModalOpen] = useState(false);
  // const [subTotalPrice, setSubTotalPrice] = useState(0);

  const [paymentType, setPaymentType] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const [orderWiseComments, setOrderWiseComments] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState<any>(0);
  const [containerCharge, setContainerCharge] = useState<any>(0);
  const [tip, setTip] = useState<any>(0);
  const [appliedTax, setAppliedTax] = useState<any>(0);
  const [customerPaid, setCustomerPaid] = useState<any>(0);
  const [totalDiscount, setTotalDiscount] = useState<any>(0);
  const [customDiscounts, setCustomDiscounts] = useState([
    {
      group: "",
      reason: "",
      order_discount_type: "",
      discount_amount: "",
    },
  ]);
  // const defaultPaymentType = tableWiseOrderData?.payment_type || paymentTypeList[0]?.id;

  const defaultPaymentType = paymentTypeList?.find(
    (o: any) => o?.id === tableWiseOrderData?.payment_type
  )?.type;
  // const [userDetails, setUserDetails] = useState({
  //   fullname: "",
  //   phone: "",
  //   primary_address: "",
  //   primary_locality: "",
  //   no_of_person: ""
  // });

  console.log("user-detail", userDetailsData);
  console.log("payment---TypeList", paymentTypeList);
  useEffect(()=>{

  },[])

  const handleOpenOrderWiseCommentsDialog = () => {
    setOrderWiseCommentsModalOpen(true);
  };
  const handleCloseOrderWiseCommentsDialog = () => {
    setOrderWiseCommentsModalOpen(false);
  };

  const handleOpenAssignInputDialog = () => {
    setIsAssignInputModalOpen(true);
  };
  const handleCloseAssignInputDialog = () => {
    setIsAssignInputModalOpen(false);
  };

  const toggleTableInputDine = () => {
    setShowTableInputDine(true);
    setShowUserDetails(false);
    setShowOrderTable(true);
  };

  const toggleUserDetailsTable = () => {
    setShowUserDetails(true);
    setShowTableInputDine(false);
    setShowOrderTable(true);
  };

  const toggleOrderTable = () => {
    setShowOrderTable(true);
    setShowUserDetails(false);
  };

 
  useEffect(()=>{
    setDeliveryCharge(tableWiseOrderData.delivery_charge?tableWiseOrderData.delivery_charge:0)
    setContainerCharge(tableWiseOrderData.container_charge?tableWiseOrderData.container_charge:0)
    setCustomerPaid(tableWiseOrderData.customer_paid_amount?tableWiseOrderData.customer_paid_amount:0)
    setTip(tableWiseOrderData.tip?tableWiseOrderData.tip:0)
    setPaymentType(tableWiseOrderData?.payment_type)
  },[tableWiseOrderData])
// if(tableWiseOrderData){

  // }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openTextMore = () => {
    setIsTextMoreOpen(true);
  };

  const closeTaxtMore = () => {
    setIsTextMoreOpen(false);
  };

  const openTaxMore = () => {
    setIsTaxOpen(true);
  };

  const closeTaxMore = () => {
    setIsTaxOpen(false);
  };

  useEffect(() => {
    dispatch(setOrderTypeId(orderType));
  }, [orderType]);

  const orderTypeModal = async (payType: any) => {
    setPaymentType(payType?.id);
    if (payType?.type === "Other") {
      handleOpenOtherPaymentDialog();
    }
    if (payType?.type == "card") {
      console.log("true");
      handleopencardpayment();
    }
    if (payType?.type === "Part") {
      if (Object.keys(tableWiseOrderData).length == 0) {
        let responce = await handleOrderValues("save", payType?.id);
        console.log(responce, "responceresponce");
      }
      navigate("/mainPartPayment", {
        state: {
          orderId: tableWiseOrderData?.id,
          paymentType: payType?.id,
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      // handleOpenPartPaymentDialog();
    }
  };

  // const getStausColor = (orderStatus: String) => {
  //   switch (orderStatus) {
  //     case 'save':
  //       return 'save';
  //     case 'save_and_print':
  //       return 'save_and_print';
  //     case 'save_and_eBill':
  //       return 'save_and_eBill';
  //     case 'is_paid':
  //       return 'is_paid';
  //     case 'kot':
  //       return 'kot';
  //     case 'kot_and_print':
  //       return 'kot_and_print';
  //     default:
  //       return null;
  //   }
  // };
  // getStausColor(tableData?.order_status);

  const handleClickBtn = (buttonStatus: string) => {
    setOrderStatus((prevStatus) => {
      const updatedOrderStatus = [
        ...prevStatus,
        { tableId: tableId, orderStatus: buttonStatus },
      ];
      dispatch(setOrderStatusData(updatedOrderStatus));
      navigate("/billing");
      return updatedOrderStatus;
    });
  };

  const returnToCustomerBodyFunc = () => {
    if (Number(customerPaid) < grandTotalFunc()) return 0.0;
    if (Number(customerPaid) === grandTotalFunc()) return 0.0;
    if (Number(customerPaid) > grandTotalFunc())
      return (Number(customerPaid) - Number(grandTotalFunc()))?.toFixed(2);
  };

  const returnToCustomerFunc = () => {
    // const grandTotal =
    //   Number(subTotalPrice) +
    //   Number(deliveryCharge) +
    //   Number(containerCharge) +
    //   Number(appliedTax);
    if (Number(customerPaid) < grandTotalFunc()) return "Less Amt.";
    if (Number(customerPaid) === grandTotalFunc()) return "0.00";
    if (Number(customerPaid) > grandTotalFunc())
      return (Number(customerPaid) - Number(grandTotalFunc()))?.toFixed(2);
  };

  const totalDiscountFunc = () => {
    if (Number(subTotalPrice) > Number(totalDiscount)) return totalDiscount;
    if (subTotalPrice !== 0) {
      if (Number(subTotalPrice) <= Number(totalDiscount))
        return "Discount is not applied.";
    } else return 0;
  };

  const subTotalTaxFunc = () => {
    if (Number(subTotalPrice) > Number(totalDiscount))
      return subTotalPrice - totalDiscount;
    if (Number(subTotalPrice) <= Number(totalDiscount))
      return Number(subTotalPrice);
  };

  const roundOffFunc = () => {
    let total = (
      Number(subTotalPrice) +
      Number(deliveryCharge) +
      Number(containerCharge) +
      Number(appliedTax)
    )?.toFixed(2);

    let grandTotal = Math.round(Number(total));

    let roundOff;
    if (grandTotal > Number(total)) {
      roundOff = `-${(grandTotal - Number(total)).toFixed(2)}`;
    }
    if (grandTotal === Number(total)) {
      roundOff = 0;
    }
    if (grandTotal < Number(total)) {
      roundOff = `+${Math.abs(grandTotal - Number(total)).toFixed(2)}`;
    }

    return roundOff;
  };

  const grandTotalFunc = () => {
    let total = (
      Number(subTotalPrice) +
      Number(deliveryCharge) +
      Number(containerCharge) +
      Number(appliedTax)
    )?.toFixed(2);

    let grandTotal = Math.round(Number(total));
    return grandTotal;
  };


  const handleOrderValues = async (orderStatus: string, ptype: string = "") => {
 console.log(tableNumber,tableDetails,"tableDetailstableDetailstableDetails")

    let data = {
      order_area_type: areaTypeId,
      order_type: orderType,
      outlet: 1,
      kitchen: 1,
      payment_type: paymentType ? paymentType : ptype,
      order_status: orderStatus,
      table_name: tableNumber || tableDetails.table?tableDetails.table:tableDetails.table_no,
    //   is_add_table: tableNumber ? true : false,
      no_of_person: Number(userDetailsData?.no_of_person),
      comments: orderWiseComments,
      assign_to: assignTo,
      is_paid: isPaid,
      order_items_details: orderItemData.map((item: any) => {
        const {
          id,
          menu_item,
          variationDetails,
          selected_items,
          addOnDetails,
          quantity
        } = item;
        // Create the base order item object
        const orderItem = {
          // menu_item: item.menu_item ? item.menu_item : item.id, // Use menu_item or fall back to id
          quantity: selected_items.length > 0 ? selected_items[0]?.quantity : quantity || 1,
          unit_price: variationDetails
            ? variationDetails.totalAddOnPrice
            : item.price,
          sub_total: variationDetails
            ? variationDetails.totalAddOnPrice
            : item.price,
          total_price: variationDetails
            ? Number(variationDetails.totalAddOnPrice) *
              Number(selected_items[0]?.quantity ?? 1)
            : (selected_items[0]?.totalPrice ?? item.price),
          kot_status: "not_prepared",
          add_on_details:
            addOnDetails?.selectedAddOns?.map((addOn: any) => ({
              addon_item: addOn?.id,
              quantity: addOn?.add_on,
            })) || [],
          variation_add_on_details: variationDetails?.variationToppings || [],
        };
        if (item.menu_item) {
          Object.assign(orderItem, { menu_item: item.menu_item });
          Object.assign(orderItem, { detail_id: item.id });
        } else {
          Object.assign(orderItem, { menu_item: item.id });
        }

        // If there's existing tableWiseOrderData, conditionally add detail_id
        if (Object.keys(tableWiseOrderData).length > 0 && !item.menu_item) {
          return { ...orderItem }; // Include detail_id only if menu_item doesn't exist
        } else {
          return orderItem; // Return the item without detail_id
        }
      }),
      customer_details: {
        tags: [],
        mobile: userDetailsData?.mobile ? userDetailsData?.mobile : null,
        name: userDetailsData?.name ? userDetailsData?.name : null,
        address: userDetailsData?.address ? userDetailsData?.address : null,
        locality: userDetailsData?.locality ? userDetailsData?.locality : null,
      },
      is_advance_order: false,
      total_tax: Number(appliedTax?.toFixed(2)) || 0,
      total_discount:
        totalDiscountFunc() !== "Discount is not applied."
          ? totalDiscountFunc()
          : 0 || 0,
      grand_total: grandTotalFunc(),
      tip: Number(tip) || 0,
      delivery_charge: deliveryCharge || 0,
      container_charge: containerCharge || 0,
      round_off: Number(roundOffFunc()) || 0,
      return_to_customer_amount: returnToCustomerBodyFunc() || 0,
      customer_paid_amount: customerPaid || 0,
    };
    if (Object.keys(tableWiseOrderData).length > 0) {
      Object.assign(data, { is_desktop: true });
    }
    if (Object.keys(tableWiseOrderData).length === 0) {
      Object.assign(data, { is_add_table: tableNumber ? true : false });
    }
  

    dispatch(setAddOrder(data))
    try {
      const res =
        tableWiseOrderData?.length === 0
          ? await addOrder(data)
          : await editOrder(tableWiseOrderData?.id, data);

      if (res.status === 200 || res.status === 201) {
        if (tableWiseOrderData?.length === 0) {
          dispatch(setUserDetailsData(null));
          await fetchTableWiseOrder(res?.data?.data?.id);
        }
        toast.success("saved successfully!");

        // Optionally navigate to billing page
        navigate("/billing");
      }
    } catch (error:any) {
      toast.error(error?.response?.data.errors);
      console.error("Error submitting order:", error.response.data.errors);
    }
  };
  const fetchTableWiseOrder = async (id: any) => {
    let data = {
      order: id,
    };

    try {
      const res = await getTableWiseOrder(data);
      if (res.status === 200) {
        // setTableWiseOrderData(res.data?.data);
        dispatch(setUserDetailsData(null));
        dispatch(setTablewiseOrer(res.data?.data));
      }
    } catch (error) {
      dispatch(setTablewiseOrer({}));
    }
  };

  // let price = 200.56;

  // let round_off = +0.56;
  // let grand_total = 200;

  console.log("tableNumber", tableNumber);

  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <p className="w-full p-1 pl-3 px-3 py-1.5 bg-gray-900 rounded-tl-md rounded-bl-md text-gray-200">
            Table No. - {tableDetails?.table_no}
          </p>
          <p className="px-3 py-1.5 p-1 text-center rounded-tr-md rounded-br-md bg-orange-200">
            {areaType}
          </p>
        </div>
        <div className="mt-3 flex justify-between items-center ">
          <div className="flex gap-2">
            <span>
              <img
                src={TableBack}
                alt="Table Back"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-9 h-9"
                // onClick={toggleOrderTable}
                onClick={toggleTableInputDine}
              />
            </span>
            <span>
              <img
                src={Users}
                alt="Users"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-8 h-8"
                onClick={toggleUserDetailsTable}
              />
            </span>
            <span>
              <img
                src={edituser}
                alt="Edit User"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-9 h-8"
                onClick={() => {
                  handleOpenOrderWiseCommentsDialog();
                }}
              />
            </span>
            <span>
              <img
                src={alluiUsers}
                alt="All UI Users"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-9 h-9"
                onClick={() => {
                  handleOpenAssignInputDialog();
                }}
              />
            </span>
          </div>
          {(tableWiseOrderData?.length > 0 ||
            Object.keys(tableWiseOrderData)?.length > 0) && (
            <p className="px-3 py-1.5 bg-orange-200 rounded-md">
              Bill No. - {tableWiseOrderData?.id}
            </p>
          )}
        </div>
        <div>
          {showTableInputDine && (
            <TableInputDine
              tableNo={tableDetails?.table_no || tableWiseOrderData?.table_no}
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
            />
          )}
          {showUserDetails && (
            <UserDetailsTable
              customerDetails={tableWiseOrderData?.customer_details}
              noOfPersons={tableWiseOrderData?.no_of_person}
              defaultTable={tableWiseOrderData}
            />
          )}
          {showOrderTable && (
            <OrderTable
              allMenuData={allMenuData}
              setAllMenuData={setAllMenuData}
              allMenuPriceData={allMenuPriceData}
              setAllMenuPriceData={setAllMenuPriceData}
              allMenuAddOnData={allMenuAddOnData}
              setAllMenuAddOnData={setAllMenuAddOnData}
              allMenuVariatioData={allMenuVariatioData}
              setAllMenuVariationData={setAllMenuVariationData}
              tableWiseOrderData={tableWiseOrderData}
            />
          )}
          <DialogBox
            isOpen={orderWiseCommentsModalOpen}
            onClose={handleCloseOrderWiseCommentsDialog}
            title="Order Wise Comments"
            children={
              <OrderWiseComments
                setOrderWiseCommentsModalOpen={setOrderWiseCommentsModalOpen}
                orderWiseComments={orderWiseComments}
                setOrderWiseComments={setOrderWiseComments}
                tableWiseOrderData={tableWiseOrderData}
              />
            }
          />
          <DialogBox
            isOpen={isAssignInputModalOpen}
            onClose={handleCloseAssignInputDialog}
            title="Assign To"
            children={
              <AssignInput
                waiterList={waiterList}
                setIsAssignInputModalOpen={setIsAssignInputModalOpen}
                assignTo={assignTo}
                setAssignTo={setAssignTo}
                tableWiseOrderData={tableWiseOrderData}
              />
            }
          />
        </div>
      </div>
      <div className="relative">
        <div className="mt-9 flex justify-center flex-col">
          <button className="flex justify-center" onClick={toggleDropdown}>
            <IoMdArrowDropup
              className={`bg-gray-800 text-white rounded-t-md w-20 h-7 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              size={25}
            />
          </button>
          {isDropdownOpen && (
            <ul className="absolute bottom-[92%] bg-gray-200 border border-gray-300 shadow-lg w-full">
              <li className="flex justify-between py-2 border-b border-gray-100 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Subtotal</p>
                {/* <p>900</p> */}
                <p>{subTotalPrice?.toFixed(2) ?? 0}</p>
              </li>
              <li className="flex justify-between py-2 px-4 border-b border-gray-100 hover:bg-gray-200 cursor-pointer">
                <p>
                  Discount{" "}
                  <button onClick={openTextMore} className="underline">
                    More
                  </button>
                </p>
                <p>{totalDiscountFunc()}</p>
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Delivery Charge</p>
                <input
                  type="text"
                  value={deliveryCharge}
                  defaultValue={0}
                  className=""
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Container Charge</p>
                <input
                  type="text"
                  value={containerCharge}
                  defaultValue={0}
                  className=""
                  onChange={(e) => setContainerCharge(e.target.value)}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>
                  Tax{" "}
                  <button onClick={openTaxMore} className="underline">
                    More
                  </button>
                </p>
                <p>{appliedTax?.toFixed(2)}</p>
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Round Off</p>
                <p>{roundOffFunc()}</p>
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Customer Paid</p>
                <input
                  type="text"
                  defaultValue={0}
                  className=""
                  value={customerPaid}
                  onChange={(e) => setCustomerPaid(e.target.value)}
                />
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Return to Customer</p>
                <input
                  type="text"
                  defaultValue={0}
                  className=""
                  value={returnToCustomerFunc()}
                  disabled
                />
              </li>
              <li className="flex justify-between border-b border-gray-100 py-2 px-4 hover:bg-gray-200 cursor-pointer">
                <p>Tip</p>
                <input
                  type="text"
                  defaultValue={0}
                  className=""
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                />
              </li>
            </ul>
          )}
          {/* <div className="px-7 rounded-md bg-gray-800 py-2 flex justify-between"> */}
          <div className="px-7 rounded-md bg-gray-800 py-2 text-right">
            {/* <button
              className="px-4 py-0.5 bg-white rounded-full"
              onClick={handleOpenSplitDialog}
            >
              Split
            </button> */}
            {/* <p className="text-white">₹900</p> */}
            {/* <p className="text-white">₹ {subTotalPrice?.toFixed(2)}</p> */}
            <p className="text-white">
              ₹{" "}
              {/* {(
                Number(subTotalPrice) +
                Number(deliveryCharge) +
                Number(containerCharge) +
                Number(appliedTax)
              )?.toFixed(2)} */}
              {grandTotalFunc()}
            </p>
          </div>
          <DialogBox
            isOpen={isSplitDialogOpen}
            onClose={handleCloseSplitDialog}
            title="Split Bill"
          >
            <MainSplitTabs />
          </DialogBox>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-6 text-sm mt-2">
          {paymentTypeList.map((payType: any) => (
            <label className="flex items-center justify-center bg-white rounded-lg text-gray-800">
              <input
                type="radio"
                name="paymentType"
                className="form-radio text-gray-800 mr-2"
                onClick={() => orderTypeModal(payType)}
                checked={payType.id == paymentType}
                value={paymentType}
              />
              {payType?.type}
            </label>
          ))}

          {/* <label className="flex items-center justify-center bg-white rounded-lg text-gray-800">
            <input
              type="radio"
              name="payment"
              className="form-radio text-gray-800 mr-2"
            />{" "}
            Cash
          </label>
          <label className="flex items-center justify-center bg-white rounded-lg text-gray-800">
            <input
              type="radio"
              name="payment"
              className="form-radio text-gray-800 mr-2"
            />{" "}
            Card
          </label>
          <label className="flex items-center justify-center bg-white rounded-lg text-gray-800">
            <input
              type="radio"
              name="payment"
              className="form-radio text-gray-800 mr-2"
            />{" "}
            Due
          </label>
          <label className="flex items-center justify-center bg-white rounded-lg text-gray-800">
            <input
              type="radio"
              name="payment"
              className="form-radio text-gray-800 mr-2"
              onClick={handleOpenOtherPaymentDialog} // Open the dialog on click
            />{" "}
            Other
          </label> */}
          {/* Other Payment Dialog */}
          <DialogBox
            isOpen={cartpayment}
            onClose={() => setcardpayment(false)}
            title="card payment"
            children={
              <CardPaymentDialog
                setcardpayment={setcardpayment}
                paymentType={paymentType}
              />
            }
          ></DialogBox>
          <DialogBox
            isOpen={partPaymentDialogOpen}
            onClose={handleClosePartPaymentDialog}
            title="Part Payment"
            children={
              <MainPartPayment
                setPartPaymentDialogOpen={setPartPaymentDialogOpen}
              />
            }
          ></DialogBox>
          <DialogBox
            isOpen={isOtherPaymentDialogOpen}
            onClose={handleCloseOtherPaymentDialog}
            title="Other Payment"
            children={
              <OtherPaymentDailog
                setOtherPaymentDialogOpen={setOtherPaymentDialogOpen}
                paymentType={paymentType}
                // tableWiseOrderData={tableWiseOrderData}
              />
            }
          ></DialogBox>
        </div>
        <div className="flex justify-center">
          {" "}
          <input
            type="checkbox"
            className="form-checkbox text-blue-500 h-5 w-5 mr-2"
            // onChange={() => handleClickBtn('is_paid')}
            onChange={() => setIsPaid(!isPaid)}
          />
          <label className="text-gray-800">It's Paid</label>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5 mt-4">
          {/* <button onClick={() => handleClickBtn('save')} className="bg-orange-500 text-white px-2 py-2 rounded-lg"> */}
          <button
            onClick={() => handleOrderValues("save")}
            className="bg-orange-500 text-white px-2 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={() => handleOrderValues("save_and_print")}
            className="bg-white border px-2 py-2 rounded-lg"
          >
            Save & Print
          </button>
          <button
            onClick={() => handleOrderValues("save_and_eBill")}
            className="bg-white border px-2 py-2 rounded-lg"
          >
            Save & E-Bill
          </button>
          <button
            onClick={() => handleOrderValues("kot")}
            className="bg-orange-500 text-white px-2 py-2 rounded-lg"
          >
            KOT
          </button>
          <button
            onClick={() => handleOrderValues("kot_and_print")}
            className="bg-white border px-2 py-2 text-gray-800 rounded-lg"
          >
            KOT & Print
          </button>
          <button
            onClick={() => handleOrderValues("hold")}
            className="bg-white border px-2 py-2 text-gray-800 rounded-lg"
          >
            Hold
          </button>
        </div>
      </div>
      {/* Tax More Model */}
      <TextMore
        isOpen={isTaxOpen}
        onClose={closeTaxMore}
        setAppliedTax={setAppliedTax}
        subTotalTaxPrice={subTotalTaxFunc()}
      />
      {/* Discount Model  */}
      <DiscountModel
        isOpen={isTextMoreOpen}
        onClose={closeTaxtMore}
        orderType={orderType}
        orderItemData={orderItemData}
        subTotal={subTotalPrice}
        setTotalDiscount={setTotalDiscount}
        customDiscounts={customDiscounts}
        setCustomDiscounts={setCustomDiscounts}
      />
    </div>
  );
};

export default DineIn;