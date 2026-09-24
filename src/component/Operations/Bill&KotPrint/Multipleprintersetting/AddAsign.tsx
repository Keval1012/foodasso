import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPrinterList } from "../../../../Api/Operation/Api";

// Define the structure of the form data
interface FormData {
  printer_name: string;
  printer: string;
  printer_type: string;
  standard_printer_receipt_type: string;
  // is_captain_bill_print: boolean;
  is_printer_for_report_print: boolean;
  // highlight_order_id_on_bill_and_kot: boolean;
}

interface EditPrinterDetailsDataProps {
  defaultprinter: any;
}

const AddAsign: React.FC = () => {

  const location = useLocation();
  const { defaultprinter } =
    (location.state as EditPrinterDetailsDataProps) || {};
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [printerList, setPrinterList] = useState([]);
  const [printerDetailsFormData, setPrinterDetailsFormData] =
    useState<FormData>({
      printer_name: defaultprinter?.printer_name ?? "",
      printer: defaultprinter?.printer ?? "",
      printer_type: defaultprinter?.printer_type ?? "general",
      standard_printer_receipt_type: defaultprinter?.standard_printer_receipt_type ?? "",
      // is_captain_bill_print: false,
      is_printer_for_report_print: defaultprinter?.is_printer_for_report_print ?? false,
      // highlight_order_id_on_bill_and_kot: false,
  });

  const handleReset = () => {
    setPrinterDetailsFormData({
      printer_name: defaultprinter?.printer_name ?? "",
      printer: defaultprinter?.printer ?? "",
      printer_type: defaultprinter?.printer_type ?? "general",
      standard_printer_receipt_type: defaultprinter?.standard_printer_receipt_type ?? "",
      is_printer_for_report_print: defaultprinter?.is_printer_for_report_print ?? false,
    });
  };

  useEffect(() => {
    fetchPrinterList();
  }, []);

  const fetchPrinterList = async () => {
    let data = {
      outlet: loginUserData?.outlet,
    };

    try {
      debugger
      const res = await getPrinterList(data);
      if (res.status === 200) {
        setPrinterList(res.data?.data);
      }
    } catch (error) {}
  };

  const printerData = [
    { id: 1, value: "OneNote for Windows 10", label: "OneNote for Windows 10" },
    { id: 2, value: "Microsoft XPS Document Writer", label: "Microsoft XPS Document Writer" },
    { id: 3, value: "Microsoft Print to PDF", label: "Microsoft Print to PDF" },
    { id: 4, value: "HP LaserJet Pro MFP M126nw[959123]", label: "HP LaserJet Pro MFP M126nw[959123]" },
    { id: 5, value: "Fax", label: "Fax" }
  ];

  const receiptTypeData = [
    { id: 1, value: "58 mm thermal", label: "58 mm thermal" },
    { id: 2, value: "80 mm thermal", label: "80 mm thermal" },
    { id: 3, value: "A4 size", label: "A4 size" },
    { id: 4, value: "A5 size", label: "A5 size" }
  ];

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;
    setPrinterDetailsFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    // Navigate to the next form and pass formData
    // navigate("/operations/bill_print/add/BillPrintSetting", { state: printerDetailsFormData });

    if (defaultprinter) {
      navigate("/operations/bill_print/add/BillPrintSetting", {
        state: {
          defaultprinter: defaultprinter,
        },
      });
    } else {
      navigate("/operations/bill_print/add/BillPrintSetting", {
        state: {
          printerDetailsData: printerDetailsFormData,
        },
      });
    }
  };

  console.log("printerDetailsFormData1", printerDetailsFormData);
  console.log("edit-printerDetailsData", defaultprinter);

  return (
    <div>
      <div className="flex justify-between items-center border-b border-gray-300 ">
        <h1 className="text-2xl font-semibold p-4">Bill/KOT Print</h1>
        <div className="flex gap-3 p-4 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer" onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft className="text-base" />
          <button className="text-base">Back</button>
        </div>
      </div>
      {/* Form Section */}
      <div className="w-[989px] border border-gray-300 p-3 ml-3 mt-5 rounded-md">
        <h2 className="text-lg font-bold mb-4">Printer Details</h2>

        <div className="mb-4 flex items-center">
          <label htmlFor="printer_name" className="w-1/3 text-base font-medium">
            Printer Name <span className="text-red-500">*</span>
          </label>
          <input
            id="printer_name"
            name="printer_name"
            type="text"
            className="w-[620px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={printerDetailsFormData.printer_name}
            onChange={handleChange}
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="printer" className="w-1/3 text-base font-medium">
            Select Printer <span className="text-red-500">*</span>
          </label>
          <select
            id="printer"
            name="printer"
            className="w-[620px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={printerDetailsFormData.printer}
            onChange={handleChange}
          >
            <option value="">Select Printer</option>
            {printerData?.map((printer: any) => (
              <option key={printer?.value} value={printer?.value}>
                {printer?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="printer" className="w-1/3 text-base font-medium">
            Printer Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            {[
              {
                id: "printer_type",
                label: "General",
                value: "general",
              },
              {
                id: "printer_type",
                label: "Dot Matrix with Roll Paper",
                value: "dot_matrix_with_roll_paper",
              },
            ].map(({ id, label, value }) => (
              <div className="flex items-center mb-2" key={id}>
                <input
                  type="radio"
                  name="printer_type"
                  id={id}
                  className="mr-2"
                  onChange={handleChange}
                  value={value}
                  defaultChecked={value === "general"}
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label
            htmlFor="standard_printer_receipt_type"
            className="w-1/3 text-base font-medium"
          >
            Receipt Type
          </label>
          <select
            id="standard_printer_receipt_type"
            name="standard_printer_receipt_type"
            className="w-[462px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            value={printerDetailsFormData.standard_printer_receipt_type}
            onChange={handleChange}
          >
            <option value="">Select Printer Receipt Type</option>
            {receiptTypeData?.map((receipt: any) => (
              <option key={receipt?.value} value={receipt?.value}>
                {receipt?.label}
              </option>
            ))}
          </select>
          <button className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Populate
          </button>
        </div>

        {/* Checkboxes */}
        <div className="mb-4 pl-[320px]">
          {/* <label className="flex items-center">
            <input
              type="checkbox"
              name="is_captain_bill_print"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-"
              checked={printerDetailsFormData.is_captain_bill_print}
              onChange={handleChange}
            />
            <span className="ml-2">Use Only For Captain Bill Print</span>
          </label> */}
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              name="is_printer_for_report_print"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-"
              checked={printerDetailsFormData.is_printer_for_report_print}
              onChange={handleChange}
            />
            <span className="ml-2">Use This Printer For Report Print</span>
          </label>
          {/* <label className="flex items-center mt-2">
            <input
              type="checkbox"
              name="highlight_order_id_on_bill_and_kot"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-"
              checked={printerDetailsFormData.highlight_order_id_on_bill_and_kot}
              onChange={handleChange}
            />
            <span className="ml-2">Highlight Order ID on Bill and KOT</span>
          </label> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6 border-t border-gray-300 p-2">
          <button className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300" onClick={handleReset}>
            Reset
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            onClick={handleNext}
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAsign;
