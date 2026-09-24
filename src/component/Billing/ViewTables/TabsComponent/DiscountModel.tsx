import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { appliedCouponCode, getOrderType } from "../../../../Api/Api";
import { useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";

interface DiscountModelProps {
  isOpen: boolean;
  onClose: () => void;
  orderType: any;
  orderItemData: any;
  subTotal: any;
  setTotalDiscount: any;
  customDiscounts: any;
  setCustomDiscounts: any;
}

interface OrderType {
  id: any;
  type: any;
}

const DiscountModel: React.FC<DiscountModelProps> = ({
  isOpen,
  onClose,
  orderType,
  orderItemData,
  subTotal,
  setTotalDiscount,
  customDiscounts,
  setCustomDiscounts,
}) => {
  const { groupData, subTotalPrice } =
    useSelector((state: any) => state.billingData) ?? {};

  const [clearSearch, setClearSearch] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [discountData, setDiscountData] = useState({
    group: "",
    reason: "",
    order_discount_type: "",
    discount_amount: "",
  });

  const [orderTypeList, setOrderTypeList] = useState<OrderType[]>([]);
  const [couponCode, setCouponCode] = useState(0);
  const [customDiscountFields, setCustomDiscountFields] = useState([{ group: "", reason: "", order_discount_type: "", discount_amount: "" }]);

  useEffect(() => {
    fetchOrderTypeData();
  }, []);

  const fetchOrderTypeData = async () => {
    const res = await getOrderType();
    if (res?.status === 200) {
      setOrderTypeList(res?.data?.data);
    }
  };

  if (!isOpen) return null;

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  const handleApply = async () => {
    let orderTypeVal = orderTypeList?.find((o: any) => o?.id === orderType)?.type;

    let data = {
      discount_coupon_code: clearSearch,
      order_type: orderTypeVal,
      amount: subTotal
    };

    if (subTotalPrice !== 0) {
      try {
        const res = await appliedCouponCode(data);
        if (res?.status === 200) {
          setCouponCode(res.data?.data?.coupon_code_amount);
          setClearSearch('');
        }
      } catch (error) {}
    }
  };

  const handleSave = () => {
    if (couponCode !== undefined) {
      setTotalDiscount(couponCode);
      onClose();
    } else {
      setTotalDiscount(0);
      onClose();
    }
  };

  const handleAddMore = () => {
    setCustomDiscountFields([...customDiscountFields, { group: "", reason: "", order_discount_type: "", discount_amount: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = customDiscountFields.filter((_, i) => i !== index);
    setCustomDiscountFields(updatedFields);
  };

  const handleCustomDiscountChange = (index: number, field: string, value: string) => {
    const updatedFields = [...customDiscountFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setCustomDiscountFields(updatedFields);
  };

  return (
    <div
      id="authentication-modal"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-sm shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600">
            <h3 className="text-md font-semibold text-gray-500 dark:text-white ml-2">
              Applied Discount
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <MdClose />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <h1 className="text-md pl-2 mt-2">Coupon Code</h1>
          <div className="flex justify-between">
            <div className="flex m-4">
              <input
                type="search"
                id="default-search"
                className="outline-none block w-[13rem] px-3 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 rounded-sm"
                placeholder="Search Here"
                required
                value={clearSearch}
                onChange={(e) => setClearSearch(e.target.value)}
              />
              <button
                className="text-red-500 ml-4"
                onClick={() => setClearSearch("")}
              >
                clear
              </button>
            </div>
            <div className="mt-5">
              <button
                className="px-4 mr-2 py-1 rounded-md text-sm text-white bg-orange-500"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
          <hr />
          <h1 className="pl-2 mt-2 text-md">
            Custom discount <span className="text-red-500 cursor-pointer" onClick={handleAddMore}>Add More</span>
          </h1>
          {customDiscountFields.map((discount, index) => (
            <div key={index} className="px-2 mt-4 flex flex-col gap-4 relative">
              <button
                type="button"
                className=" absolute bottom-3 right-4  text-red-500 hover:text-red-700"
                onClick={() => handleRemoveField(index)}
              >
                <BsTrash/>
              </button>
              <select
                name="group"
                id="group"
                className="outline-none block w-full py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 rounded-sm"
                value={discount.group}
                onChange={(e) => handleCustomDiscountChange(index, "group", e.target.value)}
              >
                <option value="" defaultChecked>
                  All
                </option>
                {groupData?.map((group: any) => (
                  <option key={group?.group_id} value={group?.group_id}>
                    {group?.group_name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Reason"
                className="outline-none block w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-sm"
                value={discount.reason}
                onChange={(e) => handleCustomDiscountChange(index, "reason", e.target.value)}
              />
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`discount_type_${index}`}
                  value="percentage"
                  checked={discount.order_discount_type === "percentage"}
                  onChange={() => handleCustomDiscountChange(index, "order_discount_type", "percentage")}
                />
                <label>Percentage</label>
                <input
                  type="radio"
                  name={`discount_type_${index}`}
                  value="fixed"
                  checked={discount.order_discount_type === "fixed"}
                  onChange={() => handleCustomDiscountChange(index, "order_discount_type", "fixed")}
                />
                <label>Fixed</label>
                <input
                  type="text"
                  placeholder="Discount Amount"
                  className="outline-none block w-[10rem] px-2 py-1 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-sm"
                  value={discount.discount_amount}
                  onChange={(e) => handleCustomDiscountChange(index, "discount_amount", e.target.value)}
                />
              </div>
            </div>
          ))}
          <hr />
          <div className="flex justify-end mx-3 my-3 mb-4 gap-4">
            <button
              type="button"
              className="px-4 py-2 text-xs font-medium text-center inline-flex items-center text-gray-500 border rounded-full my-3 mb-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-orange-500 rounded-full my-3 mb-4"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModel;
