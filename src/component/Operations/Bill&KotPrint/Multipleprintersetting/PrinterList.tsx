import React, { useEffect, useState } from "react";
import { FaSearch, FaStar, FaPen, FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deletePrinter, getPrinter } from "../../../../Api/Operation/Api";
import toast from "react-hot-toast";
import DialogBox from "../../../common/Dilog-Box";
import DeletePrinter from "./DeletePrinter";

const PrinterList = () => {

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [printerList, setprinterList] = useState([]);
  const [printerId, setPrinterId] = useState(0);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  useEffect(() => {
    fetchPrinterData();
  }, []);

  const fetchPrinterData = async () => {
    try {
      const res = await getPrinter();
      if (res.status === 200) {
        setprinterList(res.data?.data);
      }
    } catch (error) {}
  };

  console.log("printerList", printerList);

  const handleEdit = (printer: any) => {
    navigate("/operations/bill_print/add", {
      state: {
        defaultprinter: printer,
      },
    });
  };

  const handleDelete = async (id: any) => {
    setDeleteDialogOpen(true);
    setPrinterId(id);

    // if (id) {
    //   try {
    //     const res = await deletePrinter(id);
    //     if (res.status === 200) {
    //       toast.success(res.data?.message);
    //       fetchPrinterData();
    //     }
    //   } catch (error) {}
    // }
  };

  const handleAssign = (printer: any) => {
    navigate("/operations/bill_print/assign", {
      state: {
        printerData: printer,
      },
    });
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6  border-b ">
          <h1 className="text-2xl font-semibold p-4">Printer Listing</h1>
          <div className="flex justify-end items-center gap-4 p-4">
            <Link to="/operations/bill_print/add">
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                <span className="flex items-center gap-3 mr-2">
                  <FaPlus />
                  Add Printer
                </span>
              </button>
            </Link>
            <div
              className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <MdKeyboardArrowLeft className="text-base" />
              <button className="text-base">Back</button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        {/* <form className="w-full md:w-80 py-3 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline />
            </div>

            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search"
              required
            />

            <div
              className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            ></div>
          </div>
        </form> */}

        {/* Table */}
        <div className="overflow-x-auto mt-5 p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg p-4">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm">
                <th className="p-4 text-left">Department Wise Name</th>
                <th className="p-4 text-left">Printer Type</th>
                <th className="p-4 text-left">Report Print</th>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Printer Assign</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              {printerList?.map((p: any) => (
                <tr className="border-b" key={p?.id}>
                  <td className="p-4">{p?.printer_name}</td>{" "}
                  <td className="p-4">{p?.printer_type}</td>
                  <td className="p-4">
                    {p?.is_printer_for_report_print === true ? "Yes" : "No"}
                  </td>{" "}
                  <td className="p-4">
                    {/* <Link to="/operations/bill_print/edit"> */}
                    <div className="flex gap-3">
                      <button
                        className="border bg-gray-200 border-gray-300 p-2"
                        onClick={() => handleEdit(p)}
                      >
                        <FiEdit
                          className="cursor-pointer text-gray-500 "
                          size={20}
                        />
                      </button>
                      <button
                        className="border bg-gray-200 border-gray-300 rounded p-2"
                        onClick={() => handleDelete(p?.id)}
                      >
                        {" "}
                        <RiDeleteBin6Line
                          className="cursor-pointer text-gray-500 rounded "
                          size={20}
                        />
                      </button>
                    </div>
                    {/* </Link>{" "} */}
                  </td>{" "}
                  <td className="p-4">
                    {/* <Link to="/operations/bill_print/assign"> */}
                    <button
                      className="border border-gray-300 px-4 py-3 rounded-md"
                      onClick={() => handleAssign(p)}
                    >
                      Assign
                    </button>
                    {/* </Link> */}
                  </td>
                </tr>
              ))}

              <DialogBox
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                title="Remove Printer"
              >
                <DeletePrinter
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  printerId={printerId}
                  fetchPrinterData={fetchPrinterData}
                />
              </DialogBox>

              {/* <tr className="border-b">
                <td className="p-4">E-bill printer(Only for captain)</td>{" "}
                <td className="p-4">General</td> <td className="p-4">yes</td>{" "}
                <td className="p-4">
                  <Link to="/operations/bill_print/edit">
                    <div className="flex gap-3">
                      <button className="border bg-gray-200 border-gray-300 p-2">
                        <FiEdit
                          className="cursor-pointer text-gray-500 "
                          size={20}
                        />
                      </button>
                      <button className="border bg-gray-200 border-gray-300 rounded p-2">
                        {" "}
                        <RiDeleteBin6Line
                          className="cursor-pointer text-gray-500 rounded "
                          size={20}
                        />
                      </button>
                    </div>
                  </Link>{" "}
                </td>{" "}
                <td className="p-4">
                  <Link to="/operations/bill_print/assign">
                    <button className="border border-gray-300 px-4 py-3 rounded-md ">
                      Assign
                    </button>
                  </Link>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrinterList;
