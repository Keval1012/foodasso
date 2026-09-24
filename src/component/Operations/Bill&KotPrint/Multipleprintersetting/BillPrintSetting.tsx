import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface PrinterDetailsDataProps {
  printerDetailsData: any;
  defaultprinter: any;
}

const BillPrintSetting: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { printerDetailsData, defaultprinter } =
    (location.state as PrinterDetailsDataProps) || {};

  const [billPrintSettingsFormData, setBillPrintSettingFormData] = useState({
    restaurant_name: defaultprinter?.restaurant_name ?? "",
    header_text: defaultprinter?.header_text ?? "",
    footer_text: defaultprinter?.footer_text ?? "",
    message_for_new_customer: defaultprinter?.message_for_new_customer ?? "",

    is_show_restaurant_name: defaultprinter?.is_show_restaurant_name ?? false,
    is_retail_invoice: defaultprinter?.is_retail_invoice ?? false,
    is_show_sr_no: defaultprinter?.is_show_restaurant_name ?? false,
    is_show_assign_to_label: defaultprinter?.is_show_assign_to_label ?? false,
    is_show_no_of_persons_in_dine_in_bill_print:
      defaultprinter?.is_show_no_of_persons_in_dine_in_bill_print ?? false,

    date_time_choice: defaultprinter?.date_time_choice ?? "show_date_time",
    order_date_choice:
      defaultprinter?.order_date_choice ?? "use_order_creation_date",

    is_show_header_bold_in_bill:
      defaultprinter?.is_show_header_bold_in_bill ?? false,
    is_show_footer_bold_in_bill:
      defaultprinter?.is_show_footer_bold_in_bill ?? false,
    is_show_restaurant_name_bold:
      defaultprinter?.is_show_restaurant_name_bold ?? false,
    is_show_customer_notes_on_bill:
      defaultprinter?.is_show_customer_notes_on_bill ?? false,
    is_show_amount_in_taxes: defaultprinter?.is_show_amount_in_taxes ?? false,
    is_show_discount_reason: defaultprinter?.is_show_discount_reason ?? false,
    is_show_addons_price_in_bill_print:
      defaultprinter?.is_show_addons_price_in_bill_print ?? false,
    is_show_addons_as_a_separate_row_in_bill_print:
      defaultprinter?.is_show_addons_as_a_separate_row_in_bill_print ?? false,
    is_show_add_on_group_name:
      defaultprinter?.is_show_add_on_group_name ?? false,
    is_show_special_note_in_bill_print:
      defaultprinter?.is_show_special_note_in_bill_print ?? false,
    is_print_restaurant_logo_in_bill:
      defaultprinter?.is_print_restaurant_logo_in_bill ?? false,
    is_show_zero_taxes: defaultprinter?.is_show_zero_taxes ?? false,
    is_show_addon_quantity_in_total:
      defaultprinter?.is_show_addon_quantity_in_total ?? false,

    show_sub_total: defaultprinter?.show_sub_total ?? "without_backwards_tax",

    display_delivery_charge_in_bill: {
      delivery: defaultprinter?.display_delivery_charge_in_bill?.delivery ?? false,
      pickup: defaultprinter?.display_delivery_charge_in_bill?.pickup ?? false,
      dine_in: defaultprinter?.display_delivery_charge_in_bill?.dine_in ?? false,
    },
    display_container_charge_in_bill: {
      delivery: defaultprinter?.display_container_charge_in_bill?.delivery ?? false,
      pickup: defaultprinter?.display_container_charge_in_bill?.pickup ?? false,
      dine_in: defaultprinter?.display_container_charge_in_bill?.dine_in ?? false,
    },
    // display_service_charge_in_bill: {
    //   delivery: defaultprinter?.display_service_charge_in_bill?.delivery ?? false,
    //   pickup: defaultprinter?.display_service_charge_in_bill?.pickup ?? false,
    //   dine_in: defaultprinter?.display_service_charge_in_bill?.dine_in ?? false,
    // },

    is_print_item_wise_discount_total: defaultprinter?.is_print_item_wise_discount_total ?? false,
    is_print_invoice_barcode: defaultprinter?.is_print_invoice_barcode ?? false,
    is_show_split_bill_count: defaultprinter?.is_show_split_bill_count ?? false,

    billing_outer_top_space: defaultprinter?.billing_outer_top_space ?? 0,
    billing_outer_bottom_space: defaultprinter?.billing_outer_bottom_space ?? 0,
    billing_outer_right_space: defaultprinter?.billing_outer_right_space ?? 0,
    billing_outer_left_space: defaultprinter?.billing_outer_left_space ?? 0,

    billing_item_box_height: defaultprinter?.billing_item_box_height ?? 0,
    restaurant_name_font_size: defaultprinter?.restaurant_name_font_size ?? 0,
    header_footer_font_size: defaultprinter?.header_footer_font_size ?? 0,
    bill_no_font_size: defaultprinter?.bill_no_font_size ?? 0,
    item_listing_font_size: defaultprinter?.item_listing_font_size ?? 0,
    grand_total_font_size: defaultprinter?.grand_total_font_size ?? 0,

    billing_font_family: defaultprinter?.billing_font_family ?? "Verdana",
    paper_size: defaultprinter?.paper_size ?? "",

    sr_no_column_width: defaultprinter?.sr_no_column_width ?? "",
    quantity_column_width: defaultprinter?.quantity_column_width ?? "",
    item_price_column_width: defaultprinter?.item_price_column_width ?? "",
    item_total_amount_column_width:
      defaultprinter?.item_total_amount_column_width ?? "",
    item_listing_line_height: defaultprinter?.item_listing_line_height ?? "",
    extra_gap_between_separation:
      defaultprinter?.extra_gap_between_separation ?? "",
    items_per_page_in_bill: defaultprinter?.items_per_page_in_bill ?? "",
    decimal_point_quantity: defaultprinter?.decimal_point_quantity ?? "",

    decimal_points_for_bill:
      defaultprinter?.decimal_points_for_bill ?? "Master Decimal",

    complimentary_bill_label: defaultprinter?.complimentary_bill_label ?? "",
    sales_return_bill_label: defaultprinter?.sales_return_bill_label ?? "",
    main_sub_total_label: defaultprinter?.main_sub_total_label ?? "",

    show_fssai: defaultprinter?.show_fssai ?? null,

    is_print_tip_amount: defaultprinter?.is_print_tip_amount ?? false,
    is_print_hsn_code: defaultprinter?.is_print_hsn_code ?? false,
    is_hide_zero_price_items: defaultprinter?.is_hide_zero_price_items ?? false,
    is_show_tax_info_after_item:
      defaultprinter?.is_show_tax_info_after_item ?? false,
  });

  const handleReset = () => {
    setBillPrintSettingFormData({
      restaurant_name: defaultprinter?.restaurant_name ?? "",
      header_text: defaultprinter?.header_text ?? "",
      footer_text: defaultprinter?.footer_text ?? "",
      message_for_new_customer: defaultprinter?.message_for_new_customer ?? "",

      is_show_restaurant_name: defaultprinter?.is_show_restaurant_name ?? false,
      is_retail_invoice: defaultprinter?.is_retail_invoice ?? false,
      is_show_sr_no: defaultprinter?.is_show_restaurant_name ?? false,
      is_show_assign_to_label: defaultprinter?.is_show_assign_to_label ?? false,
      is_show_no_of_persons_in_dine_in_bill_print:
        defaultprinter?.is_show_no_of_persons_in_dine_in_bill_print ?? false,

      date_time_choice: defaultprinter?.date_time_choice ?? "show_date_time",
      order_date_choice:
        defaultprinter?.order_date_choice ?? "use_order_creation_date",

      is_show_header_bold_in_bill:
        defaultprinter?.is_show_header_bold_in_bill ?? false,
      is_show_footer_bold_in_bill:
        defaultprinter?.is_show_footer_bold_in_bill ?? false,
      is_show_restaurant_name_bold:
        defaultprinter?.is_show_restaurant_name_bold ?? false,
      is_show_customer_notes_on_bill:
        defaultprinter?.is_show_customer_notes_on_bill ?? false,
      is_show_amount_in_taxes: defaultprinter?.is_show_amount_in_taxes ?? false,
      is_show_discount_reason: defaultprinter?.is_show_discount_reason ?? false,
      is_show_addons_price_in_bill_print:
        defaultprinter?.is_show_addons_price_in_bill_print ?? false,
      is_show_addons_as_a_separate_row_in_bill_print:
        defaultprinter?.is_show_addons_as_a_separate_row_in_bill_print ?? false,
      is_show_add_on_group_name:
        defaultprinter?.is_show_add_on_group_name ?? false,
      is_show_special_note_in_bill_print:
        defaultprinter?.is_show_special_note_in_bill_print ?? false,
      is_print_restaurant_logo_in_bill:
        defaultprinter?.is_print_restaurant_logo_in_bill ?? false,
      is_show_zero_taxes: defaultprinter?.is_show_zero_taxes ?? false,
      is_show_addon_quantity_in_total:
        defaultprinter?.is_show_addon_quantity_in_total ?? false,

      show_sub_total: defaultprinter?.show_sub_total ?? "without_backwards_tax",

      display_delivery_charge_in_bill: {
        delivery:
          defaultprinter?.display_delivery_charge_in_bill?.delivery ?? false,
        pickup:
          defaultprinter?.display_delivery_charge_in_bill?.pickup ?? false,
        dine_in:
          defaultprinter?.display_delivery_charge_in_bill?.dine_in ?? false,
      },
      display_container_charge_in_bill: {
        delivery:
          defaultprinter?.display_container_charge_in_bill?.delivery ?? false,
        pickup:
          defaultprinter?.display_container_charge_in_bill?.pickup ?? false,
        dine_in:
          defaultprinter?.display_container_charge_in_bill?.dine_in ?? false,
      },

      is_print_item_wise_discount_total:
        defaultprinter?.is_print_item_wise_discount_total ?? false,
      is_print_invoice_barcode:
        defaultprinter?.is_print_invoice_barcode ?? false,
      is_show_split_bill_count:
        defaultprinter?.is_show_split_bill_count ?? false,

      billing_outer_top_space: defaultprinter?.billing_outer_top_space ?? 0,
      billing_outer_bottom_space:
        defaultprinter?.billing_outer_bottom_space ?? 0,
      billing_outer_right_space: defaultprinter?.billing_outer_right_space ?? 0,
      billing_outer_left_space: defaultprinter?.billing_outer_left_space ?? 0,

      billing_item_box_height: defaultprinter?.billing_item_box_height ?? 0,
      restaurant_name_font_size: defaultprinter?.restaurant_name_font_size ?? 0,
      header_footer_font_size: defaultprinter?.header_footer_font_size ?? 0,
      bill_no_font_size: defaultprinter?.bill_no_font_size ?? 0,
      item_listing_font_size: defaultprinter?.item_listing_font_size ?? 0,
      grand_total_font_size: defaultprinter?.grand_total_font_size ?? 0,

      billing_font_family: defaultprinter?.billing_font_family ?? "Verdana",
      paper_size: defaultprinter?.paper_size ?? "",

      sr_no_column_width: defaultprinter?.sr_no_column_width ?? "",
      quantity_column_width: defaultprinter?.quantity_column_width ?? "",
      item_price_column_width: defaultprinter?.item_price_column_width ?? "",
      item_total_amount_column_width:
        defaultprinter?.item_total_amount_column_width ?? "",
      item_listing_line_height: defaultprinter?.item_listing_line_height ?? "",
      extra_gap_between_separation:
        defaultprinter?.extra_gap_between_separation ?? "",
      items_per_page_in_bill: defaultprinter?.items_per_page_in_bill ?? "",
      decimal_point_quantity: defaultprinter?.decimal_point_quantity ?? "",

      decimal_points_for_bill:
        defaultprinter?.decimal_points_for_bill ?? "Master Decimal",

      complimentary_bill_label: defaultprinter?.complimentary_bill_label ?? "",
      sales_return_bill_label: defaultprinter?.sales_return_bill_label ?? "",
      main_sub_total_label: defaultprinter?.main_sub_total_label ?? "",

      show_fssai: defaultprinter?.show_fssai ?? null,

      is_print_tip_amount: defaultprinter?.is_print_tip_amount ?? false,
      is_print_hsn_code: defaultprinter?.is_print_hsn_code ?? false,
      is_hide_zero_price_items:
        defaultprinter?.is_hide_zero_price_items ?? false,
      is_show_tax_info_after_item:
        defaultprinter?.is_show_tax_info_after_item ?? false,
    });
  };

  const billingOuterSpaceData = [
    {
      id: 1,
      name: "billing_outer_top_space",
      value: billPrintSettingsFormData?.billing_outer_top_space,
      label: "Top",
    },
    {
      id: 2,
      name: "billing_outer_bottom_space",
      value: billPrintSettingsFormData?.billing_outer_bottom_space,
      label: "Bottom",
    },
    {
      id: 3,
      name: "billing_outer_right_space",
      value: billPrintSettingsFormData?.billing_outer_right_space,
      label: "Right",
    },
    {
      id: 4,
      name: "billing_outer_left_space",
      value: billPrintSettingsFormData?.billing_outer_left_space,
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

  const paperSizeData = [
    { id: 1, value: "A4 - 595 x 842", label: "A4 - 595 x 842" },
    { id: 2, value: "A5 - 420 x 595", label: "A5 - 420 x 595" },
    { id: 3, value: "A6 - 297 x 420", label: "A6 - 297 x 420" },
    {
      id: 4,
      value: "CHOUKEI3GOU - 340 x 666",
      label: "CHOUKEI3GOU - 340 x 666",
    },
    {
      id: 5,
      value: "CHOUKEI4GOU - 298 x 666",
      label: "CHOUKEI4GOU - 298 x 666",
    },
    { id: 6, value: "ENV_10 - 297 x 684", label: "ENV_10 - 297 x 684" },
    { id: 7, value: "ENV_B5 - 499 x 709", label: "ENV_B5 - 499 x 709" },
    { id: 8, value: "ENV_C5 - 459 x 649", label: "ENV_C5 - 459 x 649" },
    { id: 9, value: "ENV_DL - 312 x 624", label: "ENV_DL - 312 x 624" },
    {
      id: 10,
      value: "ENV_MONARCH - 279 x 540",
      label: "ENV_MONARCH - 279 x 540",
    },
    {
      id: 11,
      value: "ENV_PERSONAL - 261 x 468",
      label: "ENV_PERSONAL - 261 x 468",
    },
    { id: 12, value: "EXECUTIVE - 522 x 756", label: "EXECUTIVE - 522 x 756" },
    { id: 13, value: "FOLIO - 612 x 936", label: "FOLIO - 612 x 936" },
    { id: 14, value: "JIS_B5 - 516 x 729", label: "JIS_B5 - 516 x 729" },
    { id: 15, value: "LEGAL - 612 x 1008", label: "LEGAL - 612 x 1008" },
    { id: 16, value: "LETTER - 612 x 792", label: "LETTER - 612 x 792" },
    { id: 17, value: "STATEMENT - 396 x 612", label: "STATEMENT - 396 x 612" },
  ];

  const decimalPointsData = [
    // { id: 1, value: "Master Decimal", label: "Master Decimal" },
    { id: 1, value: "1", label: "1" },
    { id: 2, value: "2", label: "2" },
    { id: 3, value: "3", label: "3" },
  ];

  const [errors, setErrors] = useState({
    restaurant_name: "",
    header_text: "",
    footer_text: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //@ts-ignore
    const { name, value, type, checked, dataset } = e.target as HTMLInputElement & {
      dataset: DOMStringMap;
    };

    const key = dataset.key;

    // setBillPrintSettingFormData({
    //   ...billPrintSettingsFormData,
    //   [name]: type === "checkbox" ? checked : value,
    // });

    // setBillPrintSettingFormData((prev) => ({
    //   ...prev,
    //   [name]: type === "checkbox" ? checked : value,
    // }));

    setBillPrintSettingFormData((prev) => {

      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "display_delivery_charge_in_bill" && key) {
        updatedData.display_delivery_charge_in_bill = {
          ...prev.display_delivery_charge_in_bill,
          [key]: checked,
        };
      }

      if (name === "display_container_charge_in_bill" && key) {
        updatedData.display_container_charge_in_bill = {
          ...prev.display_container_charge_in_bill,
          [key]: checked,
        };
      }

      return updatedData;
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  console.log("billPrintSettingsFormData2", billPrintSettingsFormData);

  const validate = () => {
    let newErrors = {
      restaurant_name: "",
      header_text: "",
      footer_text: "",
    };

    if (!billPrintSettingsFormData.restaurant_name) {
      newErrors.restaurant_name = "Restaurant Name is required";
    }
    if (!billPrintSettingsFormData.header_text) {
      newErrors.header_text = "Header Text is required";
    }
    if (!billPrintSettingsFormData.footer_text) {
      newErrors.footer_text = "Footer Text is required";
    }

    setErrors(newErrors);

    return (
      !newErrors.restaurant_name &&
      !newErrors.header_text &&
      !newErrors.footer_text
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", billPrintSettingsFormData);
    } else {
      console.log("Form contains errors.");
    }
  };

  const handleNext = () => {
    if (defaultprinter) {
      navigate("/operations/bill_print/add/KotSetting", {
        state: {
          defaultprinter: defaultprinter,
        },
      });
    } else {
      navigate("/operations/bill_print/add/KotSetting", {
        state: {
          printerDetailsData: printerDetailsData,
          billPrintSettingsData: billPrintSettingsFormData,
        },
      });
    }
  };

  // console.log("printerDetailsData2", printerDetailsData);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6  border-b ">
        <h1 className="text-2xl font-semibold p-4">Bill Setting Printer</h1>
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
      <h2 className="text-xl font-bold mb-6 p-4">Bill Print Setting</h2>

      {/* Form Fields */}
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="restaurant_name"
              className="text-base font-medium w-1/3"
            >
              Restaurant Name <span className="text-red-500">*</span>
            </label>
            <input
              id="restaurant_name"
              name="restaurant_name"
              type="text"
              className={`w-2/3 px-3 py-2 border ${
                errors.restaurant_name ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter Name"
              style={{ width: "660px" }} // Set fixed width
              value={billPrintSettingsFormData?.restaurant_name}
              onChange={handleChange}
            />
          </div>
          {errors.restaurant_name && (
            <p className="text-red-500 text-sm">{errors.restaurant_name}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="header_text"
              className="text-base font-medium w-1/3"
            >
              Header Text <span className="text-red-500">*</span>
            </label>
            <input
              id="header_text"
              name="header_text"
              type="text"
              className={`w-2/3 px-3 py-2 border ${
                errors.header_text ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter Restaurant Name, Address, etc."
              style={{ width: "660px" }} // Set fixed width
              value={billPrintSettingsFormData?.header_text}
              onChange={handleChange}
            />
          </div>
          {errors.header_text && (
            <p className="text-red-500 text-sm">{errors.header_text}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="footer_text"
              className="text-base font-medium w-1/3"
            >
              Footer Text <span className="text-red-500">*</span>
            </label>
            <input
              id="footer_text"
              name="footer_text"
              type="text"
              className={`w-2/3 px-3 py-2 border ${
                errors.footer_text ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-2 focus:ring-orange-500`}
              placeholder="Enter Restaurant Address, Phone Number, etc."
              style={{ width: "660px" }} // Set fixed width
              value={billPrintSettingsFormData?.footer_text}
              onChange={handleChange}
            />
          </div>
          {errors.footer_text && (
            <p className="text-red-500 text-sm">{errors.footer_text}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="message_for_new_customer"
              className="text-base font-medium w-1/3"
            >
              Message For New Customer
            </label>
            <input
              id="message_for_new_customer"
              name="message_for_new_customer"
              type="text"
              className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter Message"
              style={{ width: "660px" }} // Set fixed width
              value={billPrintSettingsFormData?.message_for_new_customer}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Checkbox Section */}
        <div className="mb-4 pl-[439px] py-3">
          {/* <h2 className="font-semibold text-lg mb-2">Bill Settings</h2> */}
          <div>
            {[
              {
                id: "is_show_restaurant_name",
                label: "Show Restaurant Name",
                value: billPrintSettingsFormData?.is_show_restaurant_name,
              },
              {
                id: "is_retail_invoice",
                label: "Show “Retail Invoice” On Top",
                value: billPrintSettingsFormData?.is_retail_invoice,
              },
              {
                id: "is_show_sr_no",
                label: "Show Sr No. Column in Item Listing",
                value: billPrintSettingsFormData?.is_show_sr_no,
              },
              {
                id: "is_show_assign_to_label",
                label: "Show Assign to Label",
                value: billPrintSettingsFormData?.is_show_assign_to_label,
              },
              {
                id: "is_show_no_of_persons_in_dine_in_bill_print",
                label: "Show No of persons in Dine in",
                value:
                  billPrintSettingsFormData?.is_show_no_of_persons_in_dine_in_bill_print,
              },
            ].map(({ id, label, value }) => (
              <div className=" items-center mb-2" key={id}>
                <input
                  type="checkbox"
                  name={id}
                  id={id}
                  className="mr-2"
                  checked={value}
                  onChange={handleChange}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
            {/* Radio buttons for date format */}
            <div className="flex gap-3">
              {[
                {
                  id: "date_time_choice",
                  label: "Show Date",
                  value: "show_date",
                },
                {
                  id: "date_time_choice",
                  label: "Show Date & Time",
                  value: "show_date_time",
                },
              ].map(({ id, label, value }) => (
                <div className="flex items-center mb-2" key={id}>
                  <input
                    type="radio"
                    name="date_time_choice"
                    id={id}
                    className="mr-2"
                    onChange={handleChange}
                    value={value}
                    defaultChecked={value === "show_date_time"}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {[
                {
                  id: "order_date_choice",
                  label: "Order Created Date",
                  value: "use_order_creation_date",
                },
                {
                  id: "order_date_choice",
                  label: "Initial Bill Date",
                  value: "first_time_bill_print_date",
                },
              ].map(({ id, label, value }) => (
                <div className="flex items-center mb-2" key={id}>
                  <input
                    type="radio"
                    name="order_date_choice"
                    id={id}
                    className="mr-2"
                    onChange={handleChange}
                    value={value}
                    defaultChecked={value === "use_order_creation_date"}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            {/* Additional Checkboxes */}
            {[
              {
                id: "is_show_header_bold_in_bill",
                label: "Show header bold in bill",
                value: billPrintSettingsFormData?.is_show_header_bold_in_bill,
              },
              {
                id: "is_show_footer_bold_in_bill",
                label: "Show Footer Bold In Bill",
                value: billPrintSettingsFormData?.is_show_footer_bold_in_bill,
              },
              {
                id: "is_show_restaurant_name_bold",
                label: "Show Restaurant Name Bold",
                value: billPrintSettingsFormData?.is_show_restaurant_name_bold,
              },
              {
                id: "is_show_customer_notes_on_bill",
                label: "Show Customer Notes On Bill",
                value:
                  billPrintSettingsFormData?.is_show_customer_notes_on_bill,
              },
              {
                id: "is_show_amount_in_taxes",
                label: "Show Amount (xxx@) in Taxes",
                value: billPrintSettingsFormData?.is_show_amount_in_taxes,
              },
              {
                id: "is_show_discount_reason",
                label: "Show Discount Reason",
                value: billPrintSettingsFormData?.is_show_discount_reason,
              },
              {
                id: "is_show_addons_price_in_bill_print",
                label: "Show Addons price in bill print",
                value:
                  billPrintSettingsFormData?.is_show_addons_price_in_bill_print,
              },
              {
                id: "is_show_addons_as_a_separate_row_in_bill_print",
                label: "Show Addons as a separate row in bill print",
                value:
                  billPrintSettingsFormData?.is_show_addons_as_a_separate_row_in_bill_print,
              },
              {
                id: "is_show_add_on_group_name",
                label: "Show Addon Group Name",
                value: billPrintSettingsFormData?.is_show_add_on_group_name,
              },
              {
                id: "is_show_special_note_in_bill_print",
                label: "Show Special Notes in bill print",
                value:
                  billPrintSettingsFormData?.is_show_special_note_in_bill_print,
              },
              {
                id: "is_print_restaurant_logo_in_bill",
                label: "Print restaurant logo in bill",
                value:
                  billPrintSettingsFormData?.is_print_restaurant_logo_in_bill,
              },
              {
                id: "is_show_zero_taxes",
                label: "Show Zero Taxes",
                value: billPrintSettingsFormData?.is_show_zero_taxes,
              },
              {
                id: "is_show_addon_quantity_in_total",
                label:
                  "Show Addon Quantity with the total item quantity (multiplication) to prepare in Bill",
                value:
                  billPrintSettingsFormData?.is_show_addon_quantity_in_total,
              },
            ].map(({ id, label, value }) => (
              <div className=" items-center mb-2" key={id}>
                <input
                  type="checkbox"
                  id={id}
                  className="mr-2"
                  name={id}
                  checked={value}
                  onChange={handleChange}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 gap-3">
            <label className="text-base font-medium w-1/3">
              Show Sub Total
              <span className="text-red-500">*</span>
            </label>
            {/* <div className="flex items-center mb-2">
              <input
                type="radio"
                className="mr-2"
              />
              <label>without Backwards tax</label>
              <input
                type="radio"
                className="mr-2 ml-2"
              />
              <label>with Backwards tax </label>
            </div> */}
            <div className="flex gap-3">
              {[
                {
                  id: "show_sub_total",
                  label: "Without backward tax",
                  value: "without_backwards_tax",
                },
                {
                  id: "show_sub_total",
                  label: "With backward tax",
                  value: "with_backwards_tax",
                },
              ].map(({ id, label, value }) => (
                <div className="flex items-center mb-2" key={id}>
                  <input
                    type="radio"
                    name="show_sub_total"
                    id={id}
                    className="mr-2"
                    onChange={handleChange}
                    value={value}
                    defaultChecked={value === "without_backwards_tax"}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 gap-3">
            <label className="text-base font-medium w-1/3">
              Display Delivery Charge in Bill
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="display_delivery_charge_in_bill"
                  checked={
                    billPrintSettingsFormData?.display_delivery_charge_in_bill
                      ?.delivery
                  }
                  onChange={handleChange}
                  className="form-checkbox mr-2"
                  data-key="delivery"
                />
                <span>Delivery</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="display_delivery_charge_in_bill"
                  checked={
                    billPrintSettingsFormData?.display_delivery_charge_in_bill
                      ?.pickup
                  }
                  onChange={handleChange}
                  className="form-checkbox mr-2 ml-2"
                  data-key="pickup"
                />
                <span>Pick Up</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="display_delivery_charge_in_bill"
                  checked={
                    billPrintSettingsFormData?.display_delivery_charge_in_bill
                      ?.dine_in
                  }
                  onChange={handleChange}
                  className="form-checkbox mr-2 ml-2"
                  data-key="dine_in"
                />
                <span>Dine In</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 gap-3">
            <label className="text-base font-medium w-1/3">
              Display Container Charge in Bill
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="display_container_charge_in_bill"
                  checked={
                    billPrintSettingsFormData?.display_container_charge_in_bill
                      ?.delivery
                  }
                  onChange={handleChange}
                  className="form-checkbox mr-2"
                  data-key="delivery"
                />
                <span>Delivery</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="display_container_charge_in_bill"
                  checked={
                    billPrintSettingsFormData?.display_container_charge_in_bill
                      ?.pickup
                  }
                  onChange={handleChange}
                  className="form-checkbox mr-2 ml-2"
                  data-key="pickup"
                />
                <span>Pick Up</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="display_container_charge_in_bill"
                  checked={
                    billPrintSettingsFormData?.display_container_charge_in_bill
                      ?.dine_in
                  }
                  onChange={handleChange}
                  className="form-checkbox mr-2 ml-2"
                  data-key="dine_in"
                />
                <span>Dine In</span>
              </label>
            </div>
          </div>
        </div>

        {/* <div className="mb-4">
          <div className="flex items-center space-x-2 gap-3">
            <label className="text-base font-medium w-1/3">
              Display Service Charge in Bill
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                // name="order_date_choice"
              />
              <label>Delivery</label>
              <input
                type="checkbox"
                className="mr-2 ml-2"
                // name="order_date_choice"
              />
              <label>Pick Up</label>
              <input
                type="checkbox"
                className="mr-2 ml-2"
                // name="order_date_choice"
              />
              <label>Dine in</label>
            </div>
          </div>
        </div> */}

        {/* <div className="mb-4">
          <div className="flex items-center space-x-2 gap-3">
            <label className="text-base font-medium w-1/3">
              Order Type Options
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                className="mr-2"
                // name="order_date_choice"
              />
              <label>Order Type</label>
              <input
                type="radio"
                className="mr-2 ml-2"
                // name="order_date_choice"
              />
              <label>Sub order type</label>
              <input
                type="radio"
                className="mr-2 ml-2"
                // name="order_date_choice"
              />
              <label>Both </label>
            </div>
          </div>
        </div> */}

        <div className="mb-4 pl-[439px]">
          <label className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              name="is_print_item_wise_discount_total"
              checked={
                billPrintSettingsFormData.is_print_item_wise_discount_total
              }
              onChange={handleChange}
            />
            <span className="text-sm">
              Print total of item wise discount on bill
            </span>
          </label>
          <label className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              name="is_print_invoice_barcode"
              checked={billPrintSettingsFormData.is_print_invoice_barcode}
              onChange={handleChange}
            />
            <span className="text-sm">Print invoice barcode on bill.</span>
            {/* <p>note : scanning this barcode opens the bill  in edit mode.</p> */}
          </label>
          <label className="mb-4  flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              name="is_show_split_bill_count"
              checked={billPrintSettingsFormData.is_show_split_bill_count}
              onChange={handleChange}
            />
            <span className="text-sm">
              Show split bill count and tatal on bills.
            </span>
          </label>
        </div>

        {/* <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Billing Outer Space
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="0"
              className="border rounded px-3 py-2"
              style={{ width: "660px" }} // Set fixed width
              onChange={handleChange}
            />
          </div>
        </div> */}

        {/* Billing Outer Space */}
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm w-1/3">
            Billing Outer Space <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-4 gap-4">
            {/* {["Top", "Bottom", "Right", "Left"].map((position) => ( */}
            {billingOuterSpaceData?.map((position: any) => (
              <div key={position?.id} className=" items-center">
                {" "}
                {/* Use flex for alignment */}
                <label className="block text-sm mb-1 mr-2">
                  {" "}
                  {position?.label}
                </label>
                <input
                  type="text"
                  defaultValue={position?.value || 0}
                  className="border rounded px-3 py-2"
                  style={{ width: "143px" }} // Set fixed width
                  id={position?.name}
                  name={position?.name}
                  value={position?.value}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Billing Item Box Height */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Billing Item Box Height <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="0"
              className="border rounded px-3 py-2"
              style={{ width: "660px" }} // Set fixed width
              name="billing_item_box_height"
              value={billPrintSettingsFormData?.billing_item_box_height || 0}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Font Sizes */}
        {[
          // { label: "Restaurant Name Font Size", defaultValue: "14" },
          // { label: "Header Footer Font Size For Bill", defaultValue: "13" },
          // { label: "Dato Bill-No. Box Font Size", defaultValue: "13" },
          // { label: "Item Listing Box Font Size For Bill", defaultValue: "13" },
          // { label: "Grand Total Text Font Size", defaultValue: "14" },
          // { label: "Billing Font Family", options: ["Verdana"] },
          {
            label: "Restaurant Name Font Size",
            name: "restaurant_name_font_size",
            value: billPrintSettingsFormData?.restaurant_name_font_size || 0,
          },
          {
            label: "Header Footer Font Size For Bill",
            name: "header_footer_font_size",
            value: billPrintSettingsFormData?.header_footer_font_size || 0,
          },
          {
            label: "Dato Bill-No. Box Font Size",
            name: "bill_no_font_size",
            value: billPrintSettingsFormData?.bill_no_font_size || 0,
          },
          {
            label: "Item Listing Box Font Size For Bill",
            name: "item_listing_font_size",
            value: billPrintSettingsFormData?.item_listing_font_size || 0,
          },
          {
            label: "Grand Total Text Font Size",
            name: "grand_total_font_size",
            value: billPrintSettingsFormData?.grand_total_font_size || 0,
          },
          // { label: "Billing Font Family", options: ["Verdana"] },
          { label: "Billing Font Family", options: fontFamilyData },
        ].map(({ label, options, name, value }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">
                {label} <span className="text-red-500">*</span>
              </label>
              {options ? (
                <select
                  className="border rounded px-3 py-2"
                  style={{ width: "660px" }}
                  id="billing_font_family"
                  name="billing_font_family"
                  value={billPrintSettingsFormData?.billing_font_family}
                  onChange={handleChange}
                >
                  {options?.map((option: any) => (
                    <option
                      key={option?.value}
                      value={option?.value}
                      defaultValue="Verdana"
                    >
                      {option?.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  // defaultValue={defaultValue}
                  className="border rounded px-3 py-2"
                  style={{ width: "660px" }} // Set fixed width
                  name={name}
                  value={value}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
        ))}

        {/* Paper Size */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">Paper Size</label>
            <select
              className="border rounded px-3 py-2"
              style={{ width: "660px" }}
              id="paper_size"
              name="paper_size"
              value={billPrintSettingsFormData?.paper_size}
              onChange={handleChange}
            >
              <option value="">Select Paper Size</option>
              {paperSizeData?.map((size: any) => (
                <option key={size?.value} value={size?.value}>
                  {size?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Column Widths */}
        {[
          // { label: "Sr.No. Column Width", defaultValue: "10" },
          // { label: "Quantity Column Width", defaultValue: "20" },
          // { label: "Item Price Column Width", defaultValue: "40" },
          // { label: "Item Total Amount Column Width", defaultValue: "55" },
          {
            label: "Sr.No. Column Width",
            name: "sr_no_column_width",
            value: billPrintSettingsFormData?.sr_no_column_width || 0,
          },
          {
            label: "Quantity Column Width",
            name: "quantity_column_width",
            value: billPrintSettingsFormData?.quantity_column_width || 0,
          },
          {
            label: "Item Price Column Width",
            name: "item_price_column_width",
            value: billPrintSettingsFormData?.item_price_column_width || 0,
          },
          {
            label: "Item Total Amount Column Width",
            name: "item_total_amount_column_width",
            value:
              billPrintSettingsFormData?.item_total_amount_column_width || 0,
          },
        ].map(({ label, name, value }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                // defaultValue={defaultValue}
                className="border rounded px-3 py-2"
                style={{ width: "660px" }} // Set fixed width
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}

        {/* Item Listing Spacing */}
        {[
          // {
          //   label: "Item Listing Line Height Between Two Rows",
          //   defaultValue: "5",
          // },
          // { label: "Extra Gap Between Separation", defaultValue: "5" },
          // { label: "Items Per Page In Bill", defaultValue: "0" },
          // { label: "Enter Decimal Point Shown In Quantity", defaultValue: "0" },
          {
            label: "Item Listing Line Height Between Two Rows",
            name: "item_listing_line_height",
            value: billPrintSettingsFormData?.item_listing_line_height || 0,
          },
          {
            label: "Extra Gap Between Separation",
            name: "extra_gap_between_separation",
            value: billPrintSettingsFormData?.extra_gap_between_separation || 0,
          },
          {
            label: "Items Per Page In Bill",
            name: "items_per_page_in_bill",
            value: billPrintSettingsFormData?.items_per_page_in_bill || 0,
          },
          {
            label: "Enter Decimal Point Shown In Quantity",
            name: "decimal_point_quantity",
            value: billPrintSettingsFormData?.decimal_point_quantity || 0,
          },
        ].map(({ label, name, value }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                // defaultValue={defaultValue}
                className="border rounded px-3 py-2"
                style={{ width: "660px" }} // Set fixed width
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}

        {/* Select Decimal Points */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Select Decimal Points For Bill Print Calculation
            </label>
            <select
              className="border rounded px-3 py-2"
              style={{ width: "660px" }}
              id="decimal_points_for_bill"
              name="decimal_points_for_bill"
              value={billPrintSettingsFormData?.decimal_points_for_bill}
              onChange={handleChange}
            >
              <option value="Master Decimal">Master Decimal</option>
              {decimalPointsData?.map((decimal: any) => (
                <option key={decimal?.value} value={decimal?.value}>
                  {decimal?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Show Add-On Quantity Checkbox */}
        {/* <div className="mb-4 pl-[439px]">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm">
              Show Add-On/Quantity With The Total Item Quantity (Multiplication)
              To Prepare In Bill
            </span>
          </label>
        </div> */}

        {/* Complimentary and Sales Return Labels */}
        {[
          // {
          //   label: "Complimentary Bill Label",
          //   defaultValue: "Complimentary Bill",
          // },
          // {
          //   label: "Sales Return Bill Label",
          //   defaultValue: "Sales Return Bill",
          // },
          {
            label: "Complimentary Bill Label",
            name: "complimentary_bill_label",
            value: billPrintSettingsFormData?.complimentary_bill_label || 0,
          },
          {
            label: "Sales Return Bill Label",
            name: "sales_return_bill_label",
            value: billPrintSettingsFormData?.sales_return_bill_label || 0,
          },
        ].map(({ label, name, value }) => (
          <div className="mb-4" key={label}>
            <div className="flex items-center space-x-2">
              <label className="text-sm w-1/3">{label}</label>
              <input
                type="text"
                // defaultValue={defaultValue}
                className="border rounded px-3 py-2"
                style={{ width: "660px" }} // Set fixed width
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
        ))}

        {/* Main Sub Total Label */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm w-1/3">
              Main Sub Total Label <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="Sub Total"
              className="border rounded px-3 py-2"
              style={{ width: "660px" }} // Set fixed width
              name="main_sub_total_label"
              value={billPrintSettingsFormData?.main_sub_total_label || 0}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Show FSSAI */}
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm w-1/3">
            Show FSSAI <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            {/* {["None", "Below Header", "Below Footer"].map((option) => ( */}
            {[
              {
                id: "show_fssai",
                label: "None",
                value: null,
              },
              {
                id: "show_fssai",
                label: "Below Header",
                value: "below_header",
              },
              {
                id: "show_fssai",
                label: "Below Footer",
                value: "below_footer",
              },
            ].map(({ id, label, value }, index) => (
              <label className="flex items-center space-x-2" key={id}>
                <input
                  type="radio"
                  name="show_fssai"
                  // defaultChecked={option === "None"}
                  defaultChecked={index === 0}
                  id={id}
                  className="mr-2"
                  onChange={handleChange}
                  value={value || ""}
                />
                <span>{label}</span>
              </label>
            ))}
            {/* 
              <div className="flex items-center mb-2" key={id}>
                <input
                  type="radio"
                  name="date_time_choice"
                  id={id}
                  className="mr-2"
                  onChange={handleChange}
                  value={value}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))} */}
          </div>
        </div>

        {/* Print Options */}
        {[
          // { label: "Print Tip Amount In The Bill", defaultChecked: true },
          // { label: "Print HSN Code In The Bill", defaultChecked: false },
          {
            id: "is_print_tip_amount",
            label: "Print Tip Amount In The Bill",
            value: billPrintSettingsFormData?.is_print_tip_amount,
          },
          {
            id: "is_print_hsn_code",
            label: "Print HSN Code In The Bill",
            value: billPrintSettingsFormData?.is_print_hsn_code,
          },
          {
            id: "is_hide_zero_price_items",
            label: "Do Not Print Items With Zero Price",
            value: billPrintSettingsFormData?.is_hide_zero_price_items,
          },
          {
            id: "is_show_tax_info_after_item",
            label: "Show Tax Information After Item",
            value: billPrintSettingsFormData?.is_show_tax_info_after_item,
          },
        ].map(({ id, label, value }) => (
          <div className="mb-4 pl-[439px]" key={id}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                // defaultChecked={defaultChecked}
                className="form-checkbox"
                id={id}
                name={id}
                checked={value}
                onChange={handleChange}
              />
              <span className="text-sm">{label}</span>
            </label>
          </div>
        ))}
        {/* button */}
        <div className="mt-6 flex justify-end space-x-4 border-t border-gray-300 p-3">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-full"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2  bg-gray-300 rounded-full"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          {/* <Link to="/operations/bill_print/add/KotSetting"> */}
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-full"
            onClick={handleNext}
          >
            Next
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default BillPrintSetting;
