import React, { useEffect, useState } from "react";
import {
  addOrder,
  addPartPayment,
  editOrder,
  getOtherPaymentType,
  getPartPaymentType,
} from "../../../../Api/Api";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdvanceOrderDailog = ({

  paymentTypeList,
  orderType,
  areaTypeId,

  userDetailsData,
  orderWiseComments,
  assignTo,
  isPaid,
  appliedTax,
  grand_total,
  deliveryCharge,
  tip,
  roundOffFunc,
  containerCharge,
  returnToCustomerBodyFunc,
  customerPaid,
  totalDiscountFunc
}: any) => {
  const [formData, setFormData] = useState({
    date: "",
    hours: "",
    minutes: "",
    total: 200,
    paid: 0,
    remaining: 200,
    paymentType: "",
    advanceAmount: "",
    customerNote: "",
    id: "",
  });
  const tablewiseorder = useSelector(
    (state: any) => state.billingData.tablewiseorder
  );
  const [amount, setAmount] = useState("");
  const [paymenttype, setPaymentType] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [selectedType, setSelectedPaymentType] = useState("");
  const { tableData, orderItemData, subTotalPrice } =
  useSelector((state: any) => state.billingData) ?? {};
  useEffect(() => {
    setPaymentType(paymentTypeList);
    fetchOtherPaymentType();
    fetchCardPaymentType();
  }, [paymentTypeList]);

  const fetchOtherPaymentType = async () => {
    try {
      const res = await getOtherPaymentType({ outlet: "1" });
      if (res?.status === 200) {
        setOtherData(res?.data?.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch payment types.");
    }
  };

  const fetchCardPaymentType = async () => {
    try {
      const res = await getPartPaymentType({ outlet: "1" });
      if (res?.status === 200) {
        setCardData(res?.data?.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch payment types.");
    }
  };
const navigate=useNavigate()
  const handleInputChange = (e: any) => {
    console.log(e.target, "kjkkjkkj");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const opterOptions = otherData.map((val: any) => ({
    value: val.id,
    label: val.type,
  }));

  const optionCardData = cardData.map((val: any) => ({
    value: val.id,
    label: val.option,
  }));

  const handleSave = async (orderStatus:string) => {
 
    if(amount && amount>grand_total){
return toast.error("Amount should be less or equal to remaning amount");
    }
    let data = {
    is_advance_order:true,
    note:formData.customerNote,
select_date:`${formData.date} ${formData.hours}:${formData.minutes}:00`,
advance_amount: amount,
advance_order_status:"kot",
      order_area_type: areaTypeId,
      order_type: orderType,
      outlet: 1,
      kitchen: 1,
      payment_type: 1,
      order_status: orderStatus,
      // table_name: tableDetails?.table_no,
      no_of_person: Number(userDetailsData?.no_of_person),
      comments: orderWiseComments,
      assign_to: assignTo,
      is_paid: isPaid,
   
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
  
      })),
   
      order_custom_discounts: [],
      customer_details: {
        tags: [],
        mobile: userDetailsData?.mobile,
        name: userDetailsData?.name,
        address: userDetailsData?.address,
        locality: userDetailsData?.locality,
      },
     
      total_tax: Number(appliedTax?.toFixed(2)) ?? 0,
      total_discount:
        (totalDiscountFunc !== "Discount is not applied."
          ? totalDiscountFunc
          : 0) ?? 0,
      grand_total:
        // Number(subTotalPrice) +
        // Number(deliveryCharge) +
        // Number(containerCharge) +
        // Number(appliedTax),
        grand_total,
      tip: Number(tip) ?? 0,
      delivery_charge: deliveryCharge ?? 0,
      container_charge: containerCharge ?? 0,
      round_off: roundOffFunc ?? 0,
      return_to_customer_amount: returnToCustomerBodyFunc ?? 0,
      customer_paid_amount: customerPaid ?? 0,
    };

    try {
        const res = await addOrder(data);
        if (res?.status === 201) {
          toast.success("success");
          navigate("/billing");
        }
    } catch (error:any) {
      toast.error(error?.response?.data.errors);

    }
  };
  const [selectid, setselectid] = useState();
  const manageclick = (val: any) => {
    console.log(val, "valval");
    setselectid(val.id);
  };
  return (
    <div className="mx-auto bg-white rounded-lg">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-3 p-3">
        <div className="flex-1">
          <label className="block text-sm">Select Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="flex-1">
            <label className="block text-sm">Hours</label>
            <select
              name="hours"
              value={formData.hours}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            >
              {Array.from({ length: 24 }, (_, hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm">Minutes</label>
            <select
              name="minutes"
              value={formData.minutes}
              onChange={handleInputChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            >
              {Array.from({ length: 61 }, (_, minute) => (
                <option key={minute} value={minute}>
                  {minute.toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-3">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left">Total (₹)</th>
              <th className="border px-4 py-2 text-left">Paid (₹)</th>
              <th className="border px-4 py-2 text-left">Remaining (₹)</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200">
            <tr>
              <td className="border px-4 py-2">{grand_total}</td>
              <td className="border px-4 py-2">{0}</td>
              <td className="border px-4 py-2">{grand_total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-3">
        <label className="block text-sm">Payment Type</label>
        <div className="flex justify-between gap-4">
        {paymenttype && paymenttype.filter((val:any) => val.type !== "Part").map((val:any, i) => (
  <label className="flex items-center" key={i}>
    <input
      type="radio"
      name="paymentType"
      value={val.type}
      checked={formData.paymentType === val.type}
      onChange={handleInputChange}
      onClick={() => manageclick(val)}
      className="form-radio"
    />
    <span className="ml-2 capitalize">{val.type}</span>
  </label>
))}

          <div>
            <label className="block text-sm">Enter Amount</label>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {formData.paymentType === "card" && (
          <Select
            className="w-[200px] shadow-sm sm:text-sm"
            options={optionCardData}
            onChange={(option: any) => setSelectedPaymentType(option.value)}
          />
        )}
        {formData.paymentType === "Other" && (
          <Select
            className="w-[200px] shadow-sm sm:text-sm"
            options={opterOptions}
            onChange={(option: any) => setSelectedPaymentType(option.value)}
          />
        )}
      </div>

      <div className="p-3">
        <label className="block text-sm">Customer Note</label>
        <textarea
          name="customerNote"
          value={formData.customerNote}
          onChange={handleInputChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded"
        ></textarea>
      </div>

      <div className="p-3 flex justify-end gap-4 border-t border-gray-300">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
          Cancel
        </button>
        <button
          onClick={()=>handleSave("save")}
          className="px-4 py-2 bg-green-500 text-white rounded-full"
        >
          Save
        </button>
        <button
    onClick={()=>handleSave("save_and_print")}
          className="px-4 py-2 bg-green-500 text-white rounded-full"
        >
          Save & Print
        </button>
        <button
    onClick={()=>handleSave("save_and_eBill")}
          className="px-4 py-2 bg-green-500 text-white rounded-full"
        >
          Save & E-bill
        </button>
      </div>
    </div>
  );
};

export default AdvanceOrderDailog;
