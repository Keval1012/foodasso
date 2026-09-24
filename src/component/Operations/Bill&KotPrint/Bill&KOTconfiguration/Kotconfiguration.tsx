import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getBillKOTPreferredConfiguration, postBillKOTPreferredConfiguration } from "../../../../Api/Operation/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Kotconfiguration = () => {

  const navigate = useNavigate();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [billKOTPreferredConfigurationData, setBillKOTPreferredConfigurationData] = useState([]);
  const [printId, setPrintId] = useState(null);
  const [billCheckedId, setBillCheckedId] = useState<any>([]);
  const [kotCheckedId, setKotCheckedId] = useState<any>([]);

  useEffect(() => {
    fetchBillKOTPreferredConfiguration();
  }, []);

  useEffect(() => {
    fetchCheckedIsBillKotData();
  }, [billKOTPreferredConfigurationData]);

  const fetchBillKOTPreferredConfiguration = async () => {
    try {
      // debugger
      const res = await getBillKOTPreferredConfiguration(loginUserData?.outlet);
      if (res.status === 200) {
        setBillKOTPreferredConfigurationData(res.data?.data?.options);
        setPrintId(res.data?.data?.outlet_billing_print_id);
      }
    } catch (error) {}
  };

  console.log("billKOTPreferredConfigurationData", billKOTPreferredConfigurationData);
  // console.log("printId", printId);

  const handleSave = async () => {
    let data = {
      id: printId,
      outlet: loginUserData?.outlet,
      kot_print_option: kotCheckedId,
      bill_print_option: billCheckedId,
    };

    try {
      // debugger
      const res = await postBillKOTPreferredConfiguration(data);
      if (res.status === 200) {
        toast.success(res.data?.message);
        navigate(-1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {}
  };

  const handleChange = (id: any, type: string) => {
    setBillKOTPreferredConfigurationData((prevCheckboxes: any) =>
      prevCheckboxes?.map((checkbox: any) => 
        checkbox.id === id && ((type === 'isBill' && checkbox?.is_bill) || (type === 'isKot' && checkbox?.is_kot))
          ? { ...checkbox, checked: !checkbox?.checked }
          : checkbox
      )
    );
  };

  const fetchCheckedIsBillKotData = () => {
    const getIsBill = billKOTPreferredConfigurationData?.filter((b: any) => b?.checked === true && b?.is_bill === true);
    setBillCheckedId(getIsBill?.map((b: any) => b?.id));
    const getIsKot = billKOTPreferredConfigurationData?.filter((b: any) => b?.checked === true && b?.is_kot === true);
    setKotCheckedId(getIsKot?.map((k: any) => k?.id));
  };

  // const billKOTPreferredConfigurationData = [
  //   { id: 1, name: "a", isBill: true },
  //   { id: 2, name: "b", isBill: true },
  //   { id: 3, name: "c", isBill: true },
  //   { id: 1, name: "aa", isKot: true },
  //   { id: 2, name: "bb", isKot: true },
  //   { id: 3, name: "cc", isKot: true },
  // ];

  // console.log("billCheckedId", billCheckedId);
  // console.log("kotCheckedId", kotCheckedId);

  return (
    <div className=" space-y-3 ">
      <div className="flex justify-between items-center border-b border-gray-300 ">
        <h1 className="text-2xl font-semibold p-4">
          Bill/Kot Preferred configuration
        </h1>
        <div className="flex gap-3 p-4 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer" onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base">Back</button>
        </div>
      </div>
      <div className="">
        <div className="space-y-4 p-4">
          {billKOTPreferredConfigurationData?.map((p: any) => (
            <div
              className="flex items-start gap-2"
              key={`${p?.id}-${p?.is_bill ? "bill" : "kot"}`}
            >
              <input
                type="checkbox"
                id={`${p?.id}-${p?.is_bill ? "bill" : "kot"}`}
                className="mt-1"
                checked={p?.checked}
                onChange={() =>
                  handleChange(p?.id, p?.is_bill ? "isBill" : "isKot")
                }
              />
              <label
                htmlFor={`${p?.id}-${p?.is_bill ? "bill" : "kot"}`}
                className="text-gray-700"
              >
                {p?.name}
              </label>
            </div>
          ))}
        </div>
        {/* <div className="space-y-4 p-4">
          <div className="flex items-start gap-2">
            <input type="checkbox" id="printKOT" className="mt-1" />
            <label htmlFor="printKOT" className="text-gray-700">
              Print KOT On Print Bill (Only First Time Not In Edit)
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="considerNonPrepared"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="considerNonPrepared" className="text-gray-700">
              Consider Non Prepared KOT In Bill
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="printModifiedOnly" className="mt-1" />
            <label htmlFor="printModifiedOnly" className="text-gray-700">
              Print Only Modified KOT
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="printModifiedItems"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="printModifiedItems" className="text-gray-700">
              Print Only Modified Items In KOT
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="printDeletedItems" className="mt-1" />
            <label htmlFor="printDeletedItems" className="text-gray-700">
              Print Deleted Items In KOT
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="printDeletedSeparate"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="printDeletedSeparate" className="text-gray-700">
              Print Deleted Items In Separate KOT
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="printCancelled" className="mt-1" />
            <label htmlFor="printCancelled" className="text-gray-700">
              Print Cancelled KOT
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="printKotNumber"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="printKotNumber" className="text-gray-700">
              Print Kot No. On Bill As (Token No.)
            </label>
          </div>

          <div className="pl-4 text-xs text-gray-500 italic">
            (Note: If This Option Is Selected Then It Shows KOT No. On These
            Bill (When KOT's Are Available In Desktop Application))
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="printGST" className="mt-1" />
            <label htmlFor="printGST" className="text-gray-700">
              Print GST(Category Wise Taxes) Bifurcation On Bill
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <input
                type="radio"
                id="priceWithoutTax"
                name="priceDisplay"
                className="mt-1"
                defaultChecked
              />
              <label htmlFor="priceWithoutTax" className="text-gray-700">
                Individual Item Price Will Be Shown (Without Backward Tax) On
                Printed Bill
              </label>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="radio"
                id="priceWithTax"
                name="priceDisplay"
                className="mt-1"
              />
              <label htmlFor="priceWithTax" className="text-gray-700">
                Individual Item Price Will Be Shown (Including Backward Tax) On
                Printed Bill
              </label>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="showBackwardTax"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="showBackwardTax" className="text-gray-700">
              Show Backward Tax On Printed Bill
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="showDuplicateBill"
              className="mt-1"
              defaultChecked
            />
            <label htmlFor="showDuplicateBill" className="text-gray-700">
              Show Duplicate On A Bill If Its Printed Multiple Times
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="showDuplicateKOT" className="mt-1" />
            <label htmlFor="showDuplicateKOT" className="text-gray-700">
              Show Duplicate On A KOT If Its Printed Multiple Times
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="showCustomerPaid" className="mt-1" />
            <label htmlFor="showCustomerPaid" className="text-gray-700">
              Show "Customer Paid" And "Return To Customer" On Bill
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="showSpecialNotes1" className="mt-1" />
            <label htmlFor="showSpecialNotes1" className="text-gray-700">
              Show Special Notes/Addons Below Item Row In KOT (Only For General
              Printer)
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="showAddons" className="mt-1" />
            <label htmlFor="showAddons" className="text-gray-700">
              Show Addons In Bill Print.
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <label
              htmlFor="restaurantName"
              className="text-base font-medium w-1/3"
            >
              Everyday Reset KOT no from<span className="text-red-500">*</span>
            </label>
            <input
              id="restaurantName"
              name="restaurantName"
              type="text"
              className={`w-2/3 px-3 py-2 border 
         rounded-md focus:ring-2 focus:ring-orange-500`}
              style={{ width: "660px" }} // Set fixed width
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="assignBillSales" className="mt-1" />
            <label htmlFor="assignBillSales" className="text-gray-700">
              Assign bill sales to KOT punched user
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="printWhileMoving" className="mt-1" />
            <label htmlFor="printWhileMoving" className="text-gray-700">
              Print While Moving One Table To Another Table (Table/KOTs/Items)
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="printFromCaptainApp" className="mt-1" />
            <label htmlFor="printFromCaptainApp" className="text-gray-700">
              Print KOT From Captain App
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" id="displayPrinterErrors" className="mt-1" />
            <label htmlFor="displayPrinterErrors" className="text-gray-700">
              Display Errors While Checking Printer Status
            </label>
          </div>
        </div> */}

        <div className="flex justify-end space-x-4 mt-6 border-t border-gray-300 p-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kotconfiguration;
