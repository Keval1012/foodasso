import React, { useEffect, useState } from "react";
import { GiTabletopPlayers } from "react-icons/gi";
import { CgUser } from "react-icons/cg";
import { PiNoteDuotone } from "react-icons/pi";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdArrowDropup } from "react-icons/io";
import OrderTable from "./OrderTable";
import TextMore from "./TexModel";
import DiscountModel from "./DiscountModel";
import OtherPaymentDailog from "./OtherPaymentDailog";
import DialogBox from "../../../common/Dilog-Box";
import Users from "../../../../Styles/assets/img/user-icon.svg";
import edituser from "../../../../Styles/assets/img/UIIconsedit1.svg";
import alluiUsers from "../../../../Styles/assets/img/UIIcons.svg";
import MainSplitTabs from "./SplitTabs/MainSplitTabs";
import AdvanceOrderDailog from "./AdvanceOrderDailog";
import UserDetailsTable from "./AllTablesInput/UserDetailsTable";
import AssignInput from "./AllTablesInput/AssignInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, editOrder } from "../../../../Api/Api";
import { setOrderTypeId, setUserDetailsData } from "../../../../redux/Features/BillingDataSlice";
import OrderWiseComments from "./AllTablesInput/OrderWiseComments";
import MainPartPayment from "../Settlement/PartPayments/MainPartPayment";
import toast from "react-hot-toast";

const sidebarDataItem = [
  {
    icons: <GiTabletopPlayers />,
    title: "table",
  },
  {
    icons: <CgUser />,
    title: "user",
  },
  {
    icons: <PiNoteDuotone />,
    title: "note",
  },
  {
    icons: <FaRegNewspaper />,
    title: "paper",
  },
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
  orderType?: any;
  areaTypeId?: any;
  tableWiseOrderData?: any;
}

const PickUp: React.FC<TableDataProps> = ({
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
  // const [isTextMoreOpen, setIsTextMoreOpen] = useState(false);
  const [isTextMoreOpen, setIsTextMoreOpen] = useState(false);
  const [isTaxOpen, setIsTaxOpen] = useState(false);
  // State for TextMore dialog
  // const [isTaxOpen, setIsTaxMoreOpen] = useState(false); // State for TextMore dialog
  // Split
  const [isSplitDialogOpen, setSplitDialogOpen] = useState(false);
  const [isAdvanceDialogOpen, setDialogOpen] = useState(false);
  const [isOtherPaymentDialogOpen, setOtherPaymentDialogOpen] = useState(false);

  const [showOrderTable, setShowOrderTable] = useState(true);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [orderWiseCommentsModalOpen, setOrderWiseCommentsModalOpen] =
    useState(false);
  const [partPaymentDialogOpen, setPartPaymentDialogOpen] = useState(false);
  const [isAssignInputModalOpen, setIsAssignInputModalOpen] = useState(false);

  const handleOpenSplitDialog = () => setSplitDialogOpen(true);
  const handleCloseSplitDialog = () => setSplitDialogOpen(false);
  const handleOpenAdvancetDialog = () => {
    console.log(userDetailsData.mobile)
    if(userDetailsData.mobile==''){
      return toast.error("Please Enter Mobile No");
      }
    if(orderItemData.length==0){
      return toast.error("Please add one Item to generate Bill");
     }
    setDialogOpen(true);
  }



  const handleCloseAdvanceDialog = () => setDialogOpen(false);
  const handleCloseOtherPaymentDialog = () => setOtherPaymentDialogOpen(false);
  const handleOpenOtherPaymentDialog = () => setOtherPaymentDialogOpen(true);
  const handleOpenPartPaymentDialog = () => setPartPaymentDialogOpen(true);
  const handleClosePartPaymentDialog = () => setPartPaymentDialogOpen(false);

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

  const [paymentType, setPaymentType] = useState("");
  const [orderWiseComments, setOrderWiseComments] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState<any>(0);
  const [containerCharge, setContainerCharge] = useState<any>(0);
  const [tip, setTip] = useState<any>(0);
  const [appliedTax, setAppliedTax] = useState<any>(0);
  const [customerPaid, setCustomerPaid] = useState<any>(0);
  const [totalDiscount, setTotalDiscount] = useState<any>(0);
  const [customDiscounts, setCustomDiscounts] = useState([]);

  const defaultPaymentType = paymentTypeList?.find(
    (o: any) => o?.id === tableWiseOrderData?.payment_type
  )?.type;

  const toggleUserDetailsTable = () => {
    setShowUserDetails(true);
    setShowOrderTable(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const openTextMore = () => {
  //   setIsTextMoreOpen(true);
  // };

  const closeTextMore = () => {
    setIsTextMoreOpen(false);
  };

  const openTexMore = () => {
    setIsTextMoreOpen(true);
  };

  // const closeTexMore = () => {
  //   setIsTaxMoreOpen(false);
  // };

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

  const orderTypeModal = (payType: any) => {
    setPaymentType(payType?.id);
    if (payType?.type === "Other") {
      handleOpenOtherPaymentDialog();
    }
    if (payType?.type === "Part") {
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

  const handleOrderValues = async (orderStatus: string) => {
    let data = {
      order_area_type: areaTypeId,
      order_type: orderType,
      outlet: 1,
      kitchen: 1,
      payment_type: paymentType,
      order_status: orderStatus,
      // table_name: tableDetails?.table_no,
      no_of_person: Number(userDetailsData?.no_of_person),
      comments: orderWiseComments,
      assign_to: assignTo,
      is_paid: isPaid,
      // order_items_details: [
      //   {
      //     // detail_id: 45, // edit time
      //     menu_item: 4, // id
      //     quantity: 2.0,
      //     unit_price: 420.0,
      //     sub_total: 420.0,
      //     total_price: 840.0,
      //     // variation_add_on_details: [],
      //     // add_on_details: []
      //   }
      // ],
      order_items_details: orderItemData.map((item: any) => ({
        // detail_id: 45, // edit time
        menu_item: item?.id, // id
        quantity: item?.selected_items[0]?.quantity ?? 1,
        unit_price: item?.variationDetails
          ? item?.variationDetails?.totalAddOnPrice
          : item?.price,
        sub_total: item?.variationDetails
          ? item?.variationDetails?.totalAddOnPrice
          : item?.price,
        total_price: item?.variationDetails
          ? Number(item?.variationDetails?.totalAddOnPrice) *
            Number(item?.selected_items[0]?.quantity ?? 1)
          : (item?.selected_items[0]?.totalPrice ?? item?.price),
        kot_status: "not_prepared",

        // variation_add_on_details: [],
        // add_on_details: []
        add_on_details: item?.addOnDetails?.selectedAddOns?.map(
          (addOn: any) => ({
            // detail_id: 106,  // edit
            addon_item: addOn?.id,
            quantity: addOn?.add_on,
          })
        ),
        // variation_add_on_details: item?.variationDetails?.menuItemsVariationData?.map(
        //   (variation: any) =>
        //     variation?.add_on?.map((add_on: any) =>
        //       add_on?.add_on_details?.map((v: any) => ({
        //         // detail_id: 106,  // edit
        //         variation_addon_item: v?.id,
        //         quantity: Object.values(
        //           item?.variationDetails?.variationToppings
        //         )?.map((value) => value),
        //       }))
        //     )
        // ),
        variation_add_on_details:
          item?.variationDetails?.menuItemsVariationData?.flatMap(
            (variation: any, index: any) =>
              variation?.add_on?.flatMap((add_on: any) =>
                add_on?.add_on_details?.map((v: any) => ({
                  variation_addon_item: v?.id,
                  quantity:
                    Object?.values(item?.variationDetails?.variationToppings)[
                      index
                    ] ?? 0,
                }))
              )
          ),
        // variation_add_on_details: [],
        // detail_id: "45",
        // "variation_addon_item": 1,
        // "quantity": 2
      })),
      // order_items_details: orderItemData.map((item: any) => ({
      //   menu_item: item.id,                 // Menu item ID
      //   quantity: item.quantity || 1,       // Default quantity to 1 if not provided
      //   unit_price: item.price,             // Price per unit
      //   sub_total: item.price,              // Assuming sub_total is the same as unit price for 1 quantity
      //   total_price: item.price * (item.quantity || 1), // Total price = price * quantity
      // }))
      order_custom_discounts: [],
      customer_details: {
        tags: [],
        mobile: userDetailsData?.mobile ? userDetailsData?.mobile : null,
        name: userDetailsData?.name ? userDetailsData?.name : null,
        address: userDetailsData?.address ? userDetailsData?.address : null,
        locality: userDetailsData?.locality ? userDetailsData?.locality : null,
      },
      is_advance_order: false,
      total_tax: Number(appliedTax?.toFixed(2)) ?? 0,
      total_discount:
        (totalDiscountFunc() !== "Discount is not applied."
          ? totalDiscountFunc()
          : 0) ?? 0,
      grand_total:
        // Number(subTotalPrice) +
        // Number(deliveryCharge) +
        // Number(containerCharge) +
        // Number(appliedTax),
        grandTotalFunc(),
      tip: Number(tip) ?? 0,
      delivery_charge: deliveryCharge ?? 0,
      container_charge: containerCharge ?? 0,
      round_off: Number(roundOffFunc()) ?? 0,
      return_to_customer_amount: returnToCustomerBodyFunc() ?? 0,
      customer_paid_amount: customerPaid ?? 0,
    };

    try {
      if (tableWiseOrderData?.length === 0) {
        const res = await addOrder(data);
        if (res?.status === 201) {
          dispatch(setUserDetailsData(null));
          navigate("/billing");
        }
      } else {
        const res = await editOrder(tableWiseOrderData?.id, data);
        if (res?.status === 201) {
          dispatch(setUserDetailsData(null));
          navigate("/billing");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        {/* <div className="flex justify-between items-center">
          <p className="w-full p-1 pl-3 px-3 py-1.5 bg-gray-900 rounded-tl-md rounded-bl-md text-gray-200">
            Table No. - {tableDetails?.table_no}
          </p>
          <p className="px-3 py-1.5 p-1 text-center rounded-tr-md rounded-br-md bg-orange-200">
            {areaType}
          </p>
        </div> */}
        <div className="mt-3 flex justify-between items-center ">
          <div className="flex gap-2">
            {/* <span className="">
              <GiTabletopPlayers
                size={30}
                className="text-gray-800 p-1 bg-orange-200 rounded-md"
              />
            </span> */}
            <span className="">
              <img
                src={Users}
                alt="Logo"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-8 h-8"
                onClick={toggleUserDetailsTable}
              />
            </span>
            <span className="">
              <img
                src={edituser}
                alt="Logo"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-8 h-8"
                onClick={() => {
                  handleOpenOrderWiseCommentsDialog();
                }}
              />
            </span>
            <span className="">
              <img
                src={alluiUsers}
                alt="Logo"
                className="cursor-pointer p-1 bg-custom-light rounded-md w-8 h-8"
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
              />
            }
          />
        </div>
      </div>
      <div className="relative">
        <div className="mt-9 flex justify-center flex-col">
          <button className="flex justify-center" onClick={toggleDropdown}>
            <IoMdArrowDropup
              className={
                isDropdownOpen
                  ? `rotate-180 bg-gray-800 text-white rounded-t-md w-20 h-7`
                  : `bg-gray-800 text-white rounded-t-md w-20 h-7`
              }
              size={25}
            />
          </button>
          {isDropdownOpen && (
            <ul className="absolute bottom-[92%] bg-gray-200 border  border-gray-300 shadow-lg w-full">
              <li className="flex justify-between py-2 px-4 border-b border-gray-100 hover:bg-gray-200 cursor-pointer">
                <p>subtotal</p>
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
                <p>Delivery charge</p>
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
                <p>Container charge</p>
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
                <p>Round off</p>
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
          <div className="px-7 rounded-md bg-gray-800 py-2 flex justify-between">
            <button className="px-4 text-white text-lg">Total</button>
            {/* <p className="text-white text-lg">₹900</p> */}
            <p className="text-white text-lg">
              ₹{" "}
              {/* {(Number(subTotalPrice) +
                Number(deliveryCharge) +
                Number(containerCharge) +
                Number(appliedTax))?.toFixed(2)} */}
              {grandTotalFunc()}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-6 text-sm mt-2">
          {paymentTypeList.map((payType: any) => (
            <label className="flex items-center justify-center bg-white rounded-lg text-gray-800">
              <input
                type="radio"
                name="payment"
                className="form-radio text-gray-800 mr-2"
                onClick={() => orderTypeModal(payType)}
                defaultChecked={payType?.type === defaultPaymentType}
              />{" "}
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
            />{" "}
            Part
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
              />
            }
          ></DialogBox>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex">
            {" "}
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 h-5 w-5 mr-2"
              onChange={() => setIsPaid(!isPaid)}
            />
            <label className="text-gray-800">It's Paid</label>
          </div>
          {/* <button
            className="border border-grey-400 text-black px-5 py-2 rounded-lg"
            onClick={handleOpenSplitDialog}
          >
            Split
          </button> */}
          <DialogBox
            isOpen={isSplitDialogOpen}
            onClose={handleCloseSplitDialog}
            title="Split Bill"
          >
            <MainSplitTabs />
          </DialogBox>{" "}
          <button
            className="bg-orange-500 text-white px-3 py-2 rounded-lg"
            onClick={handleOpenAdvancetDialog}
          >
            Advance Order
          </button>
          <DialogBox
            isOpen={isAdvanceDialogOpen}
            onClose={handleCloseAdvanceDialog}
            title="Advance order"
          >
                 <AdvanceOrderDailog
  allMenuData={allMenuData}
  setAllMenuData={setAllMenuData}
  allMenuPriceData={allMenuPriceData}
  setAllMenuPriceData={setAllMenuPriceData}
  allMenuAddOnData={allMenuAddOnData}
  setAllMenuAddOnData={setAllMenuAddOnData}
  allMenuVariatioData={allMenuVariatioData} // Fix the spelling of "Variatio" to "Variation"
  setAllMenuVariationData={setAllMenuVariationData}
  waiterList={waiterList}
  paymentTypeList={paymentTypeList}
  orderType={orderType}
  areaTypeId={areaTypeId}
  tableWiseOrderData={tableWiseOrderData}
  userDetailsData={userDetailsData}
  orderWiseComments={orderWiseComments}
  assignTo={assignTo}
  isPaid={isPaid}
  appliedTax={appliedTax}
  grand_total={grandTotalFunc()}
  deliveryCharge={deliveryCharge}
  tip={tip}
  containerCharge={containerCharge}
  roundOffFunc={Number(roundOffFunc())}
  returnToCustomerBodyFunc={returnToCustomerBodyFunc()}
  customerPaid={customerPaid}
  totalDiscountFunc={totalDiscountFunc()}
/>
          </DialogBox>{" "}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-5">
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

export default PickUp;
