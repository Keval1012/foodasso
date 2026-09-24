import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { postPrinter, updatePrinter } from "../../../../Api/Operation/Api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

interface BillPrintSettingsDataProps {
  printerDetailsData: any;
  billPrintSettingsData: any;
  defaultprinter: any;
}

const KotSetting = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { printerDetailsData, billPrintSettingsData, defaultprinter } =
    (location.state as BillPrintSettingsDataProps) || {};
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};

  const [kotPrintSettingFormData, setKotPrintSettingFormData] = useState({
    kot_is_print_token_separately: {
      delivery:
        defaultprinter?.kot_is_print_token_separately?.delivery ?? false,
      pickup: defaultprinter?.kot_is_print_token_separately?.pickup ?? false,
      dine_in: defaultprinter?.kot_is_print_token_separately?.dine_in ?? false,
    },

    kot_outer_top_space: defaultprinter?.kot_outer_top_space ?? 0,
    kot_outer_bottom_space: defaultprinter?.kot_outer_bottom_space ?? 0,
    kot_outer_right_space: defaultprinter?.kot_outer_right_space ?? 0,
    kot_outer_left_space: defaultprinter?.kot_outer_left_space ?? 0,

    kot_print_text_font_size: defaultprinter?.kot_print_text_font_size ?? 0,
    kot_header_text: defaultprinter?.kot_header_text ?? 0,
    kot_footer_text: defaultprinter?.kot_footer_text ?? 0,
    kot_main_width: defaultprinter?.kot_main_width ?? 250,
    kot_column_width: defaultprinter?.kot_column_width ?? 10,
    kot_quantity_width: defaultprinter?.kot_quantity_width ?? 30,
    kot_amount_width: defaultprinter?.kot_amount_width ?? 50,
    kot_decimal_points: defaultprinter?.kot_decimal_points ?? 0,
    kot_line_height: defaultprinter?.kot_line_height ?? 0,
    kot_font_size: defaultprinter?.kot_font_size ?? 13,
    kot_extra_space: defaultprinter?.kot_extra_space ?? 0,

    kot_font_family: defaultprinter?.kot_font_family ?? "Verdana",

    kot_is_show_sr_no_column_in_list:
      defaultprinter?.kot_is_show_sr_no_column_in_list ?? false,
    kot_is_show_customer_info:
      defaultprinter?.kot_is_show_customer_info ?? false,
    kot_is_show_assign_to_label:
      defaultprinter?.kot_is_show_assign_to_label ?? false,
    kot_is_show_biller_captain_name:
      defaultprinter?.kot_is_show_biller_captain_name ?? false,
    kot_is_show_quantity_before_item_name:
      defaultprinter?.kot_is_show_quantity_before_item_name ?? false,
    kot_is_show_item_quantity_total:
      defaultprinter?.kot_is_show_item_quantity_total ?? false,
    kot_is_print_label_sticker_labeled_printer:
      defaultprinter?.kot_is_print_label_sticker_labeled_printer ?? false,
    kot_is_print_label_items_on_general_printer:
      defaultprinter?.kot_is_print_label_items_on_general_printer ?? false,
    kot_is_display_item_description_in_kot:
      defaultprinter?.kot_is_display_item_description_in_kot ?? false,
    kot_is_show_add_on_group_name:
      defaultprinter?.kot_is_show_add_on_group_name ?? false,
    kot_is_show_no_of_person_in_dine_in:
      defaultprinter?.kot_is_show_no_of_person_in_dine_in ?? false,
    kot_is_show_add_on_quantity_with_the_total:
      defaultprinter?.kot_is_show_add_on_quantity_with_the_total ?? false,
    kot_is_show_item_total: defaultprinter?.kot_is_show_item_total ?? false,
    // kot_print_option: "item_name",
    kot_is_print_food_ready_timing:
      defaultprinter?.kot_is_print_food_ready_timing ?? false,
    kot_is_print_optional_addons_in_bold:
      defaultprinter?.kot_is_print_optional_addons_in_bold ?? false,
    kot_is_show_customer_notes:
      defaultprinter?.kot_is_show_customer_notes ?? false,
  });

  const handleReset = () => {
    setKotPrintSettingFormData({
      kot_is_print_token_separately: {
        delivery:
          defaultprinter?.kot_is_print_token_separately?.delivery ?? false,
        pickup: defaultprinter?.kot_is_print_token_separately?.pickup ?? false,
        dine_in:
          defaultprinter?.kot_is_print_token_separately?.dine_in ?? false,
      },

      kot_outer_top_space: defaultprinter?.kot_outer_top_space ?? 0,
      kot_outer_bottom_space: defaultprinter?.kot_outer_bottom_space ?? 0,
      kot_outer_right_space: defaultprinter?.kot_outer_right_space ?? 0,
      kot_outer_left_space: defaultprinter?.kot_outer_left_space ?? 0,

      kot_print_text_font_size: defaultprinter?.kot_print_text_font_size ?? 0,
      kot_header_text: defaultprinter?.kot_header_text ?? 0,
      kot_footer_text: defaultprinter?.kot_footer_text ?? 0,
      kot_main_width: defaultprinter?.kot_main_width ?? 250,
      kot_column_width: defaultprinter?.kot_column_width ?? 10,
      kot_quantity_width: defaultprinter?.kot_quantity_width ?? 30,
      kot_amount_width: defaultprinter?.kot_amount_width ?? 50,
      kot_decimal_points: defaultprinter?.kot_decimal_points ?? 0,
      kot_line_height: defaultprinter?.kot_line_height ?? 0,
      kot_font_size: defaultprinter?.kot_font_size ?? 13,
      kot_extra_space: defaultprinter?.kot_extra_space ?? 0,

      kot_font_family: defaultprinter?.kot_font_family ?? "Verdana",

      kot_is_show_sr_no_column_in_list:
        defaultprinter?.kot_is_show_sr_no_column_in_list ?? false,
      kot_is_show_customer_info:
        defaultprinter?.kot_is_show_customer_info ?? false,
      kot_is_show_assign_to_label:
        defaultprinter?.kot_is_show_assign_to_label ?? false,
      kot_is_show_biller_captain_name:
        defaultprinter?.kot_is_show_biller_captain_name ?? false,
      kot_is_show_quantity_before_item_name:
        defaultprinter?.kot_is_show_quantity_before_item_name ?? false,
      kot_is_show_item_quantity_total:
        defaultprinter?.kot_is_show_item_quantity_total ?? false,
      kot_is_print_label_sticker_labeled_printer:
        defaultprinter?.kot_is_print_label_sticker_labeled_printer ?? false,
      kot_is_print_label_items_on_general_printer:
        defaultprinter?.kot_is_print_label_items_on_general_printer ?? false,
      kot_is_display_item_description_in_kot:
        defaultprinter?.kot_is_display_item_description_in_kot ?? false,
      kot_is_show_add_on_group_name:
        defaultprinter?.kot_is_show_add_on_group_name ?? false,
      kot_is_show_no_of_person_in_dine_in:
        defaultprinter?.kot_is_show_no_of_person_in_dine_in ?? false,
      kot_is_show_add_on_quantity_with_the_total:
        defaultprinter?.kot_is_show_add_on_quantity_with_the_total ?? false,
      kot_is_show_item_total: defaultprinter?.kot_is_show_item_total ?? false,
      // kot_print_option: "item_name",
      kot_is_print_food_ready_timing:
        defaultprinter?.kot_is_print_food_ready_timing ?? false,
      kot_is_print_optional_addons_in_bold:
        defaultprinter?.kot_is_print_optional_addons_in_bold ?? false,
      kot_is_show_customer_notes:
        defaultprinter?.kot_is_show_customer_notes ?? false,
    });
  };

  console.log("kotPrintSettingFormData", kotPrintSettingFormData);
  console.log("defaultprinter", defaultprinter);

  const billingOuterSpaceData = [
    {
      id: 1,
      name: "kot_outer_top_space",
      value: kotPrintSettingFormData?.kot_outer_top_space,
      label: "Top",
    },
    {
      id: 2,
      name: "kot_outer_bottom_space",
      value: kotPrintSettingFormData?.kot_outer_bottom_space,
      label: "Bottom",
    },
    {
      id: 3,
      name: "kot_outer_right_space",
      value: kotPrintSettingFormData?.kot_outer_right_space,
      label: "Right",
    },
    {
      id: 4,
      name: "kot_outer_left_space",
      value: kotPrintSettingFormData?.kot_outer_left_space,
      label: "Left",
    },
  ];

  const fontFamilyData = [
    { id: 1, value: "Arial", label: "Arial" },
    { id: 2, value: "Arial Black", label: "Arial Black" },
    { id: 3, value: "Comic Sans MS", label: "Comic Sans MS" },
    { id: 4, value: "Courier New", label: "Courier New" },
    { id: 5, value: "Tahoma", label: "Tahoma" },
    { id: 6, value: "Times New Roman", label: "Times New Roman" },
    { id: 7, value: "Verdana", label: "Verdana" },
    { id: 8, value: "FreeMono", label: "FreeMono" },
    { id: 9, value: "Nimbus Mono L", label: "Nimbus Mono L" },
    { id: 10, value: "Sawasdee", label: "Sawasdee" },
    { id: 11, value: "TlwgMono", label: "TlwgMono" },
    { id: 12, value: "FreeSerif", label: "FreeSerif" },
    { id: 13, value: "KacstOne", label: "KacstOne" },
    { id: 14, value: "Kinnari", label: "Kinnari" },
    { id: 15, value: "Meera", label: "Meera" },
    { id: 16, value: "Nimbus Roman No9 L", label: "Nimbus Roman No9 L" },
    { id: 17, value: "Dingbats", label: "Dingbats" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //@ts-ignore
    const { name, type, value, checked, dataset } = e.target as HTMLInputElement & {
      dataset: DOMStringMap;
    };
    const key = dataset.key as keyof typeof kotPrintSettingFormData.kot_is_print_token_separately | undefined;

    setKotPrintSettingFormData((prevData) => ({
      ...prevData,

      // [name]: type === "checkbox" ? checked : value,
      ...(key === undefined && { [name]: type === "checkbox" ? checked : value }),

      kot_is_print_token_separately: {
        ...prevData?.kot_is_print_token_separately,
        // [key]: checked,
        ...(key !== undefined && { [key]: checked }),
      },
    }));
  };

  const handleSave = async () => {
    // e.preventDefault();
    // console.log(kotPrintSettingFormData); // Handle form submission (e.g., API call)

    let createData = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
      ...printerDetailsData,
      ...billPrintSettingsData,
      ...kotPrintSettingFormData,
    };

    let editdata = {
      ...printerDetailsData,
      ...billPrintSettingsData,
      ...kotPrintSettingFormData,
    };

    try {
      // debugger
      if (defaultprinter) {
        const res = await updatePrinter(defaultprinter?.id, editdata);
        if (res.status === 200) {
          toast.success(res.data?.message);
          navigate(-3);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        const res = await postPrinter(createData);
        if (res.status === 201) {
          toast.success(res.data?.message);
          navigate(-3);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }    
    } catch (error) {
      toast.error('Please add required fields !!!');
    }
  };

  // console.log("printerDetailsData3", printerDetailsData);
  // console.log("billPrintSettingsData3", billPrintSettingsData);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b">
        <h1 className="text-2xl font-semibold p-4">KOT Setting Printer</h1>
        <div className="flex justify-end items-center gap-4 p-4">
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-6 p-4">KOT Print Setting</h2>

      <div className="space-y-6 p-6">
        {/* Delivery, Pick Up, Dine In */}
        <div className="flex items-center space-x-4">
          <label className="block text-gray-700 w-1/3">
            Print Token Number Slip Separately
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="kot_is_print_token_separately"
                checked={
                  kotPrintSettingFormData?.kot_is_print_token_separately
                    ?.delivery
                }
                onChange={handleChange}
                className="form-checkbox"
                data-key="delivery"
              />
              <span className="ml-2">Delivery</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="kot_is_print_token_separately"
                checked={
                  kotPrintSettingFormData?.kot_is_print_token_separately?.pickup
                }
                onChange={handleChange}
                className="form-checkbox"
                data-key="pickup"
              />
              <span className="ml-2">Pick Up</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="kot_is_print_token_separately"
                checked={
                  kotPrintSettingFormData?.kot_is_print_token_separately
                    ?.dine_in
                }
                onChange={handleChange}
                className="form-checkbox"
                data-key="dine_in"
              />
              <span className="ml-2">Dine In</span>
            </label>
          </div>
        </div>

        {/* Billing Outer Space */}
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm w-1/3">
            Billing Outer Space <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-4">
            {/* {["Top", "Bottom", "Right", "Left"].map((position) => ( */}
            {billingOuterSpaceData?.map((position: any) => (
              <div key={position?.id} className="items-center">
                <label className="block text-sm mb-1 mr-2">
                  {position?.label}
                </label>
                <input
                  type="number"
                  // name={`kot_outer_${position.toLowerCase()}_space`}
                  //@ts-ignore
                  // defaultValue={
                  //   kotPrintSettingFormData[`kot_outer_${position.toLowerCase()}_space`]
                  // }
                  defaultValue={position?.value || 0}
                  id={position?.name}
                  name={position?.name}
                  value={position?.value}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                  style={{ width: "143px" }} // Set fixed width
                />
              </div>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Print Token Text Font Size
          </label>
          <input
            type="number"
            name="kot_print_text_font_size"
            value={kotPrintSettingFormData.kot_print_text_font_size}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Header Text */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Header Text</label>
          <input
            type="text"
            name="kot_header_text"
            value={kotPrintSettingFormData.kot_header_text}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Footer Text */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Footer Text</label>
          <input
            type="text"
            name="kot_footer_text"
            value={kotPrintSettingFormData.kot_footer_text}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Main Width */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Main Width</label>
          <input
            type="number"
            name="kot_main_width"
            value={kotPrintSettingFormData.kot_main_width}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Sr No. Column Width */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Sr No. Column Width
          </label>
          <input
            type="number"
            name="kot_column_width"
            value={kotPrintSettingFormData.kot_column_width}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Quantity Column Width */}
        <div className="gap-4">
          <div className="flex items-center space-x-2">
            <label className="block text-gray-700 w-1/3">
              Quantity Column Width *
            </label>
            <input
              type="number"
              name="kot_quantity_width"
              value={kotPrintSettingFormData.kot_quantity_width}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-[660px]"
            />
          </div>
          <div className="flex items-center space-x-2 mt-5">
            <label className="block text-gray-700 w-1/3">
              Item Total Amount Column Width *
            </label>
            <input
              type="number"
              name="kot_amount_width"
              value={kotPrintSettingFormData.kot_amount_width}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-[660px]"
            />
          </div>
        </div>

        {/* Decimal Points */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">
            Enter Decimal Point Shown In Quantity *
          </label>
          <input
            type="number"
            name="kot_decimal_points"
            value={kotPrintSettingFormData.kot_decimal_points}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Line Height */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Line Height *</label>
          <input
            type="number"
            name="kot_line_height"
            value={kotPrintSettingFormData.kot_line_height}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Font Size */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Font Size *</label>
          <input
            type="number"
            name="kot_font_size"
            value={kotPrintSettingFormData.kot_font_size}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Extra Space */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Extra Space *</label>
          <input
            type="number"
            name="kot_extra_space"
            value={kotPrintSettingFormData.kot_extra_space}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          />
        </div>

        {/* Font Family */}
        <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Font Family</label>
          {/* <input
            type="text"
            name="kot_font_family"
            value={kotPrintSettingFormData.kot_font_family}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          /> */}
          <select
            className="border rounded px-3 py-2"
            style={{ width: "660px" }}
            id="kot_font_family"
            name="kot_font_family"
            value={kotPrintSettingFormData.kot_font_family}
            onChange={handleChange}
          >
            {fontFamilyData?.map((option: any) => (
              <option
                key={option?.value}
                value={option?.value}
                defaultValue="Verdana"
              >
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Show Columns */}
        {[
          {
            id: "kot_is_show_sr_no_column_in_list",
            label: "Show SR No Column in List",
            value: kotPrintSettingFormData?.kot_is_show_sr_no_column_in_list,
          },
          {
            id: "kot_is_show_customer_info",
            label: "Show Customer Info",
            value: kotPrintSettingFormData?.kot_is_show_customer_info,
          },
          {
            id: "kot_is_show_assign_to_label",
            label: "Show Assign to Label",
            value: kotPrintSettingFormData?.kot_is_show_assign_to_label,
          },
          {
            id: "kot_is_show_biller_captain_name",
            label: "Show Biller Captain Name",
            value: kotPrintSettingFormData?.kot_is_show_biller_captain_name,
          },
          {
            id: "kot_is_show_quantity_before_item_name",
            label: "Show Quantity Before Item Name",
            value:
              kotPrintSettingFormData?.kot_is_show_quantity_before_item_name,
          },
          {
            id: "kot_is_show_item_quantity_total",
            label: "Show Item Quantity Total",
            value: kotPrintSettingFormData?.kot_is_show_item_quantity_total,
          },
          {
            id: "kot_is_print_label_sticker_labeled_printer",
            label: "Print Label Sticker Labeled Printer",
            value:
              kotPrintSettingFormData?.kot_is_print_label_sticker_labeled_printer,
          },
          {
            id: "kot_is_print_label_items_on_general_printer",
            label: "Print Label Items on General Printer",
            value:
              kotPrintSettingFormData?.kot_is_print_label_items_on_general_printer,
          },
          {
            id: "kot_is_display_item_description_in_kot",
            label: "Display Item Description in KOT",
            value:
              kotPrintSettingFormData?.kot_is_display_item_description_in_kot,
          },
          {
            id: "kot_is_show_add_on_group_name",
            label: "Show Add On Group Name",
            value: kotPrintSettingFormData?.kot_is_show_add_on_group_name,
          },
          {
            id: "kot_is_show_no_of_person_in_dine_in",
            label: "Show No Of Person In Dine In",
            value: kotPrintSettingFormData?.kot_is_show_no_of_person_in_dine_in,
          },
          {
            id: "kot_is_show_add_on_quantity_with_the_total",
            label: "Show Add On Quantity With The Total",
            value:
              kotPrintSettingFormData?.kot_is_show_add_on_quantity_with_the_total,
          },
          {
            id: "kot_is_show_item_total",
            label: "Show Item Total",
            value: kotPrintSettingFormData?.kot_is_show_item_total,
          },
          {
            id: "kot_is_print_food_ready_timing",
            label: "Print Food Ready Timing",
            value: kotPrintSettingFormData?.kot_is_print_food_ready_timing,
          },
          {
            id: "kot_is_print_optional_addons_in_bold",
            label: "Print Optional Addons in Bold",
            value:
              kotPrintSettingFormData?.kot_is_print_optional_addons_in_bold,
          },
          {
            id: "kot_is_show_customer_notes",
            label: "Show Customer Notes",
            value: kotPrintSettingFormData?.kot_is_show_customer_notes,
          },
        ].map(({ label, id, value }) => (
          <div key={id} className="mb-4 pl-[439px]">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={id}
                //@ts-ignore
                // checked={kotPrintSettingFormData[id]}
                onChange={handleChange}
                className="form-checkbox"
                id={id}
                checked={value}
              />
              <span className="text-sm">{label}</span>
            </label>
          </div>
        ))}

        {/* Print Option */}
        {/* <div className="flex items-center space-x-2">
          <label className="block text-gray-700 w-1/3">Print Option *</label>
          <select
            name="kot_print_option"
            value={kotPrintSettingFormData.kot_print_option}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-[660px]"
          >
            <option value="item_name">Item Name</option>
            <option value="full_item_details">Full Item Details</option>
            <option value="item_summary">Item Summary</option>
          </select>
        </div> */}

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6 border-t border-gray-300 p-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default KotSetting;
